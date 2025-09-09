'use client';
import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [connectionError, setConnectionError] = useState(null);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        let token;
        try {
            token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            if (!token) {
                setConnectionError('No authentication token found');
                return;
            }
        } catch (e) {
            setConnectionError('Cannot access cookies');
            return;
        }

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(process.env.NEXT_PUBLIC_API_URL_CHATHUB, {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            const startConnection = async () => {
                try {
                    await connection.start();
                    console.log('Connected to SignalR hub');
                    connection.on('ReceiveMessage', (message) => {
                        setNotifications(prev => [...prev, message]);
                    });
                } catch (err) {
                    console.error('SignalR Connection Error:', err);
                    setConnectionError(err.message);
                }
            };

            startConnection();

            return () => {
                if (connection) {
                    connection.off('ReceiveMessage');
                    connection.stop();
                }
            };
        }
    }, [connection]);

    if (connectionError) {
        return <div>Error: {connectionError}</div>;
    }

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationPage;
