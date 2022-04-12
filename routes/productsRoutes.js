import express from 'express'
const router = express.Router()

import {
  createProduct,
  getAllProducts,
  updateProduct,
  // deleteJob,
  // getAllJobs,
  // updateJob,
  // showStats,
} from '../controllers/productsController.js'

router.route('/').post(createProduct).get(getAllProducts)
// // remember about :id
// router.route('/stats').get(showStats)
router.route('/:id').patch(updateProduct)

export default router
