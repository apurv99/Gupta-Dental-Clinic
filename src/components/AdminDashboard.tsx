import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { AppointmentData } from '../types';
import { motion } from 'motion/react';
import { Users, CalendarCheck, Clock, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    today: 0
  });
  const [recentAppointments, setRecentAppointments] = useState<AppointmentData[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AppointmentData));
      setRecentAppointments(apps);
    });

    const allQ = query(collection(db, 'appointments'));
    const unsubscribeAll = onSnapshot(allQ, (snapshot) => {
      const apps = snapshot.docs.map(doc => doc.data() as AppointmentData);
      const today = new Date().toDateString();
      
      setStats({
        total: apps.length,
        pending: apps.filter(a => a.status === 'pending').length,
        confirmed: apps.filter(a => a.status === 'confirmed').length,
        today: apps.filter(a => new Date(a.date).toDateString() === today).length
      });
    });

    return () => {
      unsubscribe();
      unsubscribeAll();
    };
  }, []);

  const statCards = [
    { label: 'Total Requests', value: stats.total, icon: Users, color: 'bg-blue-500' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-amber-500' },
    { label: 'Confirmed', value: stats.confirmed, icon: CalendarCheck, color: 'bg-emerald-500' },
    { label: "Today's Visits", value: stats.today, icon: TrendingUp, color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening at the clinic today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Recent Appointment Requests</h2>
          <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{app.name}</p>
                    <p className="text-xs text-slate-500">{app.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.service}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(app.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      app.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentAppointments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No recent appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
