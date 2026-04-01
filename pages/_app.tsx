import type { AppProps } from 'next/app'
import { AppProviders } from '../src/shared/providers/AppProviders'
import 'normalize.css'
import '../src/shared/styles/styles.scss'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        <title>Карандаши</title>
      </Head>
      <AppProviders>
        <Component {...pageProps} />
      </AppProviders>
    </>
  )
}