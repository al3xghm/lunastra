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
    { src: '/slider1.webp', description: 'Description de l’image 1' },
    { src: '/slider2.webp', description: 'Ancien manuscrit rédigé par Albert Einstein' },
    { src: '/slider3.webp', description: 'Chandrasekhar Subrahmanyan devant ses instruments, éclipse de 1919' },
    { src: '/slider4.webp', description: 'Description de l’image 4' },
    { src: '/slider5.webp', description: 'Résidence de Caputh, lieu de réflexion' }
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

    gsap.set(spans, { opacity: 0 });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const isMobile = window.innerWidth <= 768;

      spans.forEach((span, index) => {
        const position = span.getBoundingClientRect().top;
        const triggerPoint = windowHeight - 100; 

        if (position < triggerPoint) {
          gsap.to(span, {
            opacity: 1, 
            duration: 0.8,
            delay: index * 0.2, 
            ease: "power3.out",
          });
        }
      });

      if (!isMobile) {

        const videoPosition = videoElement.getBoundingClientRect().top;
        if (videoPosition < windowHeight && videoPosition > 0) {
          const scale = Math.min(0.1 + (scrollY / windowHeight) * 0.7, 1); 

          gsap.to(videoElement, {
            scale: scale,
            duration: 0.5,
          });
        }
      };
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
        <p>
          {t('subheader.description')}
        </p>
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
          <small>
            {t('about.imgfooter')}
          </small>
        </div>
      </section>
      <section className={styles.experience}>
        <h1 ref={titleRef} className={styles.title}>
          <span>{t('experience.titlePart1')}</span>
          <span>{t('experience.titlePart2')}</span>
          <span className="aurora">{t('experience.titlePart3')}</span>
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
        <p className={styles.carouselsubtitle}>{t('experience.carouselSubtitle')}<b> {t('experience.carouselSubtitle2')}</b></p>
      </section>
      <section className={styles.faq}>
        <div className={styles.faqHeader}>
          <h1>FAQ</h1>
        </div>
        <div className={styles.faqList}>
          {faqData.map((faqKey, index) => (
            <div key={index} className={`${styles.faqItem} ${activeQuestion === index ? styles.active : ''}`}>
              <button onClick={() => toggleAnswer(index)} className={styles.question}>
                {t(`faq.question${faqKey}`)} {/* Access the question via dot notation */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>
              <div className={`${styles.answer} ${activeQuestion === index ? styles.active : ''}`}>
                <p>{t(`faq.answer${faqKey}`)} {/* Access the answer via dot notation */}</p>
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
