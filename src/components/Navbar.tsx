import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../constants';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Gupta Dental</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Clinic & Orthodontic Centre</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Testimonials'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('appointment')}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
            >
              <Calendar size={18} />
              Book Appointment
            </button>
          </div>

          <div className="md:hidden">
            {/* Mobile menu button could go here */}
            <button className="text-slate-600">
              <Phone size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
