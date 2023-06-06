import {Link, useLocation, useNavigate} from "react-router-dom";

const MainNav = () => {
    const navigate = useNavigate();
    const location = useLocation()

    function logOut() {
        window.localStorage.setItem('token', "")
        navigate("/")
    }

    return (
        (location.pathname === "/" || location.pathname === "/registration")
            ? <></>
            :
                <div className="main-nav">
                    {window.localStorage.getItem("OwnerEmail") === "Admin@admin.com"
                        ?
                            <nav>
                                <Link className="link-nav" onClick={logOut} to={"/"}>Log Out</Link>
                                <span className="link-nav">Current user: {window.localStorage.getItem("UserName")}</span>
                            </nav>
                        :
                            <nav>
                                <Link className="link-nav" to={"/main"}>Home</Link>
                                <Link className="link-nav" to={"/cart"}>Cart</Link>
                                <Link className="link-nav" to={"/history"}>Order history</Link>
                                <Link className="link-nav" onClick={logOut} to={"/"}>Log Out</Link>
                                <span className="link-nav">Current user: {window.localStorage.getItem("UserName")}</span>
                            </nav>
                    }
                </div>
    )
}

export default MainNav