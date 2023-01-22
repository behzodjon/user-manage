import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', inputs);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section className='h-screen'>
      <div className='h-full px-6 text-gray-800'>
        <div className='flex flex-wrap items-center justify-center h-full xl:justify-center lg:justify-between g-6'>
          <div className='mb-12 grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0'>
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
              className='w-full'
              alt='Sample image1'
            />
          </div>
          <div className='mb-12 xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 md:mb-0'>
            <form>
              <div className='mb-6'>
                <input
                  type='text'
                  name='userName'
                  onChange={handleChange}
                  className='block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  placeholder='UserName'
                />
              </div>
              <div className='mb-6'>
                <input
                  type='text'
                  name='email'
                  onChange={handleChange}
                  className='block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  placeholder='Email address'
                />
              </div>

              <div className='mb-6'>
                <input
                  type='password'
                  className='block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                />
              </div>

              <div className='text-center lg:text-left'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className='inline-block py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                >
                  Register
                </button>
                <p className='pt-1 mt-2 mb-0 text-sm font-semibold'>
                  Do you have an account?
                  <Link
                    to='/login'
                    className='text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700'
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
