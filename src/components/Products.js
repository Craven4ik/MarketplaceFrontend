import {useEffect, useState} from 'react'
import ProductItem from './ProductItem'
import {useNavigate} from "react-router-dom";

const Product = () => {
    const [items, setItems] = useState([])
    const navigate = useNavigate();

    function addItem() {
        navigate("/addItem")
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
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
            <div>
                {window.localStorage.getItem("OwnerEmail") === "Admin@admin.com"
                    ? <h1 className="main-page-name">Admin panel</h1>
                    : <h1 className="main-page-name">Items catalog</h1>
                }
                <div className="create-wrapper">
                    {window.localStorage.getItem("OwnerEmail") === "Admin@admin.com"
                        ? <></>
                        :
                        <div className="button-panel small-block">
                            <button className="button" onClick={addItem}>Add new item</button>
                        </div>
                    }

                </div>
                <div>
                    {items.length ?
                        items.map(item => (
                        <ProductItem key={item.id} item={item}/>
                    ))
                        : <h1 className="main-page-name">There are no items</h1>
                    }
                </div>
            </div>
    )
}

export default Product