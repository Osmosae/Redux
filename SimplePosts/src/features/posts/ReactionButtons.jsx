import { useDispatch } from "react-redux"
import { reactionAdded } from "./postsSlice"
import PropTypes from "prop-types"

const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
}

// A component that renders reaction buttons for a post. @param {object} post - The post object.
const ReactionButtons = ({ post }) => {
    // Import the useDispatch hook from the react-redux library.
    const dispatch = useDispatch()
    // Iterate through the reactionEmoji object and create a button for each reaction.
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        // Add an onClick event listener to each button that dispatches a reactionAdded action.
        return (
            <button key={name} type="button" className="reactionButton" onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}>
                {emoji} {post.reactions[name]}
            </button>
        )
    })
    // Render the reaction buttons in a div.
    return <div>{reactionButtons}</div>
}

ReactionButtons.propTypes = {
    post: PropTypes.object.isRequired,
}

export default ReactionButtons
