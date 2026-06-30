// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  CLIENT: 'client',
} as const;

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Service Types
export const SERVICE_TYPES = [
  { id: '1', name: 'Limpeza Padrão', description: 'Limpeza básica do imóvel' },
  { id: '2', name: 'Limpeza Profunda', description: 'Limpeza completa e detalhada' },
  { id: '3', name: 'Limpeza Pós-Hospedagem', description: 'Limpeza específica para Airbnb' },
  { id: '4', name: 'Limpeza Especial', description: 'Serviço customizado' },
] as const;

// Navigation Links
export const DASHBOARD_NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/dashboard/calendar', label: 'Calendário', icon: 'Calendar' },
  { href: '/dashboard/bookings', label: 'Agendamentos', icon: 'BookOpen' },
  { href: '/dashboard/clients', label: 'Clientes', icon: 'Users' },
  { href: '/dashboard/employees', label: 'Funcionários', icon: 'UserCheck' },
  { href: '/dashboard/settings', label: 'Configurações', icon: 'Settings' },
] as const;
