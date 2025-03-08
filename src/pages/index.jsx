import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/index.module.scss";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Head from "next/head";
import { useTranslations } from 'next-intl';

const images = [
  '/logo.png',
  '/logo.png',
  '/logo.png',
  '/logo.png',
  '/logo.png'
];

const faqData = [
  {
    question: 'Quelle est la durée de l\'exposition ?',
    answer: 'La durée de l\'exposition est d\'environ 1 heure, mais vous pouvez y passer plus de temps selon votre intérêt.'
  },
  {
    question: 'Faut-il réserver à l\'avance ?',
    answer: 'Oui, l\'entrée est gratuite mais la réservation est obligatoire.'
  },
  {
    question: 'Quels sont les horaires d\'ouverture ?',
    answer: 'L\'exposition est ouverte tous les jours de 10h à 18h.'
  },
  {
    question: 'Quel est le tarif de l\'entrée ?',
    answer: 'L\'entrée est gratuite.'
  }
];


export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const t = useTranslations('home');
  
  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index); 
  };

  return (
    <>
      <Head>
        <title>Albert Einstein, à la poursuite de la lumière</title>
        <meta name="description" content="Une exposition immersive aux frontières du savoir" />
      </Head>
      <Navbar />
      <header className={styles.header}>
        <h1 className="aurora">Albert
          <br />Einstein</h1>
        <h2>
         {t('header.subtitle')}
        </h2>
      </header>
      <section className={styles.subheader}>
        <h3>{t('subheader.title')}</h3>
        <p>
          {t('subheader.description')}
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
          <h3>À la poursuite de la lumière, une exposition des travaux d’Albert Einstein</h3>
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
          " className="button">
            Réservez vos places →
          </Link>
          <div className={styles.image}>
            <Image
              src="/alberteinstein.jpg"
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
      <section className={styles.experience}>
        <h1 className={styles.title}>
          <span>
            Plongez-vous
          </span>
          <span>
            au cœur d'une
          </span>
          <span>
            expérience
          </span>
          <span>immersive</span>
        </h1>
        <Image className={styles.video} src="/background.png" alt="Experience" width={500} height={500} />
        <div className={styles.description}>
          <p>
            <b>
              L'exposition "À la poursuite de la lumière" vous invite à explorer les travaux d'Albert Einstein à travers une expérience immersive et interactive.
            </b>

            <br />
            <br />
            Plongez-vous au cœur de la relativité générale et de la théorie des quanta, et découvrez les révolutions scientifiques qui ont marqué le XXe siècle.
          </p>
          <Link href="/exposition" className="button">
            Découvrir l'exposition interactive →
          </Link>
        </div>
        <div className={styles.carousel}>
          {images.map((image, index) => (
            <Image
              className={styles.card}
              key={index}
              src={image}
              alt="Carousel"
              width={500}
              height={500}
            />
          ))}
        </div>
        <p className={styles.carouselsubtitle}>Venez vivre les découvertes d’Albert Einstein à travers une exposition immersive, <b>à quelques minutes de Paris</b></p>
      </section>
      <section className={styles.faq}>
        <div className={styles.faqHeader}>
          <h1>FAQ</h1>

        </div>
        <div className={styles.faqList}>

          {
            faqData.map((faq, index) => (
              <div key={index} className={`${styles.faqItem} ${activeQuestion === index ? styles.active : ''}`}>
                <button onClick={() => toggleAnswer(index)} className={styles.question}>
                  {faq.question} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </button>
                <div
                  className={`${styles.answer} ${activeQuestion === index ? styles.active : ''}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <Footer />
    </>
  );
}
