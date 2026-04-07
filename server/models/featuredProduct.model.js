import mongoose from 'mongoose'

const FeaturedProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  shopName: {
    type: String,
    trim: true,
    required: 'Shop name is required'
  },
  image: {
    type: String,
    trim: true,
    required: 'Image URL is required'
  },
  price: {
    type: Number,
    required: 'Price is required'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('FeaturedProduct', FeaturedProductSchema)