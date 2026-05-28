// Импортируем твои ассеты (путь проверь, должен вести к твоему файлу с картинками)
import { odessaFullStoryGallery, odessaWeddingImages } from "./weddingAssets";

export const storiesData = [
  {
    id: "viktor-natalia-odessa",
    templateType: "classic", // Мы создадим 3 типа, это первый
    title: "Viktor & Natalia",
    location: "Odessa, Black Sea Coast",
    year: "2023",
    // Сюда пишем все тексты для статьи
    content: {
      intro:
        "There is a special kind of beauty in intimacy. Viktor and Natalia chose the rugged coast of the Black Sea to share their vows, surrounded only by those who truly know their hearts.",
      momentTitle: "The Poetry of Accident",
      momentText:
        "Sometimes, the most profound moments aren't scripted. During the toast, a glass shattered by accident, sending a spray of champagne into the air.",
      aftermath:
        "The rest of the evening felt like a beautiful blur. The formal constraints were gone, replaced by an infectious ease that only the sea and good company can provide. We watched as the light faded from gold to deep blue, capturing the kind of joy that doesn't need a prompt or a pose. It was exactly what Viktor and Natalia had hoped for: a day that felt less like a production and more like a home.",
    },
    // Привязываем фото из твоего weddingAssets.js к конкретным местам в шаблоне
    images: {
      hero: odessaWeddingImages.heroWindmills,
      gridWide: odessaWeddingImages.seaPortrait,
      gridPortrait: odessaWeddingImages.nataliaDetail,
      gridSquare: odessaWeddingImages.ceremony,
      momentWide: odessaWeddingImages.brokenGlass,
      finale: odessaWeddingImages.sunsetOdessa,
      // Все пронумерованные фото из папки odessa подключаются автоматически
      fullGallery: odessaFullStoryGallery,
    },
  },
];
