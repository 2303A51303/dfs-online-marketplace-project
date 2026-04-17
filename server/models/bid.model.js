import mongoose from 'mongoose'

const BidSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'User is required'
  },
  auctionId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Auction',
    required: 'Auction is required'
  },
  bidAmount: {
    type: Number,
    required: 'Bid amount is required',
    min: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Bid', BidSchema)