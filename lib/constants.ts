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
  
  {
    href: "/dashboard",
    label: "Início",
    icon: "LayoutDashboard",
    roles: ["admin", "client"],
  },
  {
    href: "/dashboard/calendar",
    label: "Calendário",
    icon: "Calendar",
    roles: ["admin", "client"],
  },
  {
    href: "/dashboard/bookings",
    label: "Agendamentos",
    icon: "BookOpen",
    roles: ["admin", "client"],
  },
  {
    href: "/dashboard/clients",
    label: "Clientes",
    icon: "Users",
    roles: ["admin"],
  },
  {
    href: "/dashboard/employees",
    label: "Funcionários",
    icon: "UserCheck",
    roles: ["admin"],
  },
  {
    href: "/dashboard/settings",
    label: "Configurações",
    icon: "Settings",
    roles: ["admin"],
  },
] as const;
export const sidebarItems = [
  {
    href: "/dashboard/workshop",
    label: "Workshop",
    icon: "Layout",
    roles: ["admin"],
  },
  {
    href: "/dashboard/employees",
    label: "Funcionários",
    icon: "UserCheck",
    roles: ["admin"],
  },
  {
    href: "/dashboard/calendar",
    label: "Calendário",
    icon: "Calendar",
    roles: ["admin", "client"],
  },
  {
    href: "/dashboard/bookings",
    label: "Agendamentos",
    icon: "BookOpen",
    roles: ["admin", "client"],
  },
] as const;