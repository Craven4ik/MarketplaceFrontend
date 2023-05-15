import {useEffect, useState} from 'react'
import styles from '../assets/styles.css'
import CreateProductForm from './CreateProductForm'
import ProductItem from './ProductItem'
import {useNavigate} from "react-router-dom";

const Product = () => {
    const [items, setItems] = useState([])
    const navigate = useNavigate();

    function addItem() {
        navigate("/addItem")
    }
    function checkFun(e) {
        e.preventDefault()
        fetch("https://localhost:7122/api/Authorize/CurrentUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        })
            .then(resp => resp.json())
            .then(data => {
                // setRes(data)
                console.log(data.claims[0].value)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token'))
            navigate("/")
        else {
            fetch("https://localhost:7122/api/Item/GetItems", {
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
                        : <p>There are no items</p>
                    }
                </div>
                {/*<button onClick={checkFun}>Test</button>*/}
            </div>
    )
}

export default Product