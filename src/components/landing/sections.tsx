import { Badge } from "@/components/ui/badge"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-white border-white">В наличии</Badge>,
    title: "KAC PDW. Орбизы решают.",
    showButton: true,
    buttonText: 'Заказать',
    image: 'https://cdn.poehali.dev/projects/026a65d0-5458-4946-824c-5f1c36cc4152/files/605ab581-3f6d-47d9-b6c7-b309c3bcec21.jpg'
  },
  {
    id: 'about',
    title: 'Что это за зверь',
    content: 'Компактный штурмовой автомат на орбизах с точной копией легендарного дизайна KAC PDW. Лёгкий, манёвренный и убойно эффектный в бою.'
  },
  {
    id: 'features',
    title: 'Технические характеристики',
    content: 'Электропривод, скорострельность до 11 выстрелов в секунду, дальность до 25 метров, ёмкий магазин на 500+ орбизов и складной приклад для удобной транспортировки.'
  },
  {
    id: 'testimonials',
    title: 'Почему его берут',
    content: 'Реалистичный вид, мощный бой и надёжная сборка. Идеален для игр во дворе, на даче и командных баталий — отзывы говорят сами за себя.'
  },
  {
    id: 'join',
    title: 'Готов к бою?',
    content: 'Забирай KAC PDW на орбизах прямо сейчас и доминируй на поле боя. Доставка по всей России.',
    showButton: true,
    buttonText: 'Оформить заказ'
  },
]