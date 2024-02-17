import BlogCard from "../components/BlogCard"
import "../css/bloglist.css"
import { useUserContext } from "../components/UserProvider"

const BlogList = ({ filteredPosts }) => {
    const { posts } = useUserContext();
    const collectedPosts = filteredPosts || posts;

    return (
        <div className="bloglist-container grid">
          {
            // loading
            //     ? "Loading"
            //     : collectedPosts.length > 0
            //     ? collectedPosts.map((post, index) => <BlogCard key={index} post={post}></BlogCard>)
            //     : 'None'
            collectedPosts.length > 0
                ? collectedPosts.map((post, index) => <BlogCard key={index} post={post}></BlogCard>)
                : 'Loading'
        }

        </div>
    )
}

export default BlogList