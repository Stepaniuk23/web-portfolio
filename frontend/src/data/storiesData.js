// 1. Импортируем ассеты для обеих свадеб (добавил экспорт галереи для cinematic)
import {
  odessaWeddingImages,
  cinematicImages,
  kyivWeddingImages,
  alexanderAnastasiaWeddingImages,
  dmitryMargaritaWeddingImages,
} from "./weddingAssets";

export const storiesData = [
  // Новые истории добавляем только в конец массива, чтобы не ломать текущий порядок витрины.
  {
    id: "viktor-natalia-odessa",
    templateType: "classic",
    title: "Viktor & Natalia",
    location: "Odessa, Black Sea Coast",
    content: {
      intro:
        "There is a special kind of beauty in intimacy. Viktor and Natalia chose the rugged coast of the Black Sea to share their vows, surrounded only by those who truly know their hearts.",
      introColumns: [
        "The ceremony took place on the very edge of a clifftop, directly above the open sea. Everything about the space felt vast yet safe—just a minimal arch framing the endless horizon and rows of candles burning against the coastline.",
        "As the light faded, a gentle breeze from the water moved through the space, keeping the moment alive and unfixed. There was no forced choreography, just the steady sound of the waves below and a handful of people completely present.",
      ],
      momentTitle: "The Poetry of Accident",
      momentText:
        "Sometimes, the most profound moments aren't scripted. During the toast, a glass shattered by accident, sending a spray of champagne into the air.",
      aftermath:
        "The rest of the evening felt like a beautiful blur. The formal constraints were gone, replaced by an infectious ease that only the sea and good company can provide. We watched as the light faded from gold to deep blue, capturing the kind of joy that doesn't need a prompt or a pose. It was exactly what Viktor and Natalia had hoped for: a day that felt less like a production and more like a home.",
    },
    images: {
      cover: odessaWeddingImages.cover,
      hero: odessaWeddingImages.hero, // Вертикальный панорамный кадр
      gridWide: odessaWeddingImages.portrait, // Горизонтальный кадр
      gridPortrait: odessaWeddingImages.wide1, // Вертикальный кадр
      gridSquare: odessaWeddingImages.square, // Любой кадр под квадратную подачу
      momentWide: odessaWeddingImages.wide2, // Горизонтальный кадр
      finale: odessaWeddingImages.finale, // Горизонтальный кадр
      fullGallery: odessaWeddingImages.fullGallery,
    },
  },

  {
    id: "alexander-elena-dawn",
    templateType: "cinematic", // Наш новый кинематографичный шаблон
    title: "Alexander & Elena",
    location: "Odessa, Rooftop at Dawn",
    content: {
      intro:
        "Four in the morning. While the city was still dreaming, we were on a rooftop overlooking the Black Sea. A producer and a photographer — they knew that light is the only thing worth chasing. This wasn't just a wedding; it was a private premiere of their life together.",
      introColumns: [
        "The city remained hushed below, as if it understood the absolute need for silence before something unforgettable begins. Up on the rooftop, away from the daytime noise, the world felt stripped of everything trivial. There was only the vast, breathing expanse of the dark sea meeting the horizon, waiting for the slow, deliberate transition from deep indigo to the first cool silver of dawn.",
        "A soft wind moved through the fabric of the decor, while the glass caught the earliest, subtle reflections of the morning sky. Every gesture felt measured, cinematic, and impossibly calm. For two people accustomed to creating visual worlds, this wasn't about staging a perfect scene, but about letting the dawn frame itself around them.",
      ],
      momentTitle: "The First Ray",
      momentText:
        "There is a silence that only exists at dawn. As the sun began to break the horizon, the ceremony started. No guests, no noise—just the sound of the wind and the warmth of the first light on a beautifully decorated roof.",
      aftermath:
        "From the rooftop to the silent morning streets, and finally to the sea pier. We followed the sun as it climbed higher, ending our journey where the water meets the sky. A morning that felt like a lifetime.",
    },
    images: {
      cover: cinematicImages.cover,
      hero: cinematicImages.hero, // Горизонтальный панорамный кадр
      gridWide: cinematicImages.wide1, // Горизонтальный кадр
      gridPortrait: cinematicImages.portrait, // Вертикальный кадр
      gridSquare: cinematicImages.square, // Квадратный кадр
      momentWide: cinematicImages.wide2, // Горизонтальный кадр
      finale: cinematicImages.finale, // Горизонтальный кадр
      fullGallery: cinematicImages.fullGallery,
    },
  },

  {
    id: "maksim-simona-kyiv",
    templateType: "modern-minimal",
    title: "Maksim & Simona",
    location: "Kyiv, Studio to Rooftop at Sunset",
    content: {
      intro:
        "This story was built around two spaces and one rhythm. We started in a quiet daylight studio where every movement felt intimate, then moved across the city to a modern rooftop for the last light. Maksim and Simona wanted the day to stay focused only on them, and that intimacy shaped every frame.",
      introColumns: [
        "Inside the studio, soft directional light and clean architecture gave us room for still portraits and subtle gestures. Their energy felt calm, precise, and deeply connected, turning simple moments into editorial scenes without losing tenderness.",
        "By sunset we reached the rooftop above Kyiv. The skyline opened up, glass and concrete started catching warm reflections, and the atmosphere shifted from quiet preparation to cinematic freedom. The final images feel like a conversation between minimal design and genuine emotion.",
      ],
      momentTitle: "From Studio Silence to Sunset Air",
      momentText:
        "The transition itself became the highlight: from controlled studio calm to open rooftop wind and golden light.",
      aftermath:
        "As the sky turned deeper, the city lights came alive below us. We finished with a sequence that felt both modern and timeless: two people, one skyline, and a clear memory of a day designed only for them.",
    },
    images: {
      cover: kyivWeddingImages.cover,
      hero: kyivWeddingImages.hero, // Вертикальный для Hero (фото справа)
      gridWide: kyivWeddingImages.wide1, // Горизонтальный кадр
      gridPortrait: kyivWeddingImages.portrait, // Вертикальный кадр
      gridSquare: kyivWeddingImages.square, // Квадратный кадр
      momentWide: kyivWeddingImages.wide2, // Горизонтальный кадр
      finale: kyivWeddingImages.finale, // Горизонтальный кадр
      fullGallery: kyivWeddingImages.fullGallery,
    },
  },

  {
    id: "alexander-anastasia-odesssa",
    templateType: "classic",
    title: "Alexander & Anastasia",
    location: "Odessa, Ukraine",
    content: {
      intro:
        "Alexander and Anastasia brought exactly the kind of energy that makes a city session unforgettable: elegant, playful, and completely alive. From the first minutes in Odessa, it felt less like a formal shoot and more like a joyful walk through places filled with memory and light.",
      introColumns: [
        "We photographed only the two of them in the historic heart of the city, before the evening celebration with guests began without me. That gave us freedom to move fast, improvise, and keep every frame personal, honest, and full of character.",
        "We ran between old facades and hidden corners, laughed at our own jokes, and even stopped for ice cream in the middle of the shoot. It was impossible not to smile watching strangers turn their phones toward us, curious about this bright, cinematic scene unfolding in the streets.",
      ],
      momentTitle: "Odessa, Laughter, and Summer Light",
      momentText:
        "The most memorable part was the spontaneity: movement, laughter, and that rare feeling when the city itself becomes part of the love story.",
      aftermath:
        "When we finished, they went on to celebrate with family and friends, and we left with exactly what we wanted: a set of images that feels effortless yet refined. This gallery keeps the mood of that day intact, two beautiful people, warm Odessa air, and a sequence of moments that still feels in motion.",
    },
    images: {
      cover: alexanderAnastasiaWeddingImages.cover,
      hero: alexanderAnastasiaWeddingImages.hero,
      gridWide: alexanderAnastasiaWeddingImages.wide1,
      gridPortrait: alexanderAnastasiaWeddingImages.portrait,
      gridSquare: alexanderAnastasiaWeddingImages.square,
      momentWide: alexanderAnastasiaWeddingImages.wide2,
      finale: alexanderAnastasiaWeddingImages.finale,
      fullGallery: alexanderAnastasiaWeddingImages.fullGallery,
    },
  },

  {
    id: "dmitry-margarita-kremenchug",
    templateType: "modern-minimal",
    title: "Dmitry & Margarita",
    location: "Kremenchug, Ukraine",
    content: {
      intro:
        "Dmitry and Margarita are the kind of couple who make you feel at home from the very first conversation. He is an engineer with a calm, precise way of seeing the world; she is a lawyer with sharp intelligence and quiet strength. Together, they carry a rare balance of clarity and warmth.",
      introColumns: [
        "We chose to create this story on a different day, outside the wedding timeline. No rush, no schedule pressure, no constant interruptions. Just space to breathe, move naturally, and build a visual narrative that felt entirely theirs.",
        "At sunset we arrived at the banks of the Dnipro. The light was soft and golden, the river almost still, and every frame felt intimate and unforced. It became less about a portrait session and more about preserving the way they look at each other when nothing needs to be said.",
      ],
      momentTitle: "Golden Hour on the Dnipro",
      momentText:
        "As the sun lowered behind the water, the atmosphere turned cinematic: warm reflections, open sky, and a quiet rhythm that belonged only to them.",
      aftermath:
        "Our connection did not end with this shoot. Later, I photographed them again during family sessions, and that continuity says everything about who they are: genuine, kind, and deeply present with each other. This gallery is a memory of their beginning, captured with trust and tenderness.",
    },
    images: {
      cover: dmitryMargaritaWeddingImages.cover,
      hero: dmitryMargaritaWeddingImages.hero,
      gridWide: dmitryMargaritaWeddingImages.wide1,
      gridPortrait: dmitryMargaritaWeddingImages.portrait,
      gridSquare: dmitryMargaritaWeddingImages.square,
      momentWide: dmitryMargaritaWeddingImages.wide2,
      finale: dmitryMargaritaWeddingImages.finale,
      fullGallery: dmitryMargaritaWeddingImages.fullGallery,
    },
  },
];
