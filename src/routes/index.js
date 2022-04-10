//import express
const express = require("express");
//give access for router
const router = express.Router();

//Import function addUsers from user controller :
//import user
const {
  addUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

//import product
const { 
  getProducts, 
  addProduct, 
  getProductDetail, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/product');

//import category
const {
  getCategories,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/category')

//import transaction
const {
  getTransactions, 
  addTransaction
} = require ('../controllers/transaction');

//import auth
const {
  register, 
  login
} = require("../controllers/auth");

// import middleware here
const { uploadFile } = require('../middlewares/uploadFile');
const { auth } = require("../middlewares/auth")

//Router with method by controllers user and profile
router.post('/user', addUsers);
router.get('/users', auth, getUsers);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

//route to register and login
router.post("/register", register);
router.post("/login", login);

//route to product
router.get('/products', getProducts);
router.get('/product/:id', getProductDetail);
router.post('/product', auth, uploadFile('image'), addProduct); // place middleware (auth & uploadfile before controller | add product
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

//route to get category
router.get('/categories', getCategories);
router.get('/category/:id', auth, getCategory); // place middleware (auth) before controller
router.post('/category', auth, addCategory); // place middleware (auth) before controller
router.patch('/category/:id', auth, updateCategory); // place middleware (auth) before controller
router.delete('/category/:id', auth, deleteCategory); // place middleware (auth) before controller

//route to transaction
router.get('/transactions', auth, getTransactions); // place middleware (auth) before controller
router.post('/transaction', auth, addTransaction); // place middleware (auth) before controller

module.exports = router;


