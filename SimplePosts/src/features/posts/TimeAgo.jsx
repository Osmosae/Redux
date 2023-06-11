import { parseISO, formatDistanceToNow } from "date-fns"
import PropTypes from "prop-types"

// Component to display the time elapsed since a given timestamp @param {String} timestamp - the timestamp to calculate time elapsed from @returns {JSX.Element} - the formatted time elapsed with a title attribute of the original timestamp
const TimeAgo = ({ timestamp }) => {
    let timeAgo = ""
    // Only calculate time elapsed if a timestamp is provided
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    // Add title attribute with original timestamp and display formatted time elapsed
    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}

TimeAgo.propTypes = {
    timestamp: PropTypes.string.isRequired,
}

export default TimeAgo
