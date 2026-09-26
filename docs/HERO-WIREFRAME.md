# Site Oficial Yago — Wireframe do Hero

Status: direção estrutural e copy aprovadas para planejamento; detalhamento visual pendente.

Este documento complementa AGENTS.md, PROJECT-BRIEF.md, DESIGN-SYSTEM.md, CREATIVE-DIRECTION.md e TYPOGRAPHY.md. Consolida a decisão do Hero sem alterar os documentos existentes, implementar interface ou preparar a imagem final do projeto.

A lógica dominante é Corte Editorial. A base estrutural é a Proposta 3 — Autoria com uma amostra de trabalho: presença pessoal, oferta antes da imagem e projeto real subordinado à mensagem. Incorpora a clareza, a simplicidade e o espaço negativo da Proposta 1, além da explicação concreta da utilidade de um site da Proposta 2.

## 1. Objetivo comercial

Fazer o visitante entender quem é Yago Rafael, quais serviços oferece, para quem trabalha, por que um site bem organizado importa e como iniciar uma conversa.

O público inclui pequenos negócios, profissionais autônomos, prestadores de serviços, negócios locais e micro e pequenas empresas. A mensagem deve ser compreensível sem conhecimento de desenvolvimento.

A oferta atual abrange landing pages, sites institucionais, presença digital para pequenos negócios e desenvolvimento web personalizado dentro das capacidades atuais. A utilidade apresentada é organizar informações, apresentar serviços e facilitar contato. Não prometer resultados comerciais nem apresentar automações, agentes de IA, sistemas complexos ou backend como experiência consolidada. A condição de estudante não é argumento comercial.

## 2. Copy aprovada

**Headline**

> Sites para apresentar seu negócio com clareza e facilitar o contato.

**Subheadline**

> Sou Yago Rafael. Desenvolvo landing pages e sites institucionais para pequenos negócios e profissionais autônomos, com uma apresentação pensada para seus serviços e para quem precisa encontrar as informações certas e falar com você.

**CTA principal**

> Falar sobre meu projeto

**CTA secundário**

> Ver projetos

Esta é a base aprovada. Pequenos ajustes poderão ser avaliados durante a validação visual, preservando sentido, presença pessoal, oferta e público. Não há label adicional obrigatório acima da headline.

O CTA principal conduz ao canal de contato a definir. O secundário conduz à seção de projetos; sua posição exata de chegada deve ser conciliada com o bloco selecionado para evitar repetição.

## 3. Hierarquia de conteúdo

1. Header discreto: assinatura da marca, navegação curta e contato.
2. Headline dominante: oferta e utilidade imediatas.
3. Subheadline menor: apresentação pessoal, serviços e público.
4. CTA principal com maior destaque; CTA secundário próximo e menos intenso.
5. Transição editorial: pausa que separa oferta e amostra de trabalho.
6. Identificação do VS Tattoo Studio e natureza do trabalho.
7. Prévia estática real, em escala generosa e subordinada ao Hero principal.

Barlow Semi Condensed 600 nos títulos. Source Sans 3 400 no apoio e 600 nas ações, com labels e legendas seguindo TYPOGRAPHY.md. As referências anteriores a Sora ou à escolha tipográfica pendente não substituem a direção já aprovada.

Tipografia, composição e espaço negativo sustentam a hierarquia. Não fixar ainda tamanhos, entrelinhas, espaçamentos, larguras ou breakpoints. O conjunto não precisa caber integralmente na primeira tela; oferta e contato devem aparecer cedo, sem altura de tela inteira obrigatória.

## 4. Wireframe textual desktop

```text
[HEADER]
[LOGO]                    [PROJETOS] [SERVIÇOS] [SOBRE] [CONTATO]

[HERO PRINCIPAL]
[HEADLINE DOMINANTE, ALINHADA À ESQUERDA]
[                                            ]

    [SUBHEADLINE EM BLOCO MENOR]              [ESPAÇO NEGATIVO]
    [COM DESLOCAMENTO CONTROLADO]

    [FALAR SOBRE MEU PROJETO]  [VER PROJETOS]

[TRANSIÇÃO EDITORIAL — LINHA COM TERMINAÇÃO DIAGONAL PONTUAL]

[PROJETO SELECIONADO / PORTFÓLIO]
[VS Tattoo Studio]        [PRÉVIA REAL ESTÁTICA                ]
[NATUREZA DO TRABALHO]    [EM ESCALA GENEROSA                  ]
                         [                                   ]

[CONTINUIDADE PARA A SEÇÃO DE PROJETOS]
```

O título ocupa uma faixa ampla. Apoio e ações compartilham um alinhamento interno, sem afastamento que rompa a leitura. A imagem começa depois da oferta e das ações; não ocupa uma coluna concorrente ao lado da headline. Os blocos compartilham referências do grid, com larguras diferentes.

## 5. Wireframe textual tablet

