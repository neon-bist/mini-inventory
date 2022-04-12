import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createProduct = async (req, res) => {
  const { productName, stock } = req.body

  if (!productName || !stock) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}
const getAllProducts = async (req, res) => {
  const { status, jobType, sort, search } = req.query
  

  const queryObject = {
    createdBy: req.user.userId,
  }
  
  if (search) {
    queryObject.productName = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Product.find(queryObject)

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('productName')
  }
  if (sort === 'z-a') {
    result = result.sort('-productName')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const products = await result

  const totalProducts = await Product.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalProducts / limit)

  res.status(StatusCodes.OK).json({ products, totalProducts, numOfPages })
}
const updateProduct = async (req, res) => {
  const { id: jobId } = req.params
  const { stock, productName } = req.body

  if (!productName || !stock) {
    throw new BadRequestError('Please provide all values')
  }
  const job = await Product.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }
  // check permissions

  checkPermissions(req.user, job.createdBy)

  const updatedProduct = await Product.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedProduct })
}
const deleteProduct = async (req, res) => {
  const { id: jobId } = req.params

  const job = await Product.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }

  checkPermissions(req.user, job.createdBy)

  await job.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed' })
}
const showStats = async (req, res) => {
  let stats = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  let monthlyApplications = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createProduct, deleteProduct, getAllProducts, updateProduct, showStats }
