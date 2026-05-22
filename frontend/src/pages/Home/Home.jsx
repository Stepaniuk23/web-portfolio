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
