import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";

// Charger Leaflet dynamiquement pour éviter les erreurs SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__map}>
        {isClient && (
          <MapContainer center={[48.841, 2.584]} zoom={15} style={{ height: "300px", width: "100%" }} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[48.841, 2.584]}>
              <Popup>Exposition Albert Einstein</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>

      <div className={styles.footer__content}>
        <div className={styles.footer__info}>
          <h3>Albert Einstein,<br /> à la poursuite de la lumière</h3>
          <br /><p>25 Mai au 21 Juin 2025</p>
          <br /><p>2 Rue Albert Einstein, <br />77420 Champs-sur-Marne</p>
          <br /><p>Entrée gratuite sur réservation</p>
        </div>

        <div className={styles.footer__agency}>
          <h3>Une exposition immersive exclusive proposée par ★ Lunastra</h3>
          <p>Lunastra est une agence de communication spécialisée dans la culture de l’univers et de l’espace</p>

          <div className={styles.footer__socials}>
            <p>Retrouvez nous sur</p>
            <div className={styles.footer__socials__links}>
            <a href="#" aria-label="Instagram"><Image src="/instagram.svg" alt="Instagram" width={25} height={25} /></a>
            <a href="#" aria-label="X (Twitter)"><Image src="/X.svg" alt="X" width={25} height={25} /></a>
            <a href="#" aria-label="Email"><Image src="/Mail.svg" alt="Email" width={25} height={25} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <div className={styles.footer__bottom__links}>
        <a href="mentions-legales">Mentions légales</a>
        <a href="conditions-generales-de-vente">Conditions générales de vente</a>
        </div>
        <p>© 2025, Lunastra, Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;
