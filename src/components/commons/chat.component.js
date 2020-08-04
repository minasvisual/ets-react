import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import _  from 'lodash'

import { Modal } from 'react-bootstrap'
import Login from './login.component'

const $ = window.$;

const Chat = () => { 
  
  //let ref = window.firebase.database().ref().child("messages")
  const [chatmsg, setChatmsg] = useState('')
  const [messages, ] = useState([])
  const [online, ] = useState(0)
  const [showLogin, setShowLogin] = useState(false);
  const {user, status} = useSelector(state => ({ auth: state.auth}) );
  
  useEffect(() =>{
    getMessages()
  }, [status])
  
  // const getProviderId = (sender) => {
  //     return sender.user && sender.user.providerData ? sender.user.providerData[0].uid : null ;
  // }
  
  const getMessages = () => {
    
    // window.firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
        
    //     var listRef = window.firebase.database().ref().child("presence");
    //     // Number of online users is the number of objects in the presence list.
    //     listRef.once("value").then(function(snap) {
    //       setOnline(snap.numChildren())
    //     });  
    //     var ref = window.firebase.database().ref().child("messages");
    //     ref.orderByChild("createdAt").limitToLast( 50 ).once('value').then(function(snapshot) {
    //        var messagesArr = []
    //        snapshot.forEach(function(childSnapshot) {
    //           var childKey = childSnapshot.key;
    //           var childData = childSnapshot.val();
    //           messagesArr.push({ id: childKey, ...childData})
    //        })
    //        setMessages(messagesArr)
    //     });
    //   } 
    // });
  }
  
  const sendMessage = (msg) => {
      //vm.messages.push({ id:1, userId:1, displayName: "User 1", message: msg})
      //if( typeof ga == 'function' ) ga('send', 'pageview', '/chat/message' );
      var rs = {
        room: 'default',
        sender: _.get(user, 'providerData.uid') || null,
        displayName: _.get(user, 'displayName'),
        photo: _.get(user, 'photoURL'),
        text: msg,
        createdAt: new Date().getTime() / 1000
      };
      ref.push(rs);
      setChatmsg('');
      scrollChat()
  }
   
  const scrollChat = () => {
    let height = 0;
    $('.mCSB_container').each(function(i, value){
        height += parseInt($(this).height());
    });

    height += '';

    $('.mCustomScrollBox').animate({scrollTop: $('.mCSB_container').height() });
  }
  
  return(
        <>
            <div className="jp_queue_wrapper">
              <span className="que_text" id="myPlaylistQueue">
                <i className="fa fa-angle-up" aria-hidden="true" />Chat
              </span>
              <div id="playlist-wrap" className="jp-playlist" style={{ padding: '15px 0px 10px 0px' }}>
                <div className="jp_queue_cls">
                  <i className="fa fa-times" aria-hidden="true" />
                </div>
                <h2>Chat  <small>(online {online})</small></h2>
                <div className="jp_queue_list_inner">
                  { 
                    status ? (
                    <ul>
                      { messages && messages.map( (row, i) => (
                        <li key={i}>
                          <div>
                            <a href={ '#' } className="jp-playlist-item" tabIndex={ 0 }>
                              { row.sender == user.providerData.uid ? ('') : (<span className="que_img" ><img src={ row.photo } style={{width:'90%'}} /></span>) }
                              <small className="que_data p-0" style={{ lineHeight: '18px' }}>
                                <p className="m-0">{ row.text } </p>
                                <small className="jp-artist text-info">by { row.displayName } - { moment(row.createdAt).format("MMM Do YYYY, H:mm") } </small>
                              </small>
                              { row.sender == user.providerData.uid ? (<span className="que_img" ><img src={ row.photo } style={{width:'90%'}} /></span>) : ''}
                            </a>
                            <div className="action">
                              <span className="que_more"> <img src="/assets/images/svg/more.svg" /></span>
                            </div>
                          </div>
                          <ul className="more_option">
                            <li className="jp-playlist-current">
                               <a href="#"><span className="opt_icon" title="Add To Favourites"><span className="icon icon_fav"></span></span></a>
                            </li>
                          </ul>
                        </li>)
                      ) } 
                    </ul>) : (<h5 align="center"><a href={'#'} onClick={() => (setShowLogin(true)) }>Login to chat</a></h5>)  
                  }
                </div>
                <div className="jp_queue_btn d-flex p-0" style={{margin:'10px'}}>
                  <input type="text" className="form-control" placeholder="Message" onChange={ (e) => setChatmsg(e.target.value) }
                         style={{ paddingLeft:'10px' }} disabled={ !status || chatmsg == '' } />
                  <button type="button" className="ms_save" disabled={ !status } onClick={ () => sendMessage(chatmsg) }>
                    Send
                  </button>
                </div>
              </div>
            </div>

            <Modal  show={ showLogin } 
                    onHide={() => (setShowLogin(false)) } 
                    dialogClassName="ms_save_modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
              <Modal.Body>
                  <Login />
              </Modal.Body>
            </Modal>
        </>
    )

}

export default Chat;
