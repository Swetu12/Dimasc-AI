import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#0070f3" />
                <link rel="apple-touch-icon" href="/public/logo.svg" />
                <meta name="description" content="AI Chatbot for Dimasc" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
