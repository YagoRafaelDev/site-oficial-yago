# Site Oficial Yago — Design System

## Objetivo e escopo

Este documento registra as diretrizes visuais do site profissional de Yago Rafael antes da implementação, em conjunto com o [Project Brief](PROJECT-BRIEF.md) e as instruções do [AGENTS.md](../AGENTS.md).

O design deve apoiar a apresentação dos serviços, a compreensão dos projetos reais e o contato de potenciais clientes. Qualidade visual, clareza, conversão, performance, acessibilidade e facilidade de manutenção devem orientar as decisões.

Este documento não implementa HTML, CSS ou JavaScript, não define uma tipografia definitiva e não autoriza a inclusão de dependências.

## Identidade principal

A identidade visual existente deve ser preservada. Não criar uma nova identidade visual sem necessidade.

| Papel | Cor | Uso principal |
| --- | --- | --- |
| Fundo principal | `#080A0D` | Base escura da interface. |
| Superfícies / cards | `#11151B` | Diferenciar superfícies do fundo sem contraste excessivamente forte. |
| Azul principal | `#1677FF` | Destaque primário, ações e interação. |
| Azul claro | `#38BDF8` | Destaque secundário e apoio. |
| Branco | `#FFFFFF` | Textos e elementos de alta prioridade. |
| Cinza | `#9CA3AF` | Conteúdos secundários. |

## Direção da marca

O site deve transmitir tecnologia, profissionalismo, criatividade, confiança, modernidade, qualidade e atenção aos detalhes.

A estética desejada é premium, moderna, tecnológica, elegante, limpa, autoral e visualmente marcante. A apresentação deve ser específica para Yago Rafael e coerente com seu momento profissional e com os serviços disponíveis.

Não inventar clientes, projetos, depoimentos, avaliações, números, resultados, experiência ou provas sociais para preencher a composição. Serviços futuros não devem aparecer como oferta consolidada antes de estarem disponíveis.

## Princípio visual e uso da cor

O site não deve depender de efeitos exagerados para parecer moderno. A maior parte da interface deve funcionar muito bem com fundo escuro, branco, cinza, tipografia, composição, espaçamento, hierarquia e grid.

Os azuis devem ser usados principalmente para:

- ação e destaque;
- interação e estados ativos;
- pontos de atenção;
- iluminação pontual.

O azul não deve dominar toda a interface. Seu uso deve orientar a atenção e tornar as ações claras, preservando o respiro e a legibilidade.

A paleta não dispensa a verificação de contraste nas combinações efetivamente utilizadas. Cor não deve ser o único recurso para comunicar estados ou informações.

## O que evitar

- Aparência de template genérico de IA ou de agência.
- Excesso de gradientes e glow.
- Cyberpunk exagerado.
- Partículas aleatórias sem propósito.
- Elementos flutuantes sem função.
- Animações em tudo.
- Cards para todo tipo de conteúdo.
- Visual infantil.
- Excesso de bordas arredondadas.
- Excesso de glassmorphism.
- Contraste baixo.
- Interface carregada.

## Logo

Existe uma logo própria de Yago Rafael. Ela deve ser tratada como asset oficial da marca.

Regras de preservação:

- Não redesenhar nem reinterpretar.
- Não modificar geometria, proporções ou cortes.
- Não alterar cores sem autorização.
- Não criar versões alternativas automaticamente.

Quando o arquivo oficial da logo for adicionado ao projeto, ele deve ser utilizado como fonte principal. Este documento não define uma substituição para esse asset.

## Layout e composição

Preferir:

- bastante espaço negativo e grandes áreas de respiro;
- hierarquia tipográfica forte;
- grids organizados;
- composições assimétricas quando fizerem sentido;
- linhas e detalhes sutis;
- seções visualmente distintas sem parecerem desconectadas.

Evitar a estrutura repetitiva “seção → 3 cards → seção → 3 cards → seção → 3 cards”. Cards devem ser utilizados somente quando forem o componente adequado para o conteúdo.

A composição deve apoiar o percurso comercial previsto no brief: impacto → entendimento → confiança → prova → redução de objeções → contato. CTAs devem ser claros, naturais e fáceis de encontrar, sem pressão comercial exagerada.

## Profundidade

A interface pode utilizar profundidade por meio de camadas, iluminação sutil, transforms, perspectiva, sombras controladas, sobreposição e parallax leve.

