const create = async (params, credentials, bid) => {
  try {
    let response = await fetch('/api/bids', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        auctionId: params.auctionId,
        bidAmount: bid.bidAmount
      })
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

const listByAuction = async (params, signal) => {
  try {
    let response = await fetch('/api/bids/' + params.auctionId, {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  listByAuction
}