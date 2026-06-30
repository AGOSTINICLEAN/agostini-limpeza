'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function CalendarPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
        <p className="text-gray-600 mt-2">Visualize todos os agendamentos em um calendário interativo.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendário de Agendamentos</CardTitle>
          <CardDescription>FullCalendar será integrado aqui na próxima fase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-gray-600 mb-4">
              O calendário interativo com FullCalendar será implementado na próxima fase do projeto.
            </p>
            <p className="text-sm text-gray-500">
              Enquanto isso, use a seção de Agendamentos para visualizar e gerenciar compromissos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
