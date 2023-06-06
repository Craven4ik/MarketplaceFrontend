import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [userData, setUserData] = useState({
        Email: "",
        Password: "",
        UserName: ""
    })

    useEffect(() => {
        window.localStorage.setItem('token', "")
        window.localStorage.setItem('OwnerEmail', "")
    }, [])

    const [error, setError] = useState(false)

    const navigate = useNavigate();

    let fetchResponse = ""

    function loginFun(e) {
        e.preventDefault()
        fetch("https://marketplace-backend-i22y.onrender.com/api/Authorize/SignIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(resp => resp.text())
            .then(data => {
                fetchResponse = data
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setUserData({
                    Email: '',
                    Password: '',
                    UserName: ''
                })
                if (fetchResponse === "Error") {
                    setError(true)
                } else {
                    window.localStorage.setItem('token', fetchResponse)
                    window.localStorage.setItem('OwnerEmail', userData.Email)
                    window.localStorage.setItem('UserName', userData.Email.split('@')[0])
                    fetch("https://marketplace-backend-i22y.onrender.com/User/FindUserIdByEmail?email="+window.localStorage.getItem("OwnerEmail"), {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                        },
                    })
                        .then(resp => resp.text())
                        .then(data => {
                            window.localStorage.setItem('UserID', data)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    navigate("/main")
                }
            })
    }

    return (
        <div className="form-wrapper">
            <h1>Sign In</h1>
            {!error ? <></> : <p className="sign-in__error-message">Неверный логин или пароль</p>}
            <form onSubmit={loginFun}>
                <div className="form-item">
                    <label>Email</label>
                    <input required
                           type="text"
                           name="Email"
                           value={userData.Email}
                           onChange={(e) => {
                               setUserData(prev => ({...prev, Email: e.target.value}))
                           }}/>
                </div>
                <div className="form-item">
                    <label>Password</label>
                    <input required
                           type="password"
                           name="Password"
                           value={userData.Password}
                           onChange={(e) => {
                               setUserData(prev => ({...prev, Password: e.target.value}))
                           }}/>
                </div>
                <div className="button-panel">
                    <button className="button" type="submit">Sign In</button>
                </div>
            </form>
            <div className="form-footer">
                <p>
                    <Link className="login-link" to={"/registration"}>Create an account</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm