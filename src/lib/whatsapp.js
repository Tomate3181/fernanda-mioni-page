import { SITE } from '@/config/site'

/** Link do WhatsApp com mensagem pronta. */
export const waLink = (msg = 'Olá Fernanda! Gostaria de agendar um horário.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`
