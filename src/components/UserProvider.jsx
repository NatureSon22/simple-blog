import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";


const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [logIn, setLogIn] = useState(() => {
        try {
            const storedValue = localStorage.getItem('logIn');
            return storedValue ? JSON.parse(storedValue) : false;
        } catch (error) {
            console.error('Error parsing logIn from localStorage:', error);
            return false;
        }
    });
    const [posts, setPosts] = useState([]);
    const [chosenPost, setChosenPost] = useState({});

    const getPosts = async () => {
        try {
          const dataPosts = await getDocs(collection(db, 'posts'));
          setPosts(dataPosts.docs.map(doc => ({ postId: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
    }

    useEffect(() => {
        setPosts(getPosts)
    }, [])
    
    const getUserPosts = () => {
        const userId = auth.currentUser.uid;
        return posts.filter((post) => post.id === userId);
    }

    const getChosenPost = (postId) => {
        return posts.find((post) => post.postId === postId);
    }

    const value = {
        logIn,
        setLogIn,
        posts,
        getPosts,
        getUserPosts,
        getChosenPost,
        chosenPost,
        setChosenPost,
    };

    return (
        <UserContext.Provider value={value}>
          {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
export default UserProvider;
