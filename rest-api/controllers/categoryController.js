import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"


export const createCategoryController = async (req,res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({message:'Name is required'})
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category already exists'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(200).send({
            success: true,
            message: 'New category created',
            name,
            category
        })

    } catch (err) {
        console.error(error)
        res.status(500).send({
            success: false,
            error,
            message:'Erro in create Category'
        })
    }
}

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } =req.params
        if (!name) {
            res.status(401).send({message:'Name is required'})
        } if (!id) {
            res.status(401).send({message:'Id is required'})
        }
        const category = await categoryModel.findByIdAndUpdate(
            id,
            {
                name,
                slug: slugify(name)
            },
            {
                new:true
            }
        )
        res.status(200).send({
            success: true,
            message: 'category updated successfully',
            category
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: 'erro in update category',
            error
        })
    }
}

//get all category
export const getAllCategoriesController = async (req,res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            category,
            message: 'all categories list'
        })
    }catch(error){
        console.error(error)
        res.status(500).send({
            success: false,
            message: 'error on getting all categories',
            error
        })
    }
}

// get single category
export const getSingleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params
        if (!slug) {
            res.status(401).send({message:'Slug is required'})
        }
        const category = await categoryModel.findOne({ slug: slug })
        res.status(200).send({
            success: true,
            message: 'Get single category successfully',
            category
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: 'error on getting category',
            error
        })
    }
}

export const deleteCategoryController = async (req,res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(401).send({
                success: false,
                message:'Id is required'
            })
        }

        const category = await categoryModel.findByIdAndDelete(id)

        res.status(200).send({
            success: true,
            message: 'category deleted successfully',
            category
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: 'error on delete  category',
            error
        })
    }
}

