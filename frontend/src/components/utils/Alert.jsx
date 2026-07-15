import { useState, useEffect } from 'react';
import { useAlert } from './AlertProvider';

// type can be 'success' or 'warning'
function Alert() {
    const [visible, setVisible] = useState(false)
    const {alert ,setAlert} = useAlert()
    let myTimeout

    useEffect(() => {
        console.log("alert was triggered.")
        if(alert.message === "clear"){
            setVisible(false)
            clearTimeout(myTimeout)
        }
        else if(alert.message){
            setVisible(true)
        } 
        myTimeout = setTimeout(() => {
            setVisible(false)
        }, 6000)

    }, [alert.id])

    const styles = {
        success: 'bg-accent-50/95 dark:bg-accent-900/40 text-accent-800 dark:text-accent-100 ring-accent-500/30',
        warning: 'bg-amber-50/95 dark:bg-amber-900/40 text-amber-800 dark:text-amber-100 ring-amber-500/30',
        error: 'bg-red-50/95 dark:bg-red-900/40 text-red-800 dark:text-red-100 ring-red-500/30',
    }
    const accentBar = {
        success: 'bg-accent-500',
        warning: 'bg-amber-500',
        error: 'bg-red-500',
    }
    const kind = alert.type === 'success' ? 'success' : alert.type === 'warning' ? 'warning' : 'error'

    const handleClose = () => {
        setVisible(false)
    }

    return (
        <>
            {visible && (
                <div className={`fixed top-4 right-4 left-4 sm:left-auto z-50 sm:max-w-md flex items-stretch gap-3 pr-3 rounded-2xl ring-1 ring-inset shadow-card backdrop-blur-xl overflow-hidden animate-fade-in-up ${styles[kind]}`} role="alert">
                    <div className={`w-1.5 ${accentBar[kind]}`}></div>
                    <div className="flex items-center gap-3 py-3.5">
                        <svg className="flex-shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div className="text-sm font-medium">
                            {alert.message}
                        </div>
                    </div>
                    <button type="button" className="ms-auto self-center rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10 inline-flex items-center justify-center h-8 w-8 transition-colors" aria-label="Close" onClick={handleClose}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}

export default Alert;
