<!-- Instruções para agentes AI que vão contribuir neste repositório -->

# Instruções rápidas para agentes — Flashcard

Objetivo: ajudar a concluir e manter o app de flashcards. Todas as respostas e explicações devem ser em português (preferência por pt-BR), claras e concisas.

- Visão geral do projeto:
  - App React + TypeScript criado com Vite. Entrypoint: [src/main.tsx](src/main.tsx).
  - Rotas centralizadas em [src/routers/MainRouter/index.tsx](src/routers/MainRouter/index.tsx). Páginas vivem em [src/pages].
  - Estado global: React Contexts. Contexto principal: `MateriasContext` em [src/contexts/MateriasContext/MateriasContext.tsx]. Use o hook `useMaterias.ts` para ler/alterar estado global.

- Arquitetura e padrões importantes:
  - Componentes: cada componente é uma pasta com `index.tsx` e possivelmente `styles.module.css` (ex.: [src/components/Card/index.tsx](src/components/Card/index.tsx)).
  - Primitivas UI reutilizáveis: [src/components/ui] (botões, inputs, selects, progress, sidebar). Prefira-as para consistência.
  - Formulários/modais: [src/components/Modal] (ex.: `AddCardForm.tsx`). Atualize validação e chamadas ao contexto ao alterar formulários.
  - Tipos/Modelos: use os arquivos em [src/models] (`CardModel.ts`, `DeckModel.ts`, `MateriaModel.ts`) para tipagem de props e estado.

- Convenções de código:
  - Exporte o componente principal como `export default` de `index.tsx` em cada pasta de componente.
  - Reutilize `useMaterias` para alterações de estado relacionadas a matérias/decks/cartões.
  - Para novos IDs, use `uuid` (já presente em `package.json`).
  - Evite mexer em `tsconfig` ou `eslint.config.js` sem necessidade explícita.

- Comandos úteis (do `package.json`):
  - Desenvolvimento: `npm run dev` (inicia `vite`).
  - Build production: `npm run build` (`tsc -b && vite build`).
  - Lint: `npm run lint`.
  - Preview build: `npm run preview`.

- Integrações e dependências relevantes:
  - Radix UI está disponível (`@radix-ui/*`) — prefira seus componentes para diálogos/progress/tooltip.
  - Tailwind configurado; estilos globais em [src/styles/global.css](src/styles/global.css) e [src/styles/theme.css](src/styles/theme.css).

- Como propor mudanças (fluxo prático):
  1. Faça uma alteração small e autocontida (ex.: corrigir um bug em `src/components/Card/index.tsx`).
  2. Rode `npm run lint` e, se possível, `npm run dev` localmente para validar.
  3. Abra um PR com descrição curta em português e links para os arquivos alterados.

- Comportamento esperado do agente:
  - Sempre responder em português.
  - Antes de grandes alterações, pedir esclarecimentos em português.
  - Ao editar código, explique em poucas frases o porquê da mudança e referências aos arquivos tocados (ex.: "Atualizei `src/contexts/MateriasContext/MateriasContext.tsx` para... ").
  - Fornecer comandos exatos para reproduzir o fluxo (ex.: `npm run dev`).

Se alguma instrução estiver incompleta ou você quiser que eu inclua diagramas/fluxos mais detalhados sobre estado e rotas, diga qual parte deseja expandir.
