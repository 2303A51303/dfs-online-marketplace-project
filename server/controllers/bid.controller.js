import Bid from '../models/bid.model'
import Auction from '../models/auction.model'
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
  try {
    // Load the auction
    const auction = await Auction.findById(req.body.auctionId).populate('seller', '_id name').populate('bids.bidder', '_id name')
    if (!auction) {
      return res.status(400).json({
        error: 'Auction not found'
      })
    }

    // Check if auction is still active
    const now = new Date()
    if (now < new Date(auction.bidStart) || now > new Date(auction.bidEnd)) {
      return res.status(400).json({
        error: 'Auction is not active'
      })
    }

    const bid = new Bid({
      userId: req.auth._id,
      auctionId: auction._id,
      bidAmount: req.body.bidAmount
    })

    // Check if bid is higher than current highest bid
    const currentHighestBid = auction.bids.length > 0 ? auction.bids[0].bid : auction.startingBid
    if (bid.bidAmount <= currentHighestBid) {
      return res.status(400).json({
        error: 'Bid amount must be higher than current highest bid'
      })
    }

    // Save the bid
    const result = await bid.save()

    // Update auction with new bid
    const updatedAuction = await Auction.findOneAndUpdate(
      {_id: auction._id},
      {$push: {bids: {$each: [{bidder: req.auth._id, bid: bid.bidAmount, time: new Date()}], $position: 0}}},
      {new: true}
    ).populate('bids.bidder', '_id name').populate('seller', '_id name')

    res.json(updatedAuction)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByAuction = async (req, res) => {
  try {
    const bids = await Bid.find({auctionId: req.auction._id})
      .populate('userId', '_id name')
      .sort('-created')
    res.json(bids)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  listByAuction
}