import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"
import { toast } from "react-hot-toast"
import { useState, useEffect } from "react"
import axios from "axios"
import { Select } from "antd"
import { useNavigate,useParams } from "react-router-dom"
const { Option } = Select

const UpdateProduct = () => {

  const navigate = useNavigate()
  const params = useParams()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [photo, setphoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const [pId, setPId] = useState('')
  const apiUri = `${import.meta.env.VITE_API}/api/v1/`



  const getSingleProduct = async () => {
    try {
        const { data } = await axios.get(`${apiUri}products/get-product/${params.slug}`)
        setName(data.product.name)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setShipping(data.product.shipping)
        setQuantity(data.product.quantity)
        setCategory(data.product.category)
        setPId(data.product._id)

    } catch (e) {
        console.error(e)
        toast.error('something went wrong')
    }
  }
  
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
        getSingleProduct()
    },[])


  const handleUpdate = async (e) => {
      e.preventDefault()
        
        try {
            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('quantity', quantity)
            productData.append('shipping', shipping)
            photo && productData.append('photo', photo)
            productData.append('category', category._id)


            const { data } = await axios.put(`${apiUri}products/update-product/${pId}`, productData)
           
            if (data?.success) {
                toast.success('Product Updated Successfully')
                navigate('/dashboard/admin/products')
            } else {
                alert('erro')
            }
        } catch (err) {
            console.error(err);
            toast.error('something went wrong')
        }
    }

// delete product
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            let answer = window.prompt(' are you sure want to delete this product ?')
            if (!answer) return
            
            console.log(`${apiUri}product/${pId}`)
            const { data } = await axios.delete(`${apiUri}products/product/${pId}`)
            if (data) {
                toast.success('product deleted successfully')
                navigate('/dashboard/admin/products')
            }
        } catch (err) {
            console.error(err)
            toast.error('something went wrong')
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
                    <h1>Update product</h1>
                    <div className="n-1 w-75">
                        <Select
                            bordered={false}
                            placeholder='Select a category'
                            size="large"
                            showSearch={true}
                            className="form-select mb-3"
                              onChange={(e) => {

                                  setCategory(JSON.parse(e))
                              }}
                              value={JSON.stringify(category)}
                             
                              
                          >
                              
                            {
                                categories?.map((el) => {

                                    return (
                                        <Option
                                            key={el._id}
                                            value={JSON.stringify(el)}
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
                            {photo ? (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="Product-Photo"
                                        height='200px'
                                        className="img img-responsive"
                                    />
                                </div>
                              ) :
                                  (
                                      <div className="text-center">
                                            <img
                                                src={`${apiUri}products/product-photo/${pId}`}
                                                alt="Product-Photo"
                                                height='200px'
                                                className="img img-responsive"
                                            />
                                        </div>
                                  )
                            }
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
                                  value={shipping?'1':'0'}
                            >
                                <Option value='0'>No</Option>
                                <Option value='1'>yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button
                                className="btn btn-primary col-md-12"
                                onClick={handleUpdate}
                            >
                                UPDATE PRODUCT
                            </button>
                        </div>
                        <div className="mb-3">
                            <button
                                className="btn btn-danger col-md-12"
                                onClick={handleDelete}
                            >
                                DELETE PRODUCT
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
          
    </Layout>
  )
}

export default UpdateProduct