/**
 * Gera as imagens otimizadas do site a partir das fotos originais.
 *
 *   npm run images
 *
 * Fonte:   assets-originais/   (fotos em alta resolução, fora do git)
 * Saída:   src/assets/images/  (WebP em vários tamanhos, versionado)
 *          src/data/images.js  (imports prontos com src, srcSet, width e height)
 *          public/             (favicon, apple-touch-icon e imagem de compartilhamento)
 *
 * Para trocar ou adicionar uma foto: coloque o original em assets-originais/,
 * ajuste a lista IMAGES abaixo e rode o comando de novo.
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'assets-originais')
const OUT = path.join(ROOT, 'src/assets/images')
const PUBLIC = path.join(ROOT, 'public')
const MANIFEST = path.join(ROOT, 'src/data/images.js')

const PORTRAIT = 4 / 5

// key: nome usado no código | file: original | widths: larguras geradas
// aspect: recorte (largura/altura); sem aspect mantém a proporção original
// position: ponto de foco do recorte (padrão: detecção automática; 'top' para retratos)
const IMAGES = [
  { key: 'heroFernanda', file: 'fernanda-hero.png', widths: [480, 854], quality: 82 },
  { key: 'aboutFernanda', file: 'foto de tricologista(1).jpg', widths: [560, 960], aspect: PORTRAIT, position: 'top' },
  { key: 'seloTricologia', file: '4.png', widths: [240] },
  { key: 'antes', file: 'Antes.png', widths: [800, 1400] },
  { key: 'depois', file: 'Depois_.png', widths: [800, 1400] },

  { key: 'volumeBrasileiro', file: 'Volume-Brasileiro_.webp', widths: [400, 720], aspect: PORTRAIT },
  { key: 'volumeRusso', file: 'Volume Luxo fio U.jpg', widths: [400, 720], aspect: PORTRAIT },
  { key: 'foxEye', file: 'Fox delineado_.jpg', widths: [400, 720], aspect: PORTRAIT },
  { key: 'lashLifting', file: 'Lash Lifting_.jpg', widths: [400, 720], aspect: PORTRAIT },
  { key: 'designSobrancelhas', file: 'Micropigmentação-fio-a-fio.webp', widths: [400, 720], aspect: PORTRAIT },
  { key: 'hennaSobrancelhas', file: 'Micropigmentação-.webp', widths: [400, 720], aspect: PORTRAIT },
  { key: 'laminacao', file: '5D-Light-.webp', widths: [400, 720], aspect: PORTRAIT },
  { key: 'comboOlhar', file: '5D.jpg', widths: [400, 720], aspect: PORTRAIT },
  { key: 'comboPremium', file: 'Capping-5D.webp', widths: [400, 720], aspect: PORTRAIT },

  // Grade "Instagram" (quadradas)
  { key: 'galeria1', file: 'Efeito-Rímel-.webp', widths: [360], aspect: 1 },
  { key: 'galeria2', file: 'Volume-Brasileiro_.webp', widths: [360], aspect: 1 },
  { key: 'galeria3', file: 'AirBrush_20260825175326.jpg', widths: [360], aspect: 1 },
  { key: 'galeria4', file: 'Fox delineado_.jpg', widths: [360], aspect: 1 },
  { key: 'galeria5', file: 'Capping-5D.webp', widths: [360], aspect: 1 },
  { key: 'galeria6', file: 'Micropigmentação-fio-a-fio.webp', widths: [360], aspect: 1 },
]

const slug = (key) => key.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())

async function processImage({ key, file, widths, aspect, position = sharp.strategy.attention, quality = 78 }) {
  const input = path.join(SRC, file)
  const base = sharp(input).rotate()
  const meta = await base.metadata()
  const outputs = []

  for (const w of widths) {
    const width = Math.min(w, meta.width)
    const height = aspect ? Math.round(width / aspect) : Math.round((meta.height / meta.width) * width)
    const name = `${slug(key)}-${width}.webp`
    const info = await sharp(input)
      .rotate()
      .resize(width, height, { fit: 'cover', position })
      .webp({ quality, effort: 6, alphaQuality: 90 })
      .toFile(path.join(OUT, name))
    outputs.push({ name, width, height, size: info.size })
  }
  return { key, outputs }
}

// Logo claro sobre fundo preto -> PNG transparente (o preto vira transparência)
async function logoFromBlack(file, outName, width) {
  const { data, info } = await sharp(path.join(SRC, file))
    .resize({ width })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const rgba = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const a = Math.max(data[i], data[i + 1], data[i + 2])
    const k = a ? 255 / a : 0
    rgba[j] = Math.min(255, data[i] * k)
    rgba[j + 1] = Math.min(255, data[i + 1] * k)
    rgba[j + 2] = Math.min(255, data[i + 2] * k)
    rgba[j + 3] = a
  }
  const info2 = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(OUT, outName))
  return { name: outName, width: info2.width, height: info2.height, size: info2.size }
}

// SVG do monograma com o viewBox recortado ao redor do desenho
async function croppedMonogram() {
  const svg = await fs.readFile(path.join(SRC, 'logo-FM.svg'), 'utf8')
  const { info } = await sharp(Buffer.from(svg)).png().trim().toBuffer({ resolveWithObject: true })
  const pad = 16
  const x = -info.trimOffsetLeft - pad
  const y = -info.trimOffsetTop - pad
  const w = info.width + pad * 2
  const h = info.height + pad * 2
  const cropped = svg
    .replace(/viewBox="[^"]*"/, `viewBox="${x} ${y} ${w} ${h}"`)
    .replace(/fill="#000000"/g, 'fill="currentColor"')
  await fs.writeFile(path.join(OUT, 'logo-monograma.svg'), cropped)
  return { svg: cropped, viewBox: [x, y, w, h] }
}

async function publicAssets(monogramSvg) {
  const charcoal = '#2D282A'
  const cream = '#F8F3EE'
  const icon = (size, padding) => {
    const inner = monogramSvg
      .replace(/<\?xml[^>]*>/, '')
      .replace(/fill="currentColor"/g, `fill="${charcoal}"`)
      .replace(/<svg /, `<svg x="${padding}" y="${padding}" width="${size - padding * 2}" height="${size - padding * 2}" `)
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${cream}"/>${inner}</svg>`
  }
  await fs.writeFile(path.join(PUBLIC, 'favicon.svg'), icon(64, 4))
  await sharp(Buffer.from(icon(180, 14))).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'))

  // Imagem de compartilhamento (WhatsApp, Instagram, Facebook) 1200x630
  const hero = await sharp(path.join(SRC, 'fernanda-hero.png')).rotate().resize({ height: 600 }).toBuffer()
  const logo = await sharp(path.join(OUT, 'logo-completo.webp')).resize({ width: 520 }).toBuffer()
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2D282A"/><stop offset="1" stop-color="#1a1714"/></linearGradient>
      <radialGradient id="r" cx="0.8" cy="0.9" r="0.6"><stop offset="0" stop-color="#D88A9A" stop-opacity="0.45"/><stop offset="1" stop-color="#D88A9A" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#r)"/>
    <text x="80" y="470" font-family="Georgia, serif" font-size="34" fill="#F0E8D8" opacity="0.85">Cílios · Sobrancelhas · Tricologia</text>
    <text x="80" y="520" font-family="Arial, sans-serif" font-size="22" letter-spacing="4" fill="#D88A9A">CAÇAPAVA · SP</text>
  </svg>`
  await sharp(Buffer.from(bg))
    .composite([
      { input: logo, left: 60, top: 90 },
      { input: hero, left: 1200 - 400 - 20, top: 30 },
    ])
    .jpeg({ quality: 85 })
    .toFile(path.join(PUBLIC, 'og-image.jpg'))
}

const camel = (name) => name.replace(/[-.](\w)/g, (_, c) => c.toUpperCase())

async function writeManifest(results, logo) {
  const lines = ['// Arquivo gerado por scripts/optimize-images.mjs — não editar à mão.', '']
  const entries = []
  for (const { key, outputs } of results) {
    for (const o of outputs) lines.push(`import ${camel(o.name.replace('.webp', ''))} from '@/assets/images/${o.name}'`)
    const largest = outputs.at(-1)
    entries.push(
      `  ${key}: {\n` +
        `    src: ${camel(largest.name.replace('.webp', ''))},\n` +
        `    srcSet: \`${outputs.map((o) => `\${${camel(o.name.replace('.webp', ''))}} ${o.width}w`).join(', ')}\`,\n` +
        `    width: ${largest.width},\n    height: ${largest.height},\n  },`,
    )
  }
  lines.push(`import logoCompletoSrc from '@/assets/images/${logo.name}'`)
  entries.push(`  logoCompleto: { src: logoCompletoSrc, width: ${logo.width}, height: ${logo.height} },`)
  lines.push('', 'export const IMAGES = {', ...entries, '}', '')
  await fs.writeFile(MANIFEST, lines.join('\n'))
}

await fs.rm(OUT, { recursive: true, force: true })
await fs.mkdir(OUT, { recursive: true })

const results = []
for (const img of IMAGES) results.push(await processImage(img))
const logo = await logoFromBlack('image-3.png', 'logo-completo.webp', 583)
const { svg } = await croppedMonogram()
await publicAssets(svg)
await writeManifest(results, logo)

let total = logo.size
for (const r of results) for (const o of r.outputs) {
  total += o.size
  console.log(`${o.name.padEnd(36)} ${String(o.width).padStart(4)}x${o.height}  ${(o.size / 1024).toFixed(0)} KB`)
}
console.log(`\nTotal: ${(total / 1024).toFixed(0)} KB em src/assets/images`)
