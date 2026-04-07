import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(2)
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 300
    }
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  addButton: {
    marginBottom: theme.spacing(2)
  }
}))

export default function AddFeaturedProduct({ onAddProduct }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    name: '',
    shopName: '',
    price: '',
    image: '',
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setValues({
      name: '',
      shopName: '',
      price: '',
      image: '',
      error: ''
    })
  }

  const clickSubmit = () => {
    if (!values.name || !values.shopName || !values.price || !values.image) {
      setValues({ ...values, error: 'All fields are required' })
      return
    }

    if (isNaN(values.price) || values.price <= 0) {
      setValues({ ...values, error: 'Price must be a valid positive number' })
      return
    }

    const newProduct = {
      name: values.name,
      shopName: values.shopName,
      price: parseFloat(values.price),
      image: values.image
    }

    onAddProduct(newProduct)
    handleClose()
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className={classes.addButton}
        startIcon={<Icon>add</Icon>}
      >
        Add Featured Product
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Featured Product</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="Product Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
            fullWidth
          />
          <TextField
            id="shopName"
            label="Shop Name"
            className={classes.textField}
            value={values.shopName}
            onChange={handleChange('shopName')}
            margin="normal"
            fullWidth
          />
          <TextField
            id="price"
            label="Price (₹)"
            className={classes.textField}
            value={values.price}
            onChange={handleChange('price')}
            type="number"
            margin="normal"
            fullWidth
          />
          <TextField
            id="image"
            label="Image URL"
            className={classes.textField}
            value={values.image}
            onChange={handleChange('image')}
            margin="normal"
            fullWidth
            placeholder="https://example.com/image.jpg"
          />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={clickSubmit} color="primary" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}