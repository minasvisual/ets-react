import React from 'react'
import { API_ROOT } from '../../config'

function parseResponse(response){
    if (response.status >= 400) {
        throw new Error("Bad response from server")
    } else if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong ...');
    }
}

export const Genres = {
  find : async (qr, cb) => fetch( API_ROOT + '/genres'+(qr || '') , {method: 'GET'})
        .then(parseResponse), 
  update : async (name, body) => fetch( API_ROOT + '/genres/'+name+'?token=qwertyuiop' , { 
              method: 'POST', 
              "body":JSON.stringify(body), 
              headers: {'Content-Type':'application/json'}, 
        })
        .then(parseResponse),
  sanitize: (string) => {
       return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  },
  
}