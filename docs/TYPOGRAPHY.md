# Site Oficial Yago — Tipografia

Status: direção tipográfica aprovada para a primeira versão.

Este documento complementa [PROJECT-BRIEF.md](PROJECT-BRIEF.md), [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md), [CREATIVE-DIRECTION.md](CREATIVE-DIRECTION.md) e [AGENTS.md](../AGENTS.md). Registra a escolha de famílias e pesos anteriormente tratada como pendente nos documentos de design. Escala, entrelinhas, espaçamento entre letras e medidas dos blocos continuam em aberto para validação visual.

O escopo é documental: não inclui download de fontes, criação de assets, implementação ou autorização de dependências.

## 1. Famílias aprovadas

- **Barlow Semi Condensed:** hero e headings.
- **Source Sans 3:** corpo, apoio, botões, labels e legendas.

A combinação foi aprovada pela coerência com Corte Editorial, pelo contraste entre títulos e conteúdo, pela personalidade maior que uma única sans geométrica e pela leitura acessível ao público não técnico. O impacto deve vir de tipografia e composição, sem depender de efeitos excessivos.

Sora permanece como referência da prancha de identidade, sem integrar a configuração tipográfica aprovada do site. A escolha não altera a logo oficial nem autoriza reconstruir seu lettering.

## 2. Papéis de cada família

| Papel | Família | Peso inicial |
| --- | --- | --- |
| Chamada principal do hero | Barlow Semi Condensed | 600 |
| Títulos de seções e demais headings | Barlow Semi Condensed | 600 |
| Corpo, parágrafos e textos de apoio | Source Sans 3 | 400 |
| Ênfases pontuais no conteúdo | Source Sans 3 | 600 |
| Botões e ações de navegação | Source Sans 3 | 600 |
| Labels | Source Sans 3 | 400 ou 600, conforme hierarquia |
| Legendas e anotações de projetos | Source Sans 3 | 400; 600 apenas para destaque pontual |

A função do conteúdo determina a família. Um texto de apoio não deve receber Barlow apenas por estar dentro do hero. Hierarquia semântica e aparência visual devem permanecer coerentes.

## 3. Pesos inicialmente aprovados

- Barlow Semi Condensed 600 — Semibold.
- Source Sans 3 400 — Regular.
- Source Sans 3 600 — Semibold.

Essa é a configuração inicial completa. Outros pesos, itálicos ou famílias exigem uma decisão posterior; não devem ser acrescentados preventivamente. Não simular pesos ou inclinações ausentes nas fontes aprovadas.

## 4. Regras de uso

- Reservar Barlow Semi Condensed aos títulos; não usá-la em textos longos.
- Preferir maiúsculas e minúsculas naturais. Caixa alta deve ser pontual e justificada pela função do texto.
- Evitar aparência de pôster, títulos excessivamente densos e pesos visualmente pesados.
- Criar hierarquia por escala, espaço, largura dos blocos e posição, sem depender apenas de peso ou cor.
- Manter títulos comerciais claros e parágrafos confortáveis para quem não conhece desenvolvimento.
- Preservar proporções das letras; não comprimir ou esticar a fonte artificialmente.
- Evitar espaçamento extremo entre letras, entrelinhas que cortem acentos e quebras que prejudiquem o sentido.
- Manter texto real e acessível na futura interface, sem convertê-lo em imagem para controlar a composição.
- Não animar letras individualmente no hero. Leitura e ações devem estar disponíveis sem esperar por movimento.

## 5. Desktop, tablet e mobile

No desktop, explorar títulos expressivos, alinhamentos consistentes, espaço negativo e assimetria controlada. Limitar a largura dos parágrafos para evitar linhas cansativas; não estender o texto apenas para preencher o grid.

No tablet, revisar larguras, quebras e proximidade entre blocos como uma composição própria, inclusive em uso por toque.

No mobile, preservar a diferença entre título e corpo, reorganizando os blocos em sequência clara. Ajustar escala, entrelinha e margens ao espaço disponível, sem simplesmente reduzir o desktop. Não diminuir texto para forçar uma chamada em uma linha nem condensar o corpo.

As quebras do desktop não devem ser impostas ao mobile. Títulos, botões e labels devem acomodar português, ampliação de texto e fallback sem cortes, sobreposições ou rolagem horizontal involuntária. Oferta e contato precisam aparecer cedo, sem altura de tela inteira obrigatória.

## 6. Cuidados com a identidade autoral

