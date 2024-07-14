import React, { useState } from 'react';
import axios from 'axios';
import {configUrl} from '../config/config'

export default function NotificationList() {
  const [userId, setUserId] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      
      const url = `${configUrl.base}${configUrl.systemNotification}/${userId}/${configUrl.services.notificationsByUser}`
      const response = await axios.get(url, config);
      if (response.data.length > 0) {
        setNotifications(response.data);
        setMessage('');
      } else {
        setNotifications([]);
        setMessage('No user found with the specified ID');
      }
    } catch (error) {
      setNotifications([]);
      setMessage('Error fetching notifications');
    }
  };

  const handleDelete = async (id) => {
    
    try {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          };
      const url = `${configUrl.base}${configUrl.systemNotification}/${id}`
      await axios.delete(url,config);
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      setMessage('Error deleting notification');
    }
  };

const handleMarkAsRead = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const requestOptions = {
      method: 'PATCH',
      headers: headers
    };
    const url = `${configUrl.base}${configUrl.systemNotification}/${id}/${configUrl.services.readNotification}`
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Error marking notification as read');
    }

    setNotifications(notifications.map(notification => notification.id === id ? { ...notification, read: true } : notification));
  } catch (error) {
    setMessage(error.message);
  }
};


  const handleMarkAsUnread = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
  
      const requestOptions = {
        method: 'PATCH',
        headers: headers
      };
      const url = `${configUrl.base}${configUrl.systemNotification}/${id}/${configUrl.services.unreadNotification}`
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        throw new Error('Error marking notification as unread');
      }
  
      setNotifications(notifications.map(notification => notification.id === id ? { ...notification, read: false } : notification));
    } catch (error) {
      setMessage(error.message);
    }
  };
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-3 lg:px-3">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                value={userId}
                onChange={handleUserIdChange}
                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-red-100 text-red-700 py-2 px-4 rounded-lg shadow">
            {message}
          </div>
        </div>
      )}

      {notifications.length > 0 && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Read</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <tr key={notification.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.eventName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.channel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.content}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.read ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(notification.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                      {notification.read ? (
                        <button
                          type="button"
                          onClick={() => handleMarkAsUnread(notification.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Mark as Unread
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Mark as Read
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
