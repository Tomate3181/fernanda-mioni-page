# Fernanda Mioni · Lash & Brow

Landing page do estúdio de cílios, sobrancelhas e tricologia da Fernanda Mioni, em Caçapava-SP.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · GSAP · Lenis

## Rodando localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # serve o build localmente
npm run lint      # oxlint
```

## Estrutura

```
src/
  config/site.js        Dados do negócio (endereço, horários, WhatsApp, números da hero)
  data/                 Conteúdo das seções (serviços, FAQ, depoimentos, galeria)
  data/images.js        Gerado automaticamente — imagens otimizadas com srcSet
  components/
    ui/                 Componentes base do design system (Button, Section, Eyebrow…)
    layout/             Header, Footer, botão de voltar ao topo
    sections/           Seções da página, na ordem em que aparecem
    effects/LavaLamp    Fundo animado da hero
  lib/                  Smooth scroll, WhatsApp e hooks utilitários
  index.css             Tokens do design system (@theme) e estilos globais
docs/                   Design system e materiais da marca
scripts/                Script de otimização de imagens
```

## Imagens

As fotos originais (pesadas) ficam em `assets-originais/`, **fora do git**. O site usa
as versões otimizadas em `src/assets/images/`, geradas por:

```bash
npm run images
```

Para trocar ou adicionar uma foto: coloque o original em `assets-originais/`, ajuste a lista
`IMAGES` em `scripts/optimize-images.mjs` e rode o comando. Ele também gera o favicon e a
imagem de compartilhamento (`public/og-image.jpg`).

## Design system

Os tokens (cores, sombras, fontes, easing) ficam no `@theme` de `src/index.css` e viram
classes do Tailwind (`bg-rose-gold`, `text-rose-ink`, `shadow-card`…). Detalhes e regras de
uso em [`docs/design-system.md`](docs/design-system.md).

## Deploy (Vercel)

Importe o repositório na Vercel — o preset Vite é detectado automaticamente
(`vercel.json` já define build, saída e cache dos assets). Depois de configurar o domínio,
atualize `SITE.url` em `src/config/site.js`.
