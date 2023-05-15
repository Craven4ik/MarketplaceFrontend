import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const [userData, setUserData] = useState({
        UserName: '',
        Email: '',
        Password: ''
    })

    const navigate = useNavigate();

    // function registrationFun() {
    //     e.preventDefault()
    //     fetch('https://localhost:7070/api/Account/GetToken')
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }

    function registrationFun(e) {
        e.preventDefault()

        fetch("https://marketplace-backend-i22y.onrender.com/api/Authorize/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(resp => resp.text())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setUserData({
                    UserName: '',
                    Email: '',
                    Password: ''
                })
                navigate("/")
            })
    }

    return (
        <div className="form-wrapper">
            <h1>Registration</h1>
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