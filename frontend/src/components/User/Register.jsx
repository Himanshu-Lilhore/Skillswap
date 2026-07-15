import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PageHeading from '../utils/PageHeading';
import { useAlert } from '../utils/AlertProvider';
import { useLoading } from '../utils/LoadingProvider';
import RegisterImg from '../../assets/RegisterImg';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { alert, setAlert } = useAlert();
  const { setIsLoading } = useLoading();

  const navigate = useNavigate();

  const validateForm = () => {
    // Validate name
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setAlert({
        message: 'Name should only contain letters.',
        type: 'warning'
      });
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlert({
        message: 'Invalid email address.',
        type: 'warning'
      });
      return false;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{7,}$/;
    if (!passwordRegex.test(password)) {
      setAlert({
        message: 'Password must be at least 7 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character .@$!%*?&',
        type: 'warning'
      });
      return false;
    }

    // Check if passwords match
    if (password !== repeatPassword) {
      setAlert({
        message: 'Passwords do not match.',
        type: 'warning'
      });
      return false;
    }

    // Validate bio
    if (bio.length < 20) {
      setAlert({
        message: 'Bio must be at least 20 characters long.',
        type: 'warning'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/register`, {
        fname: firstName,
        lname: lastName,
        bio: bio,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        navigate("/user/login");
      } else {
        console.log("Redirect not working");
      }

      console.log('Registration successful', response.data);
      setAlert({
        message: "Registration successful.",
        type: 'success'
      });

    } catch (error) {
      console.error('Registration failed', error.message);
      setAlert({
        message: "Failed to register user, please try again."
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-slate-900 dark:text-white px-6 md:px-14 py-10">

      <div className='hidden md:block w-1/2 max-w-lg animate-fade-in-up' style={{ scale: '0.9' }}>
        <RegisterImg />
      </div>

      <div className='card w-full max-w-md p-8 animate-scale-in'>
        <span className="eyebrow">Join the swap</span>
        <PageHeading>Register</PageHeading>

        <div className='w-full'>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="field-input-underline peer"
                placeholder=" "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-brand-600 peer-focus:dark:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="field-input-underline peer"
                placeholder=" "
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-brand-600 peer-focus:dark:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="field-input-underline peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-brand-600 peer-focus:dark:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="field-input-underline peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-brand-600 peer-focus:dark:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              className="field-input-underline peer"
              placeholder=" "
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-brand-600 peer-focus:dark:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <textarea
              placeholder=" "
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="field-input-underline peer"
              required
            ></textarea>
            <label
              htmlFor="bio"
              className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-brand-600 peer-focus:dark:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Bio
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-2"
            onClick={handleSubmit}
          >
            Create account
          </button>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already a member?{' '}
            <Link to="/user/login" className="font-medium text-brand-600 dark:text-brand-400 hover:underline underline-offset-4">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
