import { Link } from "react-router-dom"

function Logo() {
    return (
        <Link to="/">
            <img className="logo" src="/Based_Agent_logo_small.png" alt="Based Agent Logo" />
        </Link>
    )
}

export default Logo
