import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  shopName: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'}
})

export default mongoose.model('Product', ProductSchema)
