import React from 'react';
import tersus from 'tersus-jsx.macro';
import { NavLink } from 'react-router-dom'

class CarouselImage extends React.Component{
  
  constructor(props) {
    super(props);
  }
  
  render(){
    let image = this.props.image || 'image'
    let name = this.props.name || 'name'
    let url = this.props.url || 'name'
    let tags = this.props.tags || 'tags'
    let subtitle = this.props.subtitle || null
    let classes = this.props.classes || 'col-lg-2 col-md-6'
    let link = this.props.link || '#'
    let imgHeight = this.props.imgheight || 120
    let actClick = this.props.actClick || null
    
    let showName = this.props.showName || true
    
    const { data, isLoading, error } = this.props;
    
    if ( !Array.isArray(data) || error) {
      return (<p>{ error && error.message ? error.message : error }</p>);
    }

    if (isLoading) {
      return (<p>Loading ...</p>);
    }
    
    return(
        <>
            {  this.props.data && this.props.data.map((row, i) => (
                <div className={ classes } key={i}>
                  <div className="ms_rcnt_box marger_bottom30" onClick={ () => ( actClick ? actClick(row): '' ) } >
                    <div className="ms_rcnt_box_img"  style={{ 
                            background: 'url('+row[image]+') center no-repeat',
                            overflow: "HIDDEN",
                            minHeight: imgHeight,
                            backgroundSize: "cover",
                          }}> 
                      <div className="ms_main_overlay">
                        <div className="ms_box_overlay" />
                        <NavLink to={ link +encodeURIComponent(row[url]) } className="ms_play_icon">
                          <img src="/assets/images/svg/play.svg" />
                        </NavLink>
                      </div>
                    </div>
                    { !showName ? '' : (
                      <div className="ms_rcnt_box_text">
                        <h3>
                          <NavLink to={ link +encodeURIComponent(row[url]) }>
                              { (row[name] || '').slice(0, 50) }...
                          </NavLink>
                        </h3>
                        <p>{ subtitle ? (row[subtitle] || '').slice(0, 50) : '' } </p>
                      </div>
                    )}
                  </div>
                </div>)
            )}
       </>
     );
  }
}

export default CarouselImage;