```text
[HEADER]
[LOGO]                       [NAVEGAÇÃO CURTA OU MENU] [CONTATO]

[HERO PRINCIPAL]
[HEADLINE COM QUEBRAS PRÓPRIAS]

  [SUBHEADLINE — RECUO REDUZIDO]
  [FALAR SOBRE MEU PROJETO]  [VER PROJETOS]

[TRANSIÇÃO EDITORIAL]

[PROJETO SELECIONADO / PORTFÓLIO]
[VS Tattoo Studio · NATUREZA DO TRABALHO]
[PRÉVIA REAL ESTÁTICA COM LARGURA CONFORTÁVEL]

[CONTINUIDADE PARA A SEÇÃO DE PROJETOS]
```

Reduzir a área vazia lateral e o deslocamento do apoio. Em orientação vertical, o apoio pode se alinhar ao título e as ações podem se empilhar. A identificação fica acima da imagem para não criar uma coluna estreita. A navegação se adapta ao espaço disponível e ao toque, sem comprimir textos.

## 6. Wireframe textual mobile

```text
[HEADER]
[LOGO]                                  [CONTATO] [MENU]

[HEADLINE]
[SUBHEADLINE]
[FALAR SOBRE MEU PROJETO]
[VER PROJETOS]

[TRANSIÇÃO EDITORIAL]

[PROJETO SELECIONADO / PORTFÓLIO]
[VS Tattoo Studio]
[NATUREZA DO TRABALHO]
[PRÉVIA REAL COM RECORTE PARA TELA VERTICAL]

[CONTINUIDADE PARA A SEÇÃO DE PROJETOS]
```

Uma coluna, sem recuo obrigatório no apoio. Preservar pausas e hierarquia sem grandes vazios artificiais. Não impor as quebras do desktop nem diminuir o texto para forçar encaixe. As ações aparecem antes de qualquer imagem. A prévia deve mostrar um trecho reconhecível, sem reduzir toda a captura desktop a uma miniatura ilegível.

Os três wireframes representam hierarquia e relações entre blocos, não medidas ou quebras finais da copy.

## 7. Header na primeira dobra

Usar a logo oficial de assets/brand/logo-yago.png íntegra, com espaço de proteção e escala de assinatura. A navegação curta tem como base Projetos, Serviços e Sobre, além de Contato; confirmar os destinos no detalhamento.

O contato permanece fácil de localizar, com destaque menor que o CTA principal do Hero. No mobile e em tablets estreitos, agrupar a navegação em menu, preservando acesso direto ao contato.

Manter fundo opaco, contraste e presença compacta e estável durante a rolagem, conforme CREATIVE-DIRECTION.md. Detalhar a fixação sem saltos de tamanho, sobreposição de conteúdo ou ocultação de âncoras e foco. Não usar abertura animada que atrase a página.

## 8. Relação com o VS Tattoo Studio

O projeto é uma amostra real de trabalho na base do Hero e uma ponte para a seção de projetos. Não transformar esse bloco em galeria nem repetir a mesma apresentação integral logo adiante. A continuidade deve ser detalhada sem reorganizar automaticamente as demais seções do site.

Identificação prevista: “Projeto selecionado · Portfólio”, “VS Tattoo Studio” e uma descrição curta da natureza do trabalho. Como base factual, usar “Site para estúdio de tatuagem”; confirmar a classificação específica e a participação de Yago antes de acrescentar atribuições de design, desenvolvimento ou escopo.

A referência disponível é references/projects/vs-tattoo/home-desktop-reference.png. A prévia definitiva será preparada posteriormente a partir de uma captura melhor. Esta etapa não produz nem altera imagens.

- Usar imagem estática, sem mockup de notebook, vídeo, autoplay ou perspectiva exagerada.
- Preservar a identidade original do projeto dentro da imagem; manter legenda, fundo e interface externa na identidade de Yago.
- Não utilizar números ou resultados da captura como prova comercial de Yago, nem atribuir ganhos ao site sem evidência.
- Na futura seleção do enquadramento, evitar destaque às métricas e a controles de player que pareçam interativos.
- Definir recortes próprios para desktop, tablet e mobile, preservando contexto e reconhecimento da interface.
- Não sobrepor a prévia à headline, à subheadline ou aos CTAs.

## 9. Aplicação da geometria

Traduzir a marca em deslocamentos controlados, alinhamentos compartilhados, relações entre planos e intervalos de espaço negativo. Concentrar uma terminação diagonal pontual na transição entre oferta e projeto, sujeita à validação visual.

Não desenhar um Y decorativo, ampliar a logo no fundo, fragmentar o símbolo, repetir diagonais ou inclinar textos. A composição deve continuar reconhecível mesmo sem a diagonal explícita. A geometria organiza a leitura e preserva a logo oficial.

## 10. Uso de cor

| Cor | Aplicação no Hero |
| --- | --- |
| #080A0D | Fundo principal e espaço negativo. |
| #11151B | Apoio sutil à área de projeto, se necessário. |
| #FFFFFF | Headline e informações de maior prioridade. |
| #9CA3AF | Apoio e legendas, mediante verificação de contraste. |
| #1677FF | Ação principal e estados de interação. |
| #38BDF8 | Detalhe secundário opcional, sem competir com o CTA. |

