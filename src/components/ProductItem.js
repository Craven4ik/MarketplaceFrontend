import {useNavigate} from "react-router-dom";
import {useState} from "react";

const ProductItem = ({item}) => {
    const navigate = useNavigate();
    function goToEdit() {
        window.localStorage.setItem("CurItem", item)
        window.localStorage.setItem("CurItemId", item.id)
        navigate("/editItem")
    }

    const [myData, setMyData] = useState({
        UserId: window.localStorage.getItem("UserID"),
        // ItemId: window.localStorage.getItem("CurItemId"),
        ItemId: item.id
    })

    function addToOrder() {
        fetch("https://localhost:7122/api/Order/AddToCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }, body: JSON.stringify(myData)
        })
            .then(resp => resp.json())
            .then(data => {
                // setItems(data)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div key={item.id} className="wrapper">
            <div className="product-img">
                <img src={item.image} height="420" width="327"/>
            </div>
            <div className="product-info">
                <div className="product-text">
                    <h1>{item.name}</h1>
                    <h2>{item.description}</h2>
                </div>
                <div className="product-price-btn">
                    <div>
                        <p><span>
                            {"Price: "}
                            {new Intl.NumberFormat('ru-RU', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(item.price)}
                    </span></p>
                    </div>
                    <p><span>Seller: {item.ownerEmail}</span></p>
                    {window.localStorage.getItem("OwnerEmail") === item.ownerEmail
                        ? <button onClick={goToEdit}>Edit item</button>
                        : <button onClick={addToOrder}>Add to cart</button>}
                </div>
            </div>
        </div>
    )
}

export default ProductItem