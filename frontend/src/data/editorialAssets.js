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

const meiirbekDariaGallery = getNumberedGalleryImages(meiirbekDariaContext);

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
