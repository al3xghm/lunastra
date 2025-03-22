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
      <select value={currentLang} onChange={handleChangeLanguage} className={styles.languageSelect} id="languageSelect" aria-label="Select language">
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
      <span className={styles.arrowIcon}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg></span>
    </div>
  );
};

export default SwitchLanguage;