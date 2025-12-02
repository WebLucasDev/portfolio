# 🧑‍💻 Instruções para o Projeto de Portfólio Web - Lucas Venancio

[cite_start]Este projeto é o portfólio pessoal de Lucas Venancio, um desenvolvedor Back-end Java, e será uma **Single Page Application (SPA)** desenvolvida em **Next.js**[cite: 4].

## 🎯 Requisitos Essenciais e Tecnologias

1.  [cite_start]**Tecnologia Principal:** **Next.js** (SPA)[cite: 4].
2.  [cite_start]**UI Components:** **Shadcn UI**[cite: 4].
3.  [cite_start]**Estilização:** **Tailwind CSS**[cite: 11].
4.  [cite_start]**Fontes:** A única fonte utilizada em todo o projeto deve ser a **Inter**[cite: 11].
5.  [cite_start]**Convenção de Nomenclatura:** Todos os nomes de funções, métodos, componentes, variáveis, etc., devem ser **em inglês**[cite: 5].

## 🎨 Design System (Restrições de Cores)

O projeto deve aderir a um design minimalista e focado em acessibilidade:

1.  [cite_start]**Cor Principal (Accent):** O único tom de cor primária permitido é o **Azul: `#0000FF`**[cite: 9, 10].
2.  [cite_start]**Cores Neutras:** Use **apenas** preto (`#000000`), branco (`#FFFFFF`) e suas variantes de cinza para backgrounds e textos[cite: 8, 10].
3.  [cite_start]**Temas:** O projeto deve ter suporte a **tema claro e tema escuro**[cite: 8].
    * [cite_start]**Padrão:** Backgrounds devem ser padronizados como **branco** (tema claro) e **preto** (tema escuro)[cite: 8].

## 🌐 Funcionalidades e Estrutura

1.  **Estrutura de Páginas:** O portfólio **não será uma *landing page* única**. [cite_start]Todos os menus devem ser rotas/páginas distintas, separadas[cite: 2].
2.  [cite_start]**Suporte Multi-idiomas (i18n):** O projeto deve suportar os seguintes idiomas[cite: 7]:
    * Português (Brasileiro)
    * Inglês
    * Espanhol
3.  **Conteúdo das Páginas/Rotas:**
    * [cite_start]**Sobre Mim (About/Resume):** Falar sobre formação acadêmica, cursos profissionalizantes e certificações[cite: 12].
    * [cite_start]**Projetos (Projects):** Uma aba dedicada a listar todos os projetos pessoais[cite: 13]. Cada item deve incluir:
        * [cite_start]Link direto para o **GitHub** do projeto[cite: 13].
        * [cite_start]**Preview** de visualização (imagem/gif ou link)[cite: 13].
        * [cite_start]**Descrição** do projeto[cite: 13].
    * [cite_start]**Contato (Contact):** Uma área para o usuário entrar em contato via **Email** ou **WhatsApp**[cite: 14].

## ✨ Animações e UX

O projeto deve ser altamente focado em uma experiência de usuário agradável:

1.  [cite_start]**Animações Gerais:** O projeto deve ter **animações sutis em todas as páginas** para um efeito de "encantamento"[cite: 6]. Use bibliotecas como **Framer Motion** para facilitar.
2.  [cite_start]**Animações de Menu:** Cada item do menu de navegação, ao receber o *hover* do mouse, deve exibir uma **animação sutil**[cite: 3].

## 🛠️ Melhores Práticas de Desenvolvimento (Next.js/React)

1.  **Estrutura de Pastas:** Usar a estrutura **App Router** do Next.js. Organizar componentes em pastas de **Feature** (ex: `\components\projects\`, `\components\contact-form\`) e componentes genéricos em `\components\ui\` (para componentes Shadcn customizados).
2.  **Client vs. Server Components:** Priorizar **Server Components** por padrão para melhor performance e SEO, utilizando `use client` apenas quando a interatividade (hooks, gerenciamento de estado, eventos de clique) for estritamente necessária.
3.  **Tailwind Class Management:** Utilizar a biblioteca **`clsx`** ou **`class-variance-authority` (CVA)** para uma gestão limpa e condicional de classes Tailwind nos componentes.
4.  **Performance:**
    * Otimizar o carregamento de imagens com o componente **`next/image`**.
    * Utilizar **Lazy Loading** para componentes pesados ou partes da UI que não são carregadas inicialmente.
5.  **Acessibilidade (A11y):** Garantir que todos os componentes Shadcn customizados sigam os padrões **WAI-ARIA**.
6.  **Tipagem:** Utilizar **TypeScript** de forma rigorosa. Definir `Interfaces` e `Types` para props de componentes e dados de API (ex: Tipar a estrutura de dados de `Projects`).
7.  **Reutilização:** Extrair lógica e hooks reutilizáveis para a pasta `\hooks\` e funções utilitárias para `\lib\`.