import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import bidding from './controllers/bidding.controller'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err.message)
  console.log('Running in offline mode - some features may not work')
})
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully')
})

const server = app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

bidding(server)
