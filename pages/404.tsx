import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Custom404() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.codeWrapper}>
          <h1 style={styles.code}>4</h1>
          <div style={styles.zeroWrapper}>
            <div style={styles.zeroInner}>
              <svg
                viewBox="0 0 100 100"
                style={styles.zeroSvg}
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  style={styles.zeroCircle}
                />
              </svg>
              <span style={styles.zeroText}>0</span>
            </div>
          </div>
          <h1 style={styles.code}>4</h1>
        </div>

        <h2 style={styles.title}>Страница не найдена</h2>
        <p style={styles.description}>
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
        </p>

        <div style={styles.actions}>
          <Link href="/" style={styles.button}>
            На главную
          </Link>
          <button
            onClick={() => router.back()}
            style={styles.buttonOutline}
          >
            Вернуться назад
          </button>
        </div>

        <p style={styles.countdown}>
          Автоматический переход через {countdown} секунд...
        </p>
      </div>

      <style jsx>{`
        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @media (max-width: 480px) {
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        }
      `}</style>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    color: 'white',
    maxWidth: '600px',
    width: '100%',
  },
  codeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
  },
  code: {
    fontSize: '80px',
    fontWeight: '800',
    margin: 0,
    lineHeight: 1,
    textShadow: '4px 4px 0 rgba(0,0,0,0.2)',
    animation: 'float 3s ease-in-out infinite',
  },
  zeroWrapper: {
    position: 'relative',
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zeroInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zeroSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    animation: 'drawCircle 1s ease-out forwards',
  },
  zeroCircle: {
    stroke: 'white',
    strokeWidth: 6,
    fill: 'none',
    strokeDasharray: '283',
    strokeDashoffset: '283',
    animation: 'drawCircle 1s ease-out forwards',
  },
  zeroText: {
    fontSize: '56px',
    fontWeight: '800',
    color: 'white',
    position: 'relative',
    zIndex: 1,
    animation: 'float 3s ease-in-out infinite',
    display: 'inline-block',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  description: {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: '24px',
    lineHeight: 1.5,
    padding: '0 10px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'white',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    border: 'none',
    fontSize: '14px',
    display: 'inline-block',
  },
  buttonOutline: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    border: '2px solid white',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.2s',
    fontSize: '14px',
  },
  countdown: {
    fontSize: '12px',
    opacity: 0.8,
    marginTop: '12px',
  },
}
