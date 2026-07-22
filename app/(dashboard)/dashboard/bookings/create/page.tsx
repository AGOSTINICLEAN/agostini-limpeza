'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {isTimeAvailable, saveBooking, getBookings, getAvailableTimes } from "@/lib/bookings-db";
import { supabase } from "@/lib/supabase";
import { isPrerenderInterruptedError } from 'next/dist/server/app-render/dynamic-rendering';

export default function CreateBookingPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const params =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();

const selectedDate = params.get('date') || '';
const selectedTime = params.get('time') || '';
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
  client: "",
  service: "",
  date: selectedDate,
  time: selectedTime,
  address: "",
  notes: "",
});
  React.useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    date: selectedDate,
    time: selectedTime,
  }));
}, [selectedDate, selectedTime]);

const [availableTimes, setAvailableTimes] = useState<string[]>([]);

React.useEffect(() => { 
  async function carregarHorarios() {
    if (!formData.date) {
      setAvailableTimes([]);
      return;
    }

    const horarios = await getAvailableTimes(formData.date);

    const horariosFiltrados = horarios.filter((hora: string) => {
      if (formData.date !== new Date().toISOString().split("T")[0]) {
        return true;
      }

      const agora = new Date();

      const [h, m] = hora.split(":").map(Number);

      const horario = new Date();
      horario.setHours(h, m, 0, 0);

      return horario.getTime() >= agora.getTime() + 60 * 60 * 1000;
    });

    setAvailableTimes(horariosFiltrados);

  }
  carregarHorarios();
}, [formData.date]);

  React.useEffect(() => {
  async function carregarUsuario() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id);

      const { data: profile } = await supabase
  .from("profiles")
  .select("nome")
  .eq("id", user.id)
  .single()

  if (profile) {
  setFormData(prev => ({
    ...prev,
    client: profile.nome
  }))
}
    }
  }

  carregarUsuario();
}, [formData.date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

const [ano, mes, dia] = formData.date.split("-").map(Number);
const dataSelecionada = new Date(ano, mes -1, dia);
dataSelecionada.setHours(0, 0, 0, 0);

if (dataSelecionada < hoje) {
  alert("Não é permitido realizar agendamentos com datas retroativas.");
  setIsLoading(false);
  return;
}

if (!isTimeAvailable(formData.date, formData.time)) {
  alert("Este horário já está reservado.");
  setIsLoading(false);
  return;
}
console.log("Antes de salvar");

  try {
  await saveBooking({
    client_name: formData.client,
    user_id: userId,
    phone: "",
    address: formData.address,
    date: formData.date,
    time: formData.time,
    notes: formData.notes,
    status: "pending",
  });

  setIsLoading(false);

  router.push('/dashboard/bookings');
} catch (error) {
  console.error(error);
  alert("Erro ao salvar o agendamento.");
  setIsLoading(false);
}
  }

  return (
    <div className="max-w-7x1 mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Novo Agendamento</h1>
        <p className="text-gray-600 mt-2">Crie um novo agendamento de limpeza.</p>
      </div>

      <Card className="w-full">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
             <div className="space-y-6 md:col-span-2">

  {/* Cliente */}
  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Cliente
    </label>
    <input
      type="text"
      name="client"
      value={formData.client}
      onChange={handleChange}
      readOnly
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      placeholder="Nome do cliente"
      required
    />
  </div>

  {/* Data e Horário */}
  <div className="grid grid-cols-2 gap-6">

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Data
      </label>
      <input
  type="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
  className="w-full h-[46px] px-3 border border-gray-300 rounded-lg appearance-none text-center"
  style={{ 
    textAlign: "center", 
    textAlignLast: "center",
    paddingLeft: 0,
    paddingRight: 0,
  }}
  required
/>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Horário
      </label>

      <select
  name="time"
  value={formData.time}
  onChange={handleChange}
  className="w-full h-[46px] px-3 border border-gray-300 rounded-lg"
  required
>
        <option value="">Selecione um horário</option>

        {availableTimes.map((hora) => (
          <option key={hora} value={hora}>
            {hora}
          </option>
        ))}
      </select>

    </div>

  </div>

  {/* Endereço */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Endereço do Imóvel
    </label>

    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Endereço completo"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      required
    />
  </div>

  {/* Observações */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Observações
    </label>

    <textarea
      name="notes"
      value={formData.notes}
      onChange={handleChange}
      rows={4}
      placeholder="Informações adicionais..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    />
  </div>
</div>
</div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                Criar Agendamento
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

