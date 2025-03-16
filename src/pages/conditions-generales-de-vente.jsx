import React from 'react';
import styles from '@/styles/conditions-generales-de-vente.module.scss';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar/Navbar';
import Head from 'next/head';
import Footer from '@/components/Footer/Footer';

const ConditionsGeneralesDeVente = () => {
    const t = useTranslations('home.cgv');

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>
            <Navbar />
            <div className={styles.cgv}>
                <section>
                    <h1>{t('title')}</h1>
                    <meta name="description" content={t('title')} />

                    <p><b>{t('intro')}</b></p>
                    <br />
                    {t.raw('sections').map((section, index) => (
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

export default ConditionsGeneralesDeVente;
