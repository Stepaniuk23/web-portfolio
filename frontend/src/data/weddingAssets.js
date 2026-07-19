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

// --- ИСТОРИЯ 1: ВИКТОР И НАТАЛЬЯ ---
const odessaContext = require.context(
  "../assets/weddings/odessa",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);
export const odessaWeddingImages = {
  cover:
    loadImageFromContext(odessaContext, "cover.jpg") ||
    loadImageFromContext(odessaContext, "hero.jpg") ||
    loadImageFromContext(odessaContext, "hero-windmills.jpg"),
  hero:
    loadImageFromContext(odessaContext, "hero.jpg") ||
    loadImageFromContext(odessaContext, "hero-windmills.jpg"),
  wide1:
    loadImageFromContext(odessaContext, "wide1.jpg") ||
    loadImageFromContext(odessaContext, "wide-1.jpg") ||
    loadImageFromContext(odessaContext, "sea-portrait.jpg"),
  portrait:
    loadImageFromContext(odessaContext, "portrait.jpg") ||
    loadImageFromContext(odessaContext, "natalia-detail.jpg"),
  square:
    loadImageFromContext(odessaContext, "square.jpg") ||
    loadImageFromContext(odessaContext, "ceremony.jpg"),
  wide2:
    loadImageFromContext(odessaContext, "wide2.jpg") ||
    loadImageFromContext(odessaContext, "wide-2.jpg") ||
    loadImageFromContext(odessaContext, "broken-glass.jpg"),
  finale:
    loadImageFromContext(odessaContext, "finale.jpg") ||
    loadImageFromContext(odessaContext, "sunset-odessa.jpg"),
  fullGallery: getNumberedGalleryImages(odessaContext),
};

// --- ИСТОРИЯ 2: АЛЕКСАНДР И ЕЛЕНА ---
const alexanderElenaContext = require.context(
  "../assets/weddings/alexander-elena",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);
export const cinematicImages = {
  cover:
    loadImageFromContext(alexanderElenaContext, "cover.jpg") ||
    loadImageFromContext(alexanderElenaContext, "hero.jpg") ||
    loadImageFromContext(alexanderElenaContext, "hero-dawn.jpg"),
  hero:
    loadImageFromContext(alexanderElenaContext, "hero.jpg") ||
    loadImageFromContext(alexanderElenaContext, "hero-dawn.jpg"), // Горизонтальное фото рассвета
  wide1:
    loadImageFromContext(alexanderElenaContext, "wide1.jpg") ||
    loadImageFromContext(alexanderElenaContext, "wide-1.jpg") ||
    loadImageFromContext(alexanderElenaContext, "pier-scene.jpg"),
  portrait:
    loadImageFromContext(alexanderElenaContext, "portrait.jpg") ||
    loadImageFromContext(alexanderElenaContext, "bed-portrait.jpg"),
  square:
    loadImageFromContext(alexanderElenaContext, "square.jpg") ||
    loadImageFromContext(alexanderElenaContext, "decor-detail.jpg"),
  wide2:
    loadImageFromContext(alexanderElenaContext, "wide2.jpg") ||
    loadImageFromContext(alexanderElenaContext, "wide-2.jpg") ||
    loadImageFromContext(alexanderElenaContext, "moment-sun.jpg"),
  finale:
    loadImageFromContext(alexanderElenaContext, "finale.jpg") ||
    loadImageFromContext(alexanderElenaContext, "pier-finale.jpg"),
  fullGallery: getNumberedGalleryImages(alexanderElenaContext),
};

const alexanderAnastasiaContext = require.context(
  "../assets/weddings/alexander-anastasia-odesssa",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);

export const alexanderAnastasiaWeddingImages = {
  cover:
    loadImageFromContext(alexanderAnastasiaContext, "cover.jpg") ||
    loadImageFromContext(alexanderAnastasiaContext, "hero.jpg") ||
    odessaWeddingImages.cover,
  hero:
    loadImageFromContext(alexanderAnastasiaContext, "hero.jpg") ||
    loadImageFromContext(alexanderAnastasiaContext, "portrait.jpg") ||
    odessaWeddingImages.hero,
  wide1:
    loadImageFromContext(alexanderAnastasiaContext, "wide1.jpg") ||
    loadImageFromContext(alexanderAnastasiaContext, "wide-1.jpg") ||
    odessaWeddingImages.wide1,
  portrait:
    loadImageFromContext(alexanderAnastasiaContext, "portrait.jpg") ||
    loadImageFromContext(alexanderAnastasiaContext, "hero.jpg") ||
    odessaWeddingImages.portrait,
  square:
    loadImageFromContext(alexanderAnastasiaContext, "square.jpg") ||
    odessaWeddingImages.square,
  wide2:
    loadImageFromContext(alexanderAnastasiaContext, "wide2.jpg") ||
    loadImageFromContext(alexanderAnastasiaContext, "wide-2.jpg") ||
    odessaWeddingImages.wide2,
  finale:
    loadImageFromContext(alexanderAnastasiaContext, "finale.jpg") ||
    odessaWeddingImages.finale,
  fullGallery: getNumberedGalleryImages(alexanderAnastasiaContext),
};

