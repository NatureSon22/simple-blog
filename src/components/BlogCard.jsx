import { arrayRemove, arrayUnion, collection, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import "../css/blogcard.css"
import { useUserContext } from "./UserProvider"
import { db, auth } from "../config/firebase";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faShareSquare } from "@fortawesome/free-solid-svg-icons";

const BlogCard = ({ post }) => {
    const { logIn, getPosts } = useUserContext();
    const { author, profile, title, date, photoBanner, upvotes, postId } = post
    const navigate = useNavigate();
    const collectionRef = collection(db, "posts");
    const { showError, setLabel } = useOutletContext();


    const formatTitle = () => {
        const length = title.length;
        return length > 60 ? `${title.slice(0, 60)}...` : title;
    }

    const upvote = async(e) => {
        e.stopPropagation();

        if(!logIn) {
            setLabel("You must login to upvote!")
            showError()
            return
        }

        if (author === auth.currentUser?.displayName) {
            setLabel("You cannot upvote your own blog!")
            showError()
            return;
        }

        try {
            const docRef = doc(collectionRef, postId);
            const docSnap = await getDoc(docRef);
            const post = docSnap.data();
            const alreadyVoted = post.upvoters.includes(auth.currentUser.uid);

            await updateDoc(doc(collectionRef, postId), {
                ...post,
                upvotes: !alreadyVoted ? increment(1) : increment(-1),
                upvoters: !alreadyVoted ? arrayUnion(auth.currentUser.uid) : arrayRemove(auth.currentUser.uid)
            });
            getPosts();
        } catch (e) {
            setLabel("An error has occured");
            showError()
        }
    }

    const readBlog = () => {
        navigate(`/blog/${postId}`);
    }

    const shareBlog = async(e) => {
        e.stopPropagation();

        setLabel("This feature is not yet implemented");
        showError()
    }

    return (
        <div className="blog-card flex col" onClick={readBlog}>
            <div className="blog-info">
                <div className="profile">
                    <img src={profile} alt="" />
                </div>
                <p className="title">{formatTitle()}</p>
            </div>
 
            <div className="banner-info">
                <p className="date" >{date}</p>
                <div className="banner">
                    <img src={photoBanner} alt="" loading="lazy" />
                </div>
            </div>

            <div className="blog-actions flex c-allign">
                <div className="upvotes flex c-allign">
                    <FontAwesomeIcon onClick={upvote} icon={faThumbsUp} className="action-btn" />
                    <p>{upvotes > 0 && upvotes}</p>
                </div>
                <FontAwesomeIcon onClick={shareBlog} icon={faShareSquare} className="action-btn" />
            </div>
        </div>
    )
}

export default BlogCard