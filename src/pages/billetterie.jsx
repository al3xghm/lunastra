import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/billetterie.module.scss";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Head from "next/head";
import { useTranslations } from 'next-intl';

export default function Billetterie() {
    const t = useTranslations('home');

    const [formData, setFormData] = useState({
        date: '',
        horaire: '',
        amount: 1,
        prenom: '',
        nom: '',
        email: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://api.lunastra.ghmir.butmmi.o2switch.site/index.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                window.location.href = '/merci';
            } else {
                window.location.href = '/erreur';
            }
        } catch (error) {
            console.error('Erreur:', error);
            window.location.href = '/erreur';
        }
    };

    return (
        <>
            <Head>
                <title>{t('ticketing.titlepage')}</title>
                <meta name="description" content={t('ticketing.description')} />
            </Head>
            <Navbar />
            <main className={styles.mainContent}>
                <div className={styles.twodiv}>
                    <Image src="/affiche.webp" alt="Billetterie" width={800} height={600} className={styles.image} />
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.header}>
                            <h2>{t('ticketing.title')}</h2>
                            <p>{t('ticketing.subtitle')}</p>
                            <div className={styles.messageGroup}>
                                <span>{t('ticketing.form.warning')} <span className={styles.required}> *</span> {t('ticketing.form.warning2')}</span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                <div>
                                    Date <span className={styles.required}>*</span>
                                </div>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange}
                                        placeholder="jj/mm/aaaa"
                                        required />
                            </label>
                            <label>
                                <div>
                                    {t('ticketing.form.time')} <span className={styles.required}>*</span>
                                </div>
                                <div className={styles.dateSelect}>
                                    <select name="horaire" value={formData.horaire} onChange={handleChange} required>
                                        <option value="">{t('ticketing.form.timeplaceholder')}</option>
                                        {Array.from({ length: 9 }, (_, index) => {
                                            const hour = 10 + index;
                                            return (
                                                <option key={hour} value={`${hour < 10 ? '0' : ''}${hour}:00`}>
                                                    {`${hour < 10 ? '0' : ''}${hour}:00`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <span className={styles.arrowIcon}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg></span>

                                </div>

                            </label>
                        </div>
                        <label>
                            <div>
                                {t('ticketing.form.quantity')} <span className={styles.required}>*</span>
                            </div>
                            <div className={styles.counter}>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, amount: Math.max(1, formData.amount - 1) })}
                                    className={formData.amount === 1 ? styles.disabled : ""}
                                    disabled={formData.amount === 1}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, amount: Math.min(10, formData.amount + 1) })}
                                    className={formData.amount === 10 ? styles.disabled : ""}
                                    disabled={formData.amount === 10}
                                >
                                    +
                                </button>
                            </div>
                        </label>

                        <div className={styles.formGroup}>
                            <label>
                                <div>
                                    {t('ticketing.form.firstname')} <span className={styles.required}>*</span>
                                </div>
                                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange}
                                    placeholder="John"
                                    required />
                            </label>
                            <label>
                                <div>
                                    {t('ticketing.form.name')} <span className={styles.required}>*</span>
                                </div>
                                <input type="text" name="nom" value={formData.nom} onChange={handleChange}
                                    placeholder="Doe"
                                    required />
                            </label>
                        </div>
                        <label>
                            <div>
                                Email <span className={styles.required}>*</span>
                            </div>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                                placeholder="example@mail.fr"
                                required />
                        </label>
                        <div className={styles.messageGroup}>
                            <p>{t('ticketing.form.terms')} <Link className={styles.link} title={t('ticketing.form.termslink')} href="/conditions-generales-de-vente">{t('ticketing.form.termslink')}</Link> {t('ticketing.form.terms2')}</p>
                        </div>
                        <button className="button" type="submit" title={t('ticketing.form.submit')}>
                            {t('ticketing.form.submit')} →
                        </button>
                    </form>
                </div>
                {message && <p>{message}</p>}
            </main>
            <Footer />
        </>
    );
}
