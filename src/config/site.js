// Dados do negócio usados em todo o site. Altere aqui e reflete em todas as seções.

export const SITE = {
  name: 'Fernanda Mioni',
  tagline: 'Lash & Brow',
  url: 'https://fernandamioni.com.br',
  email: 'studioessenzacpv@gmail.com',
  whatsapp: '5512996002138',
  whatsappDisplay: '(12) 99600-2138',
  instagram: {
    handle: '@felashdesigner',
    url: 'https://instagram.com/felashdesigner',
  },
  address: {
    street: 'Rua Marquês de Herval, 391',
    complement: 'Sala 03',
    district: 'Centro',
    zip: '12281-510',
    city: 'Caçapava',
    state: 'SP',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Rua Marquês de Herval, 391, Centro, Caçapava - SP, 12281-510'),
  },
  google: {
    placeId: 'ChIJv_kHRJ9RzJQRaDsuEn0zNsc',
    profileUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJv_kHRJ9RzJQRaDsuEn0zNsc',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJv_kHRJ9RzJQRaDsuEn0zNsc',
  },
  hours: [
    { label: 'Segunda a sexta', value: '9h às 19h' },
    { label: 'Sábado', value: '9h às 16h' },
  ],
  stats: [
    { value: '500+', label: 'Clientes atendidas' },
    { value: '1:1', label: 'Atendimento exclusivo' },
    { value: '6 anos', label: 'De experiência' },
  ],
}

export const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Agendamento', href: '#agendamento' },
  { label: 'Localização', href: '#localizacao' },
]
