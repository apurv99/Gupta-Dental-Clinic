import { Service, Testimonial } from './types';

export const CLINIC_INFO = {
  name: "Gupta Dental Clinic",
  doctor: "Dr. Dheeraj Gupta",
  specialty: "BDS, MDS - Orthodontics & Dentofacial Orthopaedics",
  address: "F121, 125, Panchsheel Marg, behind Bagadia bhawan, C Scheme, Ashok Nagar, Jaipur, Rajasthan 302001",
  phone: "094609 84768",
  email: "info@guptadentalclinic.com",
  hours: "Mon - Sat: 10:00 AM - 8:00 PM, Sun: Closed",
};

export const SERVICES: Service[] = [
  {
    id: "1",
    title: "Orthodontics",
    description: "Straighten your teeth with modern braces and clear aligners for a perfect smile.",
    icon: "Smile",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Dental Implants",
    description: "Permanent and natural-looking solutions for missing teeth using advanced implant technology.",
    icon: "Stethoscope",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "Root Canal Treatment",
    description: "Painless endodontic procedures to save your natural teeth from decay and infection.",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "Teeth Whitening",
    description: "Professional whitening treatments to brighten your smile and boost your confidence.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    title: "Pediatric Dentistry",
    description: "Gentle and friendly dental care specifically designed for children and infants.",
    icon: "Baby",
    image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    title: "Cosmetic Dentistry",
    description: "Enhance the appearance of your teeth with veneers, bonding, and smile makeovers.",
    icon: "Camera",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=800",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "Patient",
    content: "Dr. Dheeraj is an excellent orthodontist. My braces treatment was smooth and the results are amazing!",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Verma",
    role: "Patient",
    content: "Very clean clinic and professional staff. The root canal treatment was completely painless.",
    rating: 5,
  },
  {
    id: "3",
    name: "Amit Gupta",
    role: "Patient",
    content: "Best dental clinic in Jaipur. Highly recommended for any dental issues.",
    rating: 5,
  },
];
