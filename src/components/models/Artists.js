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

export const Artists = {
  findByName : async (artist) => fetch( API_ROOT + '/artist/'+artist , {method: 'POST', body:'{}'})
        .then(parseResponse),
  findByGenre : async (genre) => fetch( API_ROOT + '/artists?genre='+genre )
        .then(parseResponse),
  find : async (qr, records = false) => fetch( API_ROOT + '/v2/records/artists'+( qr || '?limit=8&page=1,8') )
      .then(parseResponse).then(data => (records? data : data.records ) ),
  findAlbums: async (qr) => fetch( API_ROOT + '/albums'+(qr || '?limit=6') )
      .then(parseResponse),
  findRate: async (qr) => fetch( API_ROOT + '/rate'+(qr || '?limit=6') )
      .then(parseResponse),
}