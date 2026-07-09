'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import BookingCalendar from '@/components/dashboard/BookingCalendar';

export default function CalendarPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Calendário
        </h1>

        <p className="mt-2 text-gray-600">
          Clique em uma data para visualizar os horários disponíveis e criar um novo agendamento.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agenda de Serviços</CardTitle>
        </CardHeader>

        <CardContent>
          <BookingCalendar />
        </CardContent>
      </Card>
    </div>
  );
}