<template>
  <!-- <div class="hello">
    <h2>WORK PLEASE</h2>
    <h3>{{access_token}}</h3>
  </div>
   -->


<body>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Bootstrap demo</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
      <!-- Option 1: Include in HTML -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    </head>
  
  
  
      
                    <div class="hero container-fluid" style="padding:10px;" id="loading-row" v-if="!dataHasLoaded">
                            <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-20 text-center">
                                <h2 class="display-1"><strong>Hello there{{username}}.</strong></h2>
                                    <p class="lead">Variefy analyzes data of your top songs and performs calculations to recommend you fresh songs.</p>
                                    <br>
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                    
                                </div>
                            </div>
                            </div>
                    </div>


                <div class = "hero container-fluid" v-if="dataHasLoaded">

                            <div class="row">
                                <div class="col-lg-20 text-center">
                                    <h1 class="display-4"><strong></strong></h1>
                                    <p><lead>Let's try something new</lead></p>
                                    <br>
                                    <iframe style="border-radius:12px" :src='this.playlistUrl' width="75%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                                    </br>
                                    <br>
                                    </br>
                                    <div class="container px-3">
                                        <div class="row gx-5">
                                        <div class="col text-end">
                                    <a href="/loading2" onclick="window.open('/login', 'popup', 'width=800, height=600')"; class="btn btn-dark btn-lg rounded-pill" id="icon3">
                                        <span class="glyphicon glyphicon-refresh" id="icon2"></span>
                                        Generate Another
                                    </a>
                                    </div>
                                    <div class="col text-start">
                                    <a href="/loading2" onclick="window.open('/login', 'popup', 'width=800, height=600')"; class="btn btn-dark btn-lg rounded-pill">
                                        <img src="/images/spotify-logo.png" id="icon"/> 
                                        Add to Spotify Library
                                    </a>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                             </div>


                    </div>
        
    

  
<!--Grid row-->
  


</body>
</template>


<script>

