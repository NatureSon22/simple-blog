import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import UserProvider, { useUserContext } from "./UserProvider"
import { useEffect, useState } from "react"
import "../css/style.css"
import ErrorLabel from "./ErrorLabel"
import Modal from "./Modal"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"

const Root = () => {
    const navigate = useNavigate();
    const { setLogIn } = useUserContext();
    const [error, setError] = useState(false);
    const [errLabel, setLabel] = useState("");
    const [showLogut, setShowLogout] = useState(false);

    useEffect(() => {
        navigate("/main");
    }, [])

    const showError = () => {
        setError(() => {
            const err = !error;

            setTimeout(() => {
                setError(!err)
            }, 1500)

            return err
        })
    }

    const handleSignout = async() => {
        try {
            await signOut(auth);
            setLogIn(false)
            localStorage.clear();
            setShowLogout(prev => !prev);
            navigate('/main');
        } catch(e) {
            console.log(e)
        }
    }

    // - [] FIX UI
    // - [] comment section
    // - [/] upvote - but is slow due to update
    // - [] share (link of the article)
    // - [/] delete blog
    // - [/] update blog
    // - [] fiter based on categories
    // - [] search article name???
    // - [/] flag blog as published / draft
    // - [] enable publish if it is a draft
    // - [/] blog interface when clicked || cleanup

    // errors
    // - [] order of the articles


    return (  
        <main className="main-wrapper flex col ">
            <NavBar setShowLogout={setShowLogout} ></NavBar>
            <ErrorLabel active={error} label={errLabel} onOk={() => {}} ></ErrorLabel>
            
            <Modal message="Do you want to log out?" showModal={showLogut} setShowModal={setShowLogout} onOK={handleSignout} ></Modal>
            <div className="content-wrapper grid center">
                <Outlet context={{showError, setLabel}} ></Outlet>
            </div>
        </main>
    )
}

export default Root;