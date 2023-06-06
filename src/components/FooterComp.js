import {useLocation} from "react-router-dom";

const FooterComp = () => {
    const location = useLocation()

    return (
        (location.pathname === "/" || location.pathname === "/registration"
            || window.localStorage.getItem("OwnerEmail") === "Admin@admin.com")
            ? <></>
            :
                <div className="footer">
                    &copy;<span> 2023</span><span> Kuppa Maksim. All rights reserved.</span>
                </div>
    )
}

export default FooterComp