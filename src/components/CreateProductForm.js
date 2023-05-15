import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateProductForm = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        Name: '',
        Price: 0,
        Image: '',
        Description: '',
        OwnerEmail: window.localStorage.getItem("OwnerEmail")
    })

    const clearData = {
        Name: '',
        Price: 0,
        Image: '',
        Description: '',
        OwnerEmail: window.localStorage.getItem("OwnerEmail")
    }

    const createItem = () => {
        console.log(JSON.stringify(data))
        fetch("https://marketplace-backend-i22y.onrender.com/api/Item/CreateItem", {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp)
            .then(data => {
                // setRes(data)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        setData(clearData)
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token'))
            navigate("/")
    }, [])

    return (
        <div>
            <h1 className="main-page-name">Item creation panel</h1>
            <div className="form-add-wrapper">
                <h1>Add new item</h1>
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
                        <button className="button" onClick={e => createItem(e)}>
                            Create new item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProductForm