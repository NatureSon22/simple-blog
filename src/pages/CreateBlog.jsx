import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "../css/editor.css"
import { modules } from "../util/quil-module"
import Categories from "../components/Categories"
import { useEffect, useState } from "react"
import CategoryContainer from "../components/CategoryContainer"
import { imageDb, db, auth } from "../config/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useUserContext } from "../components/UserProvider"

const CreateBlog = () => {
    const { getPosts, getChosenPost } = useUserContext();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [body, setBody] = useState('');
    const postCollectionRef = collection(db, "posts");
    const navigate = useNavigate();
    const { id } = useParams();
    const post = getChosenPost(id);
    const toUpdate = post ? true : false;
    const { showError, setLabel } = useOutletContext();

    useEffect(() => {
        if (!post) {
            return;
        }

        const { title, categories, blogText } = post;

        setTitle(title);
        setCategoryList(categories);
        setBody(blogText);
    }, [])

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleBlogInputChange = (e) => {
        setBody(e);
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const savedImage = async(folder, image, imgName) => {
        try {
            const imageRef = ref(imageDb, `${folder}/${imgName}` );
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
        } catch (e) {
            throw new Error(e);
        }
    }

    const checkInput = () => {
        if (!body) {
            return "The blog content cannot be empty.";
        }

        if (!title) {
            return "Please provide a title for the blog.";
        }
    
        if (categoryList.length === 0) {
            return "Please select at least one category for the blog.";
        }
    
        if (categoryList.length >= 5) {
            return "Please limit the categories to a maximum of four.";
        }
    
        return null;
    }

    const saveDoc = async (action) => {
        try {
            const errorMessage = checkInput();
            if (errorMessage) {
                throw new Error(errorMessage);
            }
    
            const bannerUrl = image ? await savedImage('files', image, v4()) : null;
            const postData = {
                id: auth.currentUser.uid,
                author: auth.currentUser.displayName,
                email: auth.currentUser.email,
                profile: auth.currentUser.photoURL,
                date: new Date().toLocaleDateString('es-pa'),
                title: title,
                photoBanner: bannerUrl || post.photoBanner,
                categories: categoryList,
                blogText: body,
                status: action,
                upvotes: 0,
                upvoters: []
            };
    
            if (!toUpdate) {
                await addDoc(postCollectionRef, postData);
            } else {
                await updateDoc(doc(postCollectionRef, post.postId), postData);
            }
    
            await getPosts();
            navigate('/main');
        } catch (error) {
            setLabel(error.message);
            showError();
        }
    };

    const cancel = () => {
        navigate("/main");
    }

    return (
        <div className="editor-container grid">
            <h1>Create a Blog Post</h1>
            <div className="editor-label grid">
                <div className="editor-title flex">
                    <p className="title">Title</p>
                    <input className="field-text" type="text" placeholder="Title of the blog" onChange={handleTitle} value={title} />
                </div>
                <div className="editor-image flex">
                    <p className="title">Banner Photo</p>
                    <input className="field-img" type="file" onChange={handleImage} />
                </div>
                <div className="categories-container">
                    <div className="category-list flex">
                        <div className="flex contain title">
                            <p>Categories</p>
                            <Categories setCategoryList={setCategoryList} ></Categories>
                        </div>

                        <div className="flex list">
                            {
                                categoryList.length > 0 &&
                                categoryList.map((category, index) => <CategoryContainer key={index} category={category} setCategoryList={setCategoryList} ></CategoryContainer> )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="editor-form">
                <ReactQuill modules={modules} theme="snow" className="rich-editor" placeholder="Write here..." onChange={handleBlogInputChange} value={body} />
            </div>

            <div className="editor-actions flex">
                <button className="main-btn" onClick={() => saveDoc('publish')} >Publish</button>
                <button className="out-btn" onClick={() => saveDoc('draft')} >Save as Draft</button>
                <button className="out-btn" onClick={cancel} >Cancel</button>
            </div>
        </div>
    )
}

export default CreateBlog