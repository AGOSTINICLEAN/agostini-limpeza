'use client';

import Link from 'next/link'
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react'
import { getCurrentUser } from "@/lib/auth";
import { getBookings } from "@/lib/bookings-db";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function ClientHome() {
const user = getCurrentUser();
const [bookings, setBookings] = useState<any[]>([])

useEffect(() => {
  async function carregarBookings() {
    const data = await getBookings()
    setBookings(data || [])
  }

  carregarBookings()
}, [])
const confirmedBookings= bookings
.filter(b => b.status === "confirmed")
.sort((a, b) => {
  return (
new Date('${a.date} ${a.time}').getTime () -
new Date('${b.date} ${b.time}').getTime()
  );
});
const router = useRouter();


  return (
    <div className="space-y-6 pl-12 pr-8">
      {/* Saudação */}
      <div className="pl-10">
        <h1 className="text-xl font-bold text-gray-900">
          Olá! {user?.name ?? "Cliente"}! 👋
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Bem-vindo à área do cliente da Agostini Limpeza
        </p>
      </div>

      {/* Banner*/}
      <div
  className="relative h-60 overflow-hidden rounded-3xl bg-cover"
  style={{
    backgroundImage: "url('/banner.png')",
    backgroundPosition: "center 60%",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-[#001B3D]/90 via-[#001B3D]/70 to-transparent"></div>

  <div className="relative z-10 max-w-xl px-8 pt-6 pb-4">
    <h2 className="text-3xl font-bold leading-tight">
  <span className="text-white">Seu imóvel</span>
  <br />
  <span className="text-yellow-400">em boas mãos.</span>
</h2>

    <p className="mt-2 text-base text-white/90">
      Agende serviços com praticidade e acompanhe tudo em um só lugar.
    </p>

    <button className="mt-8 rounded-xl bg-yellow-400 px-5 py-2 font-semibold text-[#001B3D] hover:bg-yellow-300 transition">
      <button
  onClick={() => router.push("/dashboard/bookings")}
>
  Meus agendamentos
</button>
</button>
  </div>
</div>
      
      {/* Cards */}
      {/* Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

  {/* Coluna esquerda */}
  <div className="flex flex-col gap-4">

    {/* Novo Agendamento */}
    <Link href="/dashboard/bookings/create">
      <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer h-40 flex flex-col justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50">
          <Calendar className="h-6 w-6 text-yellow-600" />
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
          Novo Agendamento
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          Solicite um novo serviço rapidamente.
        </p>
      </div>
    </Link>

    {/* Calendário */}
    <Link href="/dashboard/calendar">
      <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer h-40 flex flex-col justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50">
          <Calendar className="h-6 w-6 text-yellow-600" />
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
          Calendário
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          Visualize os horários disponíveis.
        </p>
      </div>
    </Link>

  </div>

  {/* Próximo Agendamento */}
  <div className="md:col-span-2">
    <Link href="/dashboard/bookings">
    <div className="rounded-2xl border bg-white p-6 shadow-sm h-full min-h-[336px]">

      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Agendamentos confirmados
      </h3>

      <div className="space-y-4 text-gray-700">
        {confirmedBookings.length > 0 ? (
          confirmedBookings.map((booking) => (
            <div key={booking.id} className="bonder-b pb-4 mb-4 last:border-b-0">
        <p>📅 {booking.date}</p>
<p>🕒 {booking.time}</p>
<p>📍 {booking.address}</p>
</div>
          ))
        ) : (
  <div className="flex h-full min-h-[180px] items-center justify-center">
    <p className="text-center text-gray-500">
      Você ainda não possui agendamentos confirmados.
    </p>
  </div>
  )}
      </div>
    </div>
    </Link>
  </div>
  </div>
  </div>
  )
}
