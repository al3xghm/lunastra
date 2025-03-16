import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '@/styles/mentions-legales.module.scss';
import { useTranslations } from 'next-intl';

const MentionsLegales = () => {
    const t = useTranslations('home');

    return (
        <>
            <Navbar />
            <div className={styles.ml}>
                <section>
                    <article>
                        <h1>{t('legal.title')}</h1>
                        <meta name="description" content={t('title')} />
                        <ul>
                            <li>{t('legal.company')}  &#160;&#160;—&#160;&#160; {t('legal.status')}</li>
                            <li>{t('legal.address')}</li>
                            <li>{t('legal.email')}</li>
                            <li>{t('legal.director')}</li>
                            <li>{t('legal.host')}</li>
                        </ul>
                    </article>
                    <br />
                    <h2>{t('legal.privacyPolicy.title')}</h2>
                    <p><b>{t('legal.privacyPolicy.description')}</b></p>
                    <br />
                    {t.raw('legal.privacyPolicy.sections').map((section, index) => (
                        <div key={index}>
                            <h3>{section.title}</h3>
                            <p>{section.content}</p>
                            <br />
                        </div>
                    ))}
                </section>
            </div>
            <Footer />
        </>
    );
}

export default MentionsLegales;
