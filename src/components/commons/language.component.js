import React from 'react';
import tersus from 'tersus-jsx.macro';
import { NavLink } from 'react-router-dom'
import { t, setLanguage } from 'react-multi-lang'

class Language extends React.Component{
  
  constructor(props) {
    super(props);
  }
  
  render(){
    
  function changeLang(lang){
    setLanguage(lang)
    window.localStorage.setItem('lang', lang)
  }
    
    return(
<div className="container-fluid">
  <h1>{ t('language_selection') }</h1>
  <ul className="lang_list">
    <li>
      <label className="lang_check_label">
        <img src="/assets/images/en.png" style={{ height: '20px'}} /> English
        <input type="radio" name="check" onChange={ () => changeLang('en') } />
        <span className="label-text" />
      </label>
    </li>
    <li>
      <label className="lang_check_label">
        <img src="/assets/images/pt.png" style={{ height: '20px'}}/> PortuguÃªs
        <input type="radio" name="check" onChange={ () => changeLang('pt') } />
        <span className="label-text" />
      </label>
    </li>  
    <li>
      <label className="lang_check_label">
        <img src="/assets/images/es.png" style={{ height: '20px'}}/> EspaÃ±ol
        <input type="radio" name="check" onChange={ () => changeLang('es') } />
        <span className="label-text" />
      </label>
    </li>
  </ul>
</div>
     );
  }
}

export default Language;
