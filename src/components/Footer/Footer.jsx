import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import styles from "./Footer.module.scss";
import Image from "next/image";

// Charger Leaflet dynamiquement pour éviter les erreurs SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null); // Initialiser L à null

  useEffect(() => {
    setIsClient(true);

    import('leaflet').then((module) => {
      setL(module); 
    });
  }, []);

  const t = useTranslations('home');

  const customIcon = L
    ? new L.Icon({
        iconUrl: '/pointer.svg', 
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32], 
      })
    : null;

  if (!isClient || !L) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__map}>
        {isClient && (
          <MapContainer center={[48.841, 2.584]} zoom={15} style={{ height: "300px", width: "100%" }} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[48.841, 2.584]} icon={customIcon}>
              <Popup>{t('footer.address')}<br/> 77420 Champs-sur-Marne</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>

      <div className={styles.footer__content}>
        <div className={styles.footer__info}>
          <h3>{t('footer.title')}<br/>{t('footer.title2')}</h3>
          <br /><p>{t('footer.date')}</p>
          <br /><p>{t('footer.address')}<br/> 77420 Champs-sur-Marne</p>
          <br /><p>{t('footer.entryInfo')}</p>
        </div>

        <div className={styles.footer__agency}>
          <h3>{t('footer.exhibitionTitle')}</h3>
          <p>{t('footer.agencyDescription')}</p>

          <div className={styles.footer__socials}>
            <p>{t('footer.socialsTitle')}</p>
            <div className={styles.footer__socials__links}>
            <a href="#" aria-label="Instagram"><Image src="/Instagram.svg" alt="Instagram" width={25} height={25} /></a>
            <a href="#" aria-label="X (Twitter)"><Image src="/X.svg" alt="X" width={25} height={25} /></a>
            <a href="#" aria-label="Email"><Image src="/Mail.svg" alt="Email" width={25} height={25} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <div className={styles.footer__bottom__links}>
        <a href="mentions-legales">{t('footer.legalNotice')}</a>
        <a href="conditions-generales-de-vente">{t('footer.privacyPolicy')}</a>
        </div>
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
