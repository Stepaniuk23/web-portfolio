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
    .sort((a, b) => {
      const numA = Number(a.match(/\d+/)?.[0] || 0);
      const numB = Number(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    })
    .map((key) => context(key));

const odessaContext = require.context(
  "../assets/weddings/odessa", // Было ../../assets
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);

export const odessaWeddingImages = {
  cover:
    loadImageFromContext(odessaContext, "cover.jpg") ||
    loadImageFromContext(odessaContext, "hero-windmills.jpg"),
  heroWindmills: loadImageFromContext(odessaContext, "hero-windmills.jpg"),
  seaPortrait: loadImageFromContext(odessaContext, "sea-portrait.jpg"),
  nataliaDetail: loadImageFromContext(odessaContext, "natalia-detail.jpg"),
  ceremony: loadImageFromContext(odessaContext, "ceremony.jpg"),
  brokenGlass: loadImageFromContext(odessaContext, "broken-glass.jpg"),
  sunsetOdessa: loadImageFromContext(odessaContext, "sunset-odessa.jpg"),
};

export const odessaFullStoryGallery = getNumberedGalleryImages(odessaContext);
