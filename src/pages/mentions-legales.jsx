import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '@/styles/mentions-legales.module.scss';
import Head from 'next/head';

const MentionsLegales = () => {
    return (
        <>
        <Head>
            <title>Mentions légales</title>
            <meta name="description" content="Mentions légales" />
        </Head>
            {/* <Navbar /> */}
            <div className={styles.ml}>
                <section>
                    <article>
                        <h1>Mentions légales</h1>
                        <ul>
                            <li>Nom de l'entreprise  &#160;&#160;—&#160;&#160; Lunastra</li>
                            <li>Statut juridique  &#160;&#160;—&#160;&#160; Association loi de 1901</li>
                            <li>Adresse  &#160;&#160;—&#160;&#160; 2 Rue Albert Einstein, 77420 Champs-sur-Marne</li>
                            <li>Adresse e-mail  &#160;&#160;—&#160;&#160; lunastra.contact@gmail.com</li>
                            <li>Directeur de la publication  &#160;&#160;—&#160;&#160; Alexandre Ghmir</li>
                            <li>Hébergeur  &#160;&#160;—&#160;&#160; VERCEL, dont le siège social est situé VERCEL
                                INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023 Larnaca, Chypre, joignable par le moyen suivant : vercel.com/contact.
                            </li>
                        </ul>
                    </article>
                    <br />
                    <br />
                    <h2>Politique de confidentialité</h2>
                    <p><b> Lunastra est attachée à la protection des données personnelles de ses utilisateurs. Cette politique de confidentialité décrit comment nous collectons, utilisons et partageons les données personnelles que vous nous fournissez.</b></p>
                    <br></br>
                    <h3>Collecte des données personnelles</h3>
                    <p>Nous collectons des données personnelles lorsque vous nous contactez ou réservez un billet. Les données que nous collectons peuvent inclure votre nom, votre prénom ou votre adresse e-mail.</p>
                    <br></br>
                    <h3>Utilisation des données personnelles</h3>
                    <p>Nous utilisons vos données personnelles pour répondre à vos demandes, confirmer vos réservations ou vous informer sur nos services. Nous ne vendons pas vos données personnelles à des tiers.</p>
                    <br></br>
                    <h3>Partage des données personnelles</h3>
                    <p>Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour répondre à une demande spécifique que vous avez formulée.</p>
                    <br></br>
                    <h3>Durée de conservation des données personnelles</h3>
                    <p>Nous conservons vos données personnelles aussi longtemps que nécessaire pour répondre à votre demande. Nous supprimons les données personnelles de nos systèmes dès qu'elles ne sont plus nécessaires.</p>
                    <br></br>
                    <h3>Sécurité des données personnelles</h3>
                    <p>Nous prenons des mesures pour protéger vos données personnelles contre la perte, le vol, l'utilisation abusive ou l'accès non autorisé. Nous utilisons des mesures de sécurité telles que le cryptage des données et la mise en place de politiques de mot de passe robustes pour protéger vos données.</p>
                    <br />

                    <h3>Droit d'accès et de rectification des données personnelles</h3>
                    <p>Vous avez le droit de demander l'accès et la rectification de vos données personnelles. Pour ce faire, veuillez nous contacter à l'adresse e-mail <b>divart.contact@gmail.com</b> ou à l'adresse postale indiquée ci-dessus (voir mentions légales).</p>
                    <br />
                    <h3>Modification de la politique de confidentialité</h3>
                    <p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications apportées seront publiées sur cette page.</p>
                    <br />
                    <br />
                    <h4>Nous contacter</h4>
                    <p>Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou l'utilisation de vos données personnelles, veuillez nous contacter à l'adresse e-mail ou à l'adresse postale indiquée ci-dessus (voir mentions légales).</p>
                </section>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default MentionsLegales;
