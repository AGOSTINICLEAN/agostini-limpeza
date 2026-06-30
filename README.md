# 🧹 Agostini Limpeza Especializada

Sistema SaaS profissional de agendamento de limpeza para Airbnb, desenvolvido com Next.js 15, TypeScript e Tailwind CSS.

## ✨ Características

- 🔐 **Autenticação Multi-Usuário**: Suporte para Admin, Funcionário e Cliente
- 📅 **Calendário Inteligente**: Agendamento com bloqueio automático de horários
- 👥 **Gerenciamento de Clientes**: CRM integrado
- 👨‍💼 **Gestão de Funcionários**: Controle de disponibilidade e desempenho
- 📊 **Relatórios em Tempo Real**: Dashboards com métricas importantes
- 🎨 **Design Responsivo**: Interface moderna com Tailwind CSS
- 🔒 **Multi-Tenancy**: Isolamento de dados por tenant

## 🚀 Quick Start

### Requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone https://github.com/AGOSTINICLEAN/agostini-limpeza.git
cd agostini-limpeza

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

## 🔐 Credenciais de Teste

### Admin
- Email: `admin@agostini.com`
- Senha: `demo123`

### Funcionário
- Email: `funcionario@agostini.com`
- Senha: `demo123`

### Cliente
- Email: `cliente@airbnb.com`
- Senha: `demo123`

## 📁 Estrutura do Projeto

```
agostini-limpeza/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Páginas de autenticação
│   ├── (dashboard)/       # Área autenticada
│   └── api/               # API routes
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── shared/           # Componentes compartilhados
│   ├── auth/             # Componentes de auth
│   └── dashboard/        # Componentes do dashboard
├── lib/                  # Utilitários e serviços
├── styles/               # Estilos globais
├── public/               # Assets estáticos
└── prisma/               # ORM e banco de dados
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form, Zod

## 📋 Roadmap

- [x] Estrutura do projeto
- [x] Landing page
- [x] Autenticação mock
- [x] Dashboard base
- [x] Componentes UI
- [ ] Integração Supabase
- [ ] Schema Prisma
- [ ] FullCalendar
- [ ] Notificações por Email
- [ ] Sistema de Pagamentos
- [ ] Testes automatizados

## 👥 Tipos de Usuário

### Admin
- Acesso total ao sistema
- Gerenciamento de clientes e funcionários
- Visualização de relatórios
- Configuração do sistema

### Funcionário
- Visualizar seus agendamentos
- Confirmar disponibilidade
- Atualizar status de trabalho

### Cliente
- Agendar serviços
- Visualizar histórico
- Gerenciar propriedades

## 🔒 Segurança

- Row Level Security (RLS) no Supabase
- Validação de dados com Zod
- CSRF protection
- Isolamento de dados por tenant

## 📞 Suporte

Para dúvidas ou bugs, abra uma issue no GitHub.

## 📄 Licença

MIT
