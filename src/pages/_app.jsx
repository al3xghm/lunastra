import "@/styles/globals.scss";
import Head from 'next/head'
import "leaflet/dist/leaflet.css";


export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                {/* <link rel="icon" href="/generalimages/blueicon.svg" /> */}
                {/* <link rel="apple-touch-icon" href="/generalimages/blueicon.svg" /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content="fr" />
                <meta name="author" content="Lunastra" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}