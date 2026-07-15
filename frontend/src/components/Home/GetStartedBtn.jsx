import React from 'react';
import { Link } from 'react-router-dom';
import './GetStartedBtn.css';
import { useAlert } from '../utils/AlertProvider';
import allowcookieGif from '../../assets/allow-cookie-skillswap.gif'

function GetStartedBtn() {
    const { alert, setAlert } = useAlert()

    function handleOnClick() {
        setAlert({
            message: (<div className='py-4 flex flex-col justify-center'><span>Please make sure you <span className='font-bold underline underline-offset-4'>enable cookies</span> for this app to function properly ↖️</span><br /><br /><div className='w-full flex justify-center'><img className='rounded-lg max-w-80 w-auto h-auto' src={allowcookieGif} /></div></div>),
            type: "success"
        })
    }

    return (
        <div className="flex justify-center items-center">
            <Link to="/user/register">
                <button className="getStarted group" onClick={handleOnClick}>
                    Get started
                    <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
            </Link>
        </div>
    );
}

export default GetStartedBtn;
