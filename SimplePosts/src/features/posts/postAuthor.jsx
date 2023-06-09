import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersSlice"
import PropTypes from "prop-types"

/**
 * Component that displays the author of a post based on their user ID.
 * @param {number} userId - The ID of the post author.
 * @returns {JSX.Element} - A JSX element that displays the author name.
 */
const PostAuthor = ({ userId }) => {
    // Get all users from the Redux store
    const users = useSelector(selectAllUsers)
    // Find the user with the matching user ID
    const author = users.find((user) => user.id === userId)
    // Return a JSX element that displays the author name, or "unknown author" if no user is found
    return <span>by {author ? author.name : "unknown author"}</span>
}

PostAuthor.propTypes = {
    userId: PropTypes.number.isRequired,
}

export default PostAuthor
