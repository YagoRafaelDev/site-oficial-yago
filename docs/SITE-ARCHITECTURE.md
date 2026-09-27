# Site Oficial Yago — Arquitetura da página principal

Status: arquitetura aprovada para a primeira versão; conteúdo factual e detalhamento visual pendentes conforme indicado neste documento.

Este documento complementa [AGENTS.md](../AGENTS.md), [PROJECT-BRIEF.md](PROJECT-BRIEF.md), [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md), [CREATIVE-DIRECTION.md](CREATIVE-DIRECTION.md), [TYPOGRAPHY.md](TYPOGRAPHY.md) e [HERO-WIREFRAME.md](HERO-WIREFRAME.md).

Consolida a arquitetura revisada: remove a seção independente “Proposta / problema”, integra a prévia do VS Tattoo ao primeiro case e define o lançamento da V1 com exatamente um projeto real: VS Tattoo Studio. A estrutura fica preparada para receber novos cases após o lançamento. Essas decisões atualizam o planejamento inicial registrado nos documentos anteriores, sem alterar seus arquivos.

O escopo é documental. Não define medidas finais, não implementa HTML, CSS ou JavaScript, não cria assets e não autoriza dependências. A aprovação da arquitetura não transforma informações ainda pendentes em afirmações comerciais. A copy aprovada do Hero permanece preservada; os demais textos finais dependem do conteúdo confirmado.

## 1. Jornada comercial

O percurso segue impacto → entendimento → confiança → prova → redução de objeções → contato.

Na página, isso se traduz em: compreender a oferta e a autoria, observar trabalho real, identificar o serviço adequado, entender a contratação, conhecer a pessoa responsável, esclarecer dúvidas e iniciar uma conversa.

A comunicação atende pequenos negócios, profissionais autônomos, prestadores de serviços, negócios locais e micro e pequenas empresas. Não exige conhecimento técnico nem promete resultados comerciais sem evidência.

Cada seção deve responder a uma necessidade do visitante. Não acrescentar blocos apenas para preencher espaço ou aparentar maior experiência.

## 2. Arquitetura final

1. Header
2. Hero
3. Projetos selecionados
4. Serviços
5. Processo
6. Sobre
7. FAQ
8. Contato final
9. Footer

“Proposta / problema” foi removida por redundância: o Hero já explica autoria, oferta, público e utilidade. Não recriar essa seção sob outro nome.

Corte Editorial continua como lógica dominante: espaço negativo, tipografia forte, assimetria controlada, grid, linhas e relações geométricas inspiradas na marca. Os projetos concentram a maior expressão visual; as seções informativas são mais contidas.

Preservar a logo e a paleta aprovadas. Usar Barlow Semi Condensed 600 nos títulos e Source Sans 3 400/600 no corpo e na interface, conforme TYPOGRAPHY.md. As referências antigas a Sora ou à escolha tipográfica pendente não substituem essa decisão.

Desktop, tablet e mobile devem ter composições próprias. No tablet, reduzir deslocamentos e reorganizar colunas conforme a leitura e o toque. No mobile, preservar ordem, pausas e hierarquia em uma coluna, sem comprimir o desktop. Medidas, breakpoints e quebras definitivas ficam para o detalhamento visual.

## 3. Função de cada seção

| Seção | Função comercial | Necessidade do visitante | Intensidade |
| --- | --- | --- | --- |
| Header | Orientar e manter contato acessível. | Encontrar seções e contato. | Discreta. |
| Hero | Apresentar autoria, oferta, público e utilidade. | Entender o que Yago faz e como conversar. | Alta, tipográfica. |
| Projetos selecionados | Mostrar trabalho real e decisões verificáveis. | Avaliar a entrega e a participação de Yago. | Alta, visual. |
| Serviços | Explicar o que pode ser contratado agora. | Reconhecer o formato adequado. | Média, informativa. |
| Processo | Tornar a contratação compreensível. | Saber como começa e onde participa. | Baixa, sequencial. |
| Sobre | Apresentar a pessoa responsável. | Conhecer Yago e sua abordagem. | Média, humana. |
| FAQ | Reduzir dúvidas práticas de contratação. | Esclarecer condições antes do contato. | Baixa, objetiva. |
| Contato final | Oferecer um próximo passo claro. | Saber como iniciar a conversa. | Expressiva e breve. |
| Footer | Reunir identificação e caminhos úteis. | Encontrar navegação e canais reais. | Discreta. |

## 4. Relações entre as seções

### Header e Hero

O Header usa a logo oficial, navegação curta por Projetos, Serviços e Sobre, além de Contato. Mantém presença compacta, estável e opaca durante a rolagem, sem encobrir âncoras ou foco. No mobile e em tablets estreitos, a navegação se agrupa em menu, mantendo contato acessível.

O Hero permanece conforme HERO-WIREFRAME.md: headline dominante, apoio em bloco menor, contato principal, acesso secundário aos projetos e transição editorial para a amostra real.

Copy aprovada:

> Sites para apresentar seu negócio com clareza e facilitar o contato.

> Sou Yago Rafael. Desenvolvo landing pages e sites institucionais para pequenos negócios e profissionais autônomos, com uma apresentação pensada para seus serviços e para quem precisa encontrar as informações certas e falar com você.

CTA principal: “Falar sobre meu projeto”. CTA secundário: “Ver projetos”.

### Hero e Projetos selecionados

A prévia do VS Tattoo na base do Hero é o início do primeiro case. Existe uma única identificação e uma única imagem de abertura, seguidas pelo desenvolvimento do case. Não repetir a apresentação nem criar outra abertura de portfólio logo abaixo.

“Ver projetos” e a navegação “Projetos” chegam ao mesmo ponto: início da seção, junto à identificação do primeiro trabalho e antes da imagem. Oferta e contato continuam antes da prévia. A transição preserva a pausa editorial prevista no Hero.

### Continuidade até o Footer

- Projetos → Serviços: após observar uma entrega, o visitante entende o que pode contratar.
- Serviços → Processo: depois de reconhecer a oferta, entende como o trabalho acontece.
- Processo → Sobre: conhece a pessoa responsável pela condução do projeto.
- Sobre → FAQ: passa da apresentação pessoal às dúvidas práticas restantes.
- FAQ → Contato final: encontra uma ação clara depois de esclarecer objeções.
- Contato final → Footer: o convite termina e permanecem os caminhos funcionais de navegação.

Os CTAs principais ficam no Hero e no Contato final. Serviços oferece uma oportunidade intermediária de contato, com menor intensidade. Ações equivalentes conduzem ao mesmo canal principal, ainda a confirmar. Sobre não precisa repetir o convite comercial.

## 5. Projetos: case único da V1 e expansão futura

### Regra de lançamento

A V1 será lançada com exatamente um case real: VS Tattoo Studio. Essa decisão é definitiva; a quantidade de projetos no lançamento não é uma pendência.

A apresentação do VS Tattoo termina e a página segue diretamente para Serviços, com uma pausa editorial normal. Não reservar coluna, altura, numeração de total ou espaço para projetos futuros.

Após o lançamento, novos cases reais poderão ser acrescentados em sequência vertical, cada um com identificação, imagens e contexto próprios, seguindo o padrão reutilizável abaixo. Não usar uma grade de cards como estrutura principal.

Não criar card vazio, “em breve”, projeto fictício ou placeholder para aparentar um portfólio maior. Projetos futuros não aparecem como elementos visíveis na V1; sua inclusão após o lançamento depende de documentação e preparação visual reais.

### Padrão reutilizável de conteúdo para o case da V1 e futuros cases

- Nome e natureza do trabalho.
- Contexto: para quem e em qual situação foi desenvolvido.
- Necessidade: o que a página precisava comunicar ou permitir.
- Entrega e participação de Yago: o que foi efetivamente realizado.
- Uma ou duas decisões relevantes, ligadas a detalhes observáveis.
- Visual real, legenda e acesso ao site quando houver destino confirmado.

O case deve ser breve. Explicar intenção e execução sem atribuir resultados não medidos. Não inventar clientes, métricas, depoimentos, avaliações ou experiência.

