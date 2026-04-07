import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import cart from './../cart/cart-helper'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import StoreIcon from '@material-ui/icons/Store'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  appBar: {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  brand: {
    fontWeight: 700,
    fontSize: '1.3rem',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    textDecoration: 'none',
    color: 'white'
  },
  navLinks: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  navButton: {
    color: 'white !important',
    textTransform: 'capitalize',
    fontWeight: 500,
    fontSize: '0.95rem',
    padding: '8px 12px',
    transition: 'all 0.3s ease',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      '&::after': {
        width: '100%'
      }
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -2,
      left: 0,
      width: 0,
      height: 2,
      backgroundColor: '#b2ff59',
      transition: 'width 0.3s ease'
    }
  },
  activeNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '&::after': {
      width: '100%'
    }
  },
  userSection: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(0.5)
    }
  },
  cartButton: {
    color: 'white !important',
    position: 'relative'
  },
  badge: {
    backgroundColor: '#b2ff59',
    color: '#000'
  },
  authButtons: {
    display: 'flex',
    gap: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      gap: 0
    }
  },
  signupButton: {
    backgroundColor: '#b2ff59',
    color: '#000 !important',
    fontWeight: 600,
    textTransform: 'capitalize',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#b2ff59',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }
  },
  signinButton: {
    color: 'white !important',
    textTransform: 'capitalize',
    fontWeight: 500,
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    }
  },
  menuButton: {
    color: 'white !important'
  },
  mobileMenu: {
    '& .MuiPaper-root': {
      marginTop: '40px'
    }
  },
  menuItem: {
    fontSize: '0.95rem'
  }
}))

const isActive = (history, path) => {
  return history.location.pathname === path ? true : false
}

const isPartActive = (history, path) => {
  return history.location.pathname.includes(path) ? true : false
}

const MenuComponent = withRouter(({history}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    auth.clearJWT(() => history.push('/'))
    handleMenuClose()
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/* Brand */}
        <Link to="/" className={classes.brand}>
          <StoreIcon fontSize="large" />
          MERN Marketplace
        </Link>

        {/* Navigation Links */}
        <Box className={classes.navLinks}>
          <Link to="/">
            <IconButton aria-label="Home" className={classes.cartButton}>
              <HomeIcon/>
            </IconButton>
          </Link>
          <Link to="/shops/all">
            <Button 
              className={`${classes.navButton} ${isActive(history, "/shops/all") ? classes.activeNavButton : ''}`}
            >
              Shops
            </Button>
          </Link>
          <Link to="/auctions/all">
            <Button 
              className={`${classes.navButton} ${isActive(history, "/auctions/all") ? classes.activeNavButton : ''}`}
            >
              Auctions
            </Button>
          </Link>
        </Box>

        {/* User Section */}
        <Box className={classes.userSection}>
          <Link to="/cart">
            <IconButton aria-label="Cart" className={classes.cartButton}>
              <Badge 
                badgeContent={cart.itemTotal()} 
                color="secondary"
                classes={{ badge: classes.badge }}
              >
                <CartIcon />
              </Badge>
            </IconButton>
          </Link>

          {!auth.isAuthenticated() && (
            <Box className={classes.authButtons}>
              <Link to="/signup">
                <Button className={classes.signupButton}>
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin">
                <Button className={classes.signinButton}>
                  Sign In
                </Button>
              </Link>
            </Box>
          )}

          {auth.isAuthenticated() && (
            <>
              <IconButton 
                aria-label="User Menu" 
                className={classes.menuButton}
                onClick={handleMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu 
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)} 
                onClose={handleMenuClose}
                className={classes.mobileMenu}
              >
                <MenuItem component={Link} to="/shops/all" onClick={handleMenuClose} className={classes.menuItem}>
                  Shops
                </MenuItem>
                <MenuItem component={Link} to="/auctions/all" onClick={handleMenuClose} className={classes.menuItem}>
                  Auctions
                </MenuItem>
                {auth.isAuthenticated().user.seller && (
                  <>
                    <MenuItem component={Link} to="/seller/shops" onClick={handleMenuClose} className={classes.menuItem}>
                      <StoreIcon style={{marginRight: '8px'}} /> My Shops
                    </MenuItem>
                    <MenuItem component={Link} to="/myauctions" onClick={handleMenuClose} className={classes.menuItem}>
                      📦 My Auctions
                    </MenuItem>
                  </>
                )}
                <MenuItem component={Link} to={"/user/" + auth.isAuthenticated().user._id} onClick={handleMenuClose} className={classes.menuItem}>
                  <AccountCircleIcon style={{marginRight: '8px'}} /> My Profile
                </MenuItem>
                <MenuItem onClick={handleSignOut} className={classes.menuItem}>
                  <ExitToAppIcon style={{marginRight: '8px'}} /> Sign Out
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
})

export default MenuComponent
