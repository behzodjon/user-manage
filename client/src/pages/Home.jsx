import React, { useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import axios from 'axios';

const Home = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/auth/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(`auth/users/${userId}`)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (userId) => {
    axios
      .put(`/auth/users/${userId}`, { status: 'blocked' })
      .then((response) => {
        // update the state of the user with updated status
        setUsers(
          users.map((user) => {
            if (user.id === userId) {
              return { ...user, status: 'blocked' };
            }
            return user;
          })
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='home'>
      <div class='mb-40'>
        <nav class='navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between'>
          <div class='px-6 w-full flex flex-wrap items-center justify-between'>
            <div class='flex items-center lg:ml-auto'>
              {currentUser ? (
                <div className='flex items-center gap-4'>
                  <span>{currentUser.userName}</span>
                  <button
                    onClick={logout}
                    class='inline-block px-4 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                    data-mdb-ripple='true'
                    data-mdb-ripple-color='light'
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type='button'
                    class='inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
                    data-mdb-ripple='true'
                    data-mdb-ripple-color='light'
                  >
                    Login
                  </button>
                  <button
                    type='button'
                    class='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                    data-mdb-ripple='true'
                    data-mdb-ripple-color='light'
                  >
                    Sign up for free
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className='container px-4 mx-auto mt-16'>
          <div className='mb-4'>User list</div>
          {users.length > 0 && (
            <div className='flex flex-col'>
              <div className='overflow-x-auto'>
                <div className='inline-block w-full align-middle '>
                  <div className='overflow-hidden border rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th scope='col' className='py-3 pl-4'>
                            <div className='flex items-center h-5'>
                              <input
                                id='checkbox-all'
                                type='checkbox'
                                className='text-blue-600 border-gray-200 rounded focus:ring-blue-500'
                              />
                              <label htmlFor='checkbox' className='sr-only'>
                                Checkbox
                              </label>
                            </div>
                          </th>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
                            ID
                          </th>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
                            Name
                          </th>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
                            Email
                          </th>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
                            Status
                          </th>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '>
                            Block
                          </th>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '>
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className='py-3 pl-4'>
                              <div className='flex items-center h-5'>
                                <input
                                  type='checkbox'
                                  className='text-blue-600 border-gray-200 rounded focus:ring-blue-500'
                                />
                                <label htmlFor='checkbox' className='sr-only'>
                                  Checkbox
                                </label>
                              </div>
                            </td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>{user.id}</td>
                            <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.userName}</td>
                            <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.email}</td>
                            <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.status}</td>
                            <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                              <button className='text-red-500 hover:text-red-700' onClick={() => handleUpdate(user.id)}>
                                Block
                              </button>
                            </td>
                            <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                              <button className='text-red-500 hover:text-red-700' onClick={() => handleDelete(user.id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
