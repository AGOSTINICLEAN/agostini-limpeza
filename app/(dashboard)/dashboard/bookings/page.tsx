'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getCurrentUser } from '@/lib/auth';

const MOCK_BOOKINGS = [
  {
    id: '1',
    client: 'Maria Santos',
    service: 'Limpeza Padrão',
    date: '2024-01-15',
    time: '10:00',
    address: 'Av. Paulista, 1000',
    status: 'completed',
  },
  {
    id: '2',
    client: 'João Silva',
    service: 'Limpeza Profunda',
    date: '2024-01-16',
    time: '14:00',
    address: 'Rua das Flores, 500',
    status: 'confirmed',
  },
  {
    id: '3',
    client: 'Ana Costa',
    service: 'Limpeza Pós-Hospedagem',
    date: '2024-01-17',
    time: '09:00',
    address: 'Rua Augusta, 2000',
    status: 'pending',
  },
];

const statusConfig = {
  completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Concluído' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmado' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendente' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' },
};

export default function BookingsPage() {
  const user = getCurrentUser();
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  const filteredBookings = filter === 'all'
    ? MOCK_BOOKINGS
    : MOCK_BOOKINGS.filter((b) => b.status === filter);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os agendamentos de limpeza.</p>
        </div>
        <Link href="/dashboard/bookings/create">
          <Button variant="primary">+ Novo Agendamento</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'pending', 'confirmed', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'all' ? 'Todos' : statusConfig[status as keyof typeof statusConfig].label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => {
          const config = statusConfig[booking.status as keyof typeof statusConfig];
          return (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{booking.client}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{booking.service}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">📅 Data</p>
                        <p className="text-gray-900 font-medium">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">⏰ Hora</p>
                        <p className="text-gray-900 font-medium">{booking.time}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500">📍 Local</p>
                        <p className="text-gray-900 font-medium">{booking.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-gray-500">Nenhum agendamento encontrado com este filtro.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
