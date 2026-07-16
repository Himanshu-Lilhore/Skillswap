import React, { useState, useEffect } from 'react';
import maleAvatar from '../../assets/avatar/male-default-avatar.png'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserProfileCard = ({ currProfile, showNext }) => {

    const [exitDir, setExitDir] = useState(null) // 'left' (reject) | 'right' (accept)
    const navigate = useNavigate()

    // Fire-and-forget: record the swipe on the backend without blocking the UI.
    function sendSwipe(isAccepted) {
        if (currProfile.username === 'DEFAULT_USERNAME') return
        Axios.post(`${import.meta.env.VITE_BACKEND_URL}swipe`, {
            username: currProfile.username,
            isAccepted,
        }).catch(err => console.error('Sending swipe result failed:', err.message))
    }

    function decide(isAccepted, dir) {
        if (exitDir) return
        setExitDir(dir)
        // After the fling animation, advance to the next profile immediately and
        // send the result in the background. Advancing in the same tick as the
        // reset means the incoming card never briefly shows the old profile.
        setTimeout(() => {
            sendSwipe(isAccepted)
            setExitDir(null)
            showNext()
        }, 350)
    }

    const handleAccept = () => decide(true, 'right')  // accept flings right
    const handleReject = () => decide(false, 'left')  // reject flings left

    function handleClick() {
        navigate(`/${currProfile.username}`)
    }

    // Safety: clear the exit state whenever a new profile takes the front slot.
    useEffect(() => {
        setExitDir(null)
    }, [currProfile])


    const MAX_PILLS = 6
    const skills = currProfile.skills || []
    const interests = currProfile.interests || []

    const exitClass =
        exitDir === 'left' ? '-translate-x-[135%] -rotate-[16deg]'
        : exitDir === 'right' ? 'translate-x-[135%] rotate-[16deg]'
        : ''

    return (
        // Outer wrapper owns the swipe EXIT transform/transition.
        // (Kept separate from the entrance animation so a filling CSS keyframe
        //  animation doesn't override the exit transform.)
        <div
            key={currProfile.username}
            className={`relative z-10 w-full max-w-md will-change-transform transition-all duration-[350ms] ease-out ${exitClass}`}
        >
            {/* Inner card — fixed height so cards never jump; the entrance animation
                makes it advance forward from the first queued slot. */}
            <div className="card relative overflow-hidden animate-card-advance flex flex-col h-[600px]">

            {/* Big, desaturated decision mark drawn over the card while it swipes away —
                tick for accept (right), cross for reject (left). */}
            <div className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-all duration-200 ${exitDir ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                {exitDir === 'right' &&
                    <div className="flex items-center justify-center w-44 h-44 rounded-full bg-[#5a9184] ring-4 ring-white/25 shadow-xl">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-24 h-24 text-white/95">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                }
                {exitDir === 'left' &&
                    <div className="flex items-center justify-center w-44 h-44 rounded-full bg-[#b07d7d] ring-4 ring-white/25 shadow-xl">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-24 h-24 text-white/95">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </div>
                }
            </div>

            {/* Gradient banner */}
            <div className="h-24 shrink-0 bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 bg-200 animate-gradient-x"></div>

            <div className="flex flex-col items-center px-8 pb-8 -mt-12 flex-1 min-h-0">
                <button onClick={handleClick} className="group shrink-0">
                    <img
                        className="w-24 h-24 mb-3 rounded-full ring-4 ring-white dark:ring-slate-900 shadow-lg object-cover transition-transform duration-200 group-hover:scale-105"
                        src={maleAvatar}
                        alt="Default avatar"
                    />
                </button>

                <button onClick={handleClick} className="shrink-0 text-lg font-grotesk font-semibold text-brand-600 dark:text-brand-400 hover:underline underline-offset-4">{`@${currProfile.username.toLowerCase()}`}</button>

                <span className="shrink-0 text-sm text-slate-500 dark:text-slate-400">{`${currProfile.fname} ${currProfile.lname}`}</span>

                <div className='w-full flex flex-col mt-6 gap-5 flex-1 min-h-0 overflow-hidden'>
                    <div className='flex flex-col'>
                        <span className="eyebrow mb-2">About</span>
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 line-clamp-4">{`${currProfile.bio}`}</p>
                    </div>

                    <div className='flex flex-col'>
                        <span className="eyebrow mb-3">Can teach</span>
                        <div className="flex flex-wrap gap-2">
                            {skills.slice(0, MAX_PILLS).map((element, key) => {
                                return <span key={key} className='pill-skill'>{element}</span>
                            })}
                            {skills.length > MAX_PILLS &&
                                <span className='pill-skill opacity-70'>+{skills.length - MAX_PILLS}</span>
                            }
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <span className="eyebrow mb-3">Want to learn</span>
                        <div className="flex flex-wrap gap-2">
                            {interests.slice(0, MAX_PILLS).map((element, key) => {
                                return <span key={key} className='pill-interest'>{element}</span>
                            })}
                            {interests.length > MAX_PILLS &&
                                <span className='pill-interest opacity-70'>+{interests.length - MAX_PILLS}</span>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-3 mt-4 shrink-0">
                    <button
                        onClick={handleReject}
                        disabled={!!exitDir}
                        className="btn-secondary flex-1"
                    >
                        ✕ Not interested
                    </button>

                    <button
                        onClick={handleAccept}
                        disabled={!!exitDir}
                        className="btn-primary flex-1"
                    >
                        ⇄ Swap Skills
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
