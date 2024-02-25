import { useNavigate } from "react-router-dom"
import { useUserContext } from "./UserProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStaylinked } from "@fortawesome/free-brands-svg-icons"
import "../css/navbar.css"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const NavBar = ({setShowLogout}) => {
    const { logIn } = useUserContext();
    const navigate = useNavigate();
    const [click, setClick] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
    }

    const logout = async() => {
        setShowLogout(prev => !prev);
    }


    return (
        <header className="blog-header">
            <div className="header-logo flex c-allign">
                <FontAwesomeIcon className="logo" icon={faStaylinked} />
                <p onClick={() => handleNavigate('/main')} className="main-title" >Blog</p>
            </div>

            <button className="mobile-btn" onClick={() => setClick(!click)}>
                <FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>
            </button>

            {
                logIn ?
                <>
                    <nav className={`main-actions ${!click ? 'active' : ''}`}>
                        <ul className="list">
                            <li className="create-btn" onClick={() => handleNavigate('/create-blog')}>Create Blog</li>
                            <li className="blogs-btn" onClick={() => handleNavigate('/my-blogs')}>My Blogs</li>
                            <li className="out-btn" onClick={logout}>Log out</li>
                        </ul>
                    </nav>
                </>
                :
                <li className="starter-btn" onClick={() => handleNavigate('/login')} >Get Started</li>
            }
        </header>
    )
}

export default NavBar