import { React, useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DataRow from './DataRow'
import { useUser } from '../../utils/UserProvider'
import { defaultUser } from '../../utils/defaultUser'
import { useAlert } from '../../utils/AlertProvider'
import SkillRowEdit from './SkillRowEdit'
import PageHeading from '../../utils/PageHeading'
import { useLoading } from '../../utils/LoadingProvider'

Axios.defaults.withCredentials = true

export default function ProfileUpdate() {
    const { userData, setUserData } = useUser()
    const [preSaveUserData, setPreSaveUserData] = useState({ ...userData })
    const { alert, setAlert } = useAlert()
    const { setIsLoading } = useLoading()
    const navigate = useNavigate()
    const fieldsNotToDisplay = ['notifications', 'matches', '_id', '__v', 'password', 'matchRequests', 'rejected']

    useEffect(() => {
        const handleFetch = async () => {
            setIsLoading(true)
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}user/profile`)

                if (response.status === 200) {
                    console.log('Profile fetched successfully:', response.data)
                    setUserData({
                        ...userData,
                        ...response.data
                    })
                    setPreSaveUserData({
                        ...userData,
                        ...response.data
                    })
                } else {
                    console.log('Fetch not working')
                }
            } catch (error) {
                // Use optional chaining — a network/CORS error has no `.response`,
                // and reading `.response.status` directly would throw and leave the
                // loading overlay stuck (blank page).
                const status = error?.response?.status
                console.error('Fetching profile failed:', error?.response?.data || error.message)
                if (status === 400 || status === 401 || status === 403) {
                    console.log('Token invalid/expired — redirecting to login.')
                    setUserData({ ...defaultUser })
                    navigate('/user/login')
                }
            } finally {
                setIsLoading(false)
            }
        }

        handleFetch()
    }, [])


    useEffect(() => {
        console.log('Updated userData:', userData)
        setPreSaveUserData({ ...userData })
    }, [userData])


    const handleClick = async () => {
        setUserData({
            ...userData,
            ...preSaveUserData
        })
        try {
            const response = await Axios.put(`${import.meta.env.VITE_BACKEND_URL}user/profile-update`, preSaveUserData)
            console.log(response)
            if (response.status === 200) {
                console.log("Updated profile successfully.")
                setAlert({
                    message: "Updated profile successfully.",
                    type: 'success'
                })
            }
            navigate('/user/profile')
        } catch (error) {
            console.error('Error updating profile:', error)
            setAlert({
                message: "Error updating profile."
            })
        }

    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-6">

            <PageHeading>Edit Profile</PageHeading>

            <div className="card mb-5 p-6 md:p-10 animate-scale-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {Object.keys(userData).map((myKey) => {
                        // Key includes the username so rows remount once the real
                        // profile replaces the default — otherwise SkillRowEdit keeps
                        // its initial (empty) skill list.
                        const rowKey = `${userData.username}-${myKey}`
                        if (myKey === 'skills' || myKey === 'interests') {
                            return <SkillRowEdit
                                key={rowKey}
                                dataType={myKey}
                                dataVal={userData[myKey]}
                                preSaveUserData={preSaveUserData}
                                setPreSaveUserData={setPreSaveUserData}
                            />
                        } else if (!fieldsNotToDisplay.includes(myKey)) {
                            return <DataRow
                                key={rowKey}
                                dataType={myKey}
                                dataVal={userData[myKey]}
                                preSaveUserData={preSaveUserData}
                                setPreSaveUserData={setPreSaveUserData}
                            />
                        }
                    })}
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button onClick={() => navigate('/user/profile')} className='btn-secondary btn-lg'>Cancel</button>
                    <button onClick={handleClick} className='btn-accent btn-lg'>💾 Save changes</button>
                </div>
            </div>
        </div>
    )
}
