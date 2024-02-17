import BlogList from "./BlogList"
import { useUserContext } from "../components/UserProvider"

const UserBlogs = () => {
    const { getUserPosts } = useUserContext();
    const filteredPosts = getUserPosts();

    return (
        <BlogList filteredPosts={filteredPosts}></BlogList>
    )
}

export default UserBlogs