### VS Tattoo Studio e composição

A identificação disponível é “VS Tattoo Studio” e “Site para estúdio de tatuagem”. Classificação específica, contexto, escopo e participação de Yago precisam ser confirmados antes de acrescentar atribuições.

No desktop, preservar a identificação junto da prévia generosa já prevista no Hero. O contexto, a entrega e as decisões continuam abaixo. Um detalhe adicional de interface só entra quando acrescentar informação; não repetir a imagem principal.

Na expansão após o lançamento, variar a composição dos novos cases conforme seu material, mantendo alinhamentos e ordem de leitura. A apresentação do VS Tattoo na V1 deve ser completa por si só.

No tablet, colocar a identificação acima da imagem quando as colunas perderem conforto. No mobile, usar identificação, contexto breve, imagem, entrega, decisão e link em sequência vertical. Legendas ficam fora das imagens.

Usar capturas estáticas reais com recortes adequados a cada tela. Não reduzir uma captura desktop inteira a uma miniatura ilegível. Um recorte vertical de desktop não comprova uma versão mobile.

A referência atual do VS Tattoo contém métricas e controles de player. A captura final deve evitar destaque a esses elementos e não sugerir que são prova comercial de Yago ou controles funcionais do portfólio. Preservar a identidade do projeto dentro da imagem e a identidade de Yago ao redor.

## 6. Estrutura de Serviços

Apresentar dois formatos principais em linguagem acessível:

| Oferta | Conteúdo necessário |
| --- | --- |
| Landing page | Explicar uma página com foco em um serviço, oferta ou campanha, reunindo informações essenciais e caminho de contato. |
| Site institucional | Explicar a apresentação organizada do negócio, de seus serviços e de suas formas de contato. |

“Presença digital para pequenos negócios” expressa a finalidade dessas entregas, sem virar um pacote redundante. Desenvolvimento personalizado aparece como nota sobre avaliação de necessidades específicas dentro das capacidades atuais.

Hierarquia: título da seção → nome e explicação de cada formato → nota sobre necessidades específicas → contato intermediário.

No desktop, usar linhas editoriais com nome e descrição em colunas, separadas por divisórias sutis. No tablet e no mobile, empilhar quando necessário. Não depender de imagens, ícones decorativos, abas ou três cards repetidos.

Não apresentar automações, agentes de IA, backend, banco de dados ou sistemas complexos como oferta consolidada. Não sugerir marketing ou gestão de redes sociais como serviços incluídos.

## 7. Estrutura de Processo

Uma sequência curta deve explicar o caminho da contratação e a participação do cliente:

1. Conversa inicial: conhecer o negócio e a necessidade da página.
2. Definição do projeto: alinhar escopo, materiais, valor e prazo.
3. Criação e revisão: desenvolver e apresentar o trabalho conforme o combinado.
4. Publicação e entrega: revisar os pontos finais e cumprir a entrega acordada.

Essa estrutura não fixa quantidade de revisões, prazos, suporte ou responsabilidades ainda não definidos. Os textos finais devem refletir a prática real de Yago.

No desktop, título lateral e lista vertical. No tablet e no mobile, título acima e sequência contínua. Usar numeração para orientar leitura, sem cards, acordeão ou animação de progresso. Não repetir todas as condições comerciais do FAQ.

## 8. Estrutura de Sobre

Apresentação breve de Yago, com nome, contexto profissional relevante e informação verdadeira sobre sua forma de trabalhar. Acrescentar presença humana à autoria já informada no Hero.

Um retrato real pode acompanhar o texto. No desktop, retrato e apresentação dividem a composição; no tablet, reorganizar conforme a leitura; no mobile, usar título, retrato e texto em sequência. Sem retrato disponível, a composição tipográfica deve continuar completa.

Não substituir a pessoa por imagem gerada ou fotografia de equipe. Não criar autobiografia extensa, barras de habilidades, currículo técnico ou lista de adjetivos genéricos. A condição de estudante não é argumento comercial.

Se o conteúdo apenas repetir o Hero, reduzir a apresentação. Não acrescentar outro CTA de orçamento neste bloco.

