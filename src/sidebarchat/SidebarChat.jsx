import { useEffect, useState } from "react";
import "./sidebarchat.css"
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types'
const SidebarChat = ({ addNewchat }) => {

    const [seed, setSeed] = useState()

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Enter Name For New Chat")
        if (roomName) {
            // addNewchat(roomName);
        }
    }

    return !addNewchat ? (
        <div className="SidebarChat">
            <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`} />
            <div className="sidebarChat__info">
                <h2>Room Name</h2>
                <p>last message...</p>
            </div>
        </div>
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
}

export default SidebarChat