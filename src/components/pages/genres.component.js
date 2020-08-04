import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { t } from 'react-multi-lang'
import { Genres } from '../models/Genres'
import { Artists } from '../models/Artists'
import { pagination, sendView } from '../../helpers/functions'

import _ from 'lodash'
import moment from 'moment'
import CarouselImage from '../plugins/carousel.component'


export default ({ match: { params } }) => {
    
   let { name } = useParams('genres/:name');
  
   const [artists, setArtists] = useState([]);
   const [genres, setGenres] = useState([]); 
   const [genre, setGenre] = useState('All'); 
   const [genreFilter, setGenreFilter] = useState('All'); 
  
   const [artistsLoading, setArtistsLoading] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
  
   const [actualPage, setActualPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [pages, setPages] = useState([]);
  
   useEffect(() => {
     console.log('name received', name)
     setIsLoading(true)
     getGenres()
       .then(getDiscover)
       .then(() =>{ 
          if( name ) getArtistByGenre(decodeURIComponent(name)) 
        })
       .then(() => setIsLoading(false) )
     return () => error
   }, [name])
  
   async function getGenres(){
     setIsLoading(true)
     return Genres.find(null)
      .then(data => { setGenres(data); })
      .catch(err => { setError(err); setIsLoading(false) })
   } 
   async function getDiscover(page=1){
     setActualPage(page)
     setGenre('All')
     setArtistsLoading(true)
     return Artists.find('?size=8&order=id,desc&include=id,name,image&page='+page+',8', true)
      .then(data => { 
          setArtists(data.records); 
          setPages( pagination(8, data.results) )
          setArtistsLoading(false)
       })
      .catch(err => { setError(err); setIsLoading(false) })
   }  
   async function getArtistByFilter(name){
     setArtistsLoading(true)
     return Artists.find( '?filter=name,cs,'+name )
      .then(data => { 
          setArtists(data); 
          setArtistsLoading(false)
          sendView('/search/'+name)
      })
      .catch(err => { setError(err); setArtistsLoading(false) })
   } 
  async function getArtistByGenre(genre, page = 1){
     setActualPage(page)
     setArtistsLoading(true)
     setGenre(genre)
     return Artists.findByGenre(genre+'&paginate=8&page='+page)
      .then(data => {
          setArtists(data.records); 
          setTotalPages(data.results); 
          setArtistsLoading(false)
          setPages( pagination(8, data.results) )
      })
      .catch(err => { setError(err); setArtistsLoading(false)})
   }
   function filterGenres(){
       return genres && genres.filter((row) => (genreFilter === 'All' ? true : (row.name.indexOf(genreFilter) > -1 ) ))
   }
   function hide(name){
     Genres.update(name, {hide: 1}).then((data) => {
       console.log(data);
       getGenres();
       setIsLoading(false)
     })
   }
    
   function changePage(page){
       if( genre == 'All' )
          getDiscover(page)
       else
          getArtistByGenre(genre, page)
   }
  
  let handleOnChange = (e) => {
    let str = e.target.value;
    _.debounce( () => { 
      console.log(str)
      //getArtistByFilter( e );
  }, 1000)}
  
  
  return (
    <div className="row">
     {  (!error && !isLoading) ?  (
        <>
          <section className="col-md-2 col-sm-3 col-4 p-0"  >
            <input type="text" className="w-100 bg-dark text-light form-control" placeholder={ t('find') +' '+ t('genres') } 
                     onChange={ (evt) => setGenreFilter(evt.target.value) } />
            <div className="list-group no-radius no-border" style={{height: '70vh', overflowX: 'hidden'}}> 
              <a href={ '#' } className="list-group-item" onClick={ () => getDiscover() } >{ t('all') }</a>
              { genres && filterGenres().map( (row, i) =>
                     <li className="d-flex" key={i}> 
                        <Link className="pl-5 ml-5 list-group list-group-item-action" key={ i }  to={'/genres/'+row.name} >
                            { row.name } 
                        </Link> 
                     </li>
              )}
            </div>
          </section>

          <section className="col-lg-10 col-md-2 col-sm-9 col-8" style={{height: '100%', 'right': 0}}>
            <div className="row">
              <div className="col-3 col-lg-1 visible-lg" style={{paddingTop: '7px'}}>
                <a href={ '#' } className="fa fa-arrow-left">{ t('back') }</a>
              </div>
              <div className="col-col-md-12 col-lg-11">
                <input type="text" className="form-control bg-black dk no-border" placeholder={ t('search') +' '+ t('artist') } 
                       name="" onBlur={ (e) => getArtistByFilter( e.target.value )  }  /></div>
            </div>
            <div className="mt-3 col-12 padder_top20">
                <div className="col-lg-12 p-0">
                    <div className="ms_heading">
                      <h1>{ genre }</h1>
                    </div>
                </div>
                <div className="row row-sm">
                  { artistsLoading ? (<h4 className="text-center">{ 'Loading...' }</h4>) :
                    <CarouselImage 
                    data={ artists } 
                    link={ '/artist/' } 
                    error={ error }
                    classes={ 'col-6 col-sm-3 box-image-md' } />
                  }
                </div>
                <div className="row">
                  <div className="col-md-12 text-center">  
                    {/*ADS*/}
                    <div id="34195-1" className="text-center">
                    </div></div>
                </div>
                <ul className="pagination  d-flex justify-content-center">
                  <li className="page-item"><a  className="page-link" href="#" 
                      onClick={ () => changePage( (actualPage > 1 ? (actualPage-1):1) ) }>
                          <i className="fa fa-chevron-left" /></a></li>
                  { pages && pages.map( k => ( pages.length > 30 && k > 5 && k < (pages.length - 5) ? ( k == 6 ? '...':'') :
                      <li key={k} className={ 'page-item '+ (actualPage == k ? 'active': '') } onChange={ () => changePage(k) }><a className="page-link" href="#">{k}</a></li>)
                  )}
                  <li className="page-item" ><a className="page-link" href={'#'} 
                      onClick={ () => changePage( (actualPage < pages.length ? (actualPage+1):pages.length) ) }>
                          <i className="fa fa-chevron-right" /></a></li>
                </ul>
            </div>
          </section>
        </>
      ) : (<h5 >{ isLoading ? 'Loading..' : 'Erro to load.' }</h5>) }
    </div>
   )
}