import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import React from 'react';

const MOCK_BOOKINGS = [
  {
    id: '1',
    client: 'Maria Santos',
    service: 'Limpeza Padrão',
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: '2',
    client: 'João Silva',
    service: 'Limpeza Profunda',
    date: '2024-01-16',
    status: 'confirmed',
  },
  {
    id: '3',
    client: 'Ana Costa',
    service: 'Limpeza Pós-Hospedagem',
    date: '2024-01-17',
    status: 'pending',
  },
];

const statusStyles = {
  completed: 'bg-green-100 text-green-800',
  confirmed: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
};

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos Recentes</CardTitle>
        <CardDescription>Últimos agendamentos do sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_BOOKINGS.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{booking.client}</p>
                <p className="text-sm text-gray-500">{booking.service}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{booking.date}</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[booking.status as keyof typeof statusStyles]}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
