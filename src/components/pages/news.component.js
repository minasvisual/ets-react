import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { t } from 'react-multi-lang'

import { Blogs } from '../models/Blogs'
import { pagination, sendView } from '../../helpers/functions'
import CarouselImage from '../plugins/carousel.component'

export default () => {
  
  
   const { name } = useParams('/news/:name');
   const [news, setNews] = useState([]);
   const [detail, setDetail] = useState({});
  
   const [actualPage, setActualPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
  
  useEffect(() => {
     setIsLoading(true)
     getNews()
       .then(() =>{
          setIsLoading(false) 
       
       })
     return () => error
   }, [name])
  
   async function getNews(page = 1){
     setActualPage(page)
     setIsLoading(true)
     return Blogs.find('&filter=category,eq,1&order=id,desc&page='+page+',8')
      .then(data => { 
          setTotalPages(data.results)
          setNews(data.records);
          if( name ){
            let movi = data.records.find( i => name.indexOf(i.title) > -1 )
            movieClick( movi )
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
     
              <div className="col-4 col-md-1" >
                <a href={ '#' }   className="fa fa-arrow-left"> { t('back') }</a>
              </div>
              <h1 className="h2 col-8 col-md-3">{ t('news') }</h1>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control bg-black dk no-border" placeholder={ t('search') +' '+ t('title') } 
                       ng-model="movieFinder" ng-model-options="{ debounce: 500 }" />
              </div>
            </div>
            <div className="row row-sm padder_top20">
                {  news && news.map((row, i) => (
                  <div className='col-6 col-md-4 col-lg-3' key={i}>
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
                        <h3><a href={'#'} onClick={ () => movieClick(row) }>{ row['title'].slice(0, 50) }</a></h3>
                        <a className="text-ellipsis text-xs text-muted" ng-click="setItem(row)" data-toggle="modal" data-target="#modalMovie">
                          { row.account_id && row.account_id.nickname ?
                            ( <span>{ row.account_id.nickname }</span>) :
                            (<span >Sem autor informado</span>) 
                          }
                        </a>  
                      </div>
                    </div>
                  </div>)
              )}
            </div>

            <div className="row">
              
              <div className="col-md-12 text-center"> 
                <ul className="pagination d-flex justify-content-center">
                   <li className="page-item" ><a className="page-link" href="#" onClick={ () => getNews( (actualPage > 1 ?  (actualPage-1) : 1 ) ) }><i className="fa fa-chevron-left" /></a></li>
                    { totalPages && pagination(8, totalPages).map( (k) => 
                        <li key={k} className={ 'page-item ' + (actualPage === k ? 'active': '') } onClick={ () => getNews(k) } ><a className="page-link" href="#"> {k} </a></li>
                    )}
                    <li className="page-item" ><a className="page-link" href="#"  onClick={ () => getNews( (actualPage < pagination(8, totalPages).length ?  (actualPage+1) : pagination(8, totalPages).length ) ) }><i className="fa fa-chevron-right" /></a></li>
                  </ul>
              </div>

              <div className="col-md-12 text-center">  
                {/* ADS*/}
                <a href="https://www.hostgator.com.br/19556-128-1-701.html" target="_blank" rel="noopener noreferrer"> 
                  <img src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-728x90.png" alt="" 
                        style={{maxWidth: '728px', width: "100%", height: 'auto'}} /></a>
              </div>

            </div>
        </section>
                                      
        <section className="fluid-window p-5" style={{ 'right':( detail && detail.id ? '0':'-100%' ), 'padding':'15px' }}>
             <a className="close-window rounded-circle" onClick={ () => setDetail({}) }>Ã</a> 
             <div className="container-fluid wrap-window">
                { !detail || !detail.id ? (<div>Empty</div>) : ( 
                  <section className="row">
                    <h2 className="col-12">{ detail.title }</h2> 
                    <div className="col-md-3">
                      { detail.account_id && detail.account_id.id ? (
                        <>
                          <img src={ detail.account_id.cover  } alt={ detail.title } className="img-fluid"  />
                          <a href={ detail.source } alt={ detail.title } className="img-fluid" target="_blank">
                           { t('by') }  { detail.account_id.nickname }
                          </a>
                        </>
                      ) : '' }
                    </div>
                    <div className="col-md-8">
                      <span dangerouslySetInnerHTML={{__html: detail.content}}></span>
                    </div>
                    <a className="col d-none d-md-block" href="https://www.hostgator.com.br/19556-128-1-696.html" target="_blank" >
                        <img style={{ border:'0px',width:'100%',height:'auto' }} width="120" height="600"  src="https://afiliados.hostgator.com.br/media/banners/hospedagem-wordpress-faltadesite-120x600.png" />
                    </a>
                  </section>
                )}>
             </div>
        </section>
      </div>
    );
}