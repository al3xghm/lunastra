import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/index.module.scss";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Head from "next/head";
import SwitchLanguage from "@/components/SwitchLanguage/SwitchLanguage.jsx";
import { useTranslations } from 'next-intl';

const images = [
  '/logo.png',
  '/logo.png',
  '/logo.png',
  '/logo.png',
  '/logo.png'
];

export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const t = useTranslations('home');

  const faqData = t('faq', { default: {} });

  const limitedFaqData = Object.keys(faqData).slice(0, 4); 

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index); 
  };



  return (
    <>
      <Head>
        <title>Albert Einstein, à la poursuite de la lumière</title>
        <meta name="description" content="Une exposition immersive aux frontières du savoir" />
      </Head>
      <SwitchLanguage />
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
        <img className={styles.video} src="/background.png" alt="Teaser" />
      </section>
      <section className={styles.about}>
        <div className={styles.leftcontent}>
          <h3>{t('about.sectionTitle')}</h3>
        </div>

        <div className={styles.rightcontent}>
          <p>
            {t('about.paragraph')}
          </p>
          <h4>
            {t('about.allaudience')}
            <br />
            {t('about.ticketInfo')}
          </h4>
          <Link href="/billetterie" className="button">
            {t('about.reserveButton')} →
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
            {t('about.imgfooter')}
          </small>
        </div>
      </section>
      <section className={styles.experience}>
        <h1 className={styles.title}>
          <span>{t('experience.titlePart1')}</span>
          <span>{t('experience.titlePart2')}</span>
          <span>{t('experience.titlePart3')}</span>
          <span>{t('experience.titlePart4')}</span>
        </h1>
        <Image className={styles.video} src="/background.png" alt="Experience" width={500} height={500} />
        <div className={styles.description}>
          <p>
            <b>{t('experience.descriptionTitle')}</b>
            <br />
            <br />
            {t('experience.descriptionBody')}
          </p>
          <Link href="/exposition" className="button">
            {t('experience.exploreButton')} →
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
        <p className={styles.carouselsubtitle}>{t('experience.carouselSubtitle')}<b> {t('experience.carouselSubtitle2')}</b></p>
      </section>
      <section className={styles.faq}>
        <div className={styles.faqHeader}>
          <h1>FAQ</h1>
        </div>
        <div className={styles.faqList}>
        {limitedFaqData.map((faq, index) => (
          <div key={index} className={`${styles.faqItem} ${activeQuestion === index ? styles.active : ''}`}>
            <button onClick={() => toggleAnswer(index)} className={styles.question}>
              {t(`faq.${faq}.question`)}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
              </svg>
            </button>
            <div className={`${styles.answer} ${activeQuestion === index ? styles.active : ''}`}>
              <p>{t(`faq.${faq}.answer`)}</p>
            </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
