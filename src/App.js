import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route , Switch, withRouter, useHistory } from 'react-router-dom'

import { translate, setLanguage, getLanguage, setDefaultTranslations, setDefaultLanguage } from 'react-multi-lang'
import pt from './lang/pt.json'
import en from './lang/en.json'
import es from './lang/es.json'

import * as AppCss from './App.css'
import { sendView } from './helpers/functions'

import Home from './components/pages/home.component'
import Contact from './components/pages/contact.component'
import Artists from './components/pages/artists.component'
import Genres from './components/pages/genres.component'
import News from './components/pages/news.component'
import Movies from './components/pages/movies.component'

import Chat from './components/commons/chat.component'
import Header from './components/commons/header.component'
import Sideleft from './components/commons/sideleft.component'
import Footer from './components/commons/footer.component'
import Player from './components/commons/mainplayer.component'

setDefaultTranslations({pt, en, es})
setDefaultLanguage('en')

class App extends React.Component{
 
  
  componentDidMount() {
     let lang = window.localStorage.getItem('lang')
     if( lang )
       setLanguage(lang)
     else
       window.localStorage.setItem('lang', 'en')
    
    this.unlisten = this.props.history.listen((location, action) => {
      //console.log("on route change", location.pathname, action);
      sendView(location.pathname)
    });
  }
  
  componentWillUnmount() {
      this.unlisten();
  }
  
  render(){
      return (
        <section >
          <Sideleft />
          <div className="ms_content_wrapper padder_top80" >
              <Header />
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/contact' component={Contact}/>
                <Route exact path={ '/genres' } component={Genres}/>
                <Route path={ '/genres/:name' } component={Genres}/>
                <Route path='/artist/:name' component={Artists}/>
                <Route exact path='/movies' component={Movies}/>
                <Route path='/movies/:name' component={Movies}/>
                <Route exact path='/news' component={News}/>
                <Route path='/news/:name' component={News}/>
              </Switch> 
          </div>
          <Footer />
          <Player />
        </section>
      );
  }
}

export default withRouter(translate(App));
