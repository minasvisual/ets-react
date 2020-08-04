import React, {useEffect, useState} from 'react'
import { connect, useSelector, useDispatch  } from 'react-redux'
import { t } from 'react-multi-lang'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Events } from '../models/Events'
import { Rating } from '../models/Rating'
import CarouselImage from '../plugins/carousel.component'
import AgendaList from '../plugins/agendalist.component'

const Now = () =>{
  
//// let [events, setEvents] = useState([])
 let [actual, setActual] = useState('')
 let { now = {} } = useSelector(state => ({ now: state.player.now}) ); 
  
 useEffect((data) =>{
   if( now && actual !== now.name && now.mbid && now.mbid.length > 5 ){
      Events.findByArtist(now.name)
        .then((data) => (now.events = data) )
        .catch((err) => (now.events = []) )
      setActual(now.name)
   }
 }, [now])
  
 return(
   <>
    { now && now.name ? ( 
      <div className="row" >
     
          <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2 padder-v">
            <div className="item">
              <div className="pos-rlt">
                <CarouselImage 
                    data={ [now] } 
                    link={ '/artist/' } 
                    classes={ 'w-100' } />
              </div>
            </div>
          </div>
   
          <div className="text-bio col-lg-4">
            <div className="padder-v">
              <div className="text-info padder m-t-sm text-sm">
                { t('playingNow') }
              </div>
              <h6>
                {t('genres') }
              </h6> 
              <div >
                { now.tags && JSON.parse(now.tags).map( (k, i) => 
                  <Link to={ "/genres/"+k } className="text-ellipsis text-xs text-muted" key={i}>
                    <small>{ k },</small>
                  </Link> 
                )}
              </div>
              <h6>
                { t('similarArtists') }
              </h6>
              <div >
                { now.similar && JSON.parse(now.similar).map( (k,i) => 
                    <Link to={ "/artist/"+ k } className="text-ellipsis text-xs text-muted" key={i}>
                      <small>{ k }, </small>
                    </Link>
                ) }
              </div>
              { now && now.liked ? '' : (
                <h6 className="d-flex">
                  <p className="h5">
                    { t('likeSong') }
                  </p>
                  <a href={'#'} className="fa fa-thumbs-up"  onClick={ () => Rating.sendRate(now.id, 1) } style={{ marginLeft: 10, color: "#64e026" }}  />
                  <a href={'#'}  className="fa fa-thumbs-down"   onClick={ () => Rating.sendRate(now.id, 0) }  style={{ marginLeft: 10, color: "#e22222" }} />
                </h6>
              )}
            </div>
          </div>

          <div className="text-bio col-lg-6 padder-v d-none d-md-block"  style={{ height: 200 }} >
            { now.events && now.events.length > 0 ? (
            <div ng-show="now.events && now.events.length > 0"  className=""  >
              <p>
                { t('artist') } { t('nextEvents') }
              </p>
              <div className="ms_weekly_inner">
                      <AgendaList data={ now.events } />
              </div>
            </div>
            ) : (
              <>
                <p bind-html="now.summary" dangerouslySetInnerHTML={{__html: now.summary.replace('Read more on Last.fm', '') }}></p>
                <p>
                { !now.summary || (now.summary && now.summary.length < 200 ) ? (
                  <a  href="https://www.hostgator.com.br/19556-128-1-701.html"  target="_blank"   >
                    <img src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-728x90.png" 
                          style={{ width: "100%", height: "auto" }} />
                  </a>
                ) : '' }
                </p>
              </>
            ) }
            
          </div>

        </div> ) : "" }
      </>
    )
}

export default Now;
