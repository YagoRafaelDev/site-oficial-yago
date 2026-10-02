# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Idioma

- Responder sempre em português do Brasil (pt-BR): explicações, resumos, avisos e relatórios.
- Termos técnicos, nomes de arquivos, comandos e código podem ficar em inglês.
- A copy do site é pt-BR; comentários no código estão em inglês.

## Projeto

- Site profissional/portfólio de Yago Rafael, com objetivo comercial (apresentar serviços e projetos, levar ao contato via WhatsApp).
- HTML, CSS e JavaScript vanilla. Arquitetura simples: trabalhar prioritariamente em `index.html`, `style.css` e `script.js`; imagens em `assets/images/`.
- Não migrar para React, Next.js ou outros frameworks. Não criar arquivos, dependências ou bibliotecas desnecessárias. Única dependência externa: Google Fonts.
- Não há build, lint ou testes. Para rodar: abrir `index.html` ou servir a pasta (`python -m http.server 8000`).

## Objetivo atual

- O site já está estruturalmente pronto. Não reconstruir do zero nem redesenhar a interface sem necessidade.
- Foco: refinamento — animações, microinterações, transições, profundidade visual, interação com cursor, comportamento no scroll, acabamento, responsividade e sensação de qualidade profissional.
- Preservar o que já funciona e está visualmente bom.

## Identidade visual

Tokens em `:root` de `style.css`:

| Uso | Cor | Token |
|---|---|---|
| Fundo | `#080A0D` | `--bg` |
| Cards | `#11151B` | `--surface` |
| Azul principal | `#1677FF` | `--blue` |
| Azul claro | `#38BDF8` | `--cyan` |
| Branco | `#FFFFFF` | `--white` |
| Cinza | `#9CA3AF` | `--muted` |

- Headings/hero: Barlow Semi Condensed (`--heading`). Corpo, botões e textos secundários: Source Sans 3 (`--body`).
- Estética tecnológica, profissional, premium, clean, elegante e autoral.
- Evitar preto chapado sem profundidade, glow azul exagerado e aparência de template genérico de IA.
- Preservar a logo (`assets/images/brand/logo-yago.png`); não redesenhá-la.

## Conteúdo e estrutura

- Preservar o conteúdo real. Nunca inventar clientes, números, depoimentos, resultados ou projetos. O único projeto real apresentado é VS Tattoo Studio.
- Preservar as seções (`#inicio`, `#projetos`, `#servicos`, `#processo`, `#sobre`, `#evolucao`, `#faq`, `#contato`) e sua lógica, salvo ajuste pequeno claramente necessário.
- Preservar links e CTAs funcionais. Os links `wa.me` se repetem em vários pontos do `index.html` — alterar todos juntos.

## Arquitetura (contratos entre arquivos)

- `style.css` e `script.js` são divididos em seções numeradas (`/* 01 — ... */`) que seguem a ordem da página.
- Durações e easing ficam no CSS (`--motion-fast/ui/medium/reveal`, `--ease`) e são lidos pelo JS via `getComputedStyle`. Limites de movimento ficam no objeto `interaction` no topo do `script.js`.
- Conteúdo é visível por padrão: o CSS base nunca esconde nada; os reveals são aplicados pelo JS (Web Animations API + IntersectionObserver). Sem JS ou com reduced motion, a página deve continuar completa.
- Breakpoints duplicados entre CSS (1700, 1100, 860, 620px) e JS (`innerWidth <= 860`, `> 620`, media query `precisePointer` com `min-width: 861px`). Mudar um exige mudar o outro.
- Cursor customizado e efeitos de ponteiro só rodam com `(hover: hover) and (pointer: fine)` e sem `prefers-reduced-motion`; CSS e JS usam a mesma condição.
- Efeitos de scroll ficam no único `requestAnimationFrame` (`queueScroll` → `updateScroll`), lendo layout antes de escrever.
- FAQ usa `<details>` nativo com transição em CSS Grid, sem animar altura via JS.

## Animações e interações

- Não aplicar o mesmo fade-up em tudo; buscar variedade e intenção.
- Microinterações elegantes e movimento controlado, sem atrapalhar leitura ou navegação.
- Efeitos de mouse/hover adaptados ou desativados em touch. Respeitar `prefers-reduced-motion`.
- Priorizar performance: animar `transform` e `opacity`.

## Responsividade e acessibilidade

- Revisar toda alteração em desktop, tablet e mobile. Evitar overflow horizontal.
- Manter legibilidade e áreas clicáveis adequadas; simplificar efeitos pesados no mobile quando necessário.
- HTML semântico, foco visível, navegação por teclado, contraste e alt text.

## Forma de trabalho

- Analisar os arquivos existentes antes de alterações grandes. Mudanças incrementais, preservando funcionalidades.
- Não apagar código funcional só para facilitar uma implementação.
- Não alterar GitHub, domínio, hospedagem ou deploy sem pedido explícito. Não fazer commit nem push automaticamente.
- Não declarar algo como testado sem ter testado de fato no navegador (console, overflow, navegação, interações, breakpoints).
- Ao concluir: informar arquivos alterados, o que mudou, o que foi verificado e riscos/pendências.

## Revisão obrigatória

Após qualquer rodada visual importante, revisar criticamente como designer/frontend experiente: composição, hierarquia, espaçamento, tipografia, backgrounds, profundidade, animações, microinterações, botões, hover, ritmo entre seções, responsividade, performance, acessibilidade, coerência visual e aparência genérica de IA.

Se algo estiver fraco, inconsistente ou mal acabado, corrigir antes de considerar a tarefa concluída.
