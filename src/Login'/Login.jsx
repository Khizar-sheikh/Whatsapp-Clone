import { Button } from "@mui/material"
import "./Login.css"
import { auth, provider } from "../firebase/firebase"
import { actionTypes } from "../Provider/reducer"
import { useStateValue } from "../Provider/StateProvider"
import { useState } from "react"

function Login() {
    const [{ }, dispatch] = useStateValue();
    const [error, setError] = useState("")
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            }).catch((error) => {
                setError(error.message)
            })

    }

    return (
        <div className="Login">
            <div className="login__container">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUKaHnFAPJC8_pNovY0Tnp23JqM-w3cpP6OMm_1lmcAfCPl8m"
                    alt="" />
                <div className="login__text">
                    <h1>Sign In to WhatsApp</h1>
                </div>

                <Button type="submit" onClick={signIn} >
                    Sign In With Google
                </Button>
                <p style={{ color: "red", fontSize: "small" }}>{error}</p>
            </div>
        </div>
    )
}

export default Login