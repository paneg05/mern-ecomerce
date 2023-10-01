import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "./../models/categoryModel.js";

export const productController = async (req, res) => {
	try {
		const { name, slug, description, price, category, quantity, shipping } =
			req.fields;
		const { photo } = req.files;
		//validation
		switch (true) {
			case !name:
				return res.status(500).send({
					error: "name is Required",
				});
				break;
			case !photo || photo.size > 1000000:
				return res.status(500).send({
					error: "photo is Required and should be less then 1mb",
				});
				break;
			case !description:
				return res.status(500).send({
					error: "description is Required",
				});
				break;
			case !price:
				return res.status(500).send({
					error: "price is Required",
				});
				break;
			case !category:
				return res.status(500).send({
					error: "category is Required",
				});
				break;
			case !quantity:
				return res.status(500).send({
					error: "quantity is Required",
				});
				break;
		}

		const product = new productModel({
			...req.fields,
			slug: slugify(name),
		});

		if (photo) {
			product.photo.data = fs.readFileSync(photo.path);
			product.photo.contentType = photo.type;
		}
		await product.save();
		res.status(200).send({
			success: true,
			message: "product created successfully",
			product,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({
			success: false,
			error: err,
			message: `Error in create product`,
		});
	}
};

export const getProductController = async (req, res) => {
	try {
		const products = await productModel
			.find({})
			.populate("category")
			.select("-photo")
			.limit(12)
			.sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			message: "All products",
			countTotal: products.length,
			products,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			error,
			message: "error in getting products",
		});
	}
};

//get single profuct
export const getSingleProductController = async (req, res) => {
	try {
		const product = await productModel
			.findOne({ slug: req.params.slug })
			.select("-photo")
			.populate("category");
		res.status(200).send({
			success: true,
			message: "single product feched",
			product,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			message: "Error while getting single product",
			error,
		});
	}
};

//get photo
export const productPhotoController = async (req, res) => {
	try {
		if (req?.params?.pid == "undefined") {
			return res.status(404).send({
				success: false,
				message: "Invalid product id",
			});
		}
		const product = await productModel
			.findById(req.params.pid)
			.select("photo");
		if (product.photo.data) {
			res.set("Content-type", product.photo.contentType);
			return res.status(200).send(product.photo.data);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			message: "Error while getting photo",
			error,
		});
	}
};

export const deleteProductController = async (req, res) => {
	try {
		console.log("chegou aqui");
		await productModel.findByIdAndDelete(req.params.pid).select("-photo");
		res.status(200).send({
			success: true,
			message: "product deleted successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			message: "Error while deleting product",
			error,
		});
	}
};

//update product
export const updateProductController = async (req, res) => {
	try {
		const { name, slug, description, price, quantity, shipping } =
			req.fields;
		const category = req.fields.category;
		const { photo } = req.files;
		//validation
		switch (true) {
			case !name:
				return res.status(500).send({
					error: "name is Required",
				});
				break;

				break;
			case !description:
				return res.status(500).send({
					error: "description is Required",
				});
				break;
			case !price:
				return res.status(500).send({
					error: "price is Required",
				});
				break;
			case !category:
				return res.status(500).send({
					error: "category is Required",
				});
				break;
			case !quantity:
				return res.status(500).send({
					error: "quantity is Required",
				});
				break;
		}

		if (photo) {
			photo.data = fs.readFileSync(photo.path);
			photo.contentType = photo.type;
		}

		const products = await productModel.findByIdAndUpdate(
			req.params.pid,
			{
				...req.fields,
				slug: slugify(name),
				photo,
			},
			{
				new: true,
			}
		);

		res.status(200).send({
			success: true,
			message: "product created successfully",
			products,
		});
	} catch (error) {
		console.error(error);
	}
};

//filters
export const productFilterController = async (req, res) => {
	try {
		const { checked, radio } = req.body;
		let args = {};
		if (checked.length > 0) args.category = checked;
		if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
		console.log(args);
		const products = await productModel.find(args);
		res.status(200).send({
			success: true,
			products,
		});
	} catch (err) {
		console.error(e);
		res.status(400).send({
			success: false,
			message: "Error while filtering products",
			error: err,
		});
	}
};

export const productCountController = async (req, res) => {
	try {
		const total = await productModel.find({}).estimatedDocumentCount();
		res.status(200).send({
			success: true,
			total,
		});
	} catch (error) {
		console.error(error);
		res.status(400).send({
			success: false,
			message: "Error while count Products",
			error,
		});
	}
};

export const productListController = async (req, res) => {
	try {
		const perPage = 6;
		const page = req.params.page ? req.params.page : 1;
		const products = await productModel
			.find({})
			.select("-photo")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.error(error);
		res.status(400).send({
			success: false,
			error,
			message: "Error in per page ctrl",
		});
	}
};

export const searchController = async (req, res) => {
	try {
		const { keyword } = req.params;
		const results = await productModel
			.find({
				$or: [
					{ name: { $regex: keyword, $options: "i" } },
					{ description: { $regex: keyword, $options: "i" } },
				],
			})
			.select("-photo");
		res.json(results);
	} catch (error) {
		res.status(400).send({
			success: false,
			message: "Error in Search Product",
			error,
		});
	}
};

export const relatedProductsController = async (req, res) => {
	try {
		const { pid, cid } = req.params;
		const products = await productModel
			.find({
				category: cid,
				_id: { $ne: pid },
			})
			.select("-photo")
			.limit(3)
			.populate("category");
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.error(error);
		res.status(400).send({
			success: false,
			message: "Error while geting similar products",
			error,
		});
	}
};

export const productCategoryController = async (req, res) => {
	try {
		const category = await categoryModel.findOne({
			slug: req.params?.slug,
		});
		const products = await productModel
			.find({ category })
			.select("-photo")
			.populate("category");
		res.status(200).send({
			success: true,
			category,
			products,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			error,
			message: "Error while Getting products",
		});
	}
};
