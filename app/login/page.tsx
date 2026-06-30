'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { setCurrentUser, MOCK_USERS } from '@/lib/auth';
import Link from 'next/link';

const DEMO_CREDENTIALS = [
  { email: 'admin@agostini.com', password: 'demo123', role: 'admin' as const },
  { email: 'funcionario@agostini.com', password: 'demo123', role: 'employee' as const },
  { email: 'cliente@airbnb.com', password: 'demo123', role: 'client' as const },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const credential = DEMO_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );

    if (credential) {
      const user = MOCK_USERS[credential.role];
      setCurrentUser(user);
      router.push('/dashboard');
    } else {
      setError('Credenciais inválidas. Use os dados de demo abaixo.');
    }

    setIsLoading(false);
  };

  const handleDemoLogin = (role: 'admin' | 'employee' | 'client') => {
    const user = MOCK_USERS[role];
    setCurrentUser(user);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">🧹 Agostini</h1>
          <p className="text-gray-600">Sistema de Agendamento de Limpeza</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Use as credenciais de demonstração abaixo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-medium mb-3">Ou use uma conta de demo:</p>
              <div className="space-y-2">
                {DEMO_CREDENTIALS.map((cred) => (
                  <button
                    key={cred.role}
                    onClick={() => handleDemoLogin(cred.role)}
                    className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
                  >
                    <p className="font-medium text-gray-900 text-sm">{cred.email}</p>
                    <p className="text-xs text-gray-500">{cred.password}</p>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
