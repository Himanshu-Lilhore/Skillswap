import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useAlert } from '../utils/AlertProvider'

export default function RegtdUsers() {
    const [users, setUsers] = useState('⌛')
    const {alert, setAlert} = useAlert()

    useEffect(() => {
        const fetchRegtdUsers = async () => {
            try{
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}home`)

                if(response.status === 200) {
                    setUsers(response.data)
                    console.log("registered users : ", response.data)
                }
            } catch (err) {
                console.error("Couldn't fetch no. of registered users : ", err.message)
                setAlert({
                    message: "Couldn't fetch no. of registered users"
                })
            }
        }

        fetchRegtdUsers()
    }, [])

    return (
        <div className="flex justify-center items-center gap-2 font-grotesk font-medium text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
            </span>
            <span className='font-bold text-brand-600 dark:text-brand-400 tabular-nums'>{users}</span>
            <span>skill-swappers and counting</span>
        </div>
    )
}