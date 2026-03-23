import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CLINIC_INFO } from '../constants';
import { Save, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [info, setInfo] = useState(CLINIC_INFO);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      const docRef = doc(db, 'clinic_info', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setInfo(docSnap.data() as any);
      }
    };
    fetchInfo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'clinic_info', 'main'), info);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving clinic info:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Clinic Settings</h1>
        <p className="text-slate-500">Update your clinic's public information across the website.</p>
      </header>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Clinic Name</label>
            <input 
              type="text" 
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Doctor Name</label>
            <input 
              type="text" 
              value={info.doctor}
              onChange={(e) => setInfo({ ...info, doctor: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Specialty</label>
            <input 
              type="text" 
              value={info.specialty}
              onChange={(e) => setInfo({ ...info, specialty: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Phone Number</label>
            <input 
              type="text" 
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input 
              type="email" 
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Opening Hours</label>
            <input 
              type="text" 
              value={info.hours}
              onChange={(e) => setInfo({ ...info, hours: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Clinic Address</label>
          <textarea 
            rows={3}
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          {saved && (
            <span className="text-emerald-600 font-bold flex items-center gap-2">
              <CheckCircle size={20} />
              Changes saved successfully!
            </span>
          )}
          <button 
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100 disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