## 9. Estrutura de FAQ

Responder dúvidas reais que ainda possam impedir o contato. A base de conteúdo cobre:

- Preço: o que precisa ser conhecido para definir o orçamento.
- Prazo: como é combinado e de quais materiais ou decisões depende.
- Textos, fotos e logo: o que o cliente fornece e qual apoio está disponível.
- Domínio e hospedagem: o que são, quem contrata e quais custos estão incluídos.
- Alterações após a publicação: como são solicitadas e o que foi contratado.

As respostas dependem de condições comerciais confirmadas. Não inventar preços, intervalos de entrega, manutenção, suporte contínuo ou edição autônoma pelo cliente. Não publicar respostas vazias que apenas repitam “entre em contato”.

Usar perguntas objetivas e respostas curtas. Não existe quantidade obrigatória: cada pergunta precisa acrescentar informação e reduzir uma dúvida relevante.

No desktop, título em coluna menor e perguntas na área principal. No tablet e no mobile, título acima quando necessário. Acordeão simples, com mais de uma resposta aberta permitida, estados claros e operação por teclado; nenhuma resposta depende da conclusão de uma animação.

## 10. Estrutura do Contato final

Encerrar com um convite direto para conversar sobre o site, orientação breve sobre o que informar e uma ação principal clara. Explicar que a pessoa não precisa conhecer o formato técnico antes de iniciar a conversa.

Hierarquia: título → apoio curto → “Falar sobre meu projeto” → identificação do canal e alternativa discreta, se houver.

O canal principal e o destino real permanecem pendentes. Se for WhatsApp, identificar esse destino. Não presumir formulário ou acrescentar vários canais com o mesmo destaque.

No desktop, retomar presença tipográfica e espaço negativo sem superar o Hero. No tablet, aproximar os elementos. No mobile, manter título, apoio e ação em sequência, sem imagem antes do contato.

Não usar urgência artificial, promessa de resultado ou prazo de resposta não estabelecido.

## 11. Estrutura do Footer

Reunir logo oficial, identificação de Yago Rafael, navegação útil, contato confirmado e perfis reais pertinentes, se existirem.

Hierarquia: identificação → navegação e contato → informações secundárias. Não precisa de headline comercial, novo slogan ou outro botão dominante.

No desktop, organizar grupos com separação sutil da seção anterior. No tablet, redistribuir sem comprimir links. No mobile, empilhar identificação, contato, navegação e informações finais. O retorno ao início pode integrar a navegação.

Preservar a logo disponível. Não reconstruir o lettering da prancha nem criar variações. Não publicar links vazios, redes inexistentes ou informações institucionais inventadas.

## 12. Wireframe textual desktop

Os blocos representam ordem, hierarquia e ritmo da V1, sem medidas ou quebras definitivas. O fluxo mostra somente o VS Tattoo e segue diretamente para Serviços.

```text
[HEADER — discreto, opaco e estável]
[LOGO]                         [PROJETOS] [SERVIÇOS] [SOBRE] [CONTATO]

[HERO — intensidade tipográfica alta]
[HEADLINE APROVADA, ALINHADA À ESQUERDA]

    [SUBHEADLINE APROVADA EM BLOCO MENOR]       [ESPAÇO NEGATIVO]
    [FALAR SOBRE MEU PROJETO]  [VER PROJETOS]

[PAUSA / TRANSIÇÃO EDITORIAL PREVISTA NO HERO]

[PROJETOS — destino da navegação e do CTA secundário]
[VS Tattoo Studio]              [PRÉVIA REAL GENEROSA]
[Site para estúdio de tatuagem] [A MESMA AMOSTRA DA BASE DO HERO]

    [Contexto e necessidade]    [Entrega e participação de Yago]
    [Decisão relevante]        [Detalhe visual, se necessário]
    [ACESSO AO SITE, se confirmado]

[PAUSA / REDUÇÃO DA INTENSIDADE VISUAL]

[SERVIÇOS]
[Título da seção]
[Landing page]                 [Situação de uso e explicação]
[Divisória sutil]
[Site institucional]           [Situação de uso e explicação]
    [Nota sobre necessidades específicas]
    [CONTATO — intensidade intermediária]

[PROCESSO]
[Título]                       [01 — Conversa inicial]
                               [02 — Definição do projeto]
                               [03 — Criação e revisão]
                               [04 — Publicação e entrega]

[PAUSA HUMANA / SOBRE]
[RETRATO REAL, se disponível]   [Nome e apresentação breve]
                               [Informação verdadeira sobre a abordagem]

[FAQ — intensidade baixa]
[Título]                       [Pergunta + resposta expansível]
                               [Demais dúvidas relevantes]

[PAUSA PARA O ENCERRAMENTO]
[CONTATO FINAL — expressivo e breve]
[Convite para conversar sobre o site]
    [Orientação curta]
    [FALAR SOBRE MEU PROJETO]
    [Canal identificado / alternativa discreta, se houver]

[FOOTER — intensidade mínima]
[LOGO / IDENTIFICAÇÃO]         [NAVEGAÇÃO]        [CONTATOS REAIS]
```

