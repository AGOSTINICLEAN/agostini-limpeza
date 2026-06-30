'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MOCK_CLIENTS = [
  { id: '1', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 99999-0001', properties: 2, totalBookings: 8 },
  { id: '2', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-0002', properties: 1, totalBookings: 5 },
  { id: '3', name: 'Ana Costa', email: 'ana@email.com', phone: '(11) 99999-0003', properties: 3, totalBookings: 12 },
];

export default function ClientsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-2">Gerencie seus clientes e suas propriedades.</p>
        </div>
        <Button variant="primary">+ Novo Cliente</Button>
      </div>

      <div className="grid gap-4">
        {MOCK_CLIENTS.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{client.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="text-gray-900">{client.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Telefone</p>
                      <p className="text-gray-900">{client.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Propriedades</p>
                      <p className="text-gray-900 font-medium">{client.properties}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Agendamentos</p>
                      <p className="text-gray-900 font-medium">{client.totalBookings}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
