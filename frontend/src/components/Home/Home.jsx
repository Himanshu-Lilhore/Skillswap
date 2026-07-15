import { useEffect } from 'react'
import GetStartedBtn from './GetStartedBtn'
import { defaultUser } from '../utils/defaultUser'
import Axios from 'axios'
import { useAlert } from '../utils/AlertProvider'
import { checkToken } from '../utils/checkToken'
import { useUser } from '../utils/UserProvider'
import { useLoading } from '../utils/LoadingProvider'
import MainHeading from './MainHeading'
import RegtdUsers from './RegtdUsers'
import Slogan from './Slogan'

export default function Home() {
    const { alert, setAlert } = useAlert()
    const { userData, setUserData } = useUser()
    const { setIsLoading } = useLoading()

    useEffect(() => {
        const logoutPrevUser = async () => {
            if (checkToken()) {
                setIsLoading(true)
                const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`)
                if (response.status === 200) {
                    setUserData({ ...defaultUser })
                    console.log("Previous user logged out.")
                }
                setIsLoading(false)
            }
        }

        logoutPrevUser()
    }, [])

    return (
        <>
            <div className='flex flex-col items-center select-none px-6 py-10 md:py-20'>

                <span className='eyebrow mb-6 animate-fade-in-up'>Learn something. Teach something.</span>

                <div className='animate-fade-in-up' style={{ animationDelay: '60ms' }}>
                    <MainHeading />
                </div>

                <div className='mt-6 animate-fade-in-up' style={{ animationDelay: '140ms' }}>
                    <Slogan />
                </div>

                <div className='flex flex-col items-center gap-6 mt-10 animate-fade-in-up' style={{ animationDelay: '220ms' }}>
                    <GetStartedBtn />
                    <RegtdUsers />
                </div>

            </div>
        </>
    )
}