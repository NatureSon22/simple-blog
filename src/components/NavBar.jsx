import { useNavigate } from "react-router-dom"
import { useUserContext } from "./UserProvider"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStaylinked } from "@fortawesome/free-brands-svg-icons"
import "../css/navbar.css"

const NavBar = () => {
    const { logIn, setLogIn } = useUserContext();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }

    const handleSignOut = async() => {
        try {
            await signOut(auth);
            setLogIn(false)
            localStorage.clear();
            handleNavigate('/main');
        } catch(e) {
            console.log(e)
        }
    }


    return (
        <header className="blog-header">
            <div className="header-logo flex c-allign">
                <FontAwesomeIcon className="logo" icon={faStaylinked} />
                <p onClick={() => handleNavigate('/main')} className="main-title" >Blog</p>
            </div>

            <nav>
                <ul>
                    {
                        logIn ? 
                            <>
                                <li className="create-btn" onClick={() => handleNavigate('/create-blog')} >Create Blog</li>
                                <li className="blogs-btn" onClick={() => handleNavigate('/my-blogs')}  >My Blogs</li>
                                <li className="out-btn" onClick={handleSignOut} >Log out</li>
                            </>
                            :
                            <>
                                <li className="starter-btn" onClick={() => handleNavigate('/login')} >Get Started</li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default NavBar