var status = "";
var user = "";
var link = "";

var users = ["OgamingSC2",
             "freecodecamp",
             "brunofin"];

$(document).ready( function() {
  "use strict";

  for (let i = 0; i < users.length; i++)
    getData(users[i], i);
    //users.forEach(getData);
  
  function getData(user, index) {
    var streamURL = 'https://api.twitch.tv/kraken/streams/' + user + '?callback=?';
    var channelURL = 'https://api.twitch.tv/kraken/channels/' + user + '?callback=?';

    var online = "False";
    var active = "False";
    var display_name = "";
    var game = "";
    var logo = "";
    var html="";

    $.getJSON(streamURL, function(dataStream) { 


      if (dataStream.error) {

        online = "False";
        active = "False";
        display_name = user;
        logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
        game = "Account Closed";

        html = '<div class="row">' +
        '<div class="col-xs-2 col-sm-1" id="icon">' + '<img src="' + logo + '" height=50 width=50"></div>' +
        '<div class="col-xs-5 col-sm-3" id="name">' + display_name + '</div>' + 
        '<div class="col-xs-5 col-sm-8" id="streaming">'+ game + '</div>' +
        '</div>';
        $("#display").append(html);
      } else {
        if (dataStream.stream) {
          online = "True";
          active = "True";
        } else {
          online = "False";
          active = "True";
        }

        $.getJSON(channelURL, function(dataChannel) {

          if (dataChannel.url != "") {
            if (dataChannel.logo != null) {
              logo = dataChannel.logo;
            } else {
              logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
            }

            display_name = dataChannel.display_name;

            if (online === "True") {
              game = dataChannel.game ;
            } else {
              game = "Offline";
            }

            html = '<div class="row">' +
            '<div class="col-xs-2 col-sm-1" id="icon">' + '<img src="' + logo + '" height=50 width=50"></div>' +
            '<div class="col-xs-5 col-sm-3" id="name"><a href="' + dataChannel.url + '" target="_blank">' + display_name + '</a></div>' + 
            '<div class="col-xs-5 col-sm-8" id="streaming">'+ game + '</div>' +
            '</div>';
            $("#display").append(html);
          }
        });

      }


      

    });
  }
});
