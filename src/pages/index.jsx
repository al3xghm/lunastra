import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import styles from "@/styles/index.module.scss";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Head from "next/head";
import { useTranslations } from 'next-intl';
import ThreeBackground from "@/components/ThreeBackground";


export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('home');

  const images = [
    { src: '/Mono-Decalage.jpg', description: 'Einstein\'s shift, a demonstration of general relativity through the deflection of light by gravity.' },
    { src: '/Mono-eclipse.jpg', description: 'The 1919 eclipse, a key event that confirmed Einstein\'s general theory of relativity by observing the deflection of light by the Sun.' },
    { src: '/Mono-AnneauEinstein.jpg', description: 'Einstein\'s ring, a gravitational lensing phenomenon that occurs when light from a distant object is bent by a massive foreground object.' },
    { src: '/Mono-TrouNoir.jpg', description: 'Black holes, regions of space where gravity is so strong that not even light can escape.' },
    { src: '/Mono-ProbeB.jpg', description: 'Gravity Probe B, a scientific mission that measured the effects of space-time curvature around Earth.' },
    { src: '/Mono-OndesGR.jpg', description: 'Gravitational waves, ripples in space-time caused by extreme cosmic events, such as black hole mergers.' }
  ];

  const faqData = [1, 2, 3, 4];

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const openModal = (image) => {
    setActiveImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveImage(null);
    setIsModalOpen(false);
  };

  const videoRef = useRef(null);
  const titleRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef.current;
    const spans = titleRef.current.querySelectorAll("span");

    gsap.set(spans, { color: "#999" });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const isMobile = window.innerWidth <= 768;

      spans.forEach((span, index) => {
        const position = span.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (windowHeight * 0.7 - position) / (windowHeight * 0.1)));

        // Ajustement pour atteindre le blanc plus haut
        const adjustedProgress = Math.min(1, progress * 1.5); 

        gsap.to(span, {
          color: `rgb(${adjustedProgress * 255}, ${adjustedProgress * 255}, ${adjustedProgress * 255})`,
          duration: 0.2,
          ease: "power3.out",
        });
      });

      if (!isMobile && videoElement) {
        const videoPosition = videoElement.getBoundingClientRect().top;
        if (videoPosition < windowHeight && videoPosition > 0) {
          const scale = Math.min(0.1 + (scrollY / windowHeight) * 0.7, 1);

          gsap.to(videoElement, {
            scale: scale,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <>
      <Head>
        <title>{t('header.titlepage')}</title>
        <meta name="description" content="Une exposition immersive aux frontières du savoir" />
        <meta name="keywords" content="Albert Einstein, exposition, savoir, lumière" />
      </Head>
      <Navbar />
      <header className={styles.header}>
        <h1 className="aurora">Albert
          <br />Einstein</h1>
        <h2>
          {t('header.subtitle')}
        </h2>
        <ThreeBackground />
      </header>
      <section className={styles.subheader}>
        <h3>{t('subheader.title')}</h3>
        <q>
          {t('subheader.description')}
        </q>
        <p>Albert Einstein, Physics and Reality (1936)</p>
      </section>
      <section className={styles.teaser}>
        <video
          ref={videoRef}  // Ajoutez cette ligne
          className={styles.video} loop controls>
          <source src="/teaser.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
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
          <p>
            {t('about.imgfooter')}
          </p>
        </div>
      </section>
      <section className={styles.experience}>
        <h1 ref={titleRef} className={styles.title}>
          <span>{t('experience.titlePart1')}</span>
          <span>{t('experience.titlePart2')}</span>
          <span>{t('experience.titlePart3')}</span>
          <span>{t('experience.titlePart4')}</span>
        </h1>
        <Image className={styles.video} src="/expovisu.png" alt="Experience" width={500} height={500} />
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
              src={image.src}
              alt="Carousel"
              width={500}
              height={500}
              onClick={() => openModal(image)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
        <div className={styles.carouselsubtitle}>
          <p>{t('experience.carouselSubtitle')}<b> {t('experience.carouselSubtitle2')}</b></p>
        </div>
      </section>
      <section className={styles.faq}>
        <div className={styles.faqHeader}>
          <h1>FAQ</h1>
        </div>
        <div className={styles.faqList}>
          {faqData.map((faqKey, index) => (
            <div key={index} className={`${styles.faqItem} ${activeQuestion === index ? styles.active : ''}`}>
              <button onClick={() => toggleAnswer(index)} className={styles.question}>
                {t(`faq.question${faqKey}`)}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>
              <div className={`${styles.answer} ${activeQuestion === index ? styles.active : ''}`}>
                <p>{t(`faq.answer${faqKey}`)} </p>
              </div>
            </div>
          ))}

        </div>
      </section>
      <Footer />

      {/* Modale d'agrandissement */}
      {isModalOpen && activeImage && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>✕</button>
            <Image
              src={activeImage.src}
              alt="Agrandissement"
              width={800}
              height={800}
            />
            <p className={styles.description}>{activeImage.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
