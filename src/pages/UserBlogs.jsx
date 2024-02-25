import BlogList from "./BlogList"
import { useUserContext } from "../components/UserProvider"

const UserBlogs = () => {
    const { getUserPosts } = useUserContext();
    const filteredPosts = getUserPosts();

    return (
        <> 
            {
                filteredPosts.length > 0 ? 
                <BlogList filteredPosts={filteredPosts} forFilter="true" ></BlogList> 
                :   
                <p className="null-text">No blog posts were found...</p>
            }
        </>
    )
}

export default UserBlogs