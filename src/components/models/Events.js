import React from 'react'
import { API_ROOT } from '../../config'
import moment from 'moment'

function parseResponse(response){
   if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong ...');
    }
}

export const Events = {
  find: async (qr) => fetch( API_ROOT + '/events'+( qr || '?limit=8' ) )
        .then(parseResponse),
  findByArtist: async (artist, qr) => fetch( API_ROOT + '/events?startin='+moment().format('YYYY-MM-DD')+'&artist='+artist + ( (qr && qr.replace('?','')) || '' )  )
        .then(parseResponse),
}