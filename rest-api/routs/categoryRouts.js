import express from 'express'
import { requireSignIn, isAdmin } from '../middlewares/authMiddlewares.js'
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getSingleCategoryController, updateCategoryController } from '../controllers/categoryController.js'



const router = express.Router()

//routes
//create category
router.post('/create-category',
    requireSignIn,
    isAdmin,
    createCategoryController
)

//update category
router.put('/update-category/:id',
    requireSignIn,
    isAdmin,
    updateCategoryController
)

//get all category
router.get('/get-categories',getAllCategoriesController)

//single category
router.get('/single-category/:slug', getSingleCategoryController)

router.delete('/delete-category/:id',
    requireSignIn,
    isAdmin,
    deleteCategoryController
)

export default router