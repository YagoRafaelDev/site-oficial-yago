# Yago Rafael — Site Oficial

Site profissional de Yago Rafael, com os serviços de criação de sites e landing pages, um projeto real, o processo de trabalho e o contato direto.

## Sobre

Este é o site que apresenta o trabalho de Yago Rafael para pequenos negócios e profissionais autônomos. A página reúne os serviços oferecidos, um case real, como o trabalho acontece do início à entrega, quem está por trás dos projetos e um caminho simples para iniciar uma conversa pelo WhatsApp.

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)

O projeto não usa framework, bundler nem dependências. A única fonte externa é o Google Fonts.

## Principais características

- Layout responsivo, pensado separadamente para desktop, tablet e celular.
- Animações de entrada, microinterações em botões e cards, e efeitos ligados ao mouse e ao scroll.
- Interações de ponteiro apenas em dispositivos com mouse; no toque, a experiência é adaptada.
- Respeito a `prefers-reduced-motion`: movimentos são reduzidos, sem perder o conteúdo nem o retorno visual dos controles.
- HTML semântico, navegação por teclado e foco visível.
- Imagens otimizadas e carregadas sob demanda, com animações baseadas em `transform` e `opacity`.
- O site do VS Tattoo Studio apresentado como case, com capturas reais das versões para computador e celular.

## Estrutura do projeto

```
index.html   Estrutura e conteúdo da página
style.css    Estilos, organizados em seções numeradas na ordem da página
script.js    Animações, interações de ponteiro e scroll, menu e FAQ
assets/
  images/
    brand/               Logo
    projects/vs-tattoo/  Capturas do projeto VS Tattoo Studio
```

## Executando localmente

Basta servir a pasta do projeto com qualquer servidor estático, por exemplo a extensão Live Server do VS Code, e abrir `index.html` no navegador.

## Responsividade e acessibilidade

O site foi revisado em larguras de celular, tablet, notebook e desktop, sem rolagem horizontal. Quando o sistema pede menos movimento (`prefers-reduced-motion`), as animações contínuas e os deslocamentos são desativados, e o conteúdo continua completo e legível.

## Autor

Yago Rafael
