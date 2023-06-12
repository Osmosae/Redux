import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice"
import { useEffect } from "react"
import PostsExcerpt from "./PostsExcerpt"

/**
 * Renders a list of posts in descending order by date. Each post includes the title, a short excerpt of the content, author, timestamp and reaction buttons.
 * @returns {JSX.Element} A section with a heading and rendered posts.
 */
const PostsList = () => {
    const dispatch = useDispatch()
    // Get all posts from the redux store
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    let content
    if (postsStatus === "loading") {
        content = <p>&quot;Loading....&quot;</p>
    } else if (postsStatus === "succeeded") {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />)
    } else if (postsStatus === "failed") {
        content = <p>{error}</p>
    }
    // Render the section with a heading and the list of posts
    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList
