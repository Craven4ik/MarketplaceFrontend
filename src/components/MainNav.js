import {Link, useNavigate} from "react-router-dom";

const MainNav = () => {
    const navigate = useNavigate();

    function logOut() {
        navigate("/")
    }

    return (
                <div className="main-nav">
                    <div className="links-cont">
                        <nav>
                            {/*<h1 className="main-page-name">Items catalog</h1>*/}
                            <Link className="link-nav" to={"/main"}>Home</Link>
                            <Link className="link-nav" to={"/profile"}>Profile</Link>
                        </nav>
                    </div>
                    <div className="button-panel">
                        <button type="button" className="button" onClick={logOut}>Log out</button>
                    </div>

                </div>
    )
}

export default MainNav