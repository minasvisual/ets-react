// Importando o React
import React from "react";
import { Link } from 'react-router-dom'
import { t } from 'react-multi-lang'
import { NavLink } from 'react-router-dom'

const Sideleft = () => {
  
  const checkActive = (match, location) => {
  	if(!location) return false;
    const {pathname} = location;
    
    return pathname.indexOf('/tophergates') !== -1 || pathname.indexOf('/_display/') !== -1;
  }
  
  return (
    <div className="ms_sidemenu_wrapper">
        <div className="ms_nav_close">
          <i className="fa fa-angle-right" aria-hidden="true" />
        </div>
        <div className="ms_sidemenu_inner" >
          <div className="ms_logo_inner" style={{ padding: "10px !important" }}>
            <div className="ms_logo" style={{padding:'5px'}}>
              <a href="#">
                <img src="/assets/images/enter-the-shadows-mini.png" alt="enter the shadows" className="p-2 img-fluid" />
              </a>
            </div>
            <div className="ms_logo_open" style={{padding:'20px'}}>
              <a href="#">
                <img src="/assets/images/enter-the-shadows-mini.png"  alt="enter the shadows" style={{ maxWidth: "110px" }} className="p-2 img-fluid" />
                <img src="/assets/images/name-enter-the-shadows-mini.png"  alt="enter the shadows" className="p-2 img-fluid" />
              </a>
            </div>
          </div>
          <div className="ms_nav_wrapper">
            <ul>
                 
                    <li><NavLink exact={true} to="/" title="Albums">
                          <span className="nav_icon">
                            <span className="icon icon_discover"></span>
                          </span>
                          <span className="nav_text">
                             { t('discover') }
                          </span>
                        </NavLink>
                    </li>
                            
                    <li><NavLink to="/genres" title={ t('artists') } >
                          <span className="nav_icon" style={{fontSize: '1.3em'}}>
                            <span className="icon icon_genres"></span>
                          </span>
                          <span className="nav_text">
                            { t('artists') }
                          </span>
                        </NavLink>
                    </li>

                    <li><NavLink to="/movies" title={ t('movies') }>
                        <span className="nav_icon" style={{fontSize: '1.3em'}}>
                          <span className="fa fa-film"></span>
                        </span>
                        <span className="nav_text">
                          { t('movies') }
                        </span>
                        </NavLink>
                    </li>
                           
                    <li><NavLink to="/news" title={ t('news') }>
                        <span className="nav_icon" style={{fontSize: '1.3em'}}>
                          <span className="fa fa-rss"></span>
                        </span>
                        <span className="nav_text">
                          { t('news') }
                        </span>
                        </NavLink>
                    </li>

                    <li><NavLink to="/contact" title={ t('contact') }>
                        <span className="nav_icon" style={{fontSize: '1.3em'}}>
                          <span className="fa fa-at"></span>
                        </span>
                        <span className="nav_text">
                          { t('contact') }
                        </span>
                        </NavLink>
                    </li>
            </ul>
            <ul className="nav_playlist">
              
                          <li>
                            <a href="https://www.facebook.com/radioentertheshadows" title="Facebook Page" target="_blank">
                              <span className="nav_icon"  style={{fontSize: '1.3em'}}>
                                <span className="fa fa-facebook" />
                              </span>
                              <span className="nav_text text-info">Facebook Page</span>
                            </a>
                          </li>

            </ul>
          </div>
        </div>
      </div>
  )
}

export default Sideleft;