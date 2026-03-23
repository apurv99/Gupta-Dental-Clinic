import { motion } from 'motion/react';
import { Calendar, ArrowRight, ShieldCheck, Award, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../constants';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
      {/* 3D Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-6">
              <ShieldCheck size={18} />
              Trusted Dental Care in Jaipur
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Your Smile, <br />
              <span className="text-indigo-600">Our Passion.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Experience world-class dental treatments with {CLINIC_INFO.doctor}. 
              We combine advanced technology with a gentle touch to give you the perfect smile you deserve.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
              >
                Book Appointment
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
              >
                Our Services
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-slate-900">15+</span>
                <span className="text-sm text-slate-500 font-medium">Years Experience</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-slate-900">10k+</span>
                <span className="text-sm text-slate-500 font-medium">Happy Patients</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-slate-900">4.9/5</span>
                <span className="text-sm text-slate-500 font-medium">Google Rating</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative perspective-1000"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200 transform-gpu hover:rotate-y-12 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Dental Clinic" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
            </div>

            {/* Floating Cards for 3D effect */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <Award size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Certified</p>
                <p className="text-sm font-bold text-slate-900">Best Orthodontist</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Available</p>
                <p className="text-sm font-bold text-slate-900">Mon-Sat 10am-8pm</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
