import { CLINIC_INFO } from '../constants';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <h2 className="text-xl font-bold">Gupta Dental</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Providing premium dental care and orthodontic solutions in Jaipur, Rajasthan. 
              Your smile is our priority.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-slate-400">
              {['Home', 'Services', 'About', 'Testimonials', 'Appointment'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4 text-slate-400">
              {['Orthodontics', 'Dental Implants', 'Root Canal', 'Teeth Whitening', 'Pediatric Care'].map((item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-slate-400">
                <MapPin className="text-indigo-500 shrink-0" size={20} />
                <span>{CLINIC_INFO.address}</span>
              </li>
              <li className="flex gap-3 text-slate-400">
                <Phone className="text-indigo-500 shrink-0" size={20} />
                <span>{CLINIC_INFO.phone}</span>
              </li>
              <li className="flex gap-3 text-slate-400">
                <Mail className="text-indigo-500 shrink-0" size={20} />
                <span>{CLINIC_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
          <a href="#admin" className="flex items-center gap-2 hover:text-indigo-400 transition-colors group">
            <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
            <span>Admin Login</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
