# 📺 Plataforma de Visualização de Vídeos

Este projeto é uma plataforma de vídeos desenvolvida com foco em performance, componentização, boas práticas e experiência do usuário.

## 📌 Sobre o Projeto

Esta plataforma foi desenvolvida com Next.js 15 App Router, utilizando React, TypeScript e Tailwind CSS, com o objetivo de entregar uma experiência fluida e performática na visualização de vídeos. A aplicação permite aos usuários explorar, assistir e gerenciar vídeos com uma interface intuitiva e responsiva.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js >= 18
- Yarn ou npm
- MongoDB (para armazenamento de dados)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/video-player-app.git
cd video-player-app
```

2. Instale as dependências:
```bash
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
NEXT_PUBLIC_VIDEOS_API_KEY=sua_chave_api
NEXT_PUBLIC_VIDEOS_API_URL=https://api.pexels.com/
MONGODB_URI=sua_uri_mongodb
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Inicie o servidor de desenvolvimento:
```bash
yarn dev
```

O projeto estará disponível em `http://localhost:3000`

### Build e Produção

Para gerar o build para produção:
```bash
yarn build
```

Para iniciar a aplicação em modo produção:
```bash
yarn start
```

## 🧰 Tecnologias Utilizadas

### Frontend
- **Next.js 15** – Framework React com App Router
- **React 19** – Biblioteca para construção de interfaces
- **TypeScript** – Superset JavaScript com tipagem estática
- **Tailwind CSS** – Framework CSS utilitário
- **ShadCN/UI** – Componentes de UI reutilizáveis
- **Radix UI** – Primitivos de UI acessíveis
- **Framer Motion** – Biblioteca para animações
- **React Query (TanStack)** – Gerenciamento de estado e cache
- **Lucide React** – Ícones SVG

### Backend
- **MongoDB** – Banco de dados NoSQL
- **Next.js Route Handlers** – API endpoints
- **Ky** – Cliente HTTP
- **Pexels API** – API de vídeos

### Ferramentas de Desenvolvimento
- **ESLint** – Linting
- **Prettier** – Formatação de código
- **Husky** – Git hooks

## ✅ Funcionalidades Implementadas

- [x] Integração de vídeos via Pexels API e player nativo
- [x] Integração de vídeos via Vimeo API e iframe
- [x] Lista de vídeos com grid responsivo
- [x] Player principal com vídeo selecionado
- [x] Sistema de favoritos persistido em MongoDB Atlas
- [x] Barra de busca por título
- [x] Scroll infinito para carregamento de vídeos
- [x] Design responsivo para mobile e desktop
- [x] Histórico de visualizações persistido
- [x] Persistência de configurações do usuário (autoplay)

## ✨ Extras

- Suporte a tema claro/escuro com persistência local
- Prefetch de dados com React Query para navegação rápida
- Interface fluida com transições e micro interações (Framer Motion)
- Acessibilidade com atributos ARIA
- Video preview ao passar o mouse sobre o card
- Skeleton loaders para melhorar a percepção de carregamento

## 🛠 Estratégias de Renderização e Otimização

- SSR para bom SEO e prefetch
- Prefetch de dados no servidor para carregamento inicial rápido
- Atualizações/invalidações client-side e cache local com React Query
- Skeleton loaders para evitar layout shift
- Framer Motion para animações de transição

## 📌 Estrutura do Projeto

### Páginas
- **Home:** Lista de vídeos com busca e scroll infinito
- **Vídeo:** Player com detalhes e playlist lateral
- **Favoritos:** Lista de vídeos favoritados
- **Assistidos:** Histórico de vídeos assistidos

## 🌐 Integração com APIs e Banco de Dados

- **Pexels API:** Busca de vídeos em alta qualidade
- **MongoDB Atlas:** Armazenamento de favoritos, histórico e configurações
- Comunicação com MongoAtlas feitas via Route Handlers em `app/api/**/route.ts`
- Consumo com de apis com React Query (`useQuery`, `useMutation`)

## 🎞️ Animações e Transições

- Transições entre páginas com Framer Motion
- Micro interações enriquecem a experiência do usuário
- Skeletons para carregamentos
- Preview de vídeo em hover