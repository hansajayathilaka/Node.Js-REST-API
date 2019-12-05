const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/checkAuth');
const ProductsControllers = require('../controllers/products');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});


router.get('/', ProductsControllers.get_all_products);
router.post('/', checkAuth, upload.single('image'), ProductsControllers.create_product);
router.get('/:id', ProductsControllers.get_one_product);
router.patch('/:_id', checkAuth, ProductsControllers.update_product);
router.delete('/:_id', checkAuth, ProductsControllers.delete_product);

module.exports = router;
