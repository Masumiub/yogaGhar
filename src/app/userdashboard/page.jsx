// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { User, Mail, Shield, Calendar, FileText, CheckCircle, Clock, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/user-dashboard");
      
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { user, statistics, charts } = dashboardData;

  return (
    <div className="min-h-screen  duration-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back, {user?.name}</p>
        </div>

        {/* User Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">User Information</h3>
                <p className="text-gray-600 dark:text-gray-300">Your profile details</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">{user?.email}</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300 capitalize">{user?.role || "user"}</span>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Session Statistics</h3>
                <p className="text-gray-600 dark:text-gray-300">Your yoga session overview</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{statistics.totalSessions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Sessions</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 text-center">
                <Clock className="w-8 h-8 text-amber-600 dark:text-amber-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{statistics.draftSessions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Draft Sessions</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{statistics.publishedSessions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Published Sessions</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center">
                <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {statistics.publishedSessions > 0 ? Math.round((statistics.publishedSessions / statistics.totalSessions) * 100) : 0}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Published Rate</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mr-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Actions</h3>
                <p className="text-gray-600 dark:text-gray-300">Manage your content</p>
              </div>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => router.push("/create-session")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Create New Session
              </button>
              <button 
                onClick={() => router.push("/manage-drafts")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Manage Drafts
              </button>
              <button 
                onClick={() => router.push("/manage-sessions")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                View Published Sessions
              </button>
            </div>
          </div> */}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sessions Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {charts.pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Session Prices</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={charts.barChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="#8884d8" name="Price ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Sessions</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-300">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Date Created</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.sessions.slice(0, 5).map((session) => (
                  <tr key={session._id}>
                    <td className="py-3 px-4">{session.title}</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${session.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">${session.price || 0}</td>
                    <td className="py-3 px-4">
                      {session.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {dashboardData.sessions.length === 0 && (
            <p className="text-center text-gray-500 py-4">No sessions found. Create your first session!</p>
          )}
        </div>
      </div>
    </div>
  );
}