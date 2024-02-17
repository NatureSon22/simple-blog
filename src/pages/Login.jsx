import { auth, googleProvider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../components/UserProvider"
import "../css/login.css"

const Login = () => {
    const { setLogIn } = useUserContext();
    const navigate = useNavigate();

    const handleClick = async() => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/main');
            localStorage.setItem('logIn', JSON.stringify('true'))
            setLogIn(true);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login-form flex col c-allign">
            <p>
                When you begin with Google, your account will be automatically created. Subsequent logins will be facilitated through your Google account.
            </p>

            <button onClick={handleClick}>{'Get Started'}</button>
        </div>
    )
}

export default Login