const kyivContext = require.context(
  "../assets/weddings/kyiv",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);

const kyivFullGallery = getNumberedGalleryImages(kyivContext);

export const kyivWeddingImages = {
  cover:
    loadImageFromContext(kyivContext, "cover.jpg") ||
    loadImageFromContext(kyivContext, "hero.jpg") ||
    cinematicImages.cover,
  hero:
    loadImageFromContext(kyivContext, "hero.jpg") ||
    loadImageFromContext(kyivContext, "studio-hero.jpg") ||
    cinematicImages.hero,
  wide1:
    loadImageFromContext(kyivContext, "wide1.jpg") ||
    loadImageFromContext(kyivContext, "wide-1.jpg") ||
    loadImageFromContext(kyivContext, "studio-wide.jpg") ||
    cinematicImages.wide1,
  portrait:
    loadImageFromContext(kyivContext, "portrait.jpg") ||
    loadImageFromContext(kyivContext, "studio-portrait.jpg") ||
    cinematicImages.portrait,
  square:
    loadImageFromContext(kyivContext, "square.jpg") ||
    loadImageFromContext(kyivContext, "detail-square.jpg") ||
    cinematicImages.square,
  wide2:
    loadImageFromContext(kyivContext, "wide2.jpg") ||
    loadImageFromContext(kyivContext, "wide-2.jpg") ||
    loadImageFromContext(kyivContext, "rooftop-wide.jpg") ||
    cinematicImages.wide2,
  finale:
    loadImageFromContext(kyivContext, "finale.jpg") ||
    loadImageFromContext(kyivContext, "rooftop-finale.jpg") ||
    cinematicImages.finale,
  fullGallery: kyivFullGallery.length
    ? kyivFullGallery
    : cinematicImages.fullGallery,
};

const dmitryMargaritaContext = require.context(
  "../assets/weddings/dmitry-margarita-kremenchug",
  false,
  /\.(png|jpe?g|webp|avif)$/i,
);

const dmitryMargaritaFullGallery = getNumberedGalleryImages(
  dmitryMargaritaContext,
);

export const dmitryMargaritaWeddingImages = {
  cover:
    loadImageFromContext(dmitryMargaritaContext, "cover.jpg") ||
    loadImageFromContext(dmitryMargaritaContext, "hero.jpg") ||
    cinematicImages.cover,
  hero:
    loadImageFromContext(dmitryMargaritaContext, "hero.jpg") ||
    cinematicImages.hero,
  wide1:
    loadImageFromContext(dmitryMargaritaContext, "wide1.jpg") ||
    loadImageFromContext(dmitryMargaritaContext, "wide-1.jpg") ||
    cinematicImages.wide1,
  portrait:
    loadImageFromContext(dmitryMargaritaContext, "portrait.jpg") ||
    loadImageFromContext(dmitryMargaritaContext, "portreit.jpg") ||
    cinematicImages.portrait,
  square:
    loadImageFromContext(dmitryMargaritaContext, "square.jpg") ||
    cinematicImages.square,
  wide2:
    loadImageFromContext(dmitryMargaritaContext, "wide2.jpg") ||
    loadImageFromContext(dmitryMargaritaContext, "wide-2.jpg") ||
    loadImageFromContext(dmitryMargaritaContext, "wide1.jpg") ||
    cinematicImages.wide2,
  finale:
    loadImageFromContext(dmitryMargaritaContext, "finale.jpg") ||
    cinematicImages.finale,
  fullGallery: dmitryMargaritaFullGallery.length
    ? dmitryMargaritaFullGallery
    : cinematicImages.fullGallery,
};

export const odessaLegacyWeddingImages = {
  heroWindmills: odessaWeddingImages.hero,
  seaPortrait: odessaWeddingImages.wide1,
  nataliaDetail: odessaWeddingImages.portrait,
  ceremony: odessaWeddingImages.square,
  brokenGlass: odessaWeddingImages.wide2,
  sunsetOdessa: odessaWeddingImages.finale,
};

export const cinematicLegacyImages = {
  heroDawn: cinematicImages.hero,
  pierScene: cinematicImages.wide1,
  bedPortrait: cinematicImages.portrait,
  decorDetail: cinematicImages.square,
  momentSun: cinematicImages.wide2,
  pierFinale: cinematicImages.finale,
};
