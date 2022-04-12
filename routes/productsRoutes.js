import express from 'express'
const router = express.Router()

import {
  createProduct,
  // deleteJob,
  // getAllJobs,
  // updateJob,
  // showStats,
} from '../controllers/productsController.js'

router.route('/').post(createProduct)
// // remember about :id
// router.route('/stats').get(showStats)
// router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
