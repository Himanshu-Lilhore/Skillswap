import { React, useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import DataRow from './DataRow'
import { defaultUser } from './defaultUser'
import { useAlert } from '../../utils/AlertProvider'
import SkillRow from './SkillRow'
import PageHeading from '../../utils/PageHeading'
import { useLoading } from '../../utils/LoadingProvider'

Axios.defaults.withCredentials = true


export default function ViewProfile({ children }) {
    const [userData, setUserData] = useState(defaultUser)
    const navigate = useNavigate()
    const { alert, setAlert } = useAlert()
    const { isLoading, setIsLoading } = useLoading()
    const { username } = useParams()
    // Header-shown + internal fields are hidden from the details grid.
    const fieldsNotToDisplay = ['notifications', 'matches', 'username', 'fname', 'lname', '_id', '__v', 'password', 'matchRequests', 'rejected']

    useEffect(() => {
        console.log("username :" , username)
        const handleFetch = async () => {
            setIsLoading(true)
            if (children) {
                setUsername(children)
                navigate(`/${username}`)
            }
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}${username}`, {
                    username: username
                })

                if (response.status === 200) {
                    console.log('Profile fetched successfully:', response.data)
                    setUserData({
                        ...userData,
                        ...response.data
                    })
                } else {
                    console.log('Fetch not working')
                    setAlert({
                        message: "Couldn't fetch profile."
                    })
                }
                setIsLoading(false)
            } catch (error) {
                console.error('Fetching profile failed:', error.message)
                setAlert({
                    message: "Fetching profile failed",
                    type: "warning"
                })
                setUserData({ ...defaultUser })
                console.log('Redirecting to home page.')
                navigate('/home')
                setIsLoading(false)
            }
            setIsLoading(false)
        }

        if(username)
            handleFetch()
    }, [])


    useEffect(() => {
        console.log('Updated userData:', userData);
    }, [userData])


    return (
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-6">

            <PageHeading>{`@${userData.username.toLowerCase()}`}</PageHeading>

            <div className="card overflow-hidden animate-scale-in">
                {/* Wide header */}
                <div className="relative h-32 md:h-40 bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 bg-200 animate-gradient-x"></div>

                <div className="relative z-10 px-6 md:px-10 pb-8">
                    <div className="flex items-end -mt-12 sm:-mt-14">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl ring-4 ring-white dark:ring-slate-900 bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-grotesk font-bold shadow-lg shrink-0">
                            {userData.username?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                    </div>

                    <div className="mt-5">
                        <h1 className="text-2xl md:text-3xl font-grotesk font-bold leading-tight text-slate-900 dark:text-white">{`${userData.fname} ${userData.lname}`}</h1>
                        <p className="mt-1.5 text-brand-600 dark:text-brand-400 font-medium">{`@${userData.username.toLowerCase()}`}</p>
                    </div>

                    {/* Details grid */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        {Object.keys(userData).map((myKey, itr) => {
                            if (fieldsNotToDisplay.includes(myKey)) return null
                            if (myKey === 'skills' || myKey === 'interests') {
                                return <SkillRow key={itr} dataType={myKey} dataVal={userData[myKey]} />
                            } else {
                                return <DataRow key={itr} dataType={myKey} dataVal={userData[myKey]} />
                            }
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}
