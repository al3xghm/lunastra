import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './SwitchLanguage.module.scss';

const SwitchLanguage = () => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('fr');

  useEffect(() => {
    const storedLang = localStorage.getItem('locale') || router.locale || 'fr';
    setCurrentLang(storedLang);
  }, [router.locale]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('locale', newLang);
    setCurrentLang(newLang);
    router.push(router.pathname, router.asPath, { locale: newLang });
  };

  return (
    <div className={styles.switchLanguage}>
      <button onClick={toggleLanguage} className={styles.languageButton}>
        {currentLang === 'fr' ? '🇫🇷' : '🇬🇧'}
      </button>
    </div>
  );
};

export default SwitchLanguage;
