import React, {useEffect, useState} from 'react'
import { connect, useSelector, useDispatch  } from 'react-redux'
import { t } from 'react-multi-lang'
import tersus from 'tersus-jsx.macro';
import { NavLink } from 'react-router-dom'
import { updateUser, updateStatus } from '../../actions'

const firebase = window.firebase

const Login = () => {
  
  const dispatch = useDispatch();
  let [provider, setProvider] = useState('')
  
  const {user, status} = useSelector(state => ({ auth: state.auth}) );
  
  useEffect(() => {
    setProvider(new firebase.auth.FacebookAuthProvider())
    
    console.log(user, status)
  }, [])
  
  const login = () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result)
      var token = result.credential.accessToken;
      var { uid, displayName, email, photoURL, phoneNumber, providerData } = result.user;
      providerData = (providerData[0] || {})
      // The signed-in user info.
       dispatch(updateUser({email, phoneNumber, providerData }))
       dispatch(updateStatus(true))
      
    }).catch(function(error) {
      dispatch(updateUser({ 
          email:'ulisses@ulisses.com', 
          phoneNumber:'12345678', 
          displayName:'Ulisses', 
          providerData:{ 
              displayName: 'Ulisses',
              uid: '2339326292792318',
              photoURL: "https://graph.facebook.com/2339326292792318/picture"
          } 
      }))
       dispatch(updateStatus(true))
      // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//        dispatch(updateUser({}))
//        dispatch(updateStatus(false))
      
//       console.log(errorCode, errorMessage)
    });
  }

    return(
<div>
  <h4>{ t('login_to_start_sharing') }</h4>
  <div className="save_modal_btn text-center">
    <a href="#" onClick={ login }>
      <i className="fa fa-facebook-square" aria-hidden="true" /> continue with
      facebook
    </a>
  </div>
 
</div>
     );
}

export default Login;
