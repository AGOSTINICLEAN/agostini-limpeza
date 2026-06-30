'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { getCurrentUser, setCurrentUser, MOCK_USERS } from '@/lib/auth';
import { ArrowRight, CheckCircle, Calendar, Users, BarChart3 } from 'lucide-react';

const FEATURES = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Agendamento Inteligente',
    description: 'Calendário interativo com bloqueio automático de horários ocupados',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Multi-Usuário',
    description: 'Gerencie clientes, funcionários e administradores em um único sistema',
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Relatórios em Tempo Real',
    description: 'Acompanhe receitas, desempenho e métricas importantes',
  },
];

export default function Home() {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleQuickLogin = (role: 'admin' | 'employee' | 'client') => {
    const user = MOCK_USERS[role];
    setCurrentUser(user);
    router.push('/dashboard');
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-600">🧹 Agostini</h1>
            <Link href="/login">
              <Button variant="primary">Entrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Sistema de Agendamento para <span className="text-primary-600">Limpeza de Airbnb</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gerencie agendamentos, clientes e funcionários com facilidade. Aumente sua eficiência e profissionalidade.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/login">
              <Button size="lg" variant="primary" className="flex gap-2">
                Começar Agora <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline">
                Ver Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Recursos Principais</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-gray-200 bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Demo Section */}
      <section id="demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Teste Agora</h3>
          <p className="text-gray-600 mb-8">Selecione um perfil para acessar o sistema com dados de demonstração:</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { role: 'admin' as const, title: 'Administrador', emoji: '👨‍💼', description: 'Acesso total ao sistema' },
              { role: 'employee' as const, title: 'Funcionário', emoji: '👨‍🔧', description: 'Gerencie sua agenda' },
              { role: 'client' as const, title: 'Cliente', emoji: '👩‍💼', description: 'Agende limpezas' },
            ].map(({ role, title, emoji, description }) => (
              <button
                key={role}
                onClick={() => handleQuickLogin(role)}
                className="p-6 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all text-center"
              >
                <div className="text-5xl mb-3">{emoji}</div>
                <h4 className="font-semibold text-lg text-gray-900 mb-1">{title}</h4>
                <p className="text-sm text-gray-600 mb-4">{description}</p>
                <span className="text-primary-600 font-medium flex items-center justify-center gap-1">
                  Entrar <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">© 2024 Agostini Limpeza Especializada. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
