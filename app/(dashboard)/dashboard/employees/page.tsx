'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MOCK_EMPLOYEES = [
  { id: '1', name: 'João Silva', email: 'joao@agostini.com', phone: '(11) 98888-0001', status: 'active', completedBookings: 45 },
  { id: '2', name: 'Maria Oliveira', email: 'maria@agostini.com', phone: '(11) 98888-0002', status: 'active', completedBookings: 38 },
  { id: '3', name: 'Carlos Santos', email: 'carlos@agostini.com', phone: '(11) 98888-0003', status: 'inactive', completedBookings: 12 },
];

const statusConfig = {
  active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Ativo' },
  inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inativo' },
};

export default function EmployeesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Funcionários</h1>
          <p className="text-gray-600 mt-2">Gerencie seus funcionários e suas disponibilidades.</p>
        </div>
        <Button variant="primary">+ Novo Funcionário</Button>
      </div>

      <div className="grid gap-4">
        {MOCK_EMPLOYEES.map((employee) => {
          const config = statusConfig[employee.status as keyof typeof statusConfig];
          return (
            <Card key={employee.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-gray-900">{employee.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                        {config.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="text-gray-900">{employee.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Telefone</p>
                        <p className="text-gray-900">{employee.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Trabalhos Concluídos</p>
                        <p className="text-gray-900 font-medium">{employee.completedBookings}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Ver Agenda</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
