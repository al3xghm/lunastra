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

  const handleChangeLanguage = (event) => {
    const newLang = event.target.value;
    localStorage.setItem('locale', newLang);
    setCurrentLang(newLang);
    router.push(router.pathname, router.asPath, { locale: newLang });
  };

  return (
    <div className={styles.switchLanguage}>
      <select value={currentLang} onChange={handleChangeLanguage} className={styles.languageSelect}>
        <option value="fr">🇫🇷  Français</option>
        <option value="en">🇬🇧  English</option>
      </select>
    </div>
  );
};

export default SwitchLanguage;