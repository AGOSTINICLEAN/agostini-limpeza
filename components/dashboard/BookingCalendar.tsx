'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  hasAvailableTimes,
  getAvailableTimes,
} from '@/lib/bookings-db';

const eventos = [
  {
    id: '1',
    title: '',
    start: '2026-07-06',
    color: '#fecaca',
  },
  {
    id: '2',
    title: '',
    start: '2026-07-08',
    color: '#fecaca',
  },
];
function isBusyDay(date: string) {
  return eventos.some((evento) => evento.start === date);
}

export default function BookingCalendar() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  async function handleDateClick(info: any) {
    const data = info.dateStr;

    const horarios = await getAvailableTimes(data);

    setAvailableTimes(horarios);
    setSelectedDate(data);
  }
  const dataFormatada = selectedDate
  ? selectedDate.split("-").reverse().join("/")
  : '';

  return (
    <div className="rounded-xl overflow-hidden">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
        ]}
        locale={ptBrLocale}
        timeZone="local"
        initialView="dayGridMonth"
        selectable
        validRange={{
          start: new Date().toISOString().split('T')[0],
        }}
        dayCellClassNames={(arg) => {
          const data = arg.date.toISOString().split('T')[0];
          const hoje = new Date().toISOString().split('T')[0];

          if (data < hoje) {
            return ['bg-red-100'];
          }

          if (!hasAvailableTimes(data)) {
            return ['bg-red-100'];
          }

          if (data === hoje) {
            return ['bg-yellow-200'];
          }

          return [];
        }}
        dateClick={handleDateClick}
        height="auto"
        events={eventos}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        buttonText={{
          today: 'Hoje',
        }}
      />
      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600">
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded bg-yellow-300 border border-yellow-400"></div>
    <span>Hoje</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded bg-red-500"></div>
    <span>Sem horários disponíveis</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded bg-white border border-gray-300"></div>
    <span>Horários disponíveis</span>
  </div>
</div>

      {selectedDate && (
  <div className="mt-8 border-t pt-6">
    <h3 className="text-lg font-semibold mb-4">
      Horários disponíveis para{" "}
      {dataFormatada}
    </h3>

    {isBusyDay(selectedDate) ? (
      <div className="rounded-lg bg-red-100 text-red-700 p-4">
        Este dia está totalmente ocupado.
      </div>
    ) : (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {availableTimes.map((hora) => (
          <button
            key={hora}
            onClick={() =>
              router.push(
                `/dashboard/bookings/create?date=${selectedDate}&time=${hora}`
              )
            }
            className="rounded-lg border p-3 hover:bg-gray-100 transition"
          >
            {hora}
          </button>
        ))}
      </div>
    )}
  </div>
)}
</div>
  );
}