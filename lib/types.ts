export type UserRole = 'admin' | 'employee' | 'client';

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Client extends User {
  phone?: string;
  address?: string;
  airbnbProperties: string[];
}

export interface Employee extends User {
  phone?: string;
  availability: Availability[];
  skills: string[];
}

export interface Availability {
  id: string;
  employeeId: string;
  dayOfWeek: number; // 0-6
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface Service {
  id: string;
  name: string;
  description: string;
  estimatedDuration: number; // minutes
  price: number;
}

export interface Booking {
  id: string;
  clientId: string;
  employeeId: string;
  serviceId: string;
  propertyAddress: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  totalClients: number;
  totalEmployees: number;
}
