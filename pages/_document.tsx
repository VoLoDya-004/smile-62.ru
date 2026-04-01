import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='ru' dir='ltr'>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='description' content='Современный интернет-магазин для приобритения карандашей' />
        <meta name='keywords' content='Продажа, Карандаши' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta property='og:title' content='Карандаши' />
        <meta property='og:description' content='Интернет-магазин карандашей' />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/images/icons/icon.png' type='image/png' />
        <link   
          rel='preload' 
          href='/fonts/Montserrat/Montserrat-Medium.woff2' 
          as='font' 
          type='font/woff2' 
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Для работы сайта требуется JavaScript</h1>
            <p>Пожалуйста, включите JavaScript в настройках браузера.</p>
          </div>
        </noscript>
      </body>
    </Html>
  )
}