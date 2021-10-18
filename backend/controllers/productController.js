const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary').v2;

//Create new product =>  /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    
    let images = []
    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = []

    for(let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

//Get all products => api/v1/products?keyword=sth
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resultsPerPage = 4;

    //Total number of products in database
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()

    apiFeatures.pagination(resultsPerPage);
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    res.status(200).json({
        success: true,
        productsCount,
        resultsPerPage,
        filteredProductsCount,
        products
    })
})

//Get all products. Only for admins => api/v1/admin/products?keyword=sth
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {


    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})

//Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

//Update product => /api/vi/admin/product/:id
exports.updateProduct = catchAsyncErrors(async(req, res, next) => {
    
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    let images = []
    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if(images !== undefined) {
        //Deleting images associated with the product
        for ( let i = 0; i < product.images.length; i++ ) {
            const result = await cloudinary.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = []

        for(let i = 0; i < images.length; i++) { 
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})

//Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    //Deleting images associated with the product
     for ( let i = 0; i< product.images.length; i++ ) {
         const result = await cloudinary.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})