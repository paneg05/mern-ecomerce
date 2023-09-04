import  Layout  from "./../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"

const Products = () => {
    const baseUri = `${import.meta.env.VITE_API}/api/v1`
    const [products, setProducts] = useState([])


    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${baseUri}/products/get-product`)
            setProducts(data.products)
           
        } catch (err) {
            console.error(err)
            toast.error('something went wrong')
        }
    }

    useEffect(() => {
        getAllProducts()
        
    },[])
  return (
      <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">  
                        <AdminMenu/>
                    </div>  
                    <div className="col-md-9">
                      <h1 className="text-center">All Products list</h1>
                      <div className="d-flex" >
                        {
                            products.map((el) => {
                                return (
                                    <Link
                                        key={el._id}
                                        to={`/dashboard/admin/update-product/${el.slug}`}
                                        className="product-link"
                                    >
                                        <div  className="card m-2" style={{width: '18rem'}}>
                                            <img src={`${baseUri}/products/product-photo/${el._id}`} className="card-img-top" alt={el.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{ el.name }</h5>
                                                <p className="card-text">{ el.description}</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </Link>
                                    
                                )
                            })
                          }
                        </div>
                    </div>
                </div>
            </div>
        
    </Layout>
  )
}

export default Products