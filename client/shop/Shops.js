import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {list} from './api-shop.js'
import {Link} from 'react-router-dom'
import auth from '../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em'
  },
  avatar:{
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}))
export default function Shops(){
  const classes = useStyles()
  const [shops, setShops] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setShops(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])

    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Shops
        </Typography>
        <List dense>
          {shops.map((shop, i) => {
            return <Link to={"/shop/"+shop._id} key={i}>
              <Divider/>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}  src={'/api/shops/logo/'+shop._id+"?" + new Date().getTime()}/>
                </ListItemAvatar>
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.shopTitle}>
                    {shop.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    {shop.description}
                  </Typography>
                </div>
              </ListItem>
              <Divider/>
            </Link>})}
        </List>
      </Paper>
      {auth.isAuthenticated() && auth.isAuthenticated().user.seller && (
        <Link to="/seller/shop/new">
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      )}
    </div>)
}
