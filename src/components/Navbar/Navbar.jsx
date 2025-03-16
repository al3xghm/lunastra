import React from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import SwitchLanguage from '../SwitchLanguage/SwitchLanguage';
import { useState, useEffect } from 'react';
export const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('home');
    return (
        <>
            <Link href="/" className={styles.responsiveLogo}>
                <img src="/logo.svg" alt="Logo Lunastra" width={50} height={50} />
            </Link>
            <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}><svg width="31" height="21" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.375 10.5H28.625M2.375 1.75H28.625M2.375 19.25H28.625" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
            </button>

            {
                isOpen && (
                    <div className={styles.responsiveNavbar}>
                        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.1 21L0 18.9L8.4 10.5L0 2.1L2.1 0L10.5 8.4L18.9 0L21 2.1L12.6 10.5L21 18.9L18.9 21L10.5 12.6L2.1 21Z" fill="#090909" />
                            </svg>

                        </button>
                        <div className={styles.section}>
                            <p>
                                {t('footer.title')}
                                <br />
                                {t('footer.title2')}
                            </p>
                            <p>
                                {t('navbar.date')} 2025
                            </p>

                            <p>
                                Champs-sur-Marne
                            </p>
                        </div>
                        <div className={styles.section}>
                            <SwitchLanguage />

                        </div>

                        <div className={styles.links}>
                            <Link href="/billetterie">{t('navbar.ticketing')} →</Link>
                            <Link href="/exposition">{t('navbar.exhibition')} →</Link>
                        </div>
                    </div>
                )
            }


            <nav className={styles.navbar}>
                <div className={styles.section}>
                    <Link href="/" className={styles.logo}>
                        <img src="/logo.svg" alt="Logo Lunastra" width={50} height={50} />
                    </Link>
                </div>
                <div className={styles.section}>
                    <p>
                        {t('navbar.date')} 2025
                    </p>
                </div>
                <div className={styles.section}>
                    <p>
                        Champs-sur-Marne
                    </p>
                </div>
                <div className={styles.section}>
                    <SwitchLanguage />
                </div>

                <div className={styles.links}>
                    <Link href="/billetterie">{t('navbar.ticketing')} →</Link>
                    <Link href="/exposition">{t('navbar.exhibition')} →</Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
