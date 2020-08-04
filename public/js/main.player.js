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
var statusPlayerXMLUrl = STREAMING_URL;

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
      statusWriter( xml.playing.current );
      if( status == "Enter The Shadows" || status != xml.playing.current ){
          if( angular && angular.element('#nav') && angular.element('#nav').scope() && angular.element('#nav').scope().get )
            angular.element('#nav').scope().get(xml);
          $('.img-cover a img').remove();
          $('.img-cover a').attr('href', 'http://youtube.com/watch?v='+xml.song_data.video).html( $('<img />').attr('src', xml.song_data.cover) );
      }
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
			volume: $(options.cssSelectorAncestor + " .jp-volume-slider")
		};
	// Instance jPlayer
	myPlayer.jPlayer(options);
	// A pointer to the jPlayer data object
	myPlayerData = myPlayer.data("jPlayer");
    /*  / JPlayer Call */
});
//]]>
   