import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/index.module.scss";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <header className={styles.header}>
        <h1 className="aurora">Albert
          <br />Einstein</h1>
        <h2>
          À la poursuite de la lumière
        </h2>
      </header>
      <section className={styles.subheader}>
        <h3>Une exposition immersive aux frontières du savoir</h3>
        <p>
          La chose la plus incompréhensible à propos de l'Univers, c'est qu'il est compréhensible.
        </p>
      </section>
      <section className={styles.teaser}>
        {/* <video className={styles.video}>
          <source src="/videos/teaser.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <img className={styles.video} src="/background.png" alt="Teaser" />
      </section>
      <section className={styles.about}>
        <div className={styles.leftcontent}>
        <h3>A la poursuite de la lumière, une exposition des travaux d’Albert Einstein</h3>
        </div>

        <div className={styles.rightcontent}>
          <p>
            À l’ère des deepfakes et de l'intelligence artificielle générative, la fiabilité de nos perceptions sensorielles est mise à mal. Nous vivons désormais dans une société post-vérité où la frontière entre réalité et illusion s'estompe progressivement. Les technologies de pointe inondent nos flux d'actualités de spéculations non vérifiables, souvent générées par des algorithmes anonymes.
            <br />
            <br />
            Notre présence en ligne est devenue une mise en scène méticuleusement orchestrée, un reflet de la société du selfie. Les réseaux sociaux prospèrent grâce à l'auto-promotion et à la recherche incessante de validation à travers les likes et les abonnés. Le contenu que nous consommons et créons est toujours plus standardisé sous l'effet des influenceurs et des algorithmes, créant une disjonction entre nos personas numériques et nos identités authentiques.
          </p>        
          <h4>
            Tous publics
            <br />
            Entrée gratuite sur réservation
          </h4>
          <Link href="/billetterie
          " className={styles.button}>
            Réservez vos places →
          </Link>
          <div className={styles.image}>
            <Image
              src="/background.png"
              alt="Albert Einstein"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className={styles.bottomleftcontent}>
          <small>
          Albert Einstein, né le 14 mars 1879 à Ulm.
          </small>
        </div>

      </section>
      <Footer />
    </>

  );
}
