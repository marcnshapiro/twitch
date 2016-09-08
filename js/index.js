var link = "";
var status = "";
var logo = "";
var user = "";
var display_name = "";
var game = "";

var users = [];

$(document).ready( function() {
  user = "OgamingSC2";
  //user = "freecodecamp";
  //user = "brunofin";
  
    alert("Getting JSON");

  $.getJSON('https://api.twitch.tv/kraken/streams/' + user + '?callback=?', function(dataStream) { 
    alert(dataStream.error);

      if (dataStream.error) {
        $("#online").html("Online: False");
        $("#active").html("Active: False");
        link = "";
      } else if (dataStream.stream) {
        $("#online").html("Online: True");
        $("#active").html("Active: True");
        $.getJSON('https://api.twitch.tv/kraken/channels/' + user + '?callback=?', function(dataChannel) {
          if (!dataChannel.url === "") {
            link = dataChannel.url + "' target='_blank'";
          } else {
            link = "";
          }
          display_name = dataChannel.display_name;
          game = dataChannel.game;
        }
        
      } else {
        $("#online").html("Online: False");
        $("#active").html("Active: True");
        link = "";
      }
    
      if (link != "") {
        $("#link").html("Link: <a href=" + link + ">" + user + "</a>");
        $("#display_name").html(display_name);
        $("#game").html("Link: <a href=" + link + ">" + user + "</a>");
      } else {
        $("#link").html("None");
        $("#display_name").html("None");
        $("#game").html("None");
      }
    
    
    //if (data.stream) {
    //  name = data.stream.channel.display_name;
    //  link = data.stream.channel.url;
    //  status = data.stream.channel.status;
    //  logo = data.stream.channel.logo
    //} else {
    //  name = data.display_name;
    //  link = data.url;
    //  status = "Offline";
    //  logo = data.logo
    //}
  });
  
  $("#changeUnits").on("click", function() {
    window.open(link);
  });

});