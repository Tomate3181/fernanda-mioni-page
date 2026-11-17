# Guia de Design System & Identidade Visual

**Projeto:** `fernanda-mioni-page`

**Stack Visual:** React + Tailwind CSS v4 (com @theme customizado)

**Direção Criativa:** Design moderno, elegante, responsivo e focado em alta legibilidade.

> **Status (nov/2026):** os tokens e componentes abaixo estão implementados no código.
> Fonte da verdade dos valores: `@theme` em `src/index.css`. Componentes base: `src/components/ui/`.

## 0. Como usar no código

**Regra de ouro:** nada de cor, sombra ou gradiente escrito à mão em `style={{}}`. Use os tokens como classes Tailwind.

| Em vez de… | Use |
|---|---|
| `style={{ color: '#D88A9A' }}` em texto pequeno | `text-rose-ink` (contraste AA) |
| `linear-gradient(135deg, #D88A9A, #c47485)` | `bg-rose-gradient` |
| texto com gradiente | `text-rose-gradient` |
| `backdropFilter: 'blur(12px)'` + fundo branco translúcido | `glass` |
| `boxShadow: '0 4px 20px rgba(45,40,42,0.06)'` | `shadow-card` (hover: `shadow-card-hover`) |
| `fontFamily: 'var(--font-display)'` | `font-display` |

**Componentes base** (`import { … } from '@/components/ui'`):

- `Section` — seção com fundo (`tone="white" | "soft" | "cream"`), espaçamento e container.
- `SectionHeading` — etiqueta + título H2 + descrição (`align="center" | "left"`).
- `Eyebrow` — a etiqueta "✦ …" acima dos títulos.
- `Button` — `variant="primary" | "secondary" | "outline" | "neutral" | "dark"`, `size="sm" | "md" | "lg"`; com `href` vira link (externo abre em nova aba).
- `ResponsiveImage` — imagem com `srcSet`, dimensões e lazy loading; recebe objetos de `src/data/images.js`.
- `Container` — largura máxima e respiro lateral.

**Contraste:** o rose-gold `#D88A9A` tem contraste 2.6:1 sobre branco — use-o em ícones, bordas e fundos.
Para **texto**, use `rose-ink` `#A85468` (5:1).

---

## 1. Princípios de Design & Identidade

- **Elegância Minimalista:** Layouts limpos, amplo uso de whitespace e hierarquia clara para transmitir profissionalismo e sofisticação.
- **Fluidez e Responsividade:** Componentes projetados sob filosofia Mobile-First, com transições suaves GSAP e adaptação perfeita em qualquer tela.
- **Acessibilidade (WCAG 2.1 AA):** Contraste rigoroso entre texto e fundo, suporte visual para navegação por teclado e estados focais nítidos.
- **Glassmorphism:** Uso consistente de `backdrop-filter: blur()` em elementos sobrepostos (header, badges, cards flutuantes).
- **Gradientes Sutis:** Botões e elementos de destaque usam gradientes lineares com a cor rose-gold como base.

---

## 2. Paleta de Cores (Color Tokens)

**Tokens de Cor & Mapeamento no Tailwind v4**

| Token no `@theme` | Valor Hex | Variável CSS | Aplicação Prática |
|-------------------|-----------|--------------|-------------------|
| `--color-rose-gold` | `#D88A9A` | `var(--color-rose-gold)` | CTAs principais, ícones ativos, borders de destaque |
| `--color-rose-gold-light` | `#EDB5C0` | `var(--color-rose-gold-light)` | Estados de hover, brilhos sutis |
| `--color-rose-gold-dark` | `#C47485` | `var(--color-rose-gold-dark)` | Segunda cor em gradientes |
| `--color-rose-ink` | `#A85468` | `var(--color-rose-ink)` | **Texto** rosa (etiquetas, links, destaques) — contraste AA |
| `--color-blush` | `#FAF0F3` | `var(--color-blush)` | Fundo da hero, ícones em círculo |
| `--color-champagne` | `#E2CFB4` | `var(--color-champagne)` | Borders delicadas, backgrounds de seções |
| `--color-champagne-light` | `#F0E8D8` | `var(--color-champagne-light)` | Cards de serviços, badges secundárias |
| `--color-charcoal` | `#2D282A` | `var(--color-charcoal)` | Cor base do corpo do texto, títulos |
| `--color-muted-gray` | `#6E6769` | `var(--color-muted-gray)` | Subtítulos, descrições secundárias |
| `--color-bg-soft` | `#FDFBF9` | `var(--color-bg-soft)` | Fundo alternado entre seções |
| `--color-bg-cream` | `#F8F3EE` | `var(--color-bg-cream)` | Background de imagens, áreas destacadas |
| `--color-footer` | `#1A1714` | `var(--color-footer)` | Background do rodapé |
| `White` | `#FFFFFF` | — | Fundo base cards, superfícies |

**Cores com Opacidade (rgba)**

| Valor | Usado em |
|-------|----------|
| `rgba(216,138,154,0.07)` | Background de badges |
| `rgba(216,138,154,0.2)` | Border de badges |
| `rgba(255,255,255,0.88)` | Header scrolled |
| `rgba(255,255,255,0.60)` | Header inicial |
| `rgba(45,40,42,0.06)` | Sombras de cards |
| `rgba(226,207,180,0.3)` | Borders de cards |

