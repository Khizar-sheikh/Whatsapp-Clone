import { Avatar, IconButton } from "@mui/material"
import "./Chat.css"
import { useEffect, useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';

function Chat() {

    const [seed, setSeed] = useState();
    const [input, setInput] = useState("")

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        console.log("You Typed <<<", input);
        setInput(""); // Clear the input field after submitting
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`} />
                <div className="chat__headerinfo">
                    <h3>Room Name</h3>
                    <p>Last seen at ....</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchOutlinedIcon /></IconButton>
                    <IconButton><AttachFileIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className={`chat__message ${false && 'chat__reciver'}`}>
                    <span className="chat__name">
                        John Doe
                    </span>
                    Hey Guys
                    <span className="timestamp">3:52 pm</span>
                </p>
                <p className={`chat__message ${true && 'chat__reciver'}`}>
                    <span className="chat__name">
                        John Doe
                    </span>
                    Hey Guys
                    <span className="timestamp">3:52 pm</span>
                </p>
                <p className={`chat__message ${false && 'chat__reciver'}`}>
                    <span className="chat__name" contentEditable>
                        John Doe
                    </span>
                    Hey Guys
                    <span className="timestamp">3:52 pm</span>
                </p>
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
