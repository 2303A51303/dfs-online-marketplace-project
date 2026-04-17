import express from 'express'
import bidCtrl from '../controllers/bid.controller'
import authCtrl from '../controllers/auth.controller'
import auctionCtrl from '../controllers/auction.controller'

const router = express.Router()

router.route('/api/bids')
  .post(authCtrl.requireSignin, bidCtrl.create)

router.route('/api/bids/:auctionId')
  .get(authCtrl.requireSignin, auctionCtrl.auctionByID, bidCtrl.listByAuction)

router.param('auctionId', auctionCtrl.auctionByID)

export default router