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
      <meta http-equiv="Content-Security-Policy" content="script-src 'self' http://localhost:* 'unsafe-inline' 'unsafe-eval'" />
    </head>
  
  
  
                
                    <div class="container-fluid" style="padding:10px;" id="loading-row" v-if="!dataHasLoaded">
                            <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-20 text-center">
                                <h2 class="display-1"><strong>Hello there{{username}}.</strong></h2>
                                    <p class="lead">Variefy analyzes data of your top songs and performs calculations to recommend you fresh songs.</p>
                                    <br>
                                    <div class="spinner-border" role="status" v-if="filterChoiceClicked && !dataHasLoaded">
                                        <span class="sr-only"></span>
                                    </div>


                                     <div class="container px-3" v-if = "!filterChoiceClicked && !dataHasLoaded">
                                        <div class="row gx-5">
                                                <div class="col text-end">
                                                <a type = "button" @click="chooseFilterAndRecommend('FALSE')" class="btn btn-dark btn-lg rounded-pill" id="icon3"
                                                  style = "background-color: #cb4cf5;">
                                                  <span class="glyphicon glyphicon-refresh" id="icon2"></span>
                                                  Fresh, but familiar
                                                </a>
                                              </div>
                                              <div class="col text-start">
                                                  <a type = "button"  @click="chooseFilterAndRecommend('TRUE')" class="btn btn-dark btn-lg rounded-pill"
                                                  style = "background-color: #e3574d;">
                                                  Spice it up!                                                  </a>
                                              </div>
                                        
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                            </div>
                    </div>
              


      
                <div class = "container-fluid" v-if="dataHasLoaded">

                            <div class="row">
                                <div class="col-lg-12 text-center">
                                  <br/>
                                  <br/>
                                    <h1 class="display-4"><strong>Here's your new mix{{username}}</strong></h1>
                                    <br/>
                                    <br/>
                                    <iframe style="border-radius:12px" :src='this.embedPlaylistUrl' width="75%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                                    <br/>
                                    <br/>
                                    <div class="container px-3">
                                        <div class="row gx-5">
                                                <div class="col text-end">
                                                <a href="/" class="btn btn-dark btn-lg rounded-pill" id="icon3">
                                                  <span class="glyphicon glyphicon-refresh" id="icon2"></span>
                                                  Generate Another Playlist
                                                </a>
                                              </div>
                                              <div class="col text-start">
                                                  <a :href="this.externalPlaylistUrl"  target = "_blank" class="btn btn-dark btn-lg rounded-pill">
                                                    <img src="../assets/spotifylogo.png" id="icon"/> 
                                                    View in Spotify
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
        embedPlaylistUrl: "",
        dataHasLoaded: false,
        externalPlaylistUrl: "/",
        filterChoiceClicked: false,
        seedString: "",
        topSongNames: [],

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
      },
      handleRecommendations: async function (seedString, aToken, filterFlag)
      {
            const doWeFilter = filterFlag === "TRUE" ? true : false;


            const recResult = await Api().post('/getrecommendations', 
            {
              seedString: seedString,
              token: aToken,
              isStrongFiltered: doWeFilter ? "TRUE" : "FALSE"
            });

            const recData = await recResult.data
            const recSongUriList = recData.recommendedSongUris.filter(el => el != null);
            console.log('rec song uri list')
            console.log(recSongUriList);
          
          // get user id
            const meResponse = await fetch(`https://api.spotify.com/v1/me`, {
                  method: 'GET',
                  headers: { 'Authorization' : 'Bearer ' + aToken,
                  'Content-Type' : 'application/json'}
              });

            const meData  = await (meResponse.json());
              console.log(meData);
              const userId = meData['id'];
              console.log('user Id: ' + userId)

              console.log("top song names for description " + this.topSongNames[0] + " " + this.topSongNames[1])
            // generate playlist
            const playlistGen = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                  method: 'POST',
                  headers: { 'Authorization' : 'Bearer ' + aToken,
                              'Content-Type' : 'application/json'
                },
                  body: JSON.stringify(
                    {
                      name: `My Variefy Mix - ${!doWeFilter ? 'Fresh' : 'Spicy'} `, 
                      description: `A ~${!doWeFilter ? 'fresh' : 'spicy'}~ playlist recommendation based on your music tastes. Composed with songs similar to ${this.topSongNames[0]} and ${this.topSongNames[1]}. Made with the Variefy app.`
                    }
                  )
                  
              });

                const playlistData  = await (playlistGen.json());
                const playlistId = playlistData.id;
                this.playlistId = playlistId;
                const playlistUrl = playlistData.external_urls.spotify;
                this.externalPlaylistUrl = playlistUrl;
                let playlistUrlParts = playlistUrl.split(".com/")
                this.embedPlaylistUrl = playlistUrlParts[0] + ".com/embed/" + playlistUrlParts[1];
                console.log('created playlist???')
                console.log(playlistId)
                console.log(this.externalPlaylistUrl)

              // add songs to playlist
              const addToPlaylistRequest = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                  method: 'POST',
                  headers: { 'Authorization' : 'Bearer ' + aToken,
                              'Content-Type' : 'application/json'
                },
                  body: JSON.stringify({uris: recSongUriList})
                  
              });

              const addToPlaylistData  = await (addToPlaylistRequest.json());

              this.dataHasLoaded = true;

              console.log('token on mount ' + aToken)      
              window.history.replaceState({}, document.title, "/");

          return;
      },
      chooseFilterAndRecommend: async function(filterChoice)
      {
        // make sure reccomended data 
        this.$data.filterChoiceClicked = true;
        await this.handleRecommendations(this.seedString, getCookie('access_token'), filterChoice);
        
      },
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
        const seeds = params.get('params') != null ? params.get('params').split("|*|").filter(el => el != "") : null;
        console.log(seeds);
        if(seeds == null || seeds.length == 0)
          router.replace('/')
        // remove last item from parameters, which is the list of top songs
        console.log(seeds);
        // last parameter is TOPSONGS:<topsong1name>|<topsong2name>
        const topSongNames = seeds.pop().split(':')[1].split('|');

        console.log(topSongNames)
        this.topSongNames = topSongNames;
        const seedString = seeds.join(',');
        this.seedString = seedString;



        console.log(seedString)
        window.history.replaceState({}, document.title, "/");


    //   const recResult = await Api().post('/getrecommendations', 
    //   {
    //     seedString: seedString,
    //     token: this.access_token,
    //     isStrongFiltered: "TRUE"
    //   });

    //   const recData = await recResult.data
    //   const recSongUriList = recData.recommendedSongUris.filter(el => el != null);
    //   console.log('rec song uri list')
    //   console.log(recSongUriList);
    
    // // get user id
    //   const meResponse = await fetch(`https://api.spotify.com/v1/me`, {
    //         method: 'GET',
    //         headers: { 'Authorization' : 'Bearer ' + getCookie("access_token"),
		// 			   'Content-Type' : 'application/json'}
    //     });

	  //   const meData  = await (meResponse.json());
    //     console.log(meData);
    //     const userId = meData['id'];
    //     console.log('user Id: ' + userId)

    //   // generate playlist
    //   const playlistGen = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    //         method: 'POST',
    //         headers: { 'Authorization' : 'Bearer ' + getCookie("access_token"),
    //                     'Content-Type' : 'application/json'
		// 			},
    //         body: JSON.stringify(
    //           {
    //             name: "My Variefy Mix", 
    //             description: `A fresh playlist recommendation based on your music tastes. Composed with songs similar to ${topSongNames[0]} and ${topSongNames[1]}. Made with the Variefy app.`
    //           }
    //         )
            
    //     });

	  //       const playlistData  = await (playlistGen.json());
    //       const playlistId = playlistData.id;
    //       this.playlistId = playlistId;
    //       const playlistUrl = playlistData.external_urls.spotify;
    //       this.externalPlaylistUrl = playlistUrl;
    //       let playlistUrlParts = playlistUrl.split(".com/")
    //       this.embedPlaylistUrl = playlistUrlParts[0] + ".com/embed/" + playlistUrlParts[1];
    //       console.log('created playlist???')
    //       console.log(playlistId)
    //       console.log(this.externalPlaylistUrl)

    //     // add songs to playlist
    //     const addToPlaylistRequest = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    //         method: 'POST',
    //         headers: { 'Authorization' : 'Bearer ' + getCookie("access_token"),
    //                     'Content-Type' : 'application/json'
		// 			},
    //         body: JSON.stringify({uris: recSongUriList})
            
    //     });

    //     const addToPlaylistData  = await (addToPlaylistRequest.json());

    //     this.dataHasLoaded = true;

    //     console.log('token on mount ' + this.access_token)      
    //     window.history.replaceState({}, document.title, "/");

      

    
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


  function setPreviouslyRecommendedSongsInCookie(recSongUris)
  {
    if(getCookie("prev_rec_songs") === "")
    {
      let arr_string = JSON.stringify(recSongUris);
      setCookie("prev_rec_songs", arr_string);
      console.log('new stuff (first)  ' + JSON.stringify(recSongUris))
    }
    else
    {
      let oldPrev = JSON.parse(getCookie('prev_rec_songs'))
      console.log("prev stuff " + getCookie('prev_rec_songs') )
      const newList = oldPrev.concat(recSongUris);
      console.log('new stuff ' + JSON.stringify(newList));
      setCookie("prev_rec_songs", JSON.stringify(newList));

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

html, body, template {
  overflow-y: scroll !important;
}

</style>