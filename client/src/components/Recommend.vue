
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
  

<Header></Header>  
                
                    <div class="container-fluid" style="padding:10px;" id="loading-row" v-if="!dataHasLoaded && !arrowClicked">
                    <div class="hero gradient">
      <div class="container-fluid" v-if="!filterChoiceClicked">
          <div class="row" id="title-row" :style="this.titleRowStyles">
                    <div class="col-lg-12 offset-1" style = "text-align: left; padding-top: 150px;">
                      <h1 class="display-4" align = 'left'><strong>You chose your {{this.categoryType[clusterIndex]}} category!</strong></h1>     
                        <p class="lead"><strong>{{this.compositionRatios[clusterIndex]}}% of your favorite music is similar to {{this.topSongNames[0]}} and {{this.topSongNames[1]}}.
                        <br>
                        <br>Other songs in this category include {{this.topSongNames[2]}}, {{this.coverData.tracks[3].name}} by {{this.coverData.tracks[3].artists[0].name}}, 
                        <br>and {{this.coverData.tracks[4].name}} by {{this.coverData.tracks[4].artists[0].name}}.</strong></p>
                        <div class="progress">
                    
                        <div class="progress-bar" role="progressbar" v-bind:style="styleStrings[clusterIndex]" aria-valuenow="25" aria-valuemin="0" aria-valuem  ="100">
                              <div class="progress-value">{{this.compositionRatios[clusterIndex]}}%</div>
                        </div>
                        
                    </div>
                    </div>
                    
          </div>
          
      </div>
    </div>
    <br>
        <br>
            <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                            <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-20 text-center">
     
                                    <div class="spinner-border" role="status" v-if="filterChoiceClicked && !dataHasLoaded">
                                        <span class="sr-only"></span>
                                    </div>


    <div class="container px-3" v-if = "!filterChoiceClicked && !dataHasLoaded">
      <div class="row main-row justify-content-between align-items-center">
          <div class="row text-end" style = 'padding-top: 5px; padding-bottom: 25px'>
                                <div class = 'col-sm-3'></div>
                                <div class = 'col-sm-6' align = 'center'>
                                  <a type = "button" @click="moveToPlaylistPage" class="btn" id="icon3"
                                    style = "background-color: transparent">
                                            <span class="glyphicon glyphicon-refresh" id="icon2"></span>
                                                  Generate a similar playlist →
                                            <span class="glyphicon glyphicon-arrow-right" id="icon2"></span>
                                  </a>
                                  </div>
                                  <div class = 'col-sm-3'></div>
             </div>
        <div class = 'row'>
            <div class="col-sm-4">
                <img :src="this.coverData.tracks[0].album.images[0].url" alt="bg image" class="album-covers" id="first-img"/>
            </div>
            <div class="col-sm-4">
                <img :src="this.coverData.tracks[1].album.images[0].url" alt="bg image" class="album-covers" id="second-img"/>
            </div>
            <div class="col-sm-4">
                <img :src="this.coverData.tracks[2].album.images[0].url" alt="bg image" class="album-covers" id="third-img"/>
            </div>
        </div>
        <div class = 'row' style = 'padding-bottom: 10px;'></div>
        <div class = 'row'>
          <div class ='col-sm-2'></div>
            <div class="col-sm-4" v-if="this.coverData.tracks.length >= 4">
                <img :src="this.coverData.tracks[3].album.images[0].url" alt="bg image" class="album-covers" id="first-img"/>
            </div>
           
            <div class="col-sm-4" v-if="this.coverData.tracks.length >= 5">
                <img :src="this.coverData.tracks[4].album.images[0].url" alt="bg image" class="album-covers" id="second-img"/>
            </div>
             <div class ='col-sm-2'></div>
        </div>
      </div>


      
      
                                        
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                            </div>
               <div class="container-fluid" style="padding:10px;" id="loading-row" >
                            <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-20 text-center">
     
                                    <div class="spinner-border" role="status" v-if="filterChoiceClicked && !dataHasLoaded">
                                        <span class="sr-only"></span>
                                    </div>


                                     <div class="container px-3" v-if = "!filterChoiceClicked && !dataHasLoaded && arrowClicked">
                                     <div class="row main-row justify-content-between align-items-center">
        <div class = 'row' v-if="!dataHasLoaded" style="padding-top: 25px">
            <div class="col-sm-4">
                <img :src="this.coverData.tracks[0].album.images[0].url" alt="bg image" class="album-covers" id="first-img"/>
            </div>
            <div class="col-sm-4">
                <img :src="this.coverData.tracks[1].album.images[0].url" alt="bg image" class="album-covers" id="second-img"/>
            </div>
            <div class="col-sm-4">
                <img :src="this.coverData.tracks[2].album.images[0].url" alt="bg image" class="album-covers" id="third-img"/>
            </div>
        </div>
        <div class = 'row' style = 'padding-bottom: 10px;' v-if="!dataHasLoaded"></div>
        <div class = 'row'>
          <div class ='col-sm-2'></div>
            <div class="col-sm-4" v-if="this.coverData.tracks.length >= 4">
                <img :src="this.coverData.tracks[3].album.images[0].url" alt="bg image" class="album-covers" id="first-img"/>
            </div>
           
            <div class="col-sm-4" v-if="this.coverData.tracks.length >= 5">
                <img :src="this.coverData.tracks[4].album.images[0].url" alt="bg image" class="album-covers" id="second-img"/>
            </div>
        </div>
      </div>
      <div class="hero gradient" v-if="arrowClicked">
      <div class="container-fluid" v-if="!filterChoiceClicked && arrowClicked">
          <div class="row" id="title-row" :style="this.titleRowStyles">
                    <div class="col-lg-12" style = "text-align: left; padding-top: 0px;">
                      <h1 class="display-4" align = 'left'><strong>What type of playlist would you like to generate?</strong></h1>     
                        <p class="lead"><strong>Fresh, but familiar does this and Spice it up does that.</strong></p>

                    </div>
                    
          </div>
          
      </div>
    </div>
    


      
                                        <div class="row gx-5">
                                                <div class="col text-end">
                                                <a type = "button" @click="chooseFilterAndRecommend('FALSE')" class="btn" id="icon3"
                                                  style = "background-color: #6CC9CF;">
                                                  <span class="glyphicon glyphicon-refresh" id="icon2"></span>
                                                  Fresh, but familiar
                                                </a>
                                              </div>
                                              <div class="col text-start">
                                                  <a type = "button"  @click="chooseFilterAndRecommend('TRUE')" class="btn"
                                                  style = "background-color: #EA8FCB;">
                                                  Spice it up!                                                  </a>
                                              </div>

            <br/>
            <br/>         
            <div class = 'row' style = 'padding-bottom: 50px;'></div>
            
            
             
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
                                    <iframe style="border-radius:12px" :src='this.embedPlaylistUrl' width="75%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                         as="style" rel="stylesheet preload prefetch" ></iframe>
                                    <br/>
                                    <br/>
                                    <div class="container px-3">
                                        <div class="row gx-5">
                                                <div class="col text-end">
                                                <a href="/" class="btn" id="icon3">
                                                  <span class="glyphicon glyphicon-refresh" id="icon2"></span>
                                                  Make Another Playlist
                                                </a>
                                              </div>
                                              <div class="col text-start">
                                                  <a :href="this.externalPlaylistUrl"  target = "_blank" class="btn">
                                                    <img src="../assets/spotify-icon-2.png" id="icon"/> 
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
import Header from './Header.vue';
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
        arrowClicked: false,
        seedString: "",
        topSongNames: [],
        coverData: [],
        styleStrings: Array(4),
        compositionRatios: Array(4),
        categoryType: Array(4),
        titleRowStyles: "opacity: 0%;",
        clusterRowStyles: "opacity: 0%;",
        albumStyles: "opacity: 0%;",
        clusterList: [[1,1][1,1],[1,1],[1,1]]

      }
    },
    components: {Header},
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
            redirect_uri: process.env.NODE_ENV != 'development' ? 'https://variefy.herokuapp.com/' : 'http://localhost:8080'
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
            const meResponse = await fetch('https://api.spotify.com/v1/me', {
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

      moveToPlaylistPage: async function()
      {
        this.$data.arrowClicked = true;
      },
      handleBack: function()
      {
        router.replace('/')
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

      for(let i = 0; i < 4; i++) {
      this.styleStrings[i] = "width: 0%";
    }

    this.categoryType[0] = "most popular";
    this.categoryType[1] = "second most popular";
    this.categoryType[2] = "third most popular";
    this.categoryType[3] = "least popular";
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
        console.log(topSongNames);

        this.topSongNames = topSongNames;
        const clusterIndex = seeds.pop();
        console.log(clusterIndex);
        this.clusterIndex = clusterIndex;
        const seedString = seeds.join(',');
        this.seedString = seedString;


        // add songs to playlist
              const albumCovers = await fetch(`https://api.spotify.com/v1/tracks/?ids=${seedString}`, {
                  method: 'GET',
                  headers: { 'Authorization' : 'Bearer ' + this.access_token,
                              'Content-Type' : 'application/json'
                },
                
              });

              const coverData = await albumCovers.json();
              console.log(coverData)

              console.log(coverData.tracks[3].name);

              this.coverData = coverData;






        console.log(seedString)
        window.history.replaceState({}, document.title, "/");
  
    const clusterResponse = await Api().post('/getclusters', {token: this.access_token})
    const topResponse = await Api().post('gettopcovers', {token: this.access_token})

    console.log("test_nick");
    console.log(topResponse);
    console.log(clusterResponse);

    // retrieve data from server response
    const clusterGroups = await clusterResponse.data.clusterGroups;

    this.clusterList = clusterGroups.sort((a,b) => {return b.length- a.length;});

     const colorMap = ["#6CC9CF", "#EA8FCB",
                  // "#F2E991", pastel yellow
                  "#77dd77",
                  "#C293FF"]
    
    let updatedStyleStrings = Array(4);

      setTimeout(() => {
      this.titleRowStyles = "opacity: 100%;"
      setTimeout(() => {
        this.clusterRowStyles = "opacity: 100%;"

        setTimeout(() => {
          for(let i = 0; i < this.compositionRatios.length; i++) {
            this.compositionRatios[i] = String(Math.floor(((this.clusterList[i].length / 50) * 100)));
            updatedStyleStrings[i] = "width: " + this.compositionRatios[i] + "%; " + ("background: " + colorMap[i] + ";");
          }

          this.albumStyles = "opacity: 100%;"
          this.styleStrings = updatedStyleStrings;

        }, 2);
      }, 5);
    }, 1);
      try {
        const topResponse = await Api().post('/gettopcovers', {token: this.access_token})
        console.log(topResponse)
        // const topSongID = await topResponse.data.topTracksID
        const topURLImages = await topResponse.data.ImageURLs

        // ensure page waits for image to be loaded
        // this.topSongID = await topSongID;
        this.topURLImages = await shuffle(topURLImages);

        this.dataHasLoaded = true;

        setInterval(() => {
          let currentImages = this.topURLImages.slice(0, 6);
          let shuffledImages = shuffle(this.topURLImages.slice(6));
          shuffledImages = shuffledImages.concat(currentImages);
          
          this.topURLImages = shuffledImages;
        }, 1000);
      }
      catch (error){
        console.log('something went wrong fetching top album pics');
        console.log(error);
      }
    
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
        box-shadow: -4px 20px 30px rgba(2, 2, 2, 0.2);
        transition: all 0.2s ease-in-out;
    
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


#title-row {
  transition: opacity 500ms;

}

.album-covers {
  border: 5px white solid;
  border-radius: 15px; 
  transition: box-shadow 0.3s ease-in-out;
  transition: opacity 500ms;
  transition: width 250ms ease-in-out;
  animation: float 6s ease infinite;


}

.album-covers:hover{
    box-shadow: 0px 6px 8px rgba(34, 25, 25, 0.4);
    height: auto;
    width: 275px;
} 

.album-covers:not(:hover){
    box-shadow: -2px 4px 4px rgba(34, 25, 25, 0.4);
    height: auto;
    width: 250px;
} 
.progress {
  height: 100px; 
  width:83%;
  border-radius: 15px;
  transition: box-shadow 0.1s ease-in-out;
  transition: transform 0.1s ease-in-out;
  margin-top:20px;

}

.progress-bar {
    -webkit-transition: width 2.5s ease;
    transition: width 2.5s ease;
    
}
.progress-value {
  font-size: 18px;
}

</style>
