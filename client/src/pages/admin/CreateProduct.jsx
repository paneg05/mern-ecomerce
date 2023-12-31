import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"
import { toast } from "react-hot-toast"
import { useState, useEffect } from "react"
import axios from "axios"
import { Select } from "antd"
import { useNavigate } from "react-router-dom"
const { Option } = Select



const CreateProduct = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [photo, setphoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    
    const apiUri = `${import.meta.env.VITE_API}/api/v1/`

    //get all category
    const getAllCategories = async () => {
        try {
            const allCategoriesUri = `${apiUri}category/get-categories`
            
            const {data} = await axios.get(allCategoriesUri)
            
            if (data?.success) {
                setCategories(data?.category)
            } 
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong in getting category')
        }

    }

        useEffect(() => {
        getAllCategories()

    },[])

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('quantity', quantity)
            productData.append('shipping', shipping)
            productData.append('photo', photo)
            productData.append('category', category)
            
            const { data } = await axios.post(`${apiUri}products/create-product`, productData)

            if (data?.success) {
                toast.success('Product Created Successfully')
                navigate('/dashboard/admin/products')
            } else {
                alert('erro')
            }
        } catch (err) {
            console.error(err);
            toast.error('something went create product')
        }
    }

return (
    <Layout title=' Dashboard - Create product'>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h1>Create product</h1>
                    <div className="n-1 w-75">
                        <Select
                            bordered={false}
                            placeholder='Select a category'
                            size="large"
                            showSearch={true}
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value)
                            }}
                        >
                            {
                                categories?.map((el) => {

                                    return (
                                        <Option
                                            key={el._id}
                                            value={el._id}
                                        >
                                            {el.name}
                                        </Option>
                                    )
                                    
                                })
                            }
                        </Select>
                        <div className="mb-3">
                            <label className="btn btn-outline-secondary col-md-12">
                                {photo ? photo.name : 'Upload photo'} 
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setphoto(e.target.files[0])}
                                    hidden={true}
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo && (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="Product-Photo"
                                        height='200px'
                                        className="img img-responsive"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={name}
                                placeholder="write a name"
                                className="form-control"
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                style={{resize:'none'}}
                                rows="5"
                                value={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e)=>setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="write a price"
                                className="form-control"
                                onChange={(e)=>setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                value={quantity}
                                placeholder="write a quantity"
                                className="form-control"
                                onChange={(e)=>setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <Select
                                bordered={false}
                                placeholder='select shipping'
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setShipping(value)
                                }}
                            >
                                <Option value='0'>No</Option>
                                <Option value='1'>yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button
                                className="btn btn-primary col-md-12"
                                onClick={handleCreate}
                            >
                                CREATE PRODUCT
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
          
    </Layout>
  )
}

export default CreateProduct