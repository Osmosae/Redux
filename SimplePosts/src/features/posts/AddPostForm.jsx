import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewPost } from "./postsSlice"
import { selectAllUsers } from "../users/usersSlice"

//Component for adding a new post
const AddPostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState("")
    const [addRequestStatus, setAddRequestStatus] = useState("idle")
    const users = useSelector(selectAllUsers)
    //    Update the title as the user types @param {object} e - The event object
    const onTitleChanged = (e) => setTitle(e.target.value)
    //  Update the content as the user types @param {object} e - The event object
    const onContentChanged = (e) => setContent(e.target.value)
    //  Update the selected user as the user changes it @param {object} e - The event object
    const onAuthorChanged = (e) => setUserId(e.target.value)
    // Check if the form can be saved
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle"
    // Dispatch the postAdded action and reset the form fields
    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus("pending")
                dispatch(addNewPost({ title, body: content, userId })).unwrap()
                setTitle("")
                setContent("")
                setUserId("")
            } catch (err) {
                console.error("Failed to save post", err)
            } finally {
                setAddRequestStatus("idle")
            }
        }
    }

    // Generate an array of user options for the select input
    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">PostTitle:</label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea name="postContent" id="postContent" value={content} onChange={onContentChanged} />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostForm
