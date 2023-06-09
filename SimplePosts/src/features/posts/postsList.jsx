import { useSelector } from "react-redux"
import { selectAllPosts } from "./postsSlice"
import PostAuthor from "./postAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"

/**
 * Renders a list of posts in descending order by date. Each post includes the title, a short excerpt of the content, author, timestamp and reaction buttons.
 * @returns {JSX.Element} A section with a heading and rendered posts.
 */
const PostsList = () => {
    // Get all posts from the redux store
    const posts = useSelector(selectAllPosts)
    // Sort posts in descending order by date
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    // Map each post to an article with relevant information
    const renderedPosts = orderedPosts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    ))
    // Render the section with a heading and the list of posts
    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList
