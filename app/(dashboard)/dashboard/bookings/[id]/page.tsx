'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  getBookings,
  updateBookingStatus,
} from "@/lib/bookings-db";
import { getCurrentUser} from "@/lib/auth";
import { useEffect, useState } from "react";
export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();


  const [booking, setBooking] = useState<any>(null);

useEffect(() => {
  async function loadBooking() {
    const bookings = await getBookings();

    const found = bookings.find(
      (b: any) => b.id.toString() === id
    );

    setBooking(found ?? null);
  }

  loadBooking();
}, [id]);
  const user = getCurrentUser();
  const isAdmin = user?.role === "admin";
  const changeStatus = (
  status: "confirmed" | "completed" | "cancelled"
) => {
  if (!booking) return;
  updateBookingStatus(booking.id, status);
  window.location.reload();
};

  if (!booking) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Agendamento não encontrado
        </h1>

        <button
          onClick={() => router.push('/dashboard/bookings')}
          className="rounded-lg bg-[#001B3D] px-4 py-2 text-white"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        Detalhes do Agendamento
      </h1>

      <div className="rounded-2xl border p-6 space-y-4 bg-white shadow">


        <div>
          <p className="text-gray-500">Data</p>
          <p className="font-semibold">
            {new Date(booking.date + "T00:00:00").toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Horário</p>
          <p className="font-semibold">{booking.time}</p>
        </div>

        <div>
          <p className="text-gray-500">Endereço</p>
          <p className="font-semibold">{booking.address}</p>
        </div>

        <div>
  <p className="text-gray-500">Situação</p>

  <p
    className={`font-semibold ${
      booking.status === "pending"
        ? "text-yellow-600"
        : booking.status === "confirmed"
        ? "text-blue-600"
        : booking.status === "completed"
        ? "text-green-600"
        : booking.status === "cancelled"
        ? "text-red-600"
        : "text-gray-800"
    }`}
  >
    {booking.status === "pending"
      ? "Pendente"
      : booking.status === "confirmed"
      ? "Confirmado"
      : booking.status === "completed"
      ? "Concluído"
      : booking.status === "cancelled"
      ? "Cancelado"
      : booking.status}
  </p>
  {isAdmin && (
  <div className="mt-6">
    <p className="text-gray-500 mb-2">
      Alterar situação
    </p>

    <button
  onClick={() => changeStatus("confirmed")}
  className="rounded-lg bg-blue-500 px-4 py-2 text-white"
>
  Confirmar
</button>

      <button
  onClick={() => changeStatus("completed")}
  className="rounded-lg bg-green-600 px-4 py-2 text-white"
>
  Concluir
</button>

      <button
  onClick={() => changeStatus("cancelled")}
  className="rounded-lg bg-red-600 px-4 py-2 text-white"
>
  Cancelar
</button>
    </div>

)}
</div>
<div className="mt-4">
<p className="text-gray-500">Observações</p>
<p className="font-semibold">
  {booking.notes || 'Nenhuma observação informada.'}
</p>
</div>

      </div>

      <button
        onClick={() => router.push('/dashboard/bookings')}
        className="rounded-lg bg-[#001B3D] px-6 py-3 text-white"
      >
        Voltar aos agendamentos
      </button>

    </div>
  );
}