import express from 'express'
import featuredProductCtrl from '../controllers/featuredProduct.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/featured-products')
  .get(featuredProductCtrl.list)
  .post(authCtrl.requireSignin, featuredProductCtrl.create)

router.route('/api/featured-products/:featuredProductId')
  .get(featuredProductCtrl.read)
  .put(authCtrl.requireSignin, featuredProductCtrl.update)
  .delete(authCtrl.requireSignin, featuredProductCtrl.remove)

router.param('featuredProductId', featuredProductCtrl.featuredProductByID)

export default router