import UserProfileCard from "./UserProfileCard";
import Axios from 'axios'
import { defaultUser } from "../utils/defaultUser";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../utils/AlertProvider'
import { useLoading } from "../utils/LoadingProvider";

Axios.defaults.withCredentials = true

// A faded, content-less silhouette shown behind the live card to hint at the deck.
function SkeletonCard() {
    return (
        <div className="card h-full w-full overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-brand-500/40 to-accent-500/40"></div>
            <div className="flex flex-col items-center px-8 pb-8 -mt-12">
                <div className="w-24 h-24 rounded-full ring-4 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                <div className="h-4 w-32 mt-4 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                <div className="h-3 w-24 mt-2 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                <div className="w-full mt-8 space-y-3">
                    <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                    <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                    <div className="flex gap-2 mt-5">
                        <div className="h-7 w-24 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                        <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Swipe() {
    const [currProfile, setCurrProfile] = useState({ ...defaultUser })
    const [potentials, setPotentials] = useState([])
    const [index, setIndex] = useState(-1)
    const navigate = useNavigate()
    const { alert, setAlert } = useAlert()
    const { isLoading, setIsLoading} = useLoading()

    function showNext() {
        console.log(`index = ${index}, list length = ${potentials.length}`)
        console.log("Show next :")
        if (potentials.length === 0) {
            console.log("Potential matches list is empty.")
            setCurrProfile(defaultUser)
        }
        else if (index + 1 === potentials.length) {
            console.log("Reached end of list.")
            setAlert({
                message: "Reached end of list.",
                type: "success"
            })
            setIndex(-1)
            setCurrProfile(defaultUser)
            navigate('/user/profile')
        }
        else {
            console.log(`Setting card to next profile : ${potentials[index + 1].username}`)
            setCurrProfile(potentials[index + 1])
            setIndex(index + 1)
        }
    }

    useEffect(() => {
        async function handleFetch() {
            setIsLoading(true)
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}swipe`)

                if (response.status === 200) {
                    console.log("response data : ", response.data)
                    setPotentials(response.data.potentialMatchesBySkills)
                }
                else if (response.status === 300) {
                    console.log('Redirecting to login page.')
                    setAlert({
                        message: "Redirecting to login page."
                    })
                    navigate('/user/login')
                }
                else {
                    console.log(response.status, ' Error fetching potential matches.')
                    setAlert({
                        message: "Error fetching potential matches."
                    })
                }
            } catch (err) {
                console.error('Fetching profile failed :', err.message)
                setAlert({
                    message: "Unhandled error."
                })
            }
            setIsLoading(false)
        }

        handleFetch()
    }, [])


    useEffect(() => {
        console.log("Potentials updated : ", potentials)
        navigate('/swipe')
        showNext()
    }, [potentials])


    const remaining = Math.max(0, potentials.length - index - 1)

    return (
        <div className="flex items-start justify-center px-4">
            {
                potentials.length > 0 ?
                    <div className="relative w-full max-w-md my-10">
                        {/* Upcoming cards queued to the right, always visible */}
                        {remaining >= 2 &&
                            <div className="pointer-events-none absolute inset-0 z-0 translate-x-16 scale-[0.88] opacity-60" aria-hidden="true">
                                <SkeletonCard />
                            </div>
                        }
                        {remaining >= 1 &&
                            <div className="pointer-events-none absolute inset-0 z-0 translate-x-8 scale-[0.94] opacity-85" aria-hidden="true">
                                <SkeletonCard />
                            </div>
                        }
                        <UserProfileCard currProfile={currProfile} showNext={showNext} />
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] py-10 max-w-md animate-fade-in-up">
                        <div className="text-6xl mb-6 animate-float">🎉</div>
                        <h2 className="page-heading text-2xl md:text-3xl mb-3">You're all caught up</h2>
                        <p className="text-slate-500 dark:text-slate-400">You've run out of potential matches. Check back later, or update your skills &amp; interests to widen your net.</p>
                    </div>
            }
        </div>
    )
}