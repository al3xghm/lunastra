import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import '@/styles/globals.scss';
import 'leaflet/dist/leaflet.css';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const { locale } = router;
    const { push } = router;

    useEffect(() => {
        const storedLocale = localStorage.getItem('locale');
        if (storedLocale && storedLocale !== locale) {
            push(window.location.pathname, window.location.search, { locale: storedLocale });
        }
    }, [locale]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content={locale} />
                <meta name="author" content="Lunastra" />
            </Head>
            <NextIntlClientProvider locale={locale} messages={pageProps.messages || {}}>
                <Component {...pageProps} />
            </NextIntlClientProvider>
        </>
    );
}

App.getInitialProps = async ({ ctx }) => {
    const { locale } = ctx;
    let messages = {};

    try {
        messages = require(`../locales/${locale}.json`);
    } catch (error) {
        console.error(`Erreur de chargement des traductions pour "${locale}"`, error);
        messages = require('../locales/fr.json');
    }

    return { pageProps: { messages } };
};
