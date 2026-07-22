"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";

export default function PrimeiroAcessoPage() {
  const router = useRouter();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  async function alterarSenha(e: React.FormEvent) {
    e.preventDefault();

    setErro("");

    if (novaSenha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setErro("Usuário não encontrado.");
      setLoading(false);
      return;
    }

    const { error: senhaError } = await supabase.auth.updateUser({
      password: novaSenha,
    });

    if (senhaError) {
      setErro(senhaError.message);
      setLoading(false);
      return;
    }

    const { data: resultado, error: erroUpdate } = await supabase
  .from("profiles")
  .update({
    first_login: false,
    must_change_password: false,
  })
  .eq("id", user.id)
  .select();

console.log("Resultado:", resultado);
console.log("Erro Update:", erroUpdate);

    if (erroUpdate) {
    setErro(erroUpdate.message);
    setLoading(false);
    return;
}

    router.push("/dashboard/cliente");
  }

  return (
  <main
    className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4"
    style={{
      backgroundImage: "url('/login-bg.png')",
    }}
  >
    <div className="absolute inset-0 bg-[#0b1d3a]/70 backdrop-blur-[2px]" />

    <div className="relative w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8">

        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Agostini Limpeza"
            className="h-24 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-[#17386d]">
          Primeiro acesso
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Para sua segurança, defina uma nova senha antes de continuar.
        </p>

        {erro && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-3 mb-4">
            {erro}
          </div>
        )}

        <form onSubmit={alterarSenha} className="space-y-4">

          <div className="relative">
  <input
    type={mostrarSenha ? "text" : "password"}
    placeholder="Nova senha"
    value={novaSenha}
    onChange={(e) => setNovaSenha(e.target.value)}
    className="w-full rounded-xl border border-gray-300 p-3 pr-12 focus:outline-none"
  />

  <button
    type="button"
    onClick={() => setMostrarSenha(!mostrarSenha)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

          <div className="relative">
  <input
    type={mostrarConfirmacao ? "text" : "password"}
    placeholder="Confirmar nova senha"
    value={confirmarSenha}
    onChange={(e) => setConfirmarSenha(e.target.value)}
    className="w-full rounded-xl border border-gray-300 p-3 pr-12 focus:outline-none"
  />

  <button
    type="button"
    onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {mostrarConfirmacao ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#17386d] hover:bg-[#10284f] text-white p-3 font-semibold transition"
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>

        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          🔒 Sua senha ficará protegida e poderá ser alterada futuramente.
        </p>

      </div>
    </div>
  </main>
);
}