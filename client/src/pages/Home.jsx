import React, { useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import trashIcon from '../img/trash-solid.svg';
import UnlockIcon from '../img/unlock-solid.svg';

const Home = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelect = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers([...users]);
    } else {
      setSelectedUsers([]);
    }
  };

  useEffect(() => {
    if (currentUser.status === 'blocked') {
      logout();
    }
    axios
      .get('/auth/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = async () => {
    if (!JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('user')).status === 'blocked') {
      logout();
    }
    try {
      await Promise.all(selectedUsers.map((user) => axios.delete(`auth/users/${user.id}`)));
      if (selectedUsers.find((user) => user.id === currentUser.id)) {
        localStorage.setItem('user', null);
      }
      setSelectedUsers(selectedUsers.filter((user) => !users.includes(user)));
      setUsers(users.filter((user) => !selectedUsers.includes(user)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (val) => {
    if (!JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('user')).status === 'blocked') {
      logout();
    }
    try {
      await Promise.all(selectedUsers.map((user) => axios.put(`/auth/users/${user.id}`, { status: val })));
      setUsers(
        users.map((user) => {
          if (selectedUsers.find((u) => u.id === user.id)) {
            return { ...user, status: val };
          }
          return user;
        })
      );
      if (selectedUsers.find((user) => user.id === currentUser.id)) {
        localStorage.setItem(
          'user',
          JSON.stringify({ ...users.find((user) => user.id === currentUser.id), status: val })
        );
      }
      setSelectedUsers([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='home'>
      <div className='mb-40'>
        {/* navbar */}
        <nav className='relative flex items-center justify-between w-full py-2 bg-white shadow-md navbar navbar-expand-lg'>
          <div className='flex flex-wrap items-center justify-between w-full px-6'>
            <div className='flex items-center lg:ml-auto'>
              {currentUser ? (
                <div className='flex items-center gap-4'>
                  <span>{currentUser.userName}</span>
                  <span>{currentUser.status}</span>
                  <button
                    onClick={logout}
                    className='inline-block px-4 py-3 mr-2 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
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
                    className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
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

        {/* main section */}
        <div className='container px-4 mx-auto mt-16'>
          <div className='mb-4'>User list</div>
          {selectedUsers.length > 0 && (
            <div className='flex justify-end gap-4 mb-4'>
              <button
                className='px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700'
                onClick={() => handleUpdate('blocked')}
              >
                Block
              </button>
              <button onClick={() => handleUpdate('active')}>
                <img src={UnlockIcon} alt='Trash Icon' className='w-4 h-4' />
              </button>
              <button onClick={handleDelete}>
                <img src={trashIcon} alt='Trash Icon' className='w-4 h-4' />
              </button>
            </div>
          )}
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
                                onChange={handleSelectAll}
                                checked={users.length === selectedUsers.length}
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
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
                            Last login time
                          </th>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '>
                            Registred time
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {users.map((user, index) => (
                          <tr key={user.id} onClick={() => handleUserSelect(user)}>
                            <td className='py-3 pl-4'>
                              <div className='flex items-center h-5'>
                                <input
                                  onChange={() => handleUserSelect(user)}
                                  checked={selectedUsers.includes(user)}
                                  type='checkbox'
                                  className='text-blue-600 border-gray-200 rounded focus:ring-blue-500'
                                />
                              </div>
                            </td>

                            <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
                              {index + 1}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.userName}</td>
                            <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.email}</td>
                            <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.status}</td>
                            <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                              {moment(user.lastLoginTime).format('MM/DD/YYYY h:mm:ss a')}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                              {moment(user.registrationTime).format('MM/DD/YYYY')}
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
