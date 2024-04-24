import React, { useEffect, useState,useContext } from 'react';
import "../App.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import Gcon from './globalContext';

export default function Contacts() {
  const updateContact =useContext(Gcon)
  console.log(updateContact)
    const [contactsList, setContacts] = useState([]);

    // Fetch data from API
    useEffect(() => {
        async function fetchData() {
            const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0Q29kZSI6Ijg4ODg4ODg4ODgiLCJwaG9uZU51bWJlciI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE3MTM0MTgxNjEsImV4cCI6MTcxMzUwNDU2MX0.X9pDLgXuRXMRgGJv-4aS6Ktnx5zHQjjpOthA1gPFYTY"
            try {
                const response = await axios.get('http://localhost:8080/api/v1/user/get-all-users',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setContacts(response.data.data); // Assuming the response contains the list of contacts
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        }
        fetchData();
    }, []);
 

    // Function to handle contact selection
    const handleContactClick = (contact) => {
      updateContact.updateContact(contact)
    };
    const chatWithService=(data)=>{

updateContact.updateContact(data)
    }
    return (
        <div className="contacts-container">
                  <Link to ="/chat" > <p1 onClick={()=>chatWithService({tCode:"9999999999",firstname:"thapala",lastname:"service"})}>chart with service </p1></Link>

            <h1>Contact List</h1>
            <div className="contact-list">
                {contactsList.map((contact) => (
                    <div key={contact.id} className="contact-item" onClick={() => handleContactClick(contact)}>
                        <div className="user-details">
                            <div className="user-profile" data-initial={contact.firstname.charAt(0)}>{contact.firstname.charAt(0)}</div>
                            <Link to="/chat" className="user-name">{contact.firstname}</Link>
                            <div className="user-lastname">{contact.lastname}</div>
                        </div>
                    </div>
                ))}
            </div>
           
           
        </div>
    );
}
