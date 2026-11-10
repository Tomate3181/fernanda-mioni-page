import { IMAGES } from './images'

export const SERVICE_TABS = [
  { key: 'cilios', label: 'Cílios', hint: 'Lash' },
  { key: 'sobrancelhas', label: 'Sobrancelhas', hint: 'Brow' },
  { key: 'combos', label: 'Kits & Combos', hint: 'Combo' },
]

export const SERVICES = {
  cilios: [
    {
      title: 'Volume Brasileiro',
      desc: 'Fios individuais aplicados um a um para um resultado natural e delicado. Ideal para o cotidiano e para quem está começando.',
      duration: '2h30',
      style: 'Natural · Moderado',
      image: IMAGES.volumeBrasileiro,
    },
    {
      title: 'Volume Russo',
      desc: 'Leques ultra finos de 3 a 8D por cílio natural. Máximo volume com leveza e segurança incomparáveis.',
      duration: '3h',
      style: 'Volumoso · Dramático',
      image: IMAGES.volumeRusso,
    },
    {
      title: 'Fox Eye',
      desc: 'Fios estrategicamente maiores no canto externo que alongam e levantam o olhar. O efeito mais desejado da temporada.',
      duration: '2h',
      style: 'Sofisticado · Alongado',
      image: IMAGES.foxEye,
    },
    {
      title: 'Lash Lifting',
      desc: 'Curvatura e fixação permanente dos seus cílios naturais. Sem extensão — resultado limpo e autêntico.',
      duration: '1h',
      style: 'Natural · Lifting',
      image: IMAGES.lashLifting,
    },
  ],
  sobrancelhas: [
    {
      title: 'Design de Sobrancelhas',
      desc: 'Mapeamento facial personalizado com precisão milimétrica. Cada arco é desenhado para valorizar sua anatomia única.',
      duration: '45min',
      style: 'Natural · Preciso',
      image: IMAGES.designSobrancelhas,
    },
    {
      title: 'Henna de Sobrancelhas',
      desc: 'Coloração 100% natural que define, preenche e uniformiza. Resultado que dura até 4 semanas no fio.',
      duration: '1h',
      style: 'Definido · Natural',
      image: IMAGES.hennaSobrancelhas,
    },
    {
      title: 'Laminação de Sobrancelhas',
      desc: 'Alinha e fixa cada fio para sobrancelhas mais encorpadas e estruturadas. O tratamento queridinho do mundo todo.',
      duration: '1h',
      style: 'Volumoso · Estruturado',
      image: IMAGES.laminacao,
    },
  ],
  combos: [
    {
      title: 'Combo Olhar Completo',
      desc: 'Volume Brasileiro + Design de Sobrancelhas. A transformação mais completa em uma única sessão dedicada a você.',
      duration: '3h30',
      style: 'Completo · Popular',
      image: IMAGES.comboOlhar,
    },
    {
      title: 'Combo Premium Lash & Brow',
      desc: 'Volume Russo + Laminação de Sobrancelhas. Para quem busca o máximo de sofisticação e impacto visual.',
      duration: '4h',
      style: 'Premium · Exclusivo',
      image: IMAGES.comboPremium,
    },
  ],
}
