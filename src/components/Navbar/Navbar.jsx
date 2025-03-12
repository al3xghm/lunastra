import React from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import SwitchLanguage from '../SwitchLanguage/SwitchLanguage';

export const Navbar = () => {

    const t = useTranslations('home');
    return (
        <nav className={styles.navbar}>
            <div className={styles.section}>
                <Link href="/" className={styles.logo}>
                    <img src="/logo.svg" alt="Logo Lunastra" width={50} height={50} />
                </Link>
            </div>
            <div className={styles.section}>
                <p>
                    {t('navbar.date')}
                </p>
            </div>
            <div className={styles.section}>
                <p>
                    2025
                    <br />
                    Champs-sur-Marne
                </p>
            </div>
            <div className={styles.section}>
                <SwitchLanguage />
            </div>

            <div className={styles.links}>
                <Link href="/billetterie">{t('navbar.ticketing')} →</Link>
                <Link href="/expo">{t('navbar.exhibition')} →</Link>
            </div>
        </nav>
    );
}

export default Navbar;
