import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"

import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"
import CategoryForm from "../../components/form/categoryForm"

import { Modal } from 'antd'

const CreateCategory =  () => {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [visible,setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState('')

    const apiUri = `${import.meta.env.VITE_API}/api/v1/`
    //handle form
    const handleSubmit =async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${apiUri}category/create-category`,
                {
                    name
                }
            )
            if (data?.success) {
                toast.success(`category ${data?.name} created successfully `)
                getAllCategories()
            } else {
                toast.error(`${data?.message}`)
            }
        } catch (error) {
            console.error(error)
            toast.error('something went wrong in input form')
        }
    }

    //update
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${apiUri}category/update-category/${selected._id}`,
                {
                    name:updatedName
                }
            )
            if (data.success) {
                toast.success(`${selected.name} is updated to ${updatedName}`)
                setSelected(null)
                setUpdatedName('')
                setVisible(false)
                getAllCategories()
            } else {
                toast.error(`${data.message}`)
            }
        } catch (error) {
            console.error(error);
            toast.error('something went wrong wen update category')
        }
    }

        //delete
    const handleDelete = async (pId) => {

        try {
            const { data } = await axios.delete(`${apiUri}category/delete-category/${pId}`)
            if (data.success) {
                toast.success(`${data.message}`)

                getAllCategories()
            } else {
                toast.error(`${data.message}`)
            }
        } catch (error) {
            console.error(error);
            toast.error('something went wrong wen update category')
        }
    }



    //get all categories
    const getAllCategories = async () => {
        try {
            const allCategoriesUri = `${apiUri}category/get-categories`
            
            const {data} = await axios.get(allCategoriesUri)
            
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong in getting category')
        }
    }

    useEffect(() => {
        getAllCategories()
        
    },[])

return (
    <Layout title='Dashboard - Create category'>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                 <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h1>Manage category</h1>
                    <div className="p-3 w-50">
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setName}
                        />
                    </div>
                    <div className="w-75">
                        
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {categories.map((el) => {
                                        return (
                                            <tr key={el._id}>
                                                <td key={el._id}>
                                                    {el.name}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {
                                                            setVisible(true)
                                                            setSelected(el)
                                                            setUpdatedName(el.name)
                                                        }}
                                                    >
                                                        edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                        onClick={() => {
                                                            handleDelete(el._id)
                                                        }}
                                                    >
                                                        delete
                                                    </button>
                                                </td>
                                            </tr>
                                            
                                        )
                                    })}
                            </tbody>
                        </table>

                    </div>
                    <Modal
                        onCancel={() => setVisible(false)}
                        footer={null}
                        open={visible}
                    >
                        <CategoryForm
                            setValue={setUpdatedName}
                            handleSubmit={handleUpdate}
                            value={updatedName}
                        />
                    </Modal>
                </div>
            </div>
        </div>
          
    </Layout>
  )
}

export default CreateCategory