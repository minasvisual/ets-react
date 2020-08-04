import React from 'react'
import { API_ROOT } from '../../config'

function parseResponse(response){
   if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong ...');
    }
}

export const Blogs = {
  find: async (qr) => fetch( API_ROOT + '/v2/records/blog?join=accounts'+( (qr && qr.replace('?', '')) || 'page=1,8' ) )
        .then(parseResponse).then(data => data),
}