import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {Redirect, Link} from 'react-router-dom'
import {signin} from './api-auth.js'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    maxWidth: 500
  },
  card: {
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(2),
    overflow: 'hidden'
  },
  header: {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: 'white',
    padding: theme.spacing(4),
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  },
  subtitle: {
    fontSize: '0.95rem',
    opacity: 0.9
  },
  content: {
    padding: theme.spacing(4)
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(1)
    }
  },
  errorBox: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#ffebee',
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  error: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  },
  errorText: {
    color: '#c62828',
    margin: 0
  },
  actions: {
    padding: theme.spacing(3),
    display: 'flex',
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
  footer: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.grey[50]
  },
  footerText: {
    color: theme.palette.text.secondary
  },
  signupLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

export default function Signin(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      clickSubmit()
    }
  }

  const {from} = props.location.state || {
    from: {
      pathname: '/'
    }
  }
  const {redirectToReferrer} = values
  if (redirectToReferrer) {
      return (<Redirect to={from}/>)
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.header}>
            <Typography variant="h4" className={classes.title}>
              Welcome Back
            </Typography>
            <Typography className={classes.subtitle}>
              Sign in to your account
            </Typography>
          </div>

          <CardContent className={classes.content}>
            <TextField
              id="email"
              type="email"
              label="Email Address"
              className={classes.textField}
              value={values.email}
              onChange={handleChange('email')}
              onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
              margin="normal"
              variant="outlined"
              placeholder="Enter your password"
              fullWidth
            />
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
              Sign In
            </Button>
          </CardActions>

          <Box className={classes.footer}>
            <Typography className={classes.footerText}>
              Don't have an account?{' '}
              <Link to="/signup" className={classes.signupLink}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Card>
      </Container>
    </div>
  )
}


