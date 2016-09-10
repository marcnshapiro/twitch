var users = ["ESL_SC2", "OgamingSC2", "douplex", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready( function() {
  "use strict";

  //for (let i = 0; i < users.length; i++)
    getData(users[0], 0);

  function getData(user, index) {
    var streamURL = 'https://api.twitch.tv/kraken/streams/' + user + '?callback=?';
    var channelURL = 'https://api.twitch.tv/kraken/channels/' + user + '?callback=?';

    var online = "False";
    var active = "False";
    var display_name = "";
    var streaming = "";
    var logo = "";
    var html="";
    var status = "active";

    $.getJSON(streamURL, function(dataStream) {

      if (dataStream.error) {

        online = "False";
        active = "False";
        display_name = user;
        logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
        streaming = "Account Closed";
        status = "inactive"

        html = '<center><div class="row ' + status + '">' +
        '<div class="col-xs-2 col-sm-1" id="icon">' + '<img src="' + logo + '" height=50 width=50"></div>' +
        '<div class="col-xs-5 col-sm-3" id="name">' + display_name + '</div>' + 
        '<div class="col-xs-5 col-sm-8" id="streaming">'+ streaming + '</div>' +
        '</div></center>';
            
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
              streaming = dataChannel.game ;
            } else {
              streaming = "Offline";
            }

            if (online === "True") {
              status = "active";
            } else {
              status = "offline";
            }

            html = '<center><div class="row ' + status + '">' +
            '<div class="col-xs-2 col-sm-1" id="icon">' + '<img src="' + logo + '" height=50 width=50"></div>' +
            '<div class="col-xs-5 col-sm-3" id="name"><a href="' + dataChannel.url + '" target="_blank">' + display_name + '</a></div>' + 
            '<div class="col-xs-5 col-sm-8" id="streaming">'+ streaming + '</div>' +
            '</div></center>';

            if (status === "active") {
              $("#display").prepend(html);
            } else {
              $("#display").append(html);
            }
          }
        });
      }

      if (index < users.length - 1) {
        index += 1;
        getData(users[index], index);
      }
    });
  }
});
