import React, { useState, useEffect } from 'react';
import maleAvatar from '../../assets/avatar/male-default-avatar.png'
import Axios from 'axios'

const UserProfileCard = ({ currProfile, showNext }) => {

    const [isAccepted, setIsAccepted] = useState('')

    function handleAccept() {
        console.log("Handling acceptance.")
        setIsAccepted(true)
    }

    function handleReject() {
        console.log("Handling rejection.")
        setIsAccepted(false)
    }

    useEffect(() => {
        const sendResults = async () => {
            console.log(`isAccepted : ${isAccepted}`) //////
            console.log(`username : ${currProfile.username}`) //////
            if (isAccepted !== '' && currProfile.username !== 'DEFAULT_USERNAME') {
                try {
                    const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}swipe`, {
                        username: currProfile.username,
                        isAccepted: isAccepted
                    })
                    if (response.status === 200) {
                        console.log("Swipe results SUCCESSfully sent to backend.")
                        showNext()
                    }
                } catch (err) {
                    console.error('Sending swipe results to backend FAILED. :', err.message)
                }
            }
            else{
                console.log("isAccepted is blank or Default_user is set.")
            }
        }

        sendResults()

    }, [isAccepted])


    return (
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-10">
            <div className="flex flex-col items-center p-10">
                <div className="flex flex-col items-center p-5">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={maleAvatar}
                        alt="Default avatar"
                    />

                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`@${currProfile.username}`}</h5>

                    <span className="text-sm text-gray-500 dark:text-gray-400">{`${currProfile.fname} ${currProfile.lname}`}</span>
                </div>

                <div className='flex flex-col'>
                    <div>
                        <span className="text-sm text-black dark:text-black font-bold">About : </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{`${currProfile.bio}`}</span>
                    </div>

                    <div>
                        <span className="text-sm text-black dark:text-black font-bold">Skills : </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{`${currProfile.skills}`}</span>
                    </div>

                    <div>
                        <span className="text-sm text-black dark:text-black font-bold">Interests : </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{`${currProfile.interests}`}</span>
                    </div>
                </div>

                <div className="flex mt-4 md:mt-6">
                    <button
                        onClick={handleReject}
                        className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Not interested
                    </button>

                    <button
                        onClick={handleAccept}
                        className="inline-flex items-center px-4 py-2 ms-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Swap Skills
                    </button>

                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;