---

## 3. Tipografia

**Tipografia & Hierarquia Textual**

- **`font-display` (Cormorant Garamond):** Serifada clássica e elegante. Títulos do Hero (H1), chamadas de seções (H2), nomes dos procedimentos.
- **`font-body` (Plus Jakarta Sans):** Sans-serif moderna e legível. Textos corridos, parágrafos, botões, navegação e itens do menu.

**Configuração no Tailwind v4 (`index.css`)**

```css
@theme {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

**Hierarquia de Tamanhos**

| Nível | Família | Peso | Tamanho (Clamp) | Aplicação |
|-------|---------|------|-----------------|-----------|
| **Hero Display (H1)** | `font-display` | 700 | `clamp(3rem, 7vw, 5.5rem)` | Título principal da Hero Section |
| **Título de Seção (H2)** | `font-display` | 500 | `text-4xl sm:text-5xl` | "Nossos Serviços", "Sobre Mim" |
| **Título de Card (H3)** | `font-display` | 500 | `text-lg sm:text-xl` | Nomes dos estilos de cílios |
| **Texto Corrido (Body)** | `font-body` | 400 | `text-base` | Descrições de serviços |
| **Subtexto / Legenda** | `font-body` | 400 | `text-xs sm:text-sm` | Horários, detalhes, FAQ |
| **Badges / Tags** | `font-body` | 500-600 | `text-[10px]` | Labels categorizadas |
| **Botões** | `font-body` | 600-700 | `text-sm` | CTAs do WhatsApp |

**Letter Spacing**

| Contexto | Valor |
|----------|-------|
| Badges | `tracking-[0.18em]` a `tracking-[0.2em]` |
| Labels pequenas | `tracking-widest` |
| Nomes (logo) | `tracking-[0.12em]` |

---

## 4. Espaçamento, Grid e Layout

**Container**

```jsx
max-w-7xl mx-auto px-6
```

- **Max-width:** `1280px` (7xl = Tailwind)
- **Padding horizontal:** `px-6` (24px mobile), `sm:px-6`, `lg:px-8` (desktop)

**Grid de Seções**

- **Serviços:** `grid sm:grid-cols-2 lg:grid-cols-4 gap-5`
- **Features:** `grid md:grid-cols-3 gap-6`
- **Sobre:** `grid md:grid-cols-2 gap-16 md:gap-24`
- **Footer:** `grid md:grid-cols-3 gap-12`

**Espaçamento Vertical de Seções**

```jsx
// Sections com background alternado
py-20 md:py-32     // Services, Features, Testimonials (bg-soft)
py-20 md:py-28     // Features (alternativo)
py-20 md:py-32     // About, Testimonials (bg-white)
```

---

## 5. Efeitos Visuais

### Glassmorphism

O projeto usa extensivamente o padrão glassmorphism:

```jsx
backdropFilter: 'blur(16px)'
background: 'rgba(255,255,255,0.88)'  // Header scrolled
background: 'rgba(255,255,255,0.60)'  // Header inicial
background: 'rgba(255,255,255,0.85)'  // Floating cards
```

### Sombras (Box Shadow)

Todas as sombras são inline (não classes Tailwind):

| Elemento | Valor |
|----------|-------|
| Cards (resting) | `0 4px 20px rgba(45,40,42,0.06)` |
| Cards (hover) | `-translate-y-1.5` com transição |
| Header scrolled | `0 2px 32px rgba(45,40,42,0.06)` |
| Botões CTA | `0 10px 32px rgba(196,96,110,0.45), 0 2px 8px rgba(216,138,154,0.3)` |
| Botões hover | `hover:shadow-lg` |
| Floating cards | `0 8px 32px rgba(45,40,42,0.10)` |
| Photos | `0 24px 64px rgba(45,40,42,0.15)` |

### Gradientes

**Botões Primários (CTA)**

```jsx
background: 'linear-gradient(135deg, #D88A9A 0%, #c47485 100%)'
```

**Badge/Hero text highlight**

```jsx
background: 'linear-gradient(135deg, #c47485 0%, #D88A9A 50%, #e8a8b8 100%)'
backgroundClip: 'text'  // Para texto com gradiente
```

**Glow atrás da imagem Hero**

```jsx
background: 'radial-gradient(ellipse at 50% 80%, rgba(216,138,154,0.35) 0%, transparent 70%)'
filter: 'blur(32px)'
```

---

## 6. Biblioteca de Componentes UI

### Header (Fixed)

- **Estrutura:** `fixed top-0 left-0 right-0 z-50`
- **Background:** Glassmorphism com blur 16px
- **Scrolled state:** Adiciona border-bottom e shadow
- **Logo:** SVG com escala 2x
- **Navegação:** Links em `text-[#7A7375]`, hover em `text-[#2D282A]`

### Botão Primário (CTA WhatsApp)

```jsx
// Estrutura
flex items-center gap-2 px-5 py-2 rounded-full

// Estilo (gradiente rose-gold)
background: 'linear-gradient(135deg, #D88A9A 0%, #c47485 100%)'
boxShadow: '0 4px 16px rgba(216,138,154,0.3)'
color: 'white'
font-weight: 600

// Estados
hover: opacity-90 hover:shadow-lg
```

### Botão Secundário (Outline)

```jsx
// Estrutura
flex items-center gap-2 px-7 py-4 rounded-full

// Estilo (glassmorphism)
background: 'rgba(255,255,255,0.70)'
backdropFilter: 'blur(12px)'
border: '1.5px solid rgba(216,138,154,0.5)'
color: '#c4606e'  // Rose-gold escuro

// Estados
hover: -translate-y-0.5
```

### Cards de Conteúdo (Serviços)

```jsx
// Estrutura
bg-white rounded-2xl overflow-hidden

// Estilo
boxShadow: '0 4px 20px rgba(45,40,42,0.06)'
border: '1px solid rgba(226,207,180,0.25)'

// Interação
transition-all duration-400
hover: -translate-y-1.5
```

### Badges / Tags

```jsx
// Badge principal (catálogo)
inline-flex items-center gap-2
px-3 py-1.5 rounded-full
text-[10px] font-medium tracking-[0.18em] uppercase
background: 'rgba(216,138,154,0.07)'
border: '1px solid rgba(216,138,154,0.2)'
color: '#D88A9A'

// Tag secundária (sobre)
px-3 py-1.5 rounded-full
text-xs font-medium
background: '#FDFBF9'
border: '1px solid rgba(226,207,180,0.5)'
color: '#7A7375'
```

### Tabs (Serviços)

```jsx
// Container
inline-flex p-1 rounded-full gap-1
background: 'rgba(226,207,180,0.2)'
border: '1px solid rgba(226,207,180,0.4)'

// Tab inativa
px-5 py-2.5 rounded-full
text-xs font-medium tracking-wide
color: '#7A7375'

// Tab ativa
background: 'linear-gradient(135deg, #D88A9A, #c47485)'
color: 'white'
boxShadow: '0 4px 12px rgba(216,138,154,0.35)'
```

### Floating Cards

```jsx
// Estrutura
rounded-2xl px-4 py-3.5

// Estilo (glassmorphism)
background: 'rgba(255,255,255,0.85)'
backdropFilter: 'blur(20px)'
border: '1px solid rgba(226,207,180,0.5)'
boxShadow: '0 8px 32px rgba(45,40,42,0.10)'
```

### Input / Campos (não implementado atualmente)

- Segue padrão: `rounded-lg`, border `rgba(226,207,180,0.3)`

---

## 7. Animações (GSAP)

O projeto usa GSAP para animações de entrada na Hero Section:

```javascript
// Badge
gsap.from('.hero-badge', { opacity: 0, y: 16, duration: 0.7, delay: 0.3 })

// H1
gsap.from('.hero-h1', { opacity: 0, y: 32, duration: 0.9, delay: 0.5 })

// Subtítulo
gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.7, delay: 0.75 })

// CTA
gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.7, delay: 0.95 })

// Imagem
gsap.from('.hero-img', { opacity: 0, x: 40, duration: 1.0, delay: 0.6 })

// Floating card
gsap.from('.hero-floatcard', { opacity: 0, scale: 0.9, duration: 0.6, delay: 1.2, ease: 'back.out(1.7)' })
```

---

## 8. Breakpoints (Mobile-First)

| Breakpoint | Largura | Aplicação |
|------------|---------|-----------|
| **default** | < 640px | Mobile |
| **sm** | 640px+ | Tablets Portrait |
| **md** | 768px+ | Tablets Landscape |
| **lg** | 1024px+ | Desktop |
| **xl** | 1280px+ | Large Desktop |

---

## 9. Footer

- **Background:** `#1a1714` (dark, quase preto)
- **Texto:** `white/50` → `white/80` no hover
- **Navegação:** Links em coluna com tracking
- **Botão CTA:** Estilo outline com `rgba(216,138,154,0.25)` background

---

## 10. Scrollbar customizada

```css
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #D88A9A40;  /* 25% opacity */
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #D88A9A80;  /* 50% opacity */
}
```

---

## Notas de Implementação

1. **Tokens primeiro:** cores, sombras, fontes e easing vivem no `@theme` de `src/index.css`. Precisa de um valor novo? Crie um token lá antes de usar.
2. **Componentes base:** novas seções devem usar `Section` + `SectionHeading` + `Button`, garantindo espaçamento e hierarquia consistentes.
3. **Glassmorphism com moderação:** utilitário `glass` apenas em elementos sobre fundos movimentados (badge da hero, selo de duração nos cards). O header ganha vidro só ao rolar.
4. **Movimento:** transições usam `ease-soft` (300–500 ms). Tudo respeita `prefers-reduced-motion`.
5. **Fundo da hero:** `src/components/effects/LavaLamp.jsx` (metaballs em canvas). Cores e bolhas são configuráveis no topo do arquivo.
6. **Imagens:** sempre via `npm run images` (ver README) — nunca importar fotos originais pesadas.