Predominar escuro, branco e cinza. Não aplicar gradiente ao título nem destacar muitas palavras em azul. O dourado do VS Tattoo fica restrito à imagem do projeto; não migra para botões, linhas ou textos de Yago. Preservar as cores da logo. Validar todas as combinações efetivas, inclusive texto sobre botão e foco.

## 11. Movimento

A versão totalmente estática é a base de aprovação visual. Headline, apoio e ações ficam disponíveis imediatamente.

Movimentos opcionais: feedback de botões e links, entrada discreta da prévia por opacidade e pequeno deslocamento, ou detalhe curto da linha de transição. Priorizar transform e opacity quando adequados, sem movimentos contínuos.

Não usar animação letra por letra, introdução obrigatória, scroll preso, carrossel, vídeo de fundo, partículas, esfera 3D ou parallax obrigatório. Nenhum conteúdo pode depender da conclusão de uma animação ou da execução de JavaScript para aparecer. Respeitar prefers-reduced-motion, removendo movimentos não essenciais.

## 12. Acessibilidade

- Planejar uma headline principal semântica e uma sequência de leitura coerente com a ordem visual.
- Manter copy como texto real, com acentos, ampliação e quebras livres de cortes.
- Usar links para navegação e contato; reservar botões a ações como abrir o menu.
- Garantir foco visível, navegação por teclado e áreas de toque confortáveis; nenhum conteúdo depende de hover.
- Planejar menu com identificação clara, estado aberto/fechado e gestão de foco, incluindo fechamento por teclado.
- Prever texto alternativo para a prévia conforme o recorte final e nome acessível para a logo; elementos geométricos decorativos não entram na leitura assistiva.
- Não depender apenas de cor para distinguir ações ou estados.
- Prever contraste, fallback de fontes, redução de movimento e ausência de rolagem horizontal involuntária.

Esses são requisitos para detalhamento e implementação futura, não verificações já concluídas em navegador.

## 13. Riscos

| Risco | Orientação de controle |
| --- | --- |
| Headline e apoio longos afastarem o contato | Validar quebras, largura e ritmo com a copy aprovada, sobretudo no mobile. |
| Projeto competir com a oferta | Manter imagem abaixo das ações e ajustar sua escala e distância. |
| Dourado contaminar a identidade de Yago | Restringir a cor à captura, com identificação externa clara. |
| Captura sugerir resultados ou controles funcionais | Revisar enquadramento e legenda; não usar métricas como prova comercial. |
| Assimetria fragmentar a leitura | Preservar alinhamentos e proximidade entre apoio e ações. |
| Espaço negativo gerar uma abertura longa | Evitar altura obrigatória e vazios excessivos em telas pequenas. |
| Repetição na seção de projetos | Resolver a continuidade e o destino de “Ver projetos” antes da implementação. |
| Imagem e fontes prejudicarem carregamento | Planejar mídia adequada e texto visível; medir na implementação. |

## 14. Decisões pendentes de validação visual

- Escala tipográfica, entrelinhas, quebras, largura dos blocos e pequenos ajustes eventuais de copy.
- Grid, margens, deslocamentos e espaço negativo em desktop, tablet e mobile.
- Proximidade, dimensões, disposição e estados dos CTAs; destino real do contato.
- Escala da logo, navegação, comportamento do menu e fixação do header.
- Desenho e necessidade da terminação diagonal na transição.
- Escala, proporções, recortes e tratamento da futura captura do projeto.
- Descrição precisa da natureza do trabalho e da participação de Yago.
- Continuidade entre o projeto selecionado e a seção de projetos, incluindo destino da âncora e ausência de duplicação.
- Contraste aplicado, legibilidade e comportamento com ampliação e fontes alternativas.
- Necessidade de movimentos opcionais e, se adotados, sua intensidade e duração.

## 15. Critérios para iniciar a implementação

- [ ] Validar a composição estática nas três famílias de tela com a copy real e as fontes aprovadas.
- [ ] Confirmar compreensão imediata de autoria, oferta, público, utilidade e próximo passo.
- [ ] Preservar a prioridade de headline, apoio e contato sobre a imagem.
- [ ] Definir medidas iniciais e regras responsivas sem comprimir o desktop no mobile.
- [ ] Resolver header, menu, destinos de contato e projetos e estados de interação.
- [ ] Confirmar legenda, natureza do trabalho, participação de Yago e continuidade para projetos.
- [ ] Selecionar e aprovar posteriormente a captura e seus recortes, sem métricas usadas como prova comercial.
- [ ] Revisar cores, contraste previsto, ordem semântica, foco, toque e redução de movimento.
- [ ] Confirmar que o Hero mantém identidade e clareza sem animação e sem assets decorativos adicionais.
- [ ] Manter a futura implementação em HTML5, CSS3 e JavaScript vanilla, sem novas dependências não aprovadas.

Esses critérios indicam preparação para implementar; não certificam uma interface pronta. Após a implementação, realizar as verificações de navegador previstas em AGENTS.md: console, overflow, navegação, interações, responsividade e acessibilidade, usando a skill playwright quando apropriado. Avaliar também carregamento de fontes e imagens. Nenhum desses testes foi executado nesta etapa documental.
