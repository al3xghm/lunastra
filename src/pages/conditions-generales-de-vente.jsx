import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '@/styles/conditions-generales-de-vente.module.scss';

const MentionsLegales = () => {
    return (
        <>
            {/* <Navbar /> */}
            <div className={styles.cgv}>
                <section>
                    <h1>Conditions Générales de Vente</h1>
                    <p><b>Les présentes conditions générales de vente (CGV) définissent les modalités de distribution et de réservation des billets pour l'exposition d'art gratuite.</b></p>
                    <br />
                    <h3>Gratuité des billets</h3>
                    <p>Les billets pour l'exposition sont gratuits. Ils ne peuvent être vendus mais peuvent être réservés en ligne ou obtenus sur place, sous réserve des places disponibles.</p>
                    <br />
                    <h3>Réservation des billets</h3>
                    <p>La réservation peut être effectuée en ligne sur notre site ou sur celui de l'organisateur. Les billets réservés sont disponibles à l’entrée de l'exposition, imprimés ou sur smartphone.</p>
                    <br />
                    <h3>Conditions d'accès</h3>
                    <p>L’entrée est soumise à la présentation d’un billet valable pour la date et l'heure sélectionnées. L'organisateur peut refuser l’accès en cas de non-respect des règles de sécurité.</p>
                    <br />
                    <h3>Annulation de la visite</h3>
                    <p>En cas d'annulation pour raison de sécurité ou force majeure, les visiteurs seront informés par email ou téléphone. L'organisateur ne pourra être tenu responsable des dommages causés.</p>
                    <br />
                    <h3>Responsabilité</h3>
                    <p>L'organisateur décline toute responsabilité en cas de dommages subis par les visiteurs ou leurs biens lors de l'exposition.</p>
                    <br />
                    <h3>Modification des CGV</h3>
                    <p>Ces CGV peuvent être modifiées à tout moment. Les nouvelles conditions s'appliqueront aux réservations effectuées après publication.</p>
                    <br />
                    <h3>Droit applicable</h3>
                    <p>Les présentes CGV sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents de France.</p>
                </section>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default MentionsLegales;
