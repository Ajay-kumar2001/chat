import React, { useState } from 'react';
import axios from 'axios'; // Don't forget to import axios

// Import the CSS module
import styles from "../App.css";

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tCode, setTCode] = useState('');
    const [password, setPassword] = useState(''); // Add state for password

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation logic for phone number (assuming it should be 10 digits)
        if (tCode.length !== 10 || !/^\d+$/.test(tCode)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        // Store user details in local storage
        const userDetails = {
            firstName,
            lastName,
            tCode,
            password // Add password to userDetails
        };
        localStorage.setItem('user', JSON.stringify(userDetails));
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/login', {
                tCode,
                password
            });
            localStorage.setItem('user', JSON.stringify(response.data.user));

            console.log('Login successful:', response);
            // Redirect to dashboard or next page
            // Replace '/dashboard' with the actual route
               window.location.href = '/Contacts';
        } catch (error) {
            console.error('Login failed:', error?.response?.data);
            // Handle login failure, such as displaying an error message to the user
        }
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="tCode">Phone Number:</label>
                    <input type="tel" id="tCode" value={tCode} onChange={(e) => setTCode(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
