import React from 'react';
import tersus from 'tersus-jsx.macro';
import { NavLink } from 'react-router-dom'
import moment from 'moment'

class AgendaList extends React.Component{
  
  constructor(props) {
    super(props);
  }
  
  render(){
    let filter = this.props.filter || ''
    
    const { data, isLoading, error } = this.props;
    if (error) {
      return (<p>{error.message}</p>);
    }

    if (isLoading) {
      return (<p>Loading ...</p>);
    }
              
    if (!isLoading && this.props.data && this.props.data.length == 0 ) {
      return (<p className="text-center">No events available to this key.</p>);
    }
    
    return(
      <>
      {  this.props.data && this.props.data.map((row, i) => (
         <span key={i}>
             <div className="ms_weekly_box d-flex"  >

                    <div className="weekly_left w-75">
                        <div className="w_top_song  w-100">
                            <div className="w_tp_song_name p-0">
                                <h3 className=" w-100"> 
                                  <a href={ row.uri } target="_blank">
                                    { row.name }
                                  </a>
                                </h3>
                                <small>{ row.city } - { row.local }}</small>
                            </div>
                        </div>
                    </div>
                     <div className="weekly_right w-25 text-right">
                        <h4 className="w_song_time p-0">{ moment(row.start).format('D/MMM') }</h4>
                    </div>
                 
            </div>
            <div className="ms_divider"></div>
         </span>
      ))}
      </>
    );
  }
}

export default AgendaList;
