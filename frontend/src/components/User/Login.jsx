import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../utils/PageHeading';
import { useUser } from '../utils/UserProvider'
import { useAlert } from '../utils/AlertProvider';
import { defaultUser } from '../utils/defaultUser';
import { useLoading } from '../utils/LoadingProvider';
import LoginImg from '../../assets/LoginImg';

Axios.defaults.withCredentials = true;


const Login = () => {
    const { userData, setUserData } = useUser({ ...defaultUser })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { alert, setAlert } = useAlert()
    const { setIsLoading } = useLoading()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response
        setIsLoading(true)
        try {
            response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/login`, {
                email: email,
                password: password,
            })

            if (response.status === 200) {
                console.log('Logged in successfully.', response.data)
                setAlert({
                    message: 'Logged in successfully.',
                    type: 'success'
                })
                setUserData({ ...defaultUser, ...response.data })
                navigate("/user/profile")
            }

        } catch (error) {
            console.error('Login failed', error.message);
            if (error.response) {
                if (error.response.status === 404) {
                    setAlert({
                        message: "User does not exist.",
                        type: 'error'
                    });
                } else if (error.response.status === 401) {
                    setAlert({
                        message: "Wrong password or email address.",
                        type: 'error'
                    });
                } else {
                    setAlert({
                        message: "An error occurred. Please try again.",
                        type: 'error'
                    });
                }
            } else {
                setAlert({
                    message: "An error occurred. Please try again.",
                    type: 'error'
                });
            }
        }
        
        setIsLoading(false)
    };

    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-slate-900 dark:text-white px-6 md:px-14 py-10'>
            <div className='hidden md:block w-1/2 max-w-lg animate-fade-in-up' style={{ scale: '1.1' }}>
                <LoginImg />
            </div>

            <form className="card w-full max-w-md p-8 animate-scale-in">

                <span className="eyebrow">Welcome back</span>
                <PageHeading>Login</PageHeading>

                <div className="mb-5">
                    <label htmlFor="email" className="field-label">
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="field-input"
                        placeholder="name@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" aria-autocomplete='' className="field-label">
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="field-input"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn-primary w-full mt-2"
                >
                    Log in
                </button>

                <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    New here?{' '}
                    <Link to="/user/register" className="font-medium text-brand-600 dark:text-brand-400 hover:underline underline-offset-4">
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login
