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

export const General = {
  sendContact : async (data) => fetch( API_ROOT + '/contact' , {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(data)
      }).then(parseResponse),
   sendNewsletter : async (data) => fetch( API_ROOT + '/newsletter' , {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(data)
      }).then(parseResponse),
 
} 