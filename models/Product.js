import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Please provide product name'],
      maxlength: 50,
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock'],
      maxlength: 100,
    },
    description: {
      type: String,
      default: '',
    },
   createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
