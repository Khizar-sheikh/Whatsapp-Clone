import { useEffect, useState } from "react";
import "./sidebarchat.css"
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types'
import db from './../firebase/firebase';
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewchat, name, id }) => {

    const [seed, setSeed] = useState()
    const [messages, setMessages] = useState("")

    useEffect(() => {
        db.collection('groups').doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Enter Name For New Chat")
        if (roomName) {
            db.collection("groups").add({
                name: roomName,
            });
        }
    }

    return !addNewchat ? (

        <Link to={`/rooms/${id}`}>
            <div className="SidebarChat" id={id}>
                <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p className="lastmessage">{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div
            onClick={createChat}
            className="SidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

SidebarChat.propTypes = {
    addNewchat: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.any
}

export default SidebarChat