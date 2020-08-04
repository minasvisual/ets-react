import React from 'react'
import { API_ROOT } from '../../config'

function parseResponse(response){
   if (response.ok) {    
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json();
    } else {
      throw new Error('Something went wrong ...');
    }
}

export const Rating = {
  sendRate : async (artistId, like) => fetch( API_ROOT + '/likes/'+artistId , {
      method: 'POST', 
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
              like: ( like === 1 ? 1: 0),
              dislike: ( like === 0 ? 1: 0)
       })
      }).then(parseResponse),
  findRate: async (qr) => fetch( API_ROOT + '/rate'+(qr || '?limit=6') )
      .then(parseResponse),
} 