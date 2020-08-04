import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { t } from 'react-multi-lang'
import { sendView } from '../../helpers/functions'

import { Blogs } from '../models/Blogs'
import CarouselImage from '../plugins/carousel.component'

export default () => {
  
   const { name } = useParams('/movies/:name');
   const [movies, setMovies] = useState([]);
   const [detail, setDetail] = useState({});
  
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
  
  useEffect(() => {
     setIsLoading(true)
     getMovies()
       .then(() =>{
          setIsLoading(false) 
       })
     return () => error
   }, [name])
  
   async function getMovies(){
     setIsLoading(true)
     return Blogs.find('&filter=category,eq,2')
      .then(data => { 
          setMovies(data.records);
          if( name ){
            let movi = data.records.find( i => i.title == name )
            if( movi ) movieClick( movi )
          }
      })
      .catch(err => { setError(err); setIsLoading(false) })
   } 
  
   function movieClick(row) {
     setDetail(row)
     sendView('movies/'+encodeURIComponent(row.title))
   }
  
   return (
      <div className="row">
          <section className="col"  >
            <div className="row" >
     
              <div className="col-3 col-md-1" >
                <a href={ '#' }   className="fa fa-arrow-left"> { t('back') }</a>
              </div>
              <h1 className="h2 col-9 col-md-4">{ t('movies') }</h1>
              <div className="col-12 col-md-7">
                <input type="text" className="form-control bg-black dk no-border" placeholder={ t('search') +' '+ t('title') } 
                       ng-model="movieFinder" ng-model-options="{ debounce: 500 }" />
              </div>
            </div>
            <div className="row row-sm padder_top20">
                {  movies && movies.map((row, i) => (
                  <div className='col-6 col-sm-3 col-md-2' key={i}>
                    <div className="ms_rcnt_box marger_bottom30" >
                      <div className="ms_rcnt_box_img"  style={{ 
                              background: 'url('+row['cover']+') center no-repeat',
                              overflow: "HIDDEN",
                              minHeight: '250px',
                              backgroundSize: "cover",
                            }}  > 
                        <div className="ms_main_overlay">
                          <div className="ms_box_overlay" />
                          <div className="ms_play_icon">
                            <img src="/assets/images/svg/play.svg" onClick={ () => movieClick(row) }  />
                          </div>
                        </div>
                      </div>
                      <div className="ms_rcnt_box_text">
                        <h3><a href={'#'} onClick={ () => movieClick(row) }>{ row['title'] }</a></h3>
                      </div>
                    </div>
                  </div>)
              )}
            </div>

            <div className="row">
              
              <div className="col-md-12 text-center">  
                {/* ADS*/}
                <a href="https://www.hostgator.com.br/19556-128-1-701.html" target="_blank" rel="noopener noreferrer"> 
                  <img src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-728x90.png" alt="" style={{ maxWidth: '728px', width:"100%", height: 'auto'}} /></a>
              </div>

              <ul className="pagination pagination hide d-none">
                <li><a><i className="fa fa-chevron-left" /></a></li>
                <li className="active"><a>1</a></li>
                <li><a>2</a></li>
                <li><a>3</a></li>
                <li><a>4</a></li>
                <li><a>5</a></li>
                <li><a><i className="fa fa-chevron-right" /></a></li>
              </ul>

            </div>
        </section>
                                      
        <section className="fluid-window row" style={{ 'right':( detail && detail.id ? '0':'-100%' ), 'padding':'15px' }}>
             <a className="close-window rounded-circle" onClick={ () => setDetail({}) }>Ã</a>
             <div className="container-fluid wrap-window">
              { !detail || !detail.id ? (<div>Empty</div>) : (
                  <section className="row">
                    <h2 className="col-12">{ detail.title }</h2> 
                    <div className="col-md-3">
                      <img src={ detail.cover } alt="detail.title" className="img-fluid"  />
                    </div>
                    <div className="col-md-8">
                      <span dangerouslySetInnerHTML={{__html: detail.content}}></span>
                    </div>
                    <a className="col d-none d-md-block" href="https://www.hostgator.com.br/19556-128-1-696.html" target="_blank" >
                        <img style={{ border:'0px',width:'100%',height:'auto' }} width="120" height="600"  src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-120x600.png" />
                    </a>
                  </section>
              )}
             </div>
        </section>
      </div>
    );
}