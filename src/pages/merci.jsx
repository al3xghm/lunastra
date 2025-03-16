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
                <h1 className="aurora">{t('end.thanks.title')}</h1>
                <div className={styles.details}>
                    <p>{t('end.thanks.content1')}</p>
                    <p>{t('end.thanks.content2')}</p>
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
