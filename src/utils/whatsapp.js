export const WA_NUMBER = '5512981234567'

export const waLink = (msg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
