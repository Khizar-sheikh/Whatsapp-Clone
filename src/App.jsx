import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './home/Home';
import Chat from './chat/Chat';
import Sidebar from "./sidebar/Sidebar";
import Login from "./Login'/Login";
import { useStateValue } from "./Provider/StateProvider";

function App() {
  const [{ user }] = useStateValue();
  return (
    <div className='app'>
      <div className="app__body">
        {!user ? (
          <Login />
        ) : (
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </Router>
        )}

      </div>
    </div>
  )
}

export default App;
