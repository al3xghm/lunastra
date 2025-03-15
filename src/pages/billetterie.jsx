import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/billetterie.module.scss";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Billetterie() {
    const [formData, setFormData] = useState({
        date: '',
        horaire: '',
        amount: '',
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
    
        const formData = {
            date: event.target.date.value,
            horaire: event.target.horaire.value,
            amount: event.target.amount.value,
            prenom: event.target.prenom.value,
            nom: event.target.nom.value,
            email: event.target.email.value,
        };
    
        try {
            const response = await fetch('http://127.0.0.1:8888/lunastra_api/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            
            if (response.ok) {
                // Redirection vers la page de confirmation après une réservation réussie
                window.location.href = '/merci';  // Rediriger vers la page 'merci'
            } else {
                // Redirection vers la page d'erreur en cas de problème
                window.location.href = '/erreur';  // Rediriger vers la page 'erreur'
            }
        } catch (error) {
            console.error('Erreur:', error);
            // Redirection vers la page d'erreur en cas d'erreur réseau
            window.location.href = '/erreur';  // Rediriger vers la page 'erreur'
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.mainContent}>
<div className={styles.twodiv}>
                <Image src="/alberteinstein.jpg" alt="Albert Einstein" width={300} height={300} />
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                <h3>Albert Einstein, à la poursuite de la lumière</h3>
                <p>Entrée gratuite sur réservation (e-ticket)</p>
                </div>
                <div className={styles.formGroup}>
                    <label>
                        Date <span className={styles.required}>*</span>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Horaire <span className={styles.required}>*</span>
                        <input
                            type="time"
                            name="horaire"
                            value={formData.horaire}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    </div>
                    <label>
                        Nombre de visiteurs <span className={styles.required}>*</span>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className={styles.formGroup}>
                    <label>
                        Prénom <span className={styles.required}>*</span>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Nom <span className={styles.required}>*</span>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    </div>
                    <label>
                        Email <span className={styles.required}>*</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
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