O caráter autoral deve surgir da composição, do espaço e da hierarquia, relacionados à geometria da marca. Evitar repetir um tratamento de título gigante em todas as seções.

Não reproduzir a estética do projeto de tatuagem apresentado no portfólio. Também evitar fórmulas genéricas de SaaS ou agência: excesso de palavras destacadas em azul, gradientes no texto, labels muito espaçados e uma terceira fonte monoespaçada usada apenas para sugerir tecnologia.

Alternar intensidade entre hero, projetos e conteúdo informativo. A tipografia deve tornar a oferta compreensível e funcionar com os efeitos desativados.

## 7. Estratégia futura de carregamento

- Preferir WOFF2 hospedado no próprio site, sem instalar bibliotecas ou ferramentas apenas para carregar fontes.
- Usar como ponto de partida três arquivos estáticos correspondentes aos pesos aprovados.
- Avaliar fonte variável somente se a medição demonstrar benefício para os mesmos usos; menos arquivos não garante menor transferência.
- Carregar apenas famílias, pesos e estilos necessários. Preservar caracteres do português, pontuação e símbolos usados no conteúdo ao selecionar subconjuntos.
- Planejar texto visível durante o carregamento, inicialmente com a estratégia `font-display: swap`, avaliando mudanças de layout na implementação.
- Considerar preload apenas para arquivos críticos ao conteúdo inicial, após medir seu benefício; não antecipar todos automaticamente.
- Medir tamanho transferido, requisições, cache e comportamento em conexão lenta. Ajustar métricas do fallback se necessário.

Não há tamanho de arquivo ou ganho de performance confirmado nesta etapa. Nenhuma fonte foi baixada.

## 8. Origem e licenças

As fontes consultadas são distribuídas sob SIL Open Font License 1.1:

- [Barlow — projeto oficial de Jeremy Tribby](https://github.com/jpt/barlow).
- [Source Sans 3 — projeto oficial da Adobe, de Paul D. Hunt](https://github.com/adobe-fonts/source-sans).

Quando os arquivos forem obtidos, conferir a versão e a licença que acompanham a distribuição escolhida. Manter os arquivos de licença e avisos de copyright junto às respectivas fontes no repositório e na distribuição aplicável. Registrar a origem para permitir manutenção e atualização; otimizações futuras devem respeitar os termos da licença.

## 9. Fallback provisório

| Uso | Sequência proposta |
| --- | --- |
| Hero e headings | Barlow Semi Condensed → Arial → sans-serif |
| Corpo e interface | Source Sans 3 → Arial → sans-serif |

Arial e a família genérica são alternativas provisórias de disponibilidade e leitura, sem download adicional. Não possuem equivalência métrica garantida com as famílias aprovadas, especialmente com Barlow Semi Condensed. A aparência e a correspondência do peso 600 podem variar por sistema.

O layout deve aceitar mudanças de largura e quebra durante o carregamento ou quando a fonte falhar. Não deformar o fallback para imitar condensação; sua escolha e eventuais ajustes de métricas serão revistos após avaliação em navegador.

## 10. Critérios pendentes de validação

Durante o wireframe e seu refinamento tipográfico:

- [ ] Testar a copy real do hero, headings, parágrafos, botões, labels e legendas.
- [ ] Definir escala, entrelinhas, espaçamento entre letras e largura dos blocos.
- [ ] Confirmar contraste de personalidade entre as famílias sem aparência de pôster.
- [ ] Verificar se Barlow 600 oferece presença suficiente sem agressividade visual.
- [ ] Avaliar legibilidade de Source Sans 3 400 e 600 sobre a paleta aprovada, inclusive em textos pequenos.
- [ ] Conferir acentos, cedilha, números e pontuação, incluindo maiúsculas: Á, À, Â, Ã, É, Ê, Í, Ó, Ô, Õ, Ú e Ç.
- [ ] Revisar quebras, ritmo e ordem de leitura em desktop, tablet e mobile.
- [ ] Confirmar que títulos não afastam excessivamente a oferta e os CTAs no mobile.
- [ ] Verificar se a composição mantém identidade com movimento desativado.

Na futura implementação, complementar com testes de zoom e ampliação de texto, fallback, falha e demora de carregamento, overflow, contraste e estabilidade do layout. Usar validação em navegador com a skill playwright quando apropriado, conforme AGENTS.md.

Esses critérios ainda não foram testados. Famílias e pesos estão aprovados; sua aplicação visual e o carregamento permanecem sujeitos à validação nas etapas correspondentes.
