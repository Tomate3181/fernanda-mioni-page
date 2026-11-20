import { IMAGES } from './images'

export const SERVICE_TABS = [
  { key: 'cilios', label: 'Cílios', hint: 'Lash' },
  { key: 'sobrancelhas', label: 'Sobrancelhas', hint: 'Brow' },
]

export const SERVICES = {
  cilios: [
    {
      title: 'Volume Brasileiro',
      desc: 'Fios em formato Y com acabamento cheio, leve e durável para o dia a dia.',
      duration: '2h30',
      style: 'Natural · Moderado',
      image: IMAGES.volumeBrasileiro,
    },
    {
      title: 'Volume Russo',
      desc: 'Fans artesanais de 3D a 8D por fio natural. Densidade marcante sem pesar.',
      duration: '3h',
      style: 'Volumoso · Marcante',
      image: IMAGES.volumeRusso,
    },
    {
      title: 'Fox Eye',
      desc: 'Fios mais longos no canto externo para alongar e elevar o contorno dos olhos.',
      duration: '2h',
      style: 'Alongado · Delineado',
      image: IMAGES.foxEye,
    },
    {
      title: 'Lash Lifting',
      desc: 'Curvatura e hidratação dos seus próprios cílios naturais, sem extensão.',
      duration: '1h',
      style: 'Natural · Sem fios',
      image: IMAGES.lashLifting,
      imageClass: 'object-top scale-[1.55] origin-[40%_4%]',
    },
  ],
  sobrancelhas: [
    {
      title: 'Design de Sobrancelhas',
      desc: 'Mapeamento facial sob medida para equilibrar simetria e expressão natural.',
      duration: '45min',
      style: 'Natural · Preciso',
      image: IMAGES.designSobrancelhas,
    },
    {
      title: 'Henna de Sobrancelhas',
      desc: 'Coloração natural que preenche falhas e define o desenho com acabamento suave.',
      duration: '1h',
      style: 'Definido · Preenchido',
      image: IMAGES.hennaSobrancelhas,
    },
    {
      title: 'Laminação de Sobrancelhas',
      desc: 'Alinhamento dos fios naturais para sobrancelhas mais encorpadas e estruturadas.',
      duration: '1h',
      style: 'Estruturado · Alinhado',
      image: IMAGES.laminacao,
    },
  ],
}