import { onBeforeMount } from 'vue';
import router from '../router';
import Api from '../services/Api';
const querystring = require('querystring');

  export default {
    name: 'Login',
    data () {
      return {
        access_token: 'temp',
        refresh_token: 'temp',
        username: getCookie('username') != "" ? (', ' + getCookie('username'))  : '',
        topSongID: "",
        topURLImage: "",
        recommendationRawJsonResult: "",
        songNames: [],
        playlistId: "",
        playlistUrl: "",
        dataHasLoaded: false,

      }
    },
    methods:
    {
      getAccessToken: async () => {
        /* eslint-disable */
       if(getCookie("access_token") === "") {
          const params = new URLSearchParams(document.location.search);
          const authCode = params.get('code');
          const state = params.get('state');
          const querystring = require('querystring')

          const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
            const client_secret="76669d3b28f94e8da7662d91cc39cc94"

          if(state == null)
            return null;
          
          const tokenBaseUrl = 'https://accounts.spotify.com/api/token?';
        
          const result = await fetch(tokenBaseUrl, {
          method: 'POST',
          headers: {
            'Content-Type' : "application/x-www-form-urlencoded",
            'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
          },
          body: querystring.stringify({
            grant_type: "authorization_code",
            code: authCode,
            redirect_uri: 'http://localhost:8080/next',
          })
        });


          const data = await result.json();
          console.log("AT: " + data.access_token);
          console.log("SCOPE " + data.scope);
          console.log("EXPIRES_IN: " + data.expires_in)
          console.log("REFRESH TOKEN" + data.refresh_token)

          const access_token = data.access_token;
          const refresh_token = data.refresh_token;

          setCookie("access_token", access_token);
          setCookie("refresh_token", refresh_token);

          console.log('at: '+ access_token);


          return [access_token, refresh_token];
        } else {
          return [getCookie("access_token"), getCookie("refresh_token")];
        }
      },
      refreshToken: async () => {
        console.log("attempting token refresh")
        if(getCookie("access_token") === "" )
        {
              const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
              const client_secret="76669d3b28f94e8da7662d91cc39cc94"
              const querystring = require('querystring')
          
          
              const tokenBaseUrl = 'https://accounts.spotify.com/api/token?';
            
              const result = await fetch(tokenBaseUrl, {
              method: 'POST',
              headers: {
                'Content-Type' : "application/x-www-form-urlencoded",
                'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
              },
              body: querystring.stringify({
                grant_type: "refresh_token",
                refresh_token: getCookie("refresh_token"),
                })
              });

              const data = await result.json();
              // store new access token
              console.log("NEW AT:  " + data.access_token)
              this.access_token = data.access_token;
              setCookie("access_token", data.access_token, 1)

        }
      }
    },
    async mounted(){
      /* eslint-disable */
       
       const params = new URLSearchParams(window.location.search);
      let tokens = await this.getAccessToken();
      console.log(tokens);
      // refresh token if access expired
      if( (this.access_token === "" || !this.access_token || getCookie("access_token") === "") && getCookie("refresh_token") != "")
      {
        tokens = await this.getAccessToken();
        await refreshToken();
        this.access_token = getCookie("access_token");
        console.log('new stuff ' + this.access_token);
        this.access_token = tokens[0];
        this.refresh_token = tokens[1];
        getUsername();

      }
      else  {

          // need to go back to login
          if(getCookie("refresh_token") == "" || getCookie("refresh_token") == "undefined")
            {
              router.replace("/")
              return;
            }
          
          // refresh token present to renew 
          await refreshToken();
          this.access_token = getCookie("access_token")
          this.refresh_token = getCookie("refresh_token")         
      }
    //   this.username = await (", " + getCookie('username'))

      // really make sure username is visble after first login

        // last ting will have nothing
        // aray of seeds
        const seeds = params.get('params').split("|*|").filter(el => el != "");
        const seedString = seeds.join(',');


        console.log(seedString)


        const recommendResult = await fetch('https://api.spotify.com/v1/recommendations?max_popularity=85&limit=40&seed_tracks=' + seedString, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + getCookie("access_token"),
					   'Content-Type' : 'application/json'}
        });

	      const recommendData  = await (recommendResult.json());
          const reccomendedSongUris = [];
          const songNames = []

          console.log(recommendData);
          for(let i  = 0; i < recommendData.tracks.length; i++)
          {
              let trackDict = recommendData.tracks[i];
              reccomendedSongUris[i] = trackDict.uri;
              let name = trackDict.name;
              let artist = recommendData.tracks[i].artists[0].name;
              songNames[i] = name + ' by ' + artist;
          }

          this.recommendationRawJsonResult = JSON.stringify(recommendData);
          this.songNames  = songNames;

        
        const meResponse = await fetch(`https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + getCookie("access_token"),
					   'Content-Type' : 'application/json'}
        });

	    const meData  = await (meResponse.json());
        console.log(meData);
        const userId = meData['id'];
        console.log('user Id: ' + userId)

        const playlistGen = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: { 'Authorization' : 'Bearer ' + getCookie("access_token"),
                        'Content-Type' : 'application/json'
					},
            body: JSON.stringify({name: "My Variefy Playlist", description: "Please work"})
            
        });

	      const playlistData  = await (playlistGen.json());
          const playlistId = playlistData.id;
          this.playlistId = playlistId;
          const playlistUrl = playlistData.external_urls.spotify;
          this.playlistUrl = playlistUrl
          console.log('created playlist???')
          console.log(playlistId)
          console.log(playlistUrl)


          const addToPlaylistRequest = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: { 'Authorization' : 'Bearer ' + getCookie("access_token"),
                        'Content-Type' : 'application/json'
					},
            body: JSON.stringify({uris: reccomendedSongUris})
            
        });

        const addToPlaylistData  = await (addToPlaylistRequest.json());

        this.dataHasLoaded = true

        console.log('token on mount ' + this.access_token)      
        window.history.replaceState({}, document.title, "/");

      

    
    },

}



function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + exhours * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async function refreshToken () {
        if(getCookie("access_token") === "" )
        {
              const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
              const client_secret="76669d3b28f94e8da7662d91cc39cc94"
              const querystring = require('querystring')
          
          
              const tokenBaseUrl = 'https://accounts.spotify.com/api/token?';
            
              const result = await fetch(tokenBaseUrl, {
              method: 'POST',
              headers: {
                'Content-Type' : "application/x-www-form-urlencoded",
                'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
              },
              body: querystring.stringify({
                grant_type: "refresh_token",
                refresh_token: getCookie("refresh_token"),
                })
              });

              const data = await result.json();
              // store new access token
              console.log("NEW AT:  " + data.access_token)
              
              setCookie("access_token", data.access_token, 1)

        }
  }

  
  
  


</script>




<style scoped>
      .btn{
      font-size: 20px;
      cursor: pointer;
      border-radius: 12px; 
    
      }
      .btn:hover{ 
        border: 3.5px white solid; 


      }
      .btn:hover + .display-1  {
        box-shadow: -2px 6px 8pxgba(59, 50, 50,  r0.4)
        
      }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a, button {
  color: white;
}

body {
  color: white;

}

</style>