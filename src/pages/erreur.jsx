import styles from "@/styles/end.module.scss";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const End = () => {
        const t = useTranslations('home');
    
    return (
        <>
            <Navbar />
            <main className={styles.mainContent}>
            <h1 className="aurora">{t('end.error.title')}</h1>
            <br />
                <h3 className="aurora">{t('end.error.subtitle')}</h3>
                <div className={styles.details}>
                <p>{t('end.error.content1')}</p>
                <p>{t('end.error.content2')}<a href="mailto:lunastra.contact@gmail.com"><strong>lunastra.contact@gmail.com</strong></a></p>

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