Não utilizar profundidade apenas como decoração. Cada aplicação deve contribuir para a hierarquia, a compreensão do conteúdo ou o feedback de interação, sem prejudicar a leitura.

## Animações

Toda animação deve possuir propósito. Organizar o movimento em três níveis.

### Microinterações

Aplicar a botões, links, navegação, cards e controles quando ajudarem a comunicar estados e fornecer feedback de interação.

### Entrada de conteúdo

Pode utilizar opacity, pequenos deslocamentos, reveal e stagger moderado. Evitar elementos entrando de todas as direções.

### Experiências especiais

Reservar movimentos mais sofisticados principalmente para o hero, a apresentação de projetos e transições importantes. Esses movimentos devem apoiar o conteúdo e a experiência comercial.

## Performance de animação

- Priorizar transform e opacity quando apropriado.
- Evitar animações que provoquem layout/reflow constantemente.
- Considerar o desempenho em celulares intermediários.
- Respeitar prefers-reduced-motion, reduzindo ou removendo movimentos não essenciais.
- Manter conteúdo, navegação e ações acessíveis quando o movimento for reduzido.

## 3D e recursos técnicos

Não adicionar Three.js, WebGL ou bibliotecas 3D automaticamente.

Primeiro tentar atingir profundidade e interação com CSS transforms, perspective, rotateX, rotateY, pointer tracking, JavaScript vanilla e camadas visuais, conforme a necessidade real.

Bibliotecas 3D só devem ser consideradas quando houver necessidade real e aprovação explícita. Antes de sugerir uma biblioteca, explicar qual problema ela resolve, se é possível fazer sem ela, o impacto em performance e a complexidade adicionada.

A stack principal permanece HTML5, CSS3 e JavaScript vanilla. Frameworks, build tools e outras dependências também exigem aprovação explícita conforme o AGENTS.md.

## Responsividade visual

Desktop, tablet e mobile devem ser tratados como experiências próprias, com composição e interação adequadas ao espaço e à forma de uso.

No mobile:

- reduzir efeitos quando necessário;
- preservar legibilidade;
- evitar sobrecarga visual;
- adaptar a composição;
- manter CTAs acessíveis;
- não simplesmente comprimir o layout desktop.

Informações e ações essenciais devem continuar acessíveis em dispositivos sem hover.

## Tipografia

A tipografia definitiva ainda será escolhida. Até a escolha ser aprovada:

- não assumir uma fonte como definitiva;
- priorizar legibilidade;
- evitar excesso de famílias tipográficas;
- considerar a performance de carregamento.

A hierarquia entre títulos, textos de apoio, corpo e ações deve ser clara. Este documento não fixa família tipográfica, escala de tamanhos ou pesos definitivos.

## Componentes e estados

Botões, links, cards, tags, badges, navegação, indicadores e campos devem seguir uma linguagem visual consistente, respeitando a hierarquia e a função de cada elemento.

Os componentes interativos devem possuir estados claros de hover, focus, active e disabled quando aplicáveis. Elementos estáticos não precisam simular interatividade.

Na implementação:

- utilizar HTML semântico e controles apropriados à ação;
- garantir navegação por teclado e foco visível;
- manter contraste e legibilidade nos estados de interação;
- considerar textos alternativos para imagens conforme sua função;
- não depender apenas de cor, movimento ou hover para transmitir informações essenciais.

## Validação futura

Na implementação, verificar a aplicação destas diretrizes em desktop, tablet e mobile, incluindo legibilidade, contraste, foco, navegação por teclado, interações, overflow, erros de console e comportamento com prefers-reduced-motion.

Usar a skill playwright quando apropriado, conforme o AGENTS.md. Verificações de interface serão realizadas quando houver implementação; este documento não representa testes já executados.

## Decisões pendentes

- Adição do arquivo oficial da logo ao projeto.
- Escolha e aprovação da tipografia definitiva.

Valores de espaçamento, grid, raios, sombras e durações de animação não estão fixados neste documento. Devem ser definidos na etapa de detalhamento visual, respeitando estas diretrizes.

## Objetivo final

O site deve parecer criado especificamente para Yago Rafael. O visitante não deve ter a impressão de estar vendo um template pronto, um layout genérico ou um site automaticamente gerado por IA.

O design deve possuir personalidade própria sem comprometer clareza, conversão ou performance.
