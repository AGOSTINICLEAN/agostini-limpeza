'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
    Mail,
    Lock,
    Eye,
    ShieldCheck
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { setCurrentUser, MOCK_USERS } from '@/lib/auth';

const DEMO_CREDENTIALS = [
    {
        email: 'admin@agostini.com',
        password: 'demo123',
        role: 'admin' as const,
    },
    {
      email: 'cliente@agostini.com',
      password: 'demo123',
      role: 'client' as const,
    }
];

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError('');

        await new Promise((r) => setTimeout(r, 500));

        const cred = DEMO_CREDENTIALS.find(
            (c) =>
                c.email === email &&
                c.password === password
        );

        if (!cred) {
            setLoading(false);
            setError('E-mail ou senha inválidos.');
            return;
        }

        const user = MOCK_USERS[cred.role];
        setCurrentUser(user);

        if (user.role === "admin") {
  router.push("/dashboard");
}

if (user.role === "client") {
  router.push("/dashboard");
} else {
  router.push("/dashboard");
}
    }

    return (
        <main
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundImage: "url('/login-bg.png')",
            }}
        >
            <div className="absolute inset-0 bg-[#08152f]/80 backdrop-blur-sm" />

            <div className="relative w-full max-w-lg">

                <div className="rounded-3xl bg-white shadow-2xl p-10">

                    <div className="flex justify-center mb-6">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-28 object-contain"
                        />
                    </div>

                    <div className="text-center">

                        <h1 className="text-4xl font-bold text-[#10264d]">
                            Bem-vindo!
                        </h1>

                        <p className="mt-3 text-gray-500">
                            Entre com sua conta para acessar
                            seus agendamentos e informações.
                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="mt-8 space-y-5"
                    >
                        {error && (
                            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <div>

                            <label className="font-medium text-sm">
                                E-mail
                            </label>

                            <div className="mt-2 flex items-center rounded-xl border px-4 h-14">

                                <Mail
                                    size={20}
                                    className="text-gray-400"
                                />

                                <input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="ml-3 w-full outline-none"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="font-medium text-sm">
                                Senha
                            </label>

                            <div className="mt-2 flex items-center rounded-xl border px-4 h-14">

                                <Lock
                                    size={20}
                                    className="text-gray-400"
                                />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="ml-3 w-full outline-none"
                                />

                                <Eye
                                    size={20}
                                    className="text-gray-400 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                />

                            </div>

                        </div>

                        <div className="flex items-center justify-between">

                            <label className="flex items-center gap-2 text-sm">

                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={() =>
                                        setRemember(!remember)
                                    }
                                />

                                Lembrar-me

                            </label>

                            <button
    type="button"
    onClick={() => setShowForgotPassword(true)}
    className="text-sm text-blue-700 hover:underline"
>
    Esqueci minha senha
</button>

                        </div>

                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full h-14 rounded-xl bg-[#0c2148] hover:bg-[#091936] text-lg"
                        >
                            Entrar
                        </Button>

                    </form>

                   <div className="text-center mt-8">
  <p className="text-xs text-gray-500">
    Acesso exclusivo para clientes e colaboradores cadastrados.
  </p>
</div> 

                </div>

            </div>
            {showForgotPassword && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

            <div className="flex justify-center mb-5">

                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                    🔒
                </div>

            </div>

            <h2 className="text-2xl font-bold text-center text-[#10264d]">
                Recuperação de senha
            </h2>

            <p className="text-gray-600 text-center mt-4 leading-7">

                Por motivos de segurança, a redefinição de senha é realizada
                exclusivamente pela equipe da <strong>Agostini</strong>.

                <br /><br />

                Entre em contato com um administrador do sistema para receber
                uma nova senha.

            </p>

            <button
                onClick={() => setShowForgotPassword(false)}
                className="mt-8 w-full h-12 rounded-xl bg-[#0c2148] text-white hover:bg-[#081730]"
            >
                Entendi
            </button>

        </div>

    </div>
)}

        </main>
    );
}