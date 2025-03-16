import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/billetterie.module.scss";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Head from "next/head";

export default function Billetterie() {
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

    const increment = () => {
        setFormData((prev) => ({
            ...prev,
            amount: Math.min(10, parseInt(prev.amount, 10) + 1)
        }));
    };

    const decrement = () => {
        setFormData((prev) => ({
            ...prev,
            amount: Math.max(1, parseInt(prev.amount, 10) - 1)
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8888/lunastra_api/index.php', {
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
                <title>Billetterie</title>
            </Head>
            <Navbar />
            <main className={styles.mainContent}>
                <div className={styles.twodiv}>
                    <div className={styles.image}></div>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.header}>
                            <h2>Albert Einstein, à la poursuite de la lumière</h2>
                            <p>Entrée gratuite sur réservation (e-ticket)</p>
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
                                    Horaire <span className={styles.required}>*</span>
                                </div>
                                <select name="horaire" value={formData.horaire} onChange={handleChange} required>
                                    <option value="">Sélectionner l'heure</option>
                                    {Array.from({ length: 9 }, (_, index) => {
                                        const hour = 10 + index;
                                        return (
                                            <option key={hour} value={`${hour < 10 ? '0' : ''}${hour}:00`}>
                                                {`${hour < 10 ? '0' : ''}${hour}:00`}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                        <label>
                            <div>
                                Nombre de visiteurs <span className={styles.required}>*</span>
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
                                    Prénom <span className={styles.required}>*</span>
                                </div>
                                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange}
                                    placeholder="Prénom"
                                    required />
                            </label>
                            <label>
                                <div>
                                    Nom <span className={styles.required}>*</span>
                                </div>
                                <input type="text" name="nom" value={formData.nom} onChange={handleChange}
                                    placeholder="Nom"
                                    required />
                            </label>
                        </div>
                        <label>
                            <div>
                                Adresse mail <span className={styles.required}>*</span>
                            </div>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                                placeholder="example@mail.fr"
                                required />
                        </label>
                        <div className={styles.messageGroup}>
                            <p>Les champs suivis d'un <span className={styles.required}>*</span> sont obligatoires.</p>
                            <br />
                            <p>En confirmant votre commande, vous acceptez les <Link className={styles.link} href="/conditions-generales-de-vente">conditions générales de vente</Link> et le traitement de vos données par l'agence Lunastra. Les galeries ferment 15 minutes avant l’heure officielle. Pour toute question, contactez-nous à l’adresse contact@lunastra.fr.</p>
                        </div>
                        <button className="button" type="submit">
                            Confirmer la réservation →
                        </button>
                    </form>
                </div>
                {message && <p>{message}</p>}
            </main>
            <Footer />
        </>
    );
}
