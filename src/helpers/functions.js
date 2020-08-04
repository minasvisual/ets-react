import { GA_CODE } from '../config';
import {  matchPath  } from 'react-router-dom'

export const getParams = (route) => {
   return matchPath( window.location.pathname, {
      path: route,
      exact: true,
      strict: false
    });
}

export const sendView = (path) => {
  if( typeof window.ga === 'function' ){
    console.log(path, GA_CODE)
    window.ga('create', GA_CODE, 'auto');
    window.ga('send', 'pageview', path);
  }
}

export const pagination = (perPage = 8, total = 0) => {
     let page = [];
      var pages = parseInt(total / perPage, 10);
      for (var i = 1; i <= pages; i++) {
        page.push(i);
      }
    return page
}