import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AppointmentData } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Check, X, Trash2, Phone, Mail, Calendar as CalendarIcon } from 'lucide-react';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AppointmentData));
      setAppointments(apps);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, status: AppointmentData['status']) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment request?")) {
      try {
        await deleteDoc(doc(db, 'appointments', id));
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.phone.includes(searchTerm) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500">Manage and track all patient appointment requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none w-64"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAppointments.map((app) => (
            <motion.div
              layout
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{app.name}</h3>
                    <p className="text-indigo-600 font-semibold text-sm">{app.service}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                    app.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Phone size={16} className="text-slate-400" />
                    {app.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Mail size={16} className="text-slate-400" />
                    {app.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <CalendarIcon size={16} className="text-slate-400" />
                    {new Date(app.date).toLocaleDateString()}
                  </div>
                </div>

                {app.message && (
                  <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 italic">
                    "{app.message}"
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                {app.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(app.id!, 'confirmed')}
                      className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                      title="Confirm Appointment"
                    >
                      <Check size={20} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(app.id!, 'cancelled')}
                      className="p-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-100"
                      title="Cancel Appointment"
                    >
                      <X size={20} />
                    </button>
                  </>
                )}
                <button 
                  onClick={() => handleDelete(app.id!)}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  title="Delete Request"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAppointments.length === 0 && (
          <div className="bg-white py-20 rounded-3xl border border-dashed border-slate-300 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Search size={32} />
            </div>
            <p className="text-slate-500 font-medium">No appointments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
