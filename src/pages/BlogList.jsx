import BlogCard from "../components/BlogCard"
import "../css/bloglist.css"
import { useUserContext } from "../components/UserProvider"

const BlogList = ({ filteredPosts, forFilter = false }) => {
    const { posts } = useUserContext();
    const collectedPosts = filteredPosts || posts;

    return (
        <div className="bloglist-container grid">
          {
            collectedPosts.length > 0
                ? collectedPosts.map((post, index) => <BlogCard key={index} post={post}></BlogCard>)
                : !forFilter && 'Loading'
        }

        </div>
    )
}

export default BlogList