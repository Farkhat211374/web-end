const express = require('express');
const ProductController = require('../controllers/ProductCtrl')
const router = express.Router();
router.get('/', ProductController.get);
module.exports = router