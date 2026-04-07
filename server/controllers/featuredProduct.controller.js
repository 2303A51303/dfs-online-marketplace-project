import FeaturedProduct from '../models/featuredProduct.model.js'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
  const featuredProduct = new FeaturedProduct(req.body)
  try {
    const result = await featuredProduct.save()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const featuredProductByID = async (req, res, next, id) => {
  try {
    const featuredProduct = await FeaturedProduct.findById(id)
    if (!featuredProduct) {
      return res.status(400).json({
        error: "Featured product not found"
      })
    }
    req.featuredProduct = featuredProduct
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve featured product"
    })
  }
}

const read = (req, res) => {
  return res.json(req.featuredProduct)
}

const update = async (req, res) => {
  try {
    let featuredProduct = req.featuredProduct
    featuredProduct = extend(featuredProduct, req.body)
    featuredProduct.updated = Date.now()
    const result = await featuredProduct.save()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    const featuredProduct = req.featuredProduct
    const deletedProduct = await featuredProduct.remove()
    res.json(deletedProduct)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    const featuredProducts = await FeaturedProduct.find().sort('-created')
    res.json(featuredProducts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  featuredProductByID,
  read,
  update,
  remove,
  list
}