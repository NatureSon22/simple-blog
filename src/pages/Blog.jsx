import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import "../css/mainblog.css"
import { useUserContext } from "../components/UserProvider"
import { auth } from "../config/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import ReactQuill from "react-quill"
import { deleteDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Blog = () => {
    const { getChosenPost, getPosts } = useUserContext();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const post = getChosenPost(id);
    const { title, author, date, blogText, categories, photoBanner, profile, upvotes, postId} = post;
    const collectionRef = collection(db, 'posts');
    const { showError, setLabel } = useOutletContext();

    const updateBlog = () => {
        navigate(`/update-blog/${id}`);
    }

    const deleteBlog = async() => {
        try {
            alert('Do you really want to delete this blog?')
            const collectionRef = collection(db, "posts");
            const docRef = doc(collectionRef, id);
            await deleteDoc(docRef);
            await getPosts();
            navigate("/main");
            
        } catch(e) {
            console.log(e);
        }
    }

    const upvoteBlog = async (action) => {
        if(author === auth.currentUser.displayName) {
            setLabel('You cannot upvote your own blog!');
            showError();
            return;
        }

        try {
            const docRef = doc(collectionRef, postId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const post = docSnap.data();
                const upvoters = post.upvoters || [];
    
                const alreadyVoted = upvoters.includes(auth.currentUser.uid);
    
                let updatedUpvotes = post.upvotes || 0;
                let updatedUpvoters = [...upvoters];
    
                if (action === "UP" && !alreadyVoted) {
                    return;
                } else if (action === "DOWN" && !alreadyVoted) {
                    updatedUpvotes--;
                    updatedUpvoters.push(auth.currentUser.uid);
                }
    
                if (alreadyVoted && action === "UP") {
                    updatedUpvotes++;
                    updatedUpvoters = updatedUpvoters.filter(uid => uid !== auth.currentUser.uid);
                }
    
                await updateDoc(docRef, {
                    ...post,
                    upvotes: updatedUpvotes,
                    upvoters: updatedUpvoters
                });
    
                getPosts(); // Assuming this function fetches and updates the list of posts
            } else {
                console.log("Document does not exist!");
            }
        } catch (error) {
            console.error("Error upvoting/downvoting blog:", error);
        }
    };
    
    
    


    return (
        <div className="blog-container grid">
            <div className="header flex col">
                {
                    auth.currentUser?.displayName === author &&
                    <div className="flex user-action">
                        <button className="btn" onClick={updateBlog} >Update</button>
                        <button className="btn" onClick={deleteBlog} >Delete</button>
                    </div>
                }
                <h1>{title}</h1>
                
                <div className="blog-author flex">
                    <div className="author-profile">
                        <img src={profile} alt="" />
                    </div>
                    <p>{`${author} on ${date}`}</p>         
                </div>
            </div>

            <div className="blog-banner">
                <img src={photoBanner} alt="" />
            </div>

            <ReactQuill className="blog-content" value={blogText} readOnly="true" theme="bubble" ></ReactQuill>

            <div className="blog-footer grid">
                <div className="categories flex">
                    <p>CATEGORIES: </p>
                    <div className="list flex">
                        {categories.map((category) => <span key={category} className="category" >#{category}</span>)}
                    </div>
                </div>

                <div className="blog-upvote flex c-allign">
                    <FontAwesomeIcon className="btn-vote"  icon={faThumbsUp} onClick={() => upvoteBlog('UP')} /> 
                    <p>{upvotes}</p>
                    <FontAwesomeIcon className="btn-vote" icon={faThumbsDown} onClick={() => upvoteBlog('DOWN')} /> 
                </div>
            </div>

            <div className="comments">
                <p>Comment section to be implemented...</p>
            </div>
        </div>
    )
}

export default Blog