import { motion } from 'motion/react';
import { CLINIC_INFO } from '../constants';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const highlights = [
    "State-of-the-art Dental Technology",
    "Expert Orthodontic Care",
    "Painless Treatment Procedures",
    "Strict Sterilization Protocols",
    "Patient-Centric Approach",
    "Affordable Treatment Plans"
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
                alt="Dr. Dheeraj Gupta" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-600 rounded-full -z-10 blur-3xl opacity-20" />
            
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 z-20"
            >
              <p className="text-4xl font-black text-indigo-600">15+</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Years of Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">About the Clinic</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-6">
              Leading the Way in <br />
              <span className="text-indigo-600">Modern Dentistry</span>
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {CLINIC_INFO.doctor} is a highly skilled dental surgeon and orthodontist with over 15 years of experience. 
              At {CLINIC_INFO.name}, we believe in providing personalized care that addresses each patient's unique needs 
              using the latest advancements in dental science.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-emerald-500">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-900 font-bold mb-2">Clinic Location</p>
              <p className="text-slate-600 flex items-start gap-2">
                <span className="mt-1 text-indigo-600">📍</span>
                {CLINIC_INFO.address}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
