// Dados do negócio usados em todo o site. Altere aqui e reflete em todas as seções.

export const SITE = {
  name: 'Fernanda Mioni',
  tagline: 'Lash & Brow',
  url: 'https://fernandamioni.com.br', // TODO: trocar pelo domínio final
  email: 'alinemioni1987@gmail.com', // TODO: confirmar e-mail definitivo
  whatsapp: '5512996002138',
  instagram: {
    handle: '@felashdesigner',
    url: 'https://instagram.com/felashdesigner',
  },
  address: {
    street: 'Rua Coronel Jaime Rolemberg de Lima, 370',
    district: 'Jardim São José',
    city: 'Caçapava',
    state: 'SP',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Rua Coronel Jaime Rolemberg de Lima, 370, Jardim São José, Caçapava - SP'),
  },
  hours: [
    { label: 'Segunda a sexta', value: '9h às 19h' },
    { label: 'Sábado', value: '9h às 16h' },
  ],
  stats: [
    { value: '500+', label: 'Clientes atendidas' },
    { value: '5★', label: 'Avaliação Google' },
    { value: '6 anos', label: 'De experiência' },
  ],
}

export const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre mim', href: '#sobre' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Localização', href: '#localizacao' },
]
