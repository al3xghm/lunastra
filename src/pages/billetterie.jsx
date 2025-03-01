import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/billetterie.module.scss";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Billetterie() {
    return (
        <>
            <Navbar />
            <header className={styles.header}>
                <h1 className="aurora">Albert
                    <br />Einstein</h1>
                <h2>
                    À la poursuite de la lumière
                </h2>
            </header>
            <Footer />
        </>

    );
}
