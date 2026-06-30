'use client';

import React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentBookings } from '@/components/dashboard/RecentBookings';
import { getCurrentUser } from '@/lib/auth';
import { Calendar, Users, DollarSign, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const user = getCurrentUser();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Aqui está um resumo do seu sistema de agendamentos.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total de Agendamentos"
          value="24"
          change={12}
          icon="📅"
        />
        <StatCard
          label="Agendamentos Concluídos"
          value="18"
          change={8}
          icon="✅"
        />
        <StatCard
          label="Clientes Ativos"
          value="8"
          change={2}
          icon="👥"
        />
        <StatCard
          label="Receita Total"
          value="R$ 2.450"
          change={15}
          icon="💰"
        />
      </div>

      {/* Recent Bookings */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBookings />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <a
              href="/dashboard/bookings/create"
              className="block p-3 rounded-lg bg-primary-50 border border-primary-200 hover:bg-primary-100 transition-colors text-primary-700 font-medium text-center"
            >
              + Novo Agendamento
            </a>
            <a
              href="/dashboard/calendar"
              className="block p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors text-blue-700 font-medium text-center"
            >
              Ver Calendário
            </a>
            <a
              href="/dashboard/clients"
              className="block p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors text-green-700 font-medium text-center"
            >
              Gerenciar Clientes
            </a>
            <a
              href="/dashboard/employees"
              className="block p-3 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors text-purple-700 font-medium text-center"
            >
              Gerenciar Funcionários
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
