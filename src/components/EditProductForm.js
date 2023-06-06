import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const EditProductForm = () => {
    const item = window.localStorage.getItem("CurItem")
    const id = window.localStorage.getItem("CurItemId")
    const navigate = useNavigate();
    const [curItem, setCurItem] = useState()
    const [loading, setLoading] = useState(true)

    const [data, setData] = useState({
        Id: id,
        Name: item.Name,
        Price: item.Price,
        Image: item.Image,
        Description: item.Description,
        OwnerEmail: (window.localStorage.getItem("OwnerEmail") !== "Admin@admin.com")
            ? window.localStorage.getItem("OwnerEmail")
            : window.localStorage.getItem("PrevEmail")
    })

    const updateItem = () => {
        console.log(JSON.stringify(data))
        fetch("https://marketplace-backend-i22y.onrender.com/api/Item/UpdateItem", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp)
            .catch(err => {
                console.log(err)
            })
        navigate("/main")
    }

    const deleteItem = () => {
        console.log(id)
        fetch("https://marketplace-backend-i22y.onrender.com/api/Item/DeleteItem?id="+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: id
        })
            .then(resp => resp)
            .catch(err => {
                console.log(err)
            })
        navigate("/main")
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token'))
            navigate("/")
        else {
            setLoading(true)
            fetch(`https://marketplace-backend-i22y.onrender.com/api/Item/GetItemById?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setCurItem(data)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])

    return (
        loading ? <></>
            :
        <div>
            <h1 className="main-page-name">Item edit panel</h1>
            <div className="form-add-wrapper">
                <h1>Edit item</h1>
                <form>
                    <div className="form-item">
                        <label>Item name</label>
                        <input required
                               type="text"
                               placeholder={curItem.name}
                               onChange={e => setData(prev => ({
                                   ...prev, Name: e.target.value
                               }))}
                        />
                    </div>
                    <div className="form-item">
                        <label>Item price</label>
                        <input required
                               type="number"
                               placeholder={curItem.price}
                               onChange={e => setData(prev => ({
                                   ...prev, Price: e.target.value
                               }))}
                        />
                    </div>
                    <div className="form-item">
                        <label>Item image (url)</label>
                        <input required
                               type="text"
                               placeholder={curItem.image}
                               onChange={e => setData(prev => ({
                                   ...prev, Image: e.target.value
                               }))}
                        />
                    </div>
                    <div className="form-item">
                        <label>Item description</label>
                        <input required
                               type="text"
                               placeholder={curItem.description}
                               onChange={e => setData(prev => ({
                                   ...prev, Description: e.target.value
                               }))}
                        />
                    </div>
                    <div className="button-panel">
                        <button className="button" onClick={updateItem}>
                            Update item
                        </button>
                        <button className="button" onClick={deleteItem}>
                            Delete item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProductForm