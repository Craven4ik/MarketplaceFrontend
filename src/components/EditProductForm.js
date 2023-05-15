import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const EditProductForm = () => {
    const item = window.localStorage.getItem("CurItem")
    const id = window.localStorage.getItem("CurItemId")
    const navigate = useNavigate();

    const [data, setData] = useState({
        Id: id,
        Name: item.Name,
        Price: item.Price,
        Image: item.Image,
        Description: item.Description,
        OwnerEmail: window.localStorage.getItem("OwnerEmail")
    })

    const updateItem = () => {
        console.log(JSON.stringify(data))
        fetch("https://localhost:7122/api/Item/UpdateItem", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        navigate("/main")
    }

    const deleteItem = () => {
        console.log(id)
        fetch("https://localhost:7122/api/Item/DeleteItem?id="+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: id
        })
            .then(resp => resp)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        navigate("/main")
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token'))
            navigate("/")
        console.log(data)
    }, [])

    return (
        <div>
            <h1 className="main-page-name">Item edit panel</h1>
            <div className="form-add-wrapper">
                <h1>Edit item</h1>
                <form>
                    <div className="form-item">
                        <label>Item name</label>
                        <input required
                               type="text"
                               onChange={e => setData(prev => ({
                                   ...prev, Name: e.target.value
                               }))}
                               value={data.Name}
                        />
                    </div>
                    <div className="form-item">
                        <label>Item price</label>
                        <input required
                               type="number"
                               onChange={e => setData(prev => ({
                                   ...prev, Price: e.target.value
                               }))}
                               value={data.Price}
                        />
                    </div>
                    <div className="form-item">
                        <label>Item image (url)</label>
                        <input required
                               type="text"
                               onChange={e => setData(prev => ({
                                   ...prev, Image: e.target.value
                               }))}
                               value={data.Image}
                        />
                    </div>
                    <div className="form-item">
                        <label>Item description</label>
                        <input required
                               type="text"
                               onChange={e => setData(prev => ({
                                   ...prev, Description: e.target.value
                               }))}
                               value={data.Description}
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