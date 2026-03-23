export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface AppointmentData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: Date | string;
  service: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date | string;
}
