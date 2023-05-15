import {useEffect, useState} from 'react'
import styles from '../assets/styles.css'
import CreateProductForm from './CreateProductForm'
import ProductItem from './ProductItem'
import {useNavigate} from "react-router-dom";
import MainNav from "./MainNav";

const Product = () => {
    const [items, setItems] = useState([])
    const navigate = useNavigate();

    function addItem() {
        navigate("/addItem")
    }
    function checkFun(e) {
        e.preventDefault()
        fetch("https://marketplace-backend-i22y.onrender.com/api/Authorize/CurUserId?email="+window.localStorage.getItem("OwnerEmail"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        })
            .then(resp => resp.text())
            .then(data => {
                // setRes(data)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token'))
            navigate("/")
        else {
            fetch("https://marketplace-backend-i22y.onrender.com/api/Item/GetItems", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setItems(data)
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
            <div>
                <h1 className="main-page-name">Items catalog</h1>
                <div className="create-wrapper">
                    <div className="button-panel small-block">
                        <button className="button" onClick={addItem}>Add new item</button>
                    </div>
                </div>
                <div>
                    {items.length ?
                        items.map(item => (
                        <ProductItem key={item.id} item={item}/>
                    ))
                        : <h1 className="main-page-name">There are no items</h1>
                    }
                </div>
                {/*<button onClick={checkFun}>Test</button>*/}
            </div>
    )
}

export default Product