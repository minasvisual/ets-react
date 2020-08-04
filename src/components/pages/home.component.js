import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { connect, useSelector, useDispatch  } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import { t } from 'react-multi-lang'
import _ from 'lodash'
import moment from 'moment'

import { API_ROOT } from '../../config'
import { clickButton } from '../../actions'

import CarouselImage from '../plugins/carousel.component'
import AgendaList from '../plugins/agendalist.component'
import Now from '../commons/now.component'

import { Artists } from '../models/Artists'
import { Blogs } from '../models/Blogs'
import { Events } from '../models/Events'

const Home = () => {
  
  const player = {};
  let filterEvents = '';
  const dispatch = useDispatch();
  
  const [hits, setHits] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [likes, setLikes] = useState([]);
  
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  
 useEffect(() => {
    getAlbums()
    getDiscover()
    getBlogs()
    getAgenda()
    getLikes()
   
   return () => isLoading
 }, [])
  
  const {newValue} = useSelector(state => ({ newValue: state.chat.newValue}) );
  //const {now} = useSelector(state => ({ now: state.player.now}) );
  const {playing} = useSelector(state => ({ playing: state.player.playing}) );
  
  async function getDiscover(){
     await Artists.find('?size=8&order=id,desc&include=id,name,image')
      .then(data => { setHits(data); setIsLoading(false) })
      .catch(err => { setError(err); setIsLoading(false) })
  }
  async  function getAlbums(){
     await Artists.findAlbums('?limit=8&order=id,desc')
        .then(data => { setAlbums(data); setIsLoading(false) })
        .catch( err => { setError(err); setIsLoading(false) })
  } 
  async function  getBlogs(){
    await Blogs.find('?join=accounts&filter=category,eq,1&order=id,desc&size=4&include=id,title,cover,accounts.nickname')
      .then(data =>{ setBlogs(data.records); setIsLoading(false) })
      .catch(err => { setError(err); setIsLoading(false) });
  } 
  async function  getAgenda(filter){
    filter = ( filter && filter.length > 1 ? '&local='+filter : ''); 
    
    await Events.find('?limit=6&order=start,desc&startin='+moment().format('YYYY-MM-DD') + filter)
      .then(data => { setAgenda(data); setIsLoading(false) })
      .catch(err => { setError(err); setIsLoading(false) });
  }
  async  function getLikes(filter){
    await Artists.findRate( '?limit=10' )
      .then(data => { setLikes(data); setIsLoading(false) })
      .catch(err => { setError(err); setIsLoading(false) });
  }
  
  function handleOnChange(e){
    _.debounce((evt, value)=>{ 
      getAgenda( e.target.value);
    }, 1000)
  }
  
  return (
     <>
        <Now />
    
    <hr className="d-block d-md-none p-5 m-5" />
    
  <div className="row">
    <div className='col-md-8'>
      <div className="row">
    
            <div className='ms_top_artist col-12 mt-0' >
              <div className="container-fluid">
                <div className="row">

                  <div className="col-lg-12">
                    <div className="ms_heading"  >
                      <h1><Link to="/genres">{ t('latestAlbums') }</Link></h1>
                      <a
                        href="https://www.musicbraiz.org/"
                        target="_blank"
                        style={{ float: "right" }}
                      >
                        <small>by</small>
                        <img src="/assets/images/mbid.png" style={{ height: 22 }} />
                      </a>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className=" ms_album_slider swiper-container">
                      <div className="swiper-wrapper">
                        { albums && albums.map((row, i) => (
                              <div className={ 'swiper-slide col-xs-6 col-sm-3' } key={i}>
                              <div className="ms_rcnt_box marger_bottom30" >
                                <div className="ms_rcnt_box_img"  style={{ 
                                        background: 'url('+row['cover']+') center no-repeat',
                                        overflow: "HIDDEN",
                                        minHeight: "150px",
                                        backgroundSize: "cover",
                                      }}> 
                                  <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                    <Link to={ '/artist/'+encodeURIComponent(row['name']) } className="ms_play_icon">
                                      <img src="/assets/images/svg/play.svg" />
                                    </Link>
                                  </div>
                                </div>
                                  <div className="ms_rcnt_box_text">
                                    <h3>
                                      <Link to={ '/artist/'+encodeURIComponent(row['name']) }>
                                          { (row['title'] || '').slice(0, 50) }...
                                      </Link>
                                    </h3>
                                    <small>by { row.name }</small>
                                  </div>
                              </div>
                            </div>)
                        )}
                      </div>
                    </div>
                    <div className="swiper-button-next3 slider_nav_next"></div>
                    <div className="swiper-button-prev3 slider_nav_prev"></div>
                  </div>
                </div>
              </div>
            </div> 
            
            <div className="col-12" style={{ overflow: "hidden" }}>
              <a href="https://www.hostgator.com.br/19556-128-1-701.html"  target="_blank"  className="c" >
                <img
                  src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-728x90.png"
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </div>
            
            <div className='ms_top_artist col-12' >
              <div className="container-fluid">
                <div className="row">

                  <div className="col-lg-12">
                    <div className="ms_heading" >
                      <h1><Link to="/genres">{ t('lastPlayed') }</Link></h1>
                      <a
                        href="https://www.songkick.com/"
                        target="_blank"
                        style={{ float: "right" }}
                      >
                        <small>by</small>
                        <img src="/assets/images/lastfm.png" style={{ height: 15 }} />
                      </a>
                    </div>
                  </div>
                  <CarouselImage 
                    data={ hits } 
                    imgheight="150px" 
                    link={ "/artist/" } 
                    classes={ 'col-6 col-sm-3 box-image-md' } />
                </div>
              </div>
            </div> 
            
            <div className='ms_top_artist col-12' >
              <div className="container-fluid">
                <div className="row">

                  <div className="col-lg-12">
                    <Link className="ms_heading" to="news">
                      <h1>{ t('lastBlogs') }</h1>
                    </Link>
                  </div>
                  <CarouselImage 
                    data={ blogs } 
                    classes={'col-6 col-sm-3 box-image-md'} 
                    image={ 'cover' } 
                    url={ 'title' } 
                    name={ 'title' } 
                    tags={'account_id.nickname'}
                    imgheight="150px" 
                    link={'/news/'}/>
                </div>
              </div>
            </div> 
      
     </div>
     {/* FIM ROW */}
  </div>
  <div className="col-md-4">
            <div className="col-lg-12">
              <div className="ms_heading">
                <h1>{ t('nextEvents') }</h1>
                <a
                  href="https://www.songkick.com/"
                  target="_blank"
                  style={{ float: "right" }}
                >
                  <small>by </small>
                  <img src="/assets/images/songkick.svg" style={{ height: 20 }} />
                </a>
              </div>
            </div>
       
            <div className="col-md-12">
               <div>
                <InputGroup className="mb-3"> 
                  <FormControl
                    placeholder={ t('search') +' '+ t('local') }
                    aria-label={ t('search') +' '+ t('local') }
                    aria-describedby="basic-addon2"
                    onChange={ (e) => (filterEvents = e.target.value) }
                  />
                  <InputGroup.Append>
                    { filterEvents.length > 1 ? (<button className="" type="button" onClick={ (e) => (filterEvents = '') }>X</button>) : '' }
                    <button type="button" className="" onClick={ (e) => getAgenda(filterEvents) }>Go</button>
                  </InputGroup.Append>
                </InputGroup>
               </div>
               <div className="ms_weekly_inner">
                      <AgendaList data={ agenda } />
              </div>
            </div>
           
            <div className="col-lg-12 padder_bottom10 padder_top10">
              <img
                src="/assets/images/lovmetal-banner.jpg"
                alt="lovmetal-banner"
                className="img-fluid my-2"
              />
            </div>
           
            <div className="col-lg-12">
              <div className="ms_heading">
                <h1>{ t('mostLiked') }</h1>
              </div>
            </div>
            <div className="album_inner_list">
              <div className="album_list_wrapper">
               { likes && likes.map( (row, i) => 
                  <ul className="d-flex" key={i} >
                    <li className="w-75">
                       <b style={{ marginRight:"10px" }}>{ (i+1) }</b> 
                       <Link className="clear text-ellipsis" to={ "/artist/"+row.name }>
                          <span >{ row.name }</span>
                        </Link>
                    </li>
                    <li className="text-center">
                      <a href="#" className="m-r-sm">
                        { row.like }
                         <i className="pl-5 fa fa-thumbs-up text-success" />
                      </a>
                    </li>
                    <li className="text-center">
                      <a href="#" className="m-r-sm">
                        { row.dislike }
                        <i className="pl-5 fa fa-thumbs-down text-danger" />
                      </a>  
                    </li>
                  </ul>
               )}
						</div>
				</div>
            
   </div>
   {/* FIM ROW */}
</div>
      </>
    )
}

export default Home;
