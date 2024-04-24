import React, { useEffect, useState, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { v4 as uuidv4 } from 'uuid';
import Gcon from "./globalContext";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080/chat", {
    auth: { token: "" },
  });

function Chat() {
    const selectedContact = useContext(Gcon);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [reseveList,setResiveList]=useState([])
    console.log(messageList)

    useEffect(() => {
      

        const fetchData = async () => {
            try {
                const userDetailsString = localStorage.getItem('user');
                if (!userDetailsString) {
                    console.log('User details not found in localStorage');
                }
                const userDetails = JSON.parse(userDetailsString);
               
                const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0Q29kZSI6Ijg4ODg4ODg4ODgiLCJwaG9uZU51bWJlciI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE3MTM0MTgxNjEsImV4cCI6MTcxMzUwNDU2MX0.X9pDLgXuRXMRgGJv-4aS6Ktnx5zHQjjpOthA1gPFYTY"
                const response=true 
                if (!response) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                setMessageList(data.data); // Assuming data is an array of messages
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchData();

    }, [selectedContact.id]);

    const sendMessage = async () => {
        let userDetails;

        if (currentMessage !== "") {
            const userDetailsString = localStorage.getItem('user');
            if (userDetailsString) {
                userDetails = JSON.parse(userDetailsString);
                console.log(userDetails)
            } else {
                alert('User details not found in localStorage');
            }
            const data = {
                senderId:userDetails.id,
                receiverId: 15,
                connectionType: "direct"
            };
            socket.emit("join_room", data);
            socket.on("error",(data)=>{console.log("error",data)});

            const messageData = {
                "message": currentMessage,
                "date": new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                "isRight": false,
                "messageType": "text",
                "senderId":userDetails.id,
                "receiverId": 15,
                "connectionType": "direct",
                "roomId":"aca0bafb-7c73-4413-98e6-884c831a77ed",
                "seen": true,
            };
            console.log('sending ', messageData);

            await socket.emit("send_message", messageData);
            socket.on("error",(data)=>{console.log("error",data)});

            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket?.on("receive_message", (data) => {
            console.log("resever fom ",data);
            setMessageList((list) => [...list, data]);
        });
       
        return () => {
            socket?.off("receive_message");

            
        }
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
                <p1 className="user-name">{`${selectedContact.firstname} ${selectedContact.lastname}`}</p1>
            </div>

            <div className="chat-body">

                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (
                            <div
                                className="message"
                                id={!messageContent.right ? "you" : "other"}
                                key={index}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.date}</p>
                                        <p id="author">{messageContent.senderId}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;
