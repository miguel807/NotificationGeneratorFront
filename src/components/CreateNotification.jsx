import React, { useState } from 'react';
import axios from 'axios';
import {configUrl} from '../config/config'

const NotificationChannel = {
  EMAIL: 'EMAIL',
  SYSTEM: 'SYSTEM',
  PUSH: 'PUSH',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
};

const NotificationType = {
  INSTANT: 'INSTANT',
  BATCH: 'BATCH',
};

export default function CreateNotification() {
  const [deliveryMethod, setDeliveryMethod] = useState(NotificationChannel.EMAIL);
  const [message, setMessage] = useState('');

  const handleDeliveryMethodChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const formData = new FormData(e.target);
      const notificationData = {
        eventName: formData.get('eventName'),
        content: formData.get('content'),
        createdAt: new Date(formData.get('createdAt')),
        read: false,
        channel: formData.get('channel'),
        type: formData.get('type'),
        userId: formData.get('userId'),
        email: formData.get('email'),
      };
      const url = `${configUrl.base}${configUrl.notification}`
      const response = await axios.post(url, notificationData, { headers });

      setMessage('Notification created successfully');
    } catch (error) {
      setMessage('Error creating notification');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-3 lg:px-3">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                id="eventName"
                name="eventName"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-600 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                Created At
              </label>
              <input
                id="createdAt"
                name="createdAt"
                type="datetime-local"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

          

            <div>
              <label htmlFor="channel" className="block text-sm font-medium text-gray-700">
                Delivery Channel
              </label>
              <select
                id="channel"
                name="channel"
                value={deliveryMethod}
                onChange={handleDeliveryMethodChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {Object.values(NotificationChannel).map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
            </div>

            {deliveryMethod === NotificationChannel.EMAIL && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            )}

            {deliveryMethod === NotificationChannel.SYSTEM && (
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  User Identifier (UUID)
                </label>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            )}

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Notification Type
              </label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {Object.values(NotificationType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send notification
              </button>
            </div>
          </form>
        </div>
       <span> {message && <p className={`text-${message.startsWith('Error') ? 'red' : 'green'}-500`}>{message}</p>}</span>
      </div>
    </div>
  );
}