O ritmo alterna texto forte, trabalho visual, informação organizada, presença humana, dúvidas e convite. Não depende de efeitos ou de trocar o fundo a cada seção.

## 13. Wireframe textual mobile

```text
[HEADER COMPACTO]
[LOGO]                                  [CONTATO] [MENU]

[HERO]
[HEADLINE APROVADA — quebras próprias do mobile]
[SUBHEADLINE APROVADA]
[FALAR SOBRE MEU PROJETO]
[VER PROJETOS]

[PAUSA / TRANSIÇÃO EDITORIAL]

[PROJETOS — destino da âncora]
[VS Tattoo Studio]
[Site para estúdio de tatuagem]
[Contexto breve confirmado]
[PRÉVIA REAL COM RECORTE ADEQUADO]
[A MESMA AMOSTRA DA BASE DO HERO]
[Entrega e participação de Yago]
[Decisão relevante]
[Detalhe visual e legenda, se necessários]
[ACESSO AO SITE, se confirmado]

[PAUSA / RETORNO AO TEXTO]
[SERVIÇOS]
[Título]
[Landing page / explicação]
[Divisória]
[Site institucional / explicação]
[Nota sobre necessidades específicas]
[CONTATO INTERMEDIÁRIO]

[PROCESSO]
[Título]
[01 — Conversa inicial / explicação curta]
[02 — Definição do projeto / explicação curta]
[03 — Criação e revisão / explicação curta]
[04 — Publicação e entrega / explicação curta]

[SOBRE]
[Nome]
[RETRATO REAL, se disponível]
[Apresentação breve e informação relevante]

[FAQ]
[Título]
[Pergunta / resposta quando aberta]
[Demais dúvidas relevantes]

[PAUSA PARA O CONTATO]
[CONTATO FINAL]
[Convite para conversar sobre o site]
[Orientação curta]
[FALAR SOBRE MEU PROJETO]
[Canal identificado / alternativa discreta, se houver]

[FOOTER]
[LOGO / IDENTIFICAÇÃO]
[CONTATO]
[NAVEGAÇÃO]
[PERFIS REAIS, se pertinentes / INFORMAÇÕES FINAIS]
```

Na V1, não reservar espaço para projetos futuros. Preservar imagens legíveis, legendas externas, pausas proporcionais e contato antes da primeira imagem. Não usar rolagem horizontal de projetos ou reduzir textos para reproduzir o desktop.

## 14. Assets e conteúdo necessários

| Material | Situação e finalidade |
| --- | --- |
| assets/brand/logo-yago.png | Disponível; assinatura oficial no Header e no Footer. |
| references/brand/brand-board-yago.png | Referência de identidade; suas aplicações não são prova de trabalho. |
| references/projects/vs-tattoo/home-desktop-reference.png | Referência disponível; a captura final e os recortes ainda precisam ser preparados. |
| Capturas finais do VS Tattoo | Pendentes; imagem principal e detalhes somente quando acrescentarem informação. |
| Captura mobile real do projeto | Não documentada no material disponível; necessária se for apresentada como demonstração de versão mobile. |
| Informações do VS Tattoo | Confirmar contexto, natureza, escopo, participação, situação e eventual URL. |
| Projetos futuros | Expansão após o lançamento; só entram quando existirem, com documentação e imagens reais suficientes. Não integram a V1. |
| Retrato de Yago | Opcional; ausência não impede composição completa de Sobre. |
| Fontes aprovadas e licenças | Obtenção e preparação futuras, conforme TYPOGRAPHY.md. |
| Contatos e perfis | Confirmar destinos reais antes de publicar ações e links. |

