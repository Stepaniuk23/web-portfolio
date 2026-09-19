import fallbackCover from "../assets/gallery/gallery1.jpg";
import fallbackHero from "../assets/gallery/gallery2.jpg";
import fallbackWide1 from "../assets/gallery/gallery3.jpg";
import fallbackPortrait from "../assets/gallery/gallery4.jpg";
import fallbackSquare from "../assets/gallery/gallery5.jpg";
import fallbackWide2 from "../assets/gallery/gallery6.jpg";
import fallbackFinale from "../assets/gallery/gallery7.jpg";

const loadImageFromContext = (context, fileName) => {
  try {
    return context(`./${fileName}`);
  } catch {
    return null;
  }
};

const getNumberedGalleryImages = (context) =>
  context
    .keys()
    .filter((key) => /^\.\/\d+\.(png|jpe?g|webp|avif)$/i.test(key))
    .sort(
      (a, b) =>
        Number(a.match(/\d+/)?.[0] || 0) - Number(b.match(/\d+/)?.[0] || 0),
    )
    .map((key) => context(key));

const meiirbekDariaContext = require.context(
  "../assets/editorials/meiirbek-nariman-daria",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);

const annaVladiContext = require.context(
  "../assets/editorials/anna-vladi",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);

const tatianaContext = require.context(
  "../assets/editorials/tatiana",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);

const viktorNataliaContext = require.context(
  "../assets/editorials/viktor-natalia-odessa",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);

const meiirbekDariaGallery = getNumberedGalleryImages(meiirbekDariaContext);
const annaVladiGallery = getNumberedGalleryImages(annaVladiContext);
const tatianaGallery = getNumberedGalleryImages(tatianaContext);
const viktorNataliaGallery = getNumberedGalleryImages(viktorNataliaContext);

export const meiirbekDariaEditorialImages = {
  cover:
    loadImageFromContext(meiirbekDariaContext, "cover.jpg") || fallbackCover,
  hero: loadImageFromContext(meiirbekDariaContext, "hero.jpg") || fallbackHero,
  wide1:
    loadImageFromContext(meiirbekDariaContext, "wide1.jpg") ||
    loadImageFromContext(meiirbekDariaContext, "wide-1.jpg") ||
    fallbackWide1,
  portrait:
    loadImageFromContext(meiirbekDariaContext, "portrait.jpg") ||
    fallbackPortrait,
  square:
    loadImageFromContext(meiirbekDariaContext, "square.jpg") || fallbackSquare,
  wide2:
    loadImageFromContext(meiirbekDariaContext, "wide2.jpg") ||
    loadImageFromContext(meiirbekDariaContext, "wide-2.jpg") ||
    fallbackWide2,
  finale:
    loadImageFromContext(meiirbekDariaContext, "finale.jpg") || fallbackFinale,
  fullGallery: meiirbekDariaGallery.length
    ? meiirbekDariaGallery
    : [
        fallbackCover,
        fallbackHero,
        fallbackWide1,
        fallbackPortrait,
        fallbackSquare,
        fallbackWide2,
        fallbackFinale,
      ],
};

export const annaVladiEditorialImages = {
  cover: loadImageFromContext(annaVladiContext, "cover.jpg") || fallbackCover,
  hero: loadImageFromContext(annaVladiContext, "hero.jpg") || fallbackHero,
  wide1:
    loadImageFromContext(annaVladiContext, "wide1.jpg") ||
    loadImageFromContext(annaVladiContext, "wide-1.jpg") ||
    fallbackWide1,
  portrait:
    loadImageFromContext(annaVladiContext, "portrait.jpg") || fallbackPortrait,
  square:
    loadImageFromContext(annaVladiContext, "square.jpg") || fallbackSquare,
  wide2:
    loadImageFromContext(annaVladiContext, "wide2.jpg") ||
    loadImageFromContext(annaVladiContext, "wide-2.jpg") ||
    fallbackWide2,
  finale:
    loadImageFromContext(annaVladiContext, "finale.jpg") || fallbackFinale,
  fullGallery: annaVladiGallery.length
    ? annaVladiGallery
    : [
        fallbackCover,
        fallbackHero,
        fallbackWide1,
        fallbackPortrait,
        fallbackSquare,
        fallbackWide2,
        fallbackFinale,
      ],
};

export const tatianaEditorialImages = {
  cover: loadImageFromContext(tatianaContext, "cover.jpg") || fallbackCover,
  hero: loadImageFromContext(tatianaContext, "hero.jpg") || fallbackHero,
  wide1:
    loadImageFromContext(tatianaContext, "wide1.jpg") ||
    loadImageFromContext(tatianaContext, "portrait.jpg") ||
    fallbackWide1,
  portrait:
    loadImageFromContext(tatianaContext, "portrait.jpg") || fallbackPortrait,
  square:
    loadImageFromContext(tatianaContext, "square.jpg") ||
    loadImageFromContext(tatianaContext, "cover.jpg") ||
    fallbackSquare,
  wide2:
    loadImageFromContext(tatianaContext, "wide2.jpg") ||
    loadImageFromContext(tatianaContext, "hero.jpg") ||
    fallbackWide2,
  finale:
    loadImageFromContext(tatianaContext, "finale.jpg") ||
    loadImageFromContext(tatianaContext, "portrait.jpg") ||
    fallbackFinale,
  fullGallery: tatianaGallery.length
    ? tatianaGallery
    : [
        fallbackCover,
        fallbackHero,
        fallbackWide1,
        fallbackPortrait,
        fallbackSquare,
        fallbackWide2,
        fallbackFinale,
      ],
};

export const viktorNataliaEditorialImages = {
  cover:
    loadImageFromContext(viktorNataliaContext, "cover.jpg") || fallbackCover,
  hero: loadImageFromContext(viktorNataliaContext, "hero.jpg") || fallbackHero,
  wide1:
    loadImageFromContext(viktorNataliaContext, "wide1.jpg") ||
    loadImageFromContext(viktorNataliaContext, "001.jpg") ||
    fallbackWide1,
  portrait:
    loadImageFromContext(viktorNataliaContext, "portrait.jpg") ||
    loadImageFromContext(viktorNataliaContext, "003.jpg") ||
    fallbackPortrait,
  square:
    loadImageFromContext(viktorNataliaContext, "square.jpg") ||
    loadImageFromContext(viktorNataliaContext, "005.jpg") ||
    fallbackSquare,
  wide2:
    loadImageFromContext(viktorNataliaContext, "wide2.jpg") ||
    loadImageFromContext(viktorNataliaContext, "007.jpg") ||
    fallbackWide2,
  finale:
    loadImageFromContext(viktorNataliaContext, "finale.jpg") ||
    loadImageFromContext(viktorNataliaContext, "029.jpg") ||
    fallbackFinale,
  fullGallery: viktorNataliaGallery.length
    ? viktorNataliaGallery
    : [
        fallbackCover,
        fallbackHero,
        fallbackWide1,
        fallbackPortrait,
        fallbackSquare,
        fallbackWide2,
        fallbackFinale,
      ],
};
