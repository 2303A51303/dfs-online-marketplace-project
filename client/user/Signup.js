import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-user.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  container: {
    maxWidth: 700
  },
  card: {
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(2)
  },
  header: {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: 'white',
    padding: theme.spacing(4),
    borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  },
  subtitle: {
    fontSize: '0.95rem',
    opacity: 0.9,
    marginBottom: 0
  },
  content: {
    padding: theme.spacing(4)
  },
  roleSection: {
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderBottom: `2px solid ${theme.palette.grey[200]}`
  },
  roleLabel: {
    marginBottom: theme.spacing(2),
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.text.primary
  },
  roleButtons: {
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  roleButton: {
    flex: 1,
    padding: theme.spacing(2),
    textTransform: 'capitalize',
    fontSize: '1rem',
    fontWeight: 500,
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.spacing(1),
    backgroundColor: 'white',
    color: theme.palette.secondary.main,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: '#000'
    },
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: '#000',
      fontWeight: 600
    }
  },
  formSection: {
    marginBottom: theme.spacing(1)
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(1)
    }
  },
  error: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  },
  errorBox: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#ffebee',
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  errorText: {
    color: '#c62828'
  },
  actions: {
    padding: theme.spacing(3),
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center'
  },
  submitButton: {
    padding: theme.spacing(1.5, 4),
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'capitalize',
    borderRadius: theme.spacing(1),
    minWidth: 200
  },
  signinLink: {
    textDecoration: 'none'
  },
  footerText: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  successDialog: {
    '& .MuiDialog-paper': {
      borderRadius: theme.spacing(2)
    }
  }
}))

export default function Signup() {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    userType: 'buyer',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleUserTypeChange = (type) => {
    setValues({ ...values, userType: type })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      seller: values.userType === 'seller'
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.header}>
            <Typography variant="h4" className={classes.title}>
              Create Account
            </Typography>
            <Typography className={classes.subtitle}>
              Join our marketplace community
            </Typography>
          </div>

          <CardContent className={classes.content}>
            {/* Role Selection */}
            <Box className={classes.roleSection}>
              <Typography className={classes.roleLabel}>
                I want to:
              </Typography>
              <Box className={classes.roleButtons}>
                <button 
                  className={`${classes.roleButton} ${values.userType === 'buyer' ? 'active' : ''}`}
                  onClick={() => handleUserTypeChange('buyer')}
                >
                  🛍️ Buy Products
                </button>
                <button 
                  className={`${classes.roleButton} ${values.userType === 'seller' ? 'active' : ''}`}
                  onClick={() => handleUserTypeChange('seller')}
                >
                  🏪 Sell Products
                </button>
              </Box>
            </Box>

            {/* Form Fields */}
            <Box className={classes.formSection}>
              <TextField
                id="name"
                label="Full Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                variant="outlined"
                placeholder="Enter your full name"
                fullWidth
              />
              <TextField
                id="email"
                type="email"
                label="Email Address"
                className={classes.textField}
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
                fullWidth
              />
              <TextField
                id="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={values.password}
                onChange={handleChange('password')}
                margin="normal"
                variant="outlined"
                placeholder="Enter a secure password"
                fullWidth
                helperText="At least 6 characters"
              />
            </Box>

            {/* Error Message */}
            {values.error && (
              <Box className={classes.errorBox}>
                <Icon color="error" className={classes.error}>error</Icon>
                <Typography className={classes.errorText}>
                  {values.error}
                </Typography>
              </Box>
            )}
          </CardContent>

          <CardActions className={classes.actions}>
            <Button
              color="primary"
              variant="contained"
              onClick={clickSubmit}
              className={classes.submitButton}
              size="large"
            >
              Create Account
            </Button>
          </CardActions>

          <Box className={classes.footerText}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/signin" style={{ color: '#607d8b', fontWeight: 600 }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Card>
      </Container>

      <Dialog 
        open={values.open} 
        disableBackdropClick={true}
        className={classes.successDialog}
      >
        <DialogTitle>🎉 Welcome!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your account has been successfully created. Welcome to our marketplace! 
            {values.userType === 'seller' && ' You can now start setting up your store.'}
            {values.userType === 'buyer' && ' You can now start browsing and shopping.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin" className={classes.signinLink}>
            <Button color="primary" variant="contained">
              Sign In to Continue
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}