Não são necessários assets decorativos para preencher as seções informativas. Nenhum asset é criado por este documento.

## 15. Riscos e critérios de controle

| Risco | Controle |
| --- | --- |
| Repetição da proposta | Manter a utilidade no Hero e esclarecimentos específicos em Serviços ou FAQ. |
| VS Tattoo apresentado duas vezes | Uma única abertura visual, continuada pelo conteúdo do case. |
| Composição parecer incompleta com um projeto | Fluxo direto para Serviços, sem lacuna, total artificial ou bloco de segundo projeto. |
| Case sem fatos suficientes | Confirmar participação e escopo; adaptar o conteúdo ao material real. |
| Cases longos ou superproduzidos | Poucas decisões relevantes, imagens legíveis e efeitos subordinados. |
| Métricas ou player da captura induzirem interpretação errada | Rever enquadramento e legenda; não usar como prova de resultados ou controle interativo. |
| Serviços prometerem capacidade inexistente | Explicar ofertas atuais e avaliar pedidos personalizados dentro das capacidades reais. |
| Processo e FAQ assumirem condições comerciais indefinidas | Confirmar responsabilidades e condições antes de finalizar os textos. |
| Sobre repetir o Hero | Acrescentar presença humana e informação verdadeira; manter breve. |
| Assimetria, tipografia ou header dificultarem acesso | Validar ordem, contraste, ampliação, foco, toque e destinos de âncoras. |
| Imagens e movimento prejudicarem desempenho | Priorizar composição estática, mídia adequada e redução de movimento. |

Conteúdo e ações não podem depender de hover ou da conclusão de animações. A futura interface deve preservar semântica, navegação por teclado, foco visível, textos alternativos e prefers-reduced-motion.

## 16. Pendências antes da implementação

Decisão já tomada: a V1 será lançada com um único case real, VS Tattoo Studio. Novos cases são uma possibilidade de expansão após o lançamento.

- Confirmar conteúdo factual, participação de Yago, situação e possibilidade de exposição do VS Tattoo.
- Preparar e aprovar sua captura final e os recortes adequados.
- Confirmar o canal principal, destinos dos CTAs e eventuais contatos alternativos.
- Definir materiais fornecidos pelo cliente, revisões, aprovações, publicação, domínio, hospedagem e alterações posteriores.
- Finalizar os textos de Serviços, Processo, Sobre, FAQ e Contato com base nos fatos e nas condições confirmadas.
- Definir o uso de retrato real ou composição tipográfica em Sobre.
- Validar a composição estática em desktop, tablet e mobile com a copy real e as fontes aprovadas, considerando o único case da V1: VS Tattoo Studio.
- Detalhar posteriormente medidas iniciais, regras responsivas, menu, fixação do Header, estados de interação, contraste e recortes, sem alterar a arquitetura aprovada.
- Preparar os arquivos e licenças das fontes conforme TYPOGRAPHY.md.

Pendência futura, fora do escopo da V1: preparar a documentação e os assets de novos projetos quando existirem, para eventual inclusão após o lançamento.

A continuidade Hero → primeiro case e o destino conceitual de “Ver projetos” estão definidos neste documento; resta detalhar sua apresentação e comportamento. A logo oficial já está disponível e as famílias tipográficas já estão aprovadas.

Esta consolidação não certifica uma interface pronta. Após a implementação, realizar as verificações de navegador previstas em AGENTS.md: console, overflow, navegação, interações, responsividade e acessibilidade, com a skill playwright quando apropriado. Avaliar também carregamento de fontes e imagens. Nenhum desses testes de interface foi executado nesta etapa documental.
