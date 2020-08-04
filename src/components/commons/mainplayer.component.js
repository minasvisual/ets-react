import React, { } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { t } from 'react-multi-lang'
import { API_ROOT } from '../../config'
import _ from 'lodash'

import Chat from './chat.component'

import { updatePlaying, updateNow } from '../../actions'
import { Artists } from '../models/Artists'
import { Rating } from '../models/Rating'

const $ = window.$;
const Progress = () => (
<div className="jp-progress-container flex-item  d-none d-md-block">
  <div className="jp-time-holder">
    <span
      className="jp-current-time"
      role="timer"
      aria-label="time"
    >
      &nbsp;
    </span>
    <span
      className="jp-duration"
      role="timer"
      aria-label="duration"
    >
      &nbsp;
    </span>
  </div>
  <div className="jp-progress">
    <div className="jp-seek-bar">
      <div className="jp-play-bar">
        <div className="bullet"></div>
      </div>
    </div>
  </div>
</div>
)

const Knob = () => (
<div className="jp-volume-controls flex-item">
  <div className="widget knob-container">
    <div className="knob-wrapper-outer">
      <div className="knob-wrapper">
        <div className="knob-mask">
          <div className="knob d3">
            <span />
          </div>
          <div className="handle" />
          <div className="round">
            <img src="/assets/images/svg/volume.svg" alt="" />
          </div>
        </div>
      </div>
      {/* <input></input> */}
    </div>
  </div>
</div>
)

class Playnow extends React.PureComponent {
  
 
  share(playing) {
    var textShare = {
      title: "Enter The Shadows Radio | playing " +  _.get( playing, 'musica_atual', 'now!'),
      text: 'Listen more in '+API_ROOT,
      url: API_ROOT + "/artist/" + encodeURIComponent( _.get( playing, 'musica_atual', ' - ').split('-')[1] )
    };
    try {
      if (navigator.share) {
        navigator.share(textShare).then(
          () =>
            (this.$store.state.alert = {
              message: "Compartilhado com sucesso!"
            })
        );
      } else {
        var w = 500;
        var h = 500;
        var left = Number(window.innerWidth / 2 - w / 2);
        var tops = Number(window.innerHeight / 2 - h / 2);
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=" +
            textShare.url +
            "&quote=" +
            textShare.title,
          "_blank",
          `toolbar=yes,scrollbars=yes,resizable=yes,top=${tops},left=${left},width=${w},height=${h}`
        );
      }
    } catch (err) {
      console.log(err);
      this.$store.state.alert = {
        status: "alert-danger",
        message: "Erro ao compartilhar, tente novamente!"
      };
    }
  }
  
  render(){
    const { playing, now } = this.props;
    return (
    <div className="player_left" style={{'background':'#1b2039'}}>
      <div className="ms_play_song">
        <div className="play_song_name">
          <a href={ '#' } id="playlist-text">
            <div className="jp-now-playing flex-item">
              <div className="jp-track-name" >{ playing.musica_atual && playing.musica_atual.split('-')[1] }</div>
              <div className="jp-artist-name">{ playing.musica_atual && playing.musica_atual.split('-')[0] }</div>
            </div>
          </a>
        </div>
      </div>
      <div className="play_song_options">
        <ul>

          <li>
            <a href="#">
              <span className="song_optn_icon">
                <i className="ms_icon icon_fav" />
              </span>
              { t('add_favorites') }
            </a>
          </li>
          <li>
            <a href={'#'} onClick={() => this.share(playing) } >
              <span className="song_optn_icon">
                <i className="ms_icon icon_share" />
              </span>
              { t('share') }
            </a>
          </li>

        </ul>
      </div>
      <span className="play-left-arrow">
        <i className="fa fa-angle-right" aria-hidden="true" />
      </span>
    </div>)
  }
}  
  
 
class Player extends React.PureComponent {
 
 constructor(props){
   super(props);
   this.play = this.play.bind(this) 
   this.pause = this.pause.bind(this)  
   this.state = {
      active: false,
      reloader: null,
      isLoading: true,
      error: null,
  }
 }

