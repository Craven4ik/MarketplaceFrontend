import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const [userData, setUserData] = useState({
        UserName: '',
        Email: '',
        Password: ''
    })

    const navigate = useNavigate();
    const [error, setError] = useState(false)

    let fetchResponse = ""

    function registrationFun(e) {
        e.preventDefault()
        fetch("https://marketplace-backend-i22y.onrender.com/api/Authorize/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(resp => resp.json())
            .then(data => {
                fetchResponse = data.title
            })
            .finally(() => {
                setUserData({
                    UserName: '',
                    Email: '',
                    Password: ''
                })
                if (fetchResponse === "Bad Request") {
                    setError(true)
                }
                else navigate("/")
            })
    }

    return (
        <div className="form-wrapper">
            <h1>Registration</h1>
            {!error ? <></> : <p className="sign-in__error-message">Пользователь с такими данными существует</p>}
            <form onSubmit={registrationFun}>
                <div className="form-item">
                    <label>UserName</label>
                    <input required
                           type="text"
                           name="UserName"
                           value={userData.UserName}
                           onChange={(e) => {
                               setUserData(prev => ({...prev, UserName: e.target.value}))
                           }}/>
                </div>
                <div className="form-item">
                    <label>Email</label>
                    <input required
                           type="email"
                           name="Email"
                           value={userData.Email}
                           onChange={(e) =>
                               setUserData(prev => ({ ...prev, Email: e.target.value })
                               )}/>
                </div>
                <div className="form-item">
                    <label>Password</label>
                    <input required
                           type="password"
                           name="Password"
                           value={userData.Password}
                           onChange={(e) => {
                               setUserData(prev => ({ ...prev, Password: e.target.value }))
                           }}/>
                </div>
                <div className="button-panel">
                    <button className="button" type="submit">Sign Up</button>
                </div>
            </form>
            <div className="form-footer">
                <p>
                    <Link className="login-link" to={"/"}>Back to login page</Link>
                </p>
            </div>
        </div>
    )
}

export default RegistrationForm