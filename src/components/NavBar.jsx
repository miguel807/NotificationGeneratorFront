import React, { useState } from 'react';
import CreateNotification from './CreateNotification';
import NotificationList from './NotificationList';

const navigation = [
  { name: 'Create Notification', key: 'create', current: true },
  { name: 'List notifications', key: 'list', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const [selectedKey, setSelectedKey] = useState('create');

  const handleNavClick = (key) => {
    setSelectedKey(key);
  };
  const handleLogout = () => {
   
    localStorage.removeItem('token');

    window.location.href = '/login'; 
  };

  return (
    <>
      <div className="min-h-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-8"
                />
                <span className="text-lg ml-4">Notification generator</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.key}
                      href="#"
                      onClick={() => handleNavClick(item.key)}
                      aria-current={item.key === selectedKey ? 'page' : undefined}
                      className={classNames(
                        item.key === selectedKey ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div>
            <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {selectedKey === 'create' ? 'Create notification' : 'List notifications'}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {selectedKey === 'create' ? (
              <div><CreateNotification/></div>
            ) : (
              <div><NotificationList/></div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