  play(e){
    this.setState({
      active:true
    })
    this.reloader()
    return true; 
  }
  pause(e){
    this.setState({
      active:false
    })
    clearInterval(this.state.reloader)
    this.setState({reloader:null})
    return true; 
  }
  
  getNow(name){
    let { now, updateNow } = this.props;
    let artist = name.musica_atual;
    
    if( artist && artist.indexOf('-') > -1 ){
         artist  =  _.get(artist.split(/(-|feat|ft)/ig), '[0]', '').trim();
    }
    if( now && now.name !== artist ) 
      Artists.findByName(artist)
        .then(data =>{ 
            updateNow(data); 
            this.setState({isLoading: false}) 
        })
        .catch(err => { this.setState({error: err, isLoading: false}) })
  }
  
  getPlaying(){
    let { playing, updatePlaying } = this.props;
    fetch( API_ROOT + '/playlist' )
      .then(response => {
         if (response.ok) return response.json();
         else throw new Error('Something went wrong ...');
      })
      .then((row) =>{
          if(row.musica_atual !== playing.musica_atual){
            updatePlaying(row)
            this.getNow(row)
          }
          this.setState({isLoading: false})
      })
      .catch((err) => this.setState({error: err, isLoading: false}) )
  }
  
  reloader(){
    if( !this.state.active && !this.state.reloader ){
      this.getPlaying()
      let init = () =>  this.getPlaying()
      this.setState({ reloader: setInterval(init, 30000), active: true })
    }
  }
  
  sendRate(nowId, type){
    let { now, updateNow } = this.props;
    Rating.sendRate( nowId, type)
    updateNow({...now, liked: true});
  }
  
  componentDidMount() {
    this.reloader()
    
    window.Knob()
  }
  componentWillUnmount() {
    clearInterval(this.state.reloader)
    this.setState({reloader:null})
  }
  
  
  render(){
    const { playing, now } = this.props;
    
    return (
       <div className="ms_player_wrapper">
      
          <div className="ms_player_close">
            <i className="fa fa-angle-up" aria-hidden="true" />
          </div>
      
          <div className="player_mid">
            <div className="audio-player">
              <div id="jquery_jplayer_1" className="jp-jplayer" />
              <div id="jp_container_1" className="jp-audio" role="application" aria-label="media player"  >
      
                {/* playing now*/}
                <Playnow playing={playing}  />
                {/* end playing now*/}

                <Chat />

                {/* controls */}
                <div className="jp-type-playlist">
                  <div className="jp-gui jp-interface flex-wrap">
                 
                    <div className="jp-controls flex-item">
                      { now && now.id && !now.liked ? (
                        <button className="btn btn-outline text-success mr-5 pr-5" tabIndex={0} onClick={ () => this.sendRate(now.id, 1) }
                                title="Like Song" style={{ marginTop: '-20px'}} >
                          <i className="fa fa-thumbs-up" />
                        </button>) : '' 
                      }
                      <button className="jp-play" tabIndex={0}>
                        <i className="ms_play_control" />
                      </button>    
                      <button className="jp-stop" tabIndex={0}>
                        <i className="ms_play_control" />
                      </button>
                      { now && now.id && !now.liked ? (
                        <button className="btn btn-outline text-danger ml-5 pl-5" tabIndex={0} onClick={ () => this.sendRate(now.id, 0) }
                                title="Dislike Song"  style={{marginTop: '-20px'}}>
                          <i className="fa fa-thumbs-down" />
                        </button>) : ''
                      }
                    </div>
                   
                    <Progress />

                    <Knob />

                    <div id="tunein" className="d-none d-md-block" style={{ width: '150px'}}>
                        <div>
                          <a href="http://tunein.com/radio/R%C3%A1dio-Enter-The-Shadows-s203050/" target="_blank">
                              <img src="/assets/images/tunein.png" width="99" height="24" title="OuÃ§a pelo TuneIn" alt="OuÃ§a pelo TuneIn" />
                          </a>
                        </div>
                    </div>

                  </div>

                </div>
                {/* end controls*/}

              </div>
            </div>
          </div>
          {/*main div*/}
       </div>
    );
  }
}
const mapStateToProps = store => ({
  playing: store.player.playing,
  now: store.player.now
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updatePlaying, updateNow }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
