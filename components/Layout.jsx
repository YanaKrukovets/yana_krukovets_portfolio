import React from 'react';
import Head from 'next/head';
import HeaderBanner from './HeaderBanner';

const Layout = ({children}) => {
    return (
        <div className="layout">
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
                <title>Yana Krukovets portfolio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <HeaderBanner />
            </header>
            <main >
                {children}
            </main>
            <footer className="purple">&copy;Yana Krukovets, 2022</footer>
        </div>
    );
}

export default Layout;