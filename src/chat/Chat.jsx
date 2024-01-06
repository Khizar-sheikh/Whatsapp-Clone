import { Avatar, IconButton } from "@mui/material"
import "./Chat.css"
import { useEffect, useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from "react-router-dom";
import db from "../firebase/firebase";
import { useStateValue } from "../Provider/StateProvider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Chat() {

    const [seed, setSeed] = useState();
    const [input, setInput] = useState("")
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [roomMessages, setRoomMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            const unsubscribeGroup = db.collection('groups').doc(roomId).onSnapshot(snapshot => {
                if (snapshot.exists) {
                    setRoomName(snapshot.data().name);

                    const unsubscribeMessages = db.collection("groups").doc(roomId)
                        .collection("messages")
                        .orderBy('timestamp', 'asc')
                        .onSnapshot(snapshot => {
                            const messages = snapshot.docs.map(doc => doc.data());
                            setRoomMessages(messages);
                        }, error => {
                            console.error("Error fetching messages:", error);
                        });

                    return () => {
                        unsubscribeMessages();
                    };
                } else {
                    console.error("Group document not found");
                    setRoomName("");
                }
            }, error => {
                console.error("Error fetching group data:", error);
            });

            return () => {
                unsubscribeGroup();
            };
        }
    }, [roomId]);



    useEffect(() => {
        setSeed(Math.floor(Math.random() * 100 + "jsj" + { seed }));

    }, [roomId])


    const sendMessage = (e) => {
        e.preventDefault();
        setInput("");

        db.collection('groups').doc(roomId).collection('messages').add({
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Corrected spelling
            message: input,
            email: user.email,

        })
            .then((docRef) => {
                console.log("Message sent with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error sending message: ", error);
            });
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`} />
                <div className="chat__headerinfo">
                    <h3>{roomName}</h3>
                    <p className="lastseen">
                        {roomMessages.length === 0 ? "" : `Last seen ${roomMessages.length > 0 && roomMessages[roomMessages.length - 1]?.timestamp?.toDate().toLocaleString()}`}
                    </p>

                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchOutlinedIcon /></IconButton>
                    <IconButton><AttachFileIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className="chat__body">
                {roomMessages.map((message, index) => (
                    <div key={roomId}>
                        <p key={index} className={`chat__message ${message.email === user.email && 'chat__reciever'}`}>

                            <span className="chat__name">
                                {message.name}
                            </span>
                            {message.message}
                            <span className="timestamp">
                                {new Date(message.timestamp?.toDate()).toLocaleString()} {/* Convert Firebase timestamp to JavaScript Date object */}
                            </span>
                        </p>
                    </div>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form onSubmit={sendMessage}>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <IconButton type="submit">
                        <SendIcon />
                    </IconButton>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
