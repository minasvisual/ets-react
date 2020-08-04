// Importando o React
import React, {useEffect, useState} from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { t } from 'react-multi-lang'
import _ from 'lodash'

import {General} from '../models/General';

const Footer = () => {
  
  const [message, setMessage] = useState({})
  const [response, setResponse] = useState({})
  const {user, status} = useSelector(state => ({ auth: state.auth}) );
  
  
  const sendNewsletter = () => {
    if( status )
        setMessage({...message, cover: _.get(user, 'photoURL', '') })
    General.sendNewsletter(message)
       .then((msg) =>{
          setResponse({status: 'true', ...msg }) 
          document.querySelectorAll('.form-newsletter')[0].reset()
        })
       .catch((err) => setResponse({status: 'false', ...err }) )
  }
  
  const fieldSet = (event) => {
   console.log(event.target.name)
   setMessage({...message, [event.target.name]: event.target.value })
 }
  
  return (
    <div className="ms_footer_wrapper">
    
      <div className="ms_footer_inner">
        <div className="row">
    
          <div className="col-lg-3 col-md-6 d-none d-md-block">
            <div className="footer_box">
              <h1 className="footer_title">Enter The Shadows Radio </h1>
              <p dangerouslySetInnerHTML={{__html: t('aboutus')}} ></p>
            </div>
          </div>
    
          <div className="col-lg-3 col-md-6  d-none d-md-block">
            <div className="footer_box footer_app">
              <h1 className="footer_title">{ t('ourpartners') }</h1>
           
              <a href="https://lovmetal.online/" target="_blank" className="foo_app_btn w-100">
                <img
                  src="https://lovmetal.online/app/lovMetal.png"
                  alt="Lovmetal - Namoro Underground"
                  style={{'height':'30px'}}
                /> <span className="text-danger" >LovMetal</span>
              </a>
              <a href="https://nightfy.com.br" target="_blank" className="foo_app_btn w-100">
                <img src="https://nightfy.com.br/assets/images/nome-nightfy.png" alt="Nightfy - Agenda de eventos" style={{'height':'25px'}} />
              </a>
              <a href="https://arcadiawebtv.com/" target="_blank" className="foo_app_btn w-100">
                <img src="https://arcadiawebtv.com/wp/wp-content/uploads/2019/12/cropped-logo-de-video1.jpg" alt="Arcadia Web TV" style={{'height':'25px'}} />
                <span className="text-danger" > Arcadia Web TV</span>
              </a>
            </div>
          </div>
    
          <div className="col-lg-3 col-md-6 col-12">
            <div className="footer_box footer_subscribe">
              <h1 className="footer_title">Newsletter</h1>
              { response && response.status ? (<p className="alert alert-success">{ response.message || response.error }</p>) : ""  }
              <form className="row form-newsletter">
                <div className="form-group col-6 col-sm-12">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={ t('name') }
                    onChange={ fieldSet }
                  />
                </div>
                <div className="form-group col-6 col-sm-12">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder={ t('email') }
                    onChange={ fieldSet }
                  />
                </div>
                <div className="form-group col-12">
                  <a href={'#'} className="ms_btn" onClick={ () => sendNewsletter() } disabled={ !message.email || !message.name }>
                    { t('register') }
                  </a>
                </div>
              </form>
            </div>
          </div>
    
          <div className="col-lg-3 col-md-6">
            <div className="footer_box footer_contacts">
              <h1 className="footer_title">{ t('contactUs') }</h1>
              <ul className="foo_con_info">
                {/* <li>
                  <div className="foo_con_icon">
                    <img src="/assets/images/svg/phone.svg"  />
                  </div>
                  <div className="foo_con_data">
                    <span className="con-title">Call us :</span>
                    <span>(+1) 202-555-0176, (+1) 2025-5501</span>
                  </div>
                </li> */}
                <li  className="d-flex m-0">
                  <div className="foo_con_icon">
                    <img src="/assets/images/svg/message.svg"  />
                  </div>
                  <div className="foo_con_data">
                    <span className="con-title">emails:</span>
                    <span>
                      <a href="mailto:contact@entertheshadows.com.br" target="_blank" >contact@entertheshadows.com.br</a>
                    </span>
                  </div>
                </li>
                <li  className="d-flex m-0">
                  <div className="foo_con_icon">
                    <img src="/assets/images/svg/add.svg"  />
                  </div>
                  <div className="foo_con_data">
                    <span className="con-title">{ t('location') } :</span>
                    <span>SÃ£o Paulo, Brazil</span>
                  </div>
                </li>
              </ul>
    
              <div className="foo_sharing">
                <div className="share_title">{ t('followus') } :</div>
                <ul>
                  <li>
                    <a href="https://www.facebook.com/radioentertheshadows/" target="_blank">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  {/* <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-google-plus" aria-hidden="true" />
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*--Copyright--*/}
      
    </div>
  );
}

export default Footer;