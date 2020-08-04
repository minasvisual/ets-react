import React, {useEffect, useState} from 'react'
import { connect, useSelector, useDispatch  } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { t } from 'react-multi-lang'
import _ from 'lodash'
import moment from 'moment'

import { Artists } from '../models/Artists'
import { Events } from '../models/Events'
import AgendaList from '../plugins/agendalist.component'

export default () => {
  
  const dispatch = useDispatch();
  let { name } = useParams();
  
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);
  
  const [agenda, setAgenda] = useState([]);
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  
   useEffect(() => {
     if(name) {
      setIsLoading(true)
      getDiscover()
        .then( getAlbums )
        .then( getAgenda )
        .then( () => setIsLoading(false) )
     }
     return () => error
   }, [name])
  
   async function getDiscover(){
     return Artists.findByName(name)
      .then(data => { setArtist(data);  })
      .catch(err => { setError(err); setIsLoading(false) })
   } 
  async  function getAlbums(){
     return Artists.findAlbums('/'+name)
        .then(data => { setAlbums(data);})
        .catch( err => { setError(err); setIsLoading(false) })
  } 
 
  async function  getAgenda(filter){
     if( artist.mbid ){ 
        return Events.findByArtist(name)
          .then(data => { setAgenda(data);  })
          .catch(err => { setError(err); setIsLoading(false) });
     }else{
        return Promise.resolve([])
     }
  }
 
    return (
      <section className="container-fluid" >
          <div className="row">
      
            <div className="col-12 d-flex padder_bottom20">
              <div className="h6" style={{ padding: '7px 15px 0 0' }}> 
                        <a onClick={ () => window.history.go(-1) } className="fa fa-arrow-left"> { t('back') }</a>
              </div>
              <h1 className="h2 font-thin">{ artist.name }</h1> 
            </div>

            <aside className="col-md-4" id="sidebar" >
                { !error && !isLoading ? (
                   <>
                    <div className="w-100">
                      <img className="img-fluid" src={ artist.image } alt={ artist.image } /> 
                    </div>
                    <div className="" bind-html="artist.bio" >
                      { artist.bio }  
                    </div>
                    <div className="padder-v padder no-radius no-border no-bg m-t-n-xxs m-b-none auto">
                      <h4>{ t('similarArtists') }</h4>
                      { artist.similar && JSON.parse(artist.similar).join(', ')  }
                    </div>  
                    <div className="padder-v padder no-radius no-border no-bg m-t-n-xxs m-b-none auto">
                      <h4>{ t('genres') }</h4>
                      { artist.tags && JSON.parse(artist.tags).map( (k) =>
                          (<a ng-repeat="k in JSON.parse(artist.tags)" href="#!/genres/{{k}}">{ k }, </a>)
                      )}
                    </div>
                  </>
                ) : (<h4 className="text-center">{ ( error ? error : 'Loading...' ) }</h4>) }
           </aside>

          <hr className="d-block d-md-none p-5 m-5" />
      
           <section className="col-md-4" >
                <div className="ms_heading m-0">
                  <h1>{ t('artistNextConcerts') }</h1>
                  <small style={{float: 'right'}}>by <img src="/assets/images/songkick.svg" style={{height: '15px'}} /></small>
                </div>
                <div className="ms_weekly_inner">
                    <div className=" ">
                        <AgendaList data={ agenda } />
                    </div>
                </div>
          </section>

          <hr className="d-block d-md-none p-5 m-5" />

          <section className="col-md-3" >
              <div className="ms_heading m-0">
                  <h1> { t('artistDiscography') }</h1>
                  <small style={{float: 'right'}}>by <img src="/assets/images/lastfm.png" style={{height: '15px'}} /></small>
              </div>
              <div className="w-100">
                  { albums && albums.length == 0 ? (<h2 className="text-center">{ t('noDiscographyArtist') }</h2>) : '' }
                  { albums && albums.map( (evt, i) =>
                     <>
                         <div className="ms_weekly_box d-flex">
                     
                                <div className="weekly_left">
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src={ evt.cover } alt={ evt.title } />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="/assets/images/svg/play.svg" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href={'#'}>{ evt.title }</a></h3>
                                            <p><i className="icon-calendar" /> {  evt.release  }</p>
                                        </div>
                                    </div>
                                </div>
                     
                        </div>
                        <div className="ms_divider"></div>
                     </>
                  )}
              </div>
          </section>

          <section className="col-1 d-none d-md-block">
              <a href="https://www.hostgator.com.br/19556-128-1-696.html" target="_blank">
                <img style={{border: '0px', width: '100%', height: 'auto'}} width={120} height={600} alt="" 
                src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-120x600.png" /></a>
          </section>

        </div>
      </section>
    );
}