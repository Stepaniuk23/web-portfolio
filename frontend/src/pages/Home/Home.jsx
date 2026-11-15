import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../../components/Home/Hero/Hero";
import Studio from "../../components/Home/Studio/Studio";
import Philosophy from "../../components/Home/Philosophy/Philosophy";
/* Импортируем новый блок */
import JournalTeaser from "../../components/Home/JournalTeaser/JournalTeaser";
import AboutTeaser from "../../components/Home/AboutTeaser/AboutTeaser";

import FinalCTA from "../../components/Home/FinalCTA/FinalCTA";

function Home() {
  return (
    <>
      <Helmet>
        <title>
          Denys Stepaniuk | Wedding & Editorial Photographer in Prague
        </title>
        <meta
          name="description"
          content="Professional wedding and editorial photography in Prague and Europe. Fine art style by Denys Stepaniuk."
        />
        <link rel="canonical" href="https://www.denysstepaniuk.com/" />
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
            description:
              "Wedding and editorial photographer based in Prague, Czechia, shooting fine art weddings across Europe.",
          })}
        </script>
      </Helmet>

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
