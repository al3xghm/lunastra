import styles from "@/styles/end.module.scss";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const End = () => {
    const t = useTranslations('home');

    return (
        <>
            <Head>
                <title>{t('end.error.title')}</title>
            </Head>
            <Navbar />
            <main className={styles.mainContent}>
                <h1 className="aurora">{t('end.error.title')}</h1>
                <div className={styles.details}>
                    <p>{t('end.error.content1')}</p>
                    <p>{t('end.error.content2')}</p>
                    <p>
                        {t('end.error.content3')}
                        <a href="mailto:contact@lunastra.fr"><strong>contact@lunastra.fr</strong></a>.
                    </p>

                </div>
                <br />
                <br />

                <Link className="button" href="/">
                    {t('end.backtohome')}  →
                </Link>

            </main>
            <Footer />
        </>
    );
}

export default End;