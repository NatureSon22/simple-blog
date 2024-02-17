import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import UserProvider from "./UserProvider"
import { useEffect, useState } from "react"
import "../css/style.css"
import ErrorLabel from "./ErrorLabel"

const Root = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errLabel, setLabel] = useState("");

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
        <UserProvider>
            <main className="main-wrapper flex col ">
                <NavBar></NavBar>
                <ErrorLabel active={error} label={errLabel} ></ErrorLabel>
                

                <div className="content-wrapper grid center">
                    <Outlet context={{showError, setLabel}}  ></Outlet>
                </div>
            </main>
        </UserProvider>
    )
}

export default Root
