//<![CDATA[
 function ucfirst(str,force){
      str=force ? str.toLowerCase() : str;
      return str.replace(/(\b)([a-zA-Z])/,
               function(firstLetter){
                  return   firstLetter.toUpperCase();
               });
 }

var replaceName = function(name){
  var blacklist = ['VIDEO', 'Video','video','clip','Clip', 'CLIP', 'HQ', '/', '()'];
  blacklist.map(function(item){
    name = name.replace(item, '')
  })
  return name;
}

// Status Player
var statusPlayerInit = 'RÃ¡dio Pausada';
var statusPlayerPlay = 'Enter The Shadows';
var statusPlayer = statusPlayerInit;

//var statusPlayerXMLUrl = 'http://streaming08.maxcast.com.br/player/entertheshadows/info.xml';
//var statusPlayerXMLUrl = 'https://s44.hstbr.net/api/status/entertheshadows/current.json';
var statusPlayerXMLUrl = 'https://entertheshadows.com.br/api/playlist';

// Interval
var statusInterval;

// Acessando XML
var getStatusXML = function() {
	$.ajax({
		type: "GET",
		url: statusPlayerXMLUrl,
		//dataType: "xml",
		dataType: "json",
		success: function(xml) {
      xml = {
        "online": xml.status == "Ligado",
        "mount": "autodj",
        "ouvintes": xml.ouvintes_conectados,
        "playing": {
          "current": xml.musica_atual,
          "name": xml.musica_atual.split('-')[0],
          "title": xml.musica_atual.split('-')[1]
        },
        "song_data": {
          "cover": xml.capa_musica
        }
      }
      var status = $('#now').html()
      //statusWriter( xml.playing.current );
//       if( status == "Enter The Shadows" || status != xml.playing.current ){
//           if( angular && angular.element('#nav') && angular.element('#nav').scope() && angular.element('#nav').scope().get )
//             angular.element('#nav').scope().get(xml);
//           $('.img-cover a img').remove();
//           $('.img-cover a').attr('href', 'http://youtube.com/watch?v='+xml.song_data.video).html( $('<img />').attr('src', xml.song_data.cover) );
//       }
// 			$(xml).find('radio').each(function(){
// 				var statusTxt = $(this).find('playing').text();
// 				statusWriter(statusTxt);
// 			});
		}
	});
};

// Escrevendo o Status
var statusWriter = function(statusTxt) {
  if( statusTxt )
     statusTxt = replaceName( statusTxt )
	$('#now').html(statusTxt); // Escrevendo o Status
};


// Document Ready - Call functions
$(document).ready(function(){

    /*  JPlayer Call */
    var stream = {
      title: "Enter The Shadows",
     // mp3: "http://streaming08.hstbr.net:8004/live?type=.flv;"
      //mp3: "https://s44.hstbr.net:8004/live"
      mp3: "https://player.painelcast.com/proxy/6844"
    },
    ready = false;
    
    var myPlayer = $("#jquery_jplayer_1"),
		myPlayerData,
		fixFlash_mp4, // Flag: The m4a and m4v Flash player gives some old currentTime values when changed.
		fixFlash_mp4_id, // Timeout ID used with fixFlash_mp4
		ignore_timeupdate, // Flag used with fixFlash_mp4
		options = {
			swfPath: 'js/jplayer',
			preload: 'none',
			supplied: 'mp3',
			wmode:'window',
			ready: function (event) {
				fixFlash_mp4 = event.jPlayer.flash.used && /m4a|m4v/.test(event.jPlayer.options.supplied);
				
				ready = true;
				var media = myPlayer.jPlayer('setMedia', stream).jPlayer('play');
			},
			play: function (event) {
			    statusWriter(statusPlayerPlay);
// 			    statusInterval = window.setInterval(function(){
// 				    getStatusXML();
// 			    }, 15000);
			    //getStatusXML();
			},
		    
			pause: function (event) {
			    $(this).jPlayer("clearMedia");
			    clearInterval(statusInterval);
			    statusWriter(statusPlayerInit);
			},
		
			error: function (event) {
				if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
					// Setup the media stream again and play it.
					$(this).jPlayer('setMedia', stream).jPlayer('play');
				}
			},
		},
			
		myControl = {
			progress: $(options.cssSelectorAncestor + " .jp-progress-slider"),
			volume: $(options.cssSelectorAncestor + " .jp-volume-controls"),
		};
	// Instance jPlayer
	myPlayer.jPlayer(options);
	// A pointer to the jPlayer data object
	myPlayerData = myPlayer.data("jPlayer");
    /*  / JPlayer Call */
  function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
      var values = matrix.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
  }
  
  $('.knob-wrapper').mousedown(function() {
      $(window).mousemove(function(e) {
          var angle1 = getRotationDegrees($('.knob')),
					volume = angle1 / 270 					
					
          if (volume > 1) {
              $("#jquery_jplayer_1").jPlayer("volume", 1);
          } else if (volume <= 0) {
              $("#jquery_jplayer_1").jPlayer("mute");
          } else {
              $("#jquery_jplayer_1").jPlayer("volume", volume);
              $("#jquery_jplayer_1").jPlayer("unmute");
          }
      });
				
     return false;
  }).mouseup(function() {
      $(window).unbind("mousemove");
  });
  var timeDrag = false;
  $('.jp-play-bar').mousedown(function(e) {
      timeDrag = true;
      updatebar(e.pageX);

  });
  $(document).mouseup(function(e) {
      if (timeDrag) {
          timeDrag = false;
          updatebar(e.pageX);
      }
  });
  $(document).mousemove(function(e) {
      if (timeDrag) {
          updatebar(e.pageX);
      }
  });
  var updatebar = function(x) {
      var progress = $('.jp-progress');
      var position = x - progress.offset().left;
      var percentage = 100 * position / progress.width();
      if (percentage > 100) {
          percentage = 100;
      }
      if (percentage < 0) {
          percentage = 0;
      }
      $("#jquery_jplayer_1").jPlayer("playHead", percentage);
      $('.jp-play-bar').css('width', percentage + '%');
  };
  $('#playlist-toggle, #playlist-text, #playlist-wrap li a').unbind().on('click', function() {
      $('#playlist-wrap').fadeToggle();
      $('#playlist-toggle, #playlist-text').toggleClass('playlist-is-visible');
  });
  $('.hide_player').unbind().on('click', function() {
      $('.audio-player').toggleClass('is_hidden');
      $(this).html($(this).html() == '<i class="fa fa-angle-down"></i> HIDE' ? '<i class="fa fa-angle-up"></i> SHOW PLAYER' : '<i class="fa fa-angle-down"></i> HIDE');
  });
  $('body').unbind().on('click', '.audio-play-btn', function() {
      $('.audio-play-btn').removeClass('is_playing');
      $(this).addClass('is_playing');
  });
  
});
//]]>
   