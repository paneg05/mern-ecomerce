import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
	productPhotoController,
	getProductController,
	getSingleProductController,
	productController,
	deleteProductController,
	updateProductController,
	productFilterController,
	productListController,
	productCountController,
	searchController,
	relatedProductsController,
	productCategoryController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
	"/create-product",
	requireSignIn,
	isAdmin,
	formidable(),
	productController
);

//update product
router.put(
	"/update-product/:pid",
	requireSignIn,
	isAdmin,
	formidable(),
	updateProductController
);

//get products
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/product/:pid", deleteProductController);

//filter product
router.post("/filter-product", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchController);

//similar Products
router.get("/related-products/:pid/:cid", relatedProductsController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router