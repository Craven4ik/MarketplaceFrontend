import {useNavigate} from "react-router-dom";

const ProductItem = ({item}) => {
    const navigate = useNavigate();
    function goToEdit() {
        window.localStorage.setItem("CurItem", item)
        window.localStorage.setItem("CurItemId", item.id)
        // console.log(item.id)
        navigate("/editItem")
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
                        : <button>Contact seller</button>}
                </div>
            </div>
        </div>
    )
}

export default ProductItem