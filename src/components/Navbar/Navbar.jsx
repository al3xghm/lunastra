import React from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.section}>
                <Link href="/" className={styles.logo}>
                    <img src="/logo.svg" alt="Logo Lunastra" width={50} height={50} />
                </Link>
            </div>
            <div className={styles.section}>
                <p>
                    25 Mai
                    <br />
                    - 21 Juin
                </p>
            </div>
            <div className={styles.section}>
                <p>
                    2025
                    <br />
                    Champs-sur-Marne
                </p>
            </div>

            <div className={styles.links}>
                <Link href="/billetterie">Billetterie →</Link>
                <Link href="/expo">Exposition interactive →</Link>
            </div>
        </nav>
    );
}

export default Navbar;
