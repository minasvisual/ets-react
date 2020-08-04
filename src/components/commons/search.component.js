// Importando o React
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { t } from 'react-multi-lang'
import { NavLink } from 'react-router-dom'
import { Artists } from '../models/Artists'

const Search = () => {
  
   const [searchField, setSearchField] = useState([]);
   const [artists, setArtists] = useState([]);
  
   const [artistsLoading, setArtistsLoading] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
  
  async function getArtistByFilter(name){
     setSearchField(name)
     setArtistsLoading(true)
     return Artists.find( '?filter=name,cs,'+name+'&include=name' )
      .then(data => { setArtists(data); setArtistsLoading(false) })
      .catch(err => { setError(err); setArtistsLoading(false) })
  } 
  
  return (
    <div className="ms_top_search">
      <input type="text" className="form-control searchField" placeholder={ t('search') +' '+ t('artist')  }
        style={{'background': '#1b2039', 'border': '1px solid #3bc8e7' }} />
      <a href={'#'} onClick={ () => getArtistByFilter(document.querySelector('.searchField').value) } className="search_icon">
        <img src="/assets/images/svg/search.svg" />
      </a>
      <div className="search-box" style={{display: (searchField.length > 3 ? 'block':'none')}} >
        { artistsLoading ? ("Loading ..") : 
          ( artists && artists.length > 0 ?
              (<ul className="list-group">
                { artists.map( row => 
                    <Link key={row.name} className="pl-5 ml-5 list-group list-group-item-action" to={ '/artist/'+row.name } 
                          onClick={ () => setSearchField('') }>{ row.name }</Link> 
                ) }
              </ul>) : '0 results'
        )}
      </div>
    </div>
  )
}

export default Search;