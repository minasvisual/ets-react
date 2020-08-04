// Importando o React
import React, {useEffect, useState} from 'react'
import { connect, useSelector, useDispatch  } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { t, setLanguage, getLanguage } from 'react-multi-lang'
import { Modal, Button } from 'react-bootstrap'

import { updateUser, updateStatus } from '../../actions'
import Language from './language.component'
import Login from './login.component'
import Search from './search.component'

const firebase = window.firebase

const Header = () => {
    
  const dispatch = useDispatch();
  
  const [provider, setProvider] = useState('')
  const [showLogin, setShowLogin] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [lang, setLang] = useState(false);
  
  const {user, status} = useSelector(state => ({ auth: state.auth}) );

  useEffect(() =>{
    setProvider( new firebase.auth.FacebookAuthProvider() );
    
    // firebase.auth().onAuthStateChanged(function(auth) {
    //   if ( auth && auth.providerData ) {
    //     let { email, phoneNumber, providerData, displayName } = auth;
    //     providerData = (providerData[0] || {})
    //     dispatch(updateUser({email, phoneNumber, providerData }))
    //     dispatch(updateStatus(true))
    //   }
    // console.log(user, status)
    // });
  }, [])
  
  useEffect(() =>{
    setLang(getLanguage())
    console.log('lang update', getLanguage())
  }, [showLang])
  
  const checkActive = (match, location) => {
  	if(!location) return false;
    const {pathname} = location;
    
    return pathname.indexOf('/tophergates') !== -1 || pathname.indexOf('/_display/') !== -1;
  }
    
  const logout = () => {
      // firebase.auth().signOut().then(function() {
      // // Sign-out successful.
      //   dispatch(updateUser({}))
      //   dispatch(updateStatus(false))
      // }, function(error) {
      //   console.log(error)
      // });
  }
  
  
  return (
    <>
     <div className="ms_header">
        <div className="ms_top_left">
    
         <Search />
    
          <div className="ms_top_trend text-right">
            <span className="top_marquee">
              <img src="/assets/images/name-enter-the-shadows-mini.png"  alt="enter the shadows" className="p-2 img-fluid" />
            </span>
          </div>
        </div>
        <div className="ms_top_right">
          <div className="ms_top_lang">
            <a href={'#'} data-toggle="modal" 
                onClick={ () => setShowLang(true) }>
              <img src={ '/assets/images/'+lang+'.png' } style={{height:"20px"}} /> 
              <i className="fa fa-caret-down"></i>
            </a>
          </div>
          <div className="ms_top_btn">
            { status ? 
                (<span>{ user.displayName } <a onClick={ logout }>Logout</a></span>) : 
                (<a href={ '#' } className="ms_btn login_btn" onClick={ () => setShowLogin(true) }><span>login</span></a>)
            }
          </div>
        </div>
      </div>
    
      <Modal  show={showLogin} 
              onHide={() => setShowLogin(false) } 
              dialogClassName="ms_save_modal"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
        <Modal.Body>
            <Login />
        </Modal.Body>
      </Modal>
      <Modal  show={showLang}
              onHide={() =>{ setShowLang(false); } } 
              dialogClassName="ms_lang_popup"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
        <Modal.Body>
            <Language />
        </Modal.Body>
      </Modal>
    
      </>
    );
}

export default Header;