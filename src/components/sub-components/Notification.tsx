import { useEffect } from 'react'


interface INotification {
    message: string
    type: 'success' | 'error'
    onClose: () => void
}


const Notification = ({ message, type, onClose }: INotification) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onClose])

    const styles: React.CSSProperties = {
        width: '200px',
        textAlign: 'center',
        padding: '10px 0',
        margin: '10px auto',
        borderRadius: '4px',
        color: '#fff',
        backgroundColor: type === 'error' ? 'red' : 'black',
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        fontSize: '16px',
        animation: 'slideDown 0.5s ease-out',
    }   
    const styleSheet = `
        @keyframes slideDown {
            0% {
                opacity: 0;
                transform: translateY(-50px) translateX(-50%) ;
            }
            100% {
                opacity: 1;
                transform: translateY(0) translateX(-50%);
            }
        }
    `   
    useEffect(() => {
        const styleTag = document.createElement('style') 
        styleTag.innerHTML = styleSheet
        document.head.appendChild(styleTag)
        return () => {
            document.head.removeChild(styleTag)
        }
    }, [])


    return (
        <div 
            style={styles} 
            role='alert'
        >
            {message}
        </div>
    )
}

export default Notification
