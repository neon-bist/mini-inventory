import express from 'express'
const router = express.Router()

import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  showStats
} from '../controllers/productsController.js'

router.route('/')
  .post(createProduct)
  .get(getAllProducts);

router.route('/:id')
  .patch(updateProduct)
  .delete(deleteProduct);

router.get('/stats',showStats)
export default router
