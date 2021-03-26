import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>WhatsApp 2.0</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <h1>Whatsapp</h1>
        </div>
    );
}
