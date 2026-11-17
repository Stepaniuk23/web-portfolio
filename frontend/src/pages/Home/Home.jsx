import React from "react";
import Seo from "../../i18n/Seo";
import { useT } from "../../i18n/LanguageContext";

import Hero from "../../components/Home/Hero/Hero";
import Studio from "../../components/Home/Studio/Studio";
import Philosophy from "../../components/Home/Philosophy/Philosophy";
/* Импортируем новый блок */
import JournalTeaser from "../../components/Home/JournalTeaser/JournalTeaser";
import AboutTeaser from "../../components/Home/AboutTeaser/AboutTeaser";

import FinalCTA from "../../components/Home/FinalCTA/FinalCTA";

function Home() {
  const t = useT();

  return (
    <>
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        path="/"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://www.denysstepaniuk.com/#business",
            name: "Denys Stepaniuk Photography",
            logo: "https://www.denysstepaniuk.com/icon-512.png",
            telephone: "+420721031650",
            founder: {
              "@type": "Person",
              name: "Denys Stepaniuk",
              jobTitle: "Wedding & Editorial Photographer",
            },
            image:
              "https://www.denysstepaniuk.com/images/weddings/wedding1.jpg",
            url: "https://www.denysstepaniuk.com/",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Prague",
              addressCountry: "CZ",
            },
            areaServed: ["Prague", "Czechia", "Europe"],
            sameAs: [
              "https://www.instagram.com/denysstepanyuk/",
              "https://www.facebook.com/Stepanyuk.Denys",
              "https://www.pinterest.com/denysstepanyuk/",
            ],
            description: t("seo.home.schemaDescription"),
          })}
        </script>
      </Seo>

      <main>
        <Hero />

        <Studio />

        <Philosophy />

        <AboutTeaser />

        <JournalTeaser />

        <FinalCTA />
      </main>
    </>
  );
}

export default Home;
