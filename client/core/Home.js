import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Suggestions from './../product/Suggestions'
import {listCategories, listLatest} from './../product/api-product.js'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import AddFeaturedProduct from './AddFeaturedProduct'
import {create as createFeaturedProduct} from './api-featuredProduct'
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    minHeight: 'calc(100vh - 64px)',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  heroSection: {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: 'white',
    padding: theme.spacing(6, 4),
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem'
    }
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    marginBottom: theme.spacing(3),
    opacity: 0.95
  },
  heroCTA: {
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  ctaButton: {
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'capitalize',
    borderRadius: theme.spacing(1)
  },
  primaryCTA: {
    backgroundColor: '#b2ff59',
    color: '#000',
    '&:hover': {
      backgroundColor: '#9ccc16',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    }
  },
  secondaryCTA: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  contentSection: {
    marginBottom: theme.spacing(4)
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
  },
  searchContainer: {
    backgroundColor: 'white',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    marginBottom: theme.spacing(3)
  },
  categoriesContainer: {
    backgroundColor: 'white',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
  },
  addProductContainer: {
    backgroundColor: 'white',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    marginBottom: theme.spacing(3),
    textAlign: 'center'
  },
  container: {
    maxWidth: '1200px',
    width: '100%'
  }
}))


const fallbackProducts = [
  {
    _id: 'demo1',
    name: 'Vintage Leather Bag',
    shop: { name: 'Urban Crafts' },
    created: new Date().toISOString(),
    price: 2499,
    image: 'https://img.freepik.com/premium-photo/rustic-leather-messenger-bag-with-long-shoulder-strap-bag-is-made-genuine-leather-has-vintage-worn-look_14117-264511.jpg'
  },
  {
    _id: 'demo2',
    name: 'Handmade Ceramic Mug',
    shop: { name: 'Studio Clay' },
    created: new Date().toISOString(),
    price: 799,
    image: 'https://i.pinimg.com/originals/cc/42/ed/cc42edf8227b7843f37d825a8b4c80dc.jpg'
  },
  {
    _id: 'demo3',
    name: 'Wireless Headphones',
    shop: { name: 'SoundWave' },
    created: new Date().toISOString(),
    price: 3499,
    image: 'https://static.independent.co.uk/2024/10/30/12/Wireless-headphones.jpg'
  },
  {
    _id: 'demo4',
    name: 'Minimal Desk Lamp',
    shop: { name: 'BrightSpace' },
    created: new Date().toISOString(),
    price: 1599,
    image: 'https://www.feelgift.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/i/minimalist-pure-copper-led-desk-lamp-with-adjustable-angle.jpg'
  },
  {
    _id: 'demo5',
    name: 'Eco-Friendly Notebook',
    shop: { name: 'GreenPages' },
    created: new Date().toISOString(),
    price: 299,
    image: 'https://5.imimg.com/data5/SELLER/Default/2025/2/491120497/MQ/KX/RA/32516398/spiral-notebook-1000x1000.jpeg'
  },
  {
    _id: 'demo6',
    name: 'Classic Sunglasses',
    shop: { name: 'SunStyle' },
    created: new Date().toISOString(),
    price: 1299,
    image: 'https://xaina.com/wp-content/uploads/2023/02/classic-sunglasses-men-woman-5-scaled.jpg'
  }
]

export default function Home(){
  const classes = useStyles()
  const [suggestionTitle, setSuggestionTitle] = useState("Latest Products")
  const [categories, setCategories] = useState([])
  const [suggestions, setSuggestions] = useState([])
  
  const handleAddFeaturedProduct = (newProduct) => {
    const jwt = auth.isAuthenticated()
    if (!jwt) {
      alert('Please sign in to add featured products')
      return
    }

    createFeaturedProduct(newProduct, jwt).then((data) => {
      if (data && !data.error) {
        const transformedProduct = {
          _id: data._id,
          name: data.name,
          shop: { name: data.shopName },
          created: data.created,
          price: data.price,
          image: data.imageUrl || data.image
        }
        setSuggestions(prev => [transformedProduct, ...prev])
      } else {
        console.log(data.error)
        alert('Failed to add featured product')
      }
    }).catch((err) => {
      console.log(err)
      alert('Failed to add featured product')
    })
  }
  
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listLatest(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
        setSuggestions(fallbackProducts)
      } else if (Array.isArray(data) && data.length > 0) {
        setSuggestions(data)
      } else {
        setSuggestions(fallbackProducts)
      }
    }).catch((err) => {
      console.log(err)
      setSuggestions(fallbackProducts)
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

    return (
      <div className={classes.root}>
        <Container className={classes.container}>
          {/* Hero Section */}
          <Paper className={classes.heroSection} elevation={0}>
            <Typography className={classes.heroTitle}>
              Welcome to MERN Marketplace
            </Typography>
            <Typography className={classes.heroSubtitle}>
              Discover amazing products from sellers or start selling your own
            </Typography>
            <Box className={classes.heroCTA}>
              <Link to="/shops/all" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  className={`${classes.ctaButton} ${classes.primaryCTA}`}
                >
                  🛍️ Start Shopping
                </Button>
              </Link>
              <Link to="/auctions/all" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="outlined" 
                  className={`${classes.ctaButton} ${classes.secondaryCTA}`}
                >
                  🏆 Browse Auctions
                </Button>
              </Link>
            </Box>
          </Paper>

          {/* Main Content */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box className={classes.contentSection}>
                <Typography className={classes.sectionTitle}>
                  🛍️ Featured Products
                </Typography>
                <Paper className={classes.addProductContainer} elevation={0}>
                  <AddFeaturedProduct onAddProduct={handleAddFeaturedProduct} />
                </Paper>
                <Paper className={classes.suggestionsContainer} elevation={0}>
                  <Suggestions products={suggestions} title="Latest Products"/>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
}


