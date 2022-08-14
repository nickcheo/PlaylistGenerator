
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
  
<nav color-on-scroll="100" class="fixed-top navbar-transparent navbar navbar-expand-lg">
  <div class="container">
<div class="navbar-translate" style="transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;">
<a data-placement="bottom" rel="noopener noreferrer" title="Designed and Developed by @_kalpal" class="navbar-brand" href="/"><span></span></a>
<button aria-expanded="false" class="navbar-toggler navbar-toggler"><span class="navbar-toggler-bar bar1"></span><span class="navbar-toggler-bar bar2"></span><span class="navbar-toggler-bar bar3"></span>
</button>
</div>
  <div class="justify-content-end undefined collapse navbar-collapse" aria-expanded="false">
    <div class="navbar-collapse-header">
      <div class="row">
        <div class="collapse-brand col-6">
          <a href="#pablo">
            <div role="img" class="nav-logo" aria-label="coolboy" style="background-image: url(&quot;/logo-sml.png&quot;); transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;"></div>
          </a>
        </div>
        <div class="collapse-close text-right col-6"><button aria-expanded="false" class="navbar-toggler"><i class="tim-icons icon-simple-remove"></i></button></div>
      </div>
    </div>
    <ul class="navbar-nav">
      <li class="nav-item">
        <div style="transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;"><a class="nav-link" href="/">Home</a></div>
      </li>
      <li class="nav-item">
        <div style="transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;"><a class="nav-link" href="/about">About</a></div>
      </li>
      <li class="nav-item">
        <div style="transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;"><a class="nav-link" href="/contact">Contact</a></div>
      </li>
     <li class="nav-item">

              <!-- <button class="loginbutton2" v-if="show" key="on" @click="show = false">
              <img id="profile-pic" :style="this.profileStyle"/>
              </button>
              <button class="loginbutton2" v-else key="off" @click="show = true">
              <img id="profile-pic" :style="this.profileStyle"/>
              </button>
           Dropdown Menu -->
            <div class="dropdown__menu"  v-if="show">
                <li class="dropdown__menu-item">
                    <div style="transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;"><a class="nav-link" href="#">Account</a></div>
                </li>
                <hr>
                <li class="dropdown__menu-item" @click="logout">
                    <div style="transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;"><a class="nav-link" href="#">Sign out</a></div>
                  
                </li>
            </div> -->
  

        
        
        
        
        </li>
    </ul>
  </div>
  </div>
  
</nav>


      <div class="hero" id="loading-row" v-if="!dataHasLoaded">
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


<div id = 'cluster-page' v-if="dataHasLoaded">

    <div class="hero gradient">
      <div class="container-fluid">
          <div class="row" id="title-row" :style="this.titleRowStyles">
                    <div class="col-lg-12 offset-1" style = "text-align: left; padding-top: 5px;">
                      <h1 class="display-4" align = 'left'><strong>Here are your favorite categories{{username}}.</strong></h1>     
                        <p class="lead"><strong>Click each row to generate similar playlists!</strong></p>
                    </div>
          </div>
      </div>
    </div>
<!-- <a href="http://google.come"> -->
  <div id="" class="container">
      <div class="row " :style="this.clusterRowStyles">
              <div class="col-md-7" style = "text-align: left; padding-right: 10px;">
                  <h3 class="progress-title">You like songs similar to:</h3>
                    <br>
                    </div>
                    </div>
  <a @click = "toRecommend(0)" style="text-decoration: none; color:white">
          <div class="row cluster-result " :style="this.clusterRowStyles">
              <div class="col-md-7" style = "text-align: left; padding-right: 10px;">
                  <h5 class="progress-title">{{this.songIdToNameMap[this.clustersBestTwoSongIds[0][0]]}} <br/> {{this.songIdToNameMap[this.clustersBestTwoSongIds[0][1]]}}</h5>
                    <div class="progress">
                    
                        <div class="progress-bar" role="progressbar" v-bind:style="styleStrings[0]" aria-valuenow="25" aria-valuemin="0" aria-valuem  ="100">
                              <div class="progress-value">{{this.compositionRatios[0]}}%</div>
                        </div>
                        
                    </div>
              </div>

              <!-- <div class = "col-md-2">
                  <br/>
                  <br/>
                  <br/>
                  <div class = "row"></div>
                  <div class = "row"></div>
                  <br/>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #6CC9CF; color: white;">
                          <br/>
                          <div class="text-center container-fluid row" style = "text-align: center;">
                                  <div>
                                    <center>
                                      <br/>
                                    <h6>&nbsp; Find similar music </h6>
                                    <br>
                                  </center>
                                  </div>
                          </div>
                          <br/>
                    </div> -->
                    <!-- <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #91382f; color: white;">
                          <br/>
                          <div class="text-center container-fluid row" style = "text-align: center;">
                                  <div>
                                    <center>
                                      <br/>
                                    <h6>&nbsp; Find different music </h6>
                                    <br>
                                  </center>
                                  </div>
                          </div>
                          <br/>
                    </div> -->
                <!-- </div> -->


              
               <div class="col-md-5">
                <div class="img-container">
                  <img :style="this.albumStyles" id="first-img" :src="this.clusterImage[this.clustersBestTwoSongIds[0][0]]"/>
                </div>
              </div>
             
          </div>
          </a>

        
         <a @click = "toRecommend(1)" style="text-decoration: none; color:white">
          <div class="row cluster-result" :style="this.clusterRowStyles">
              <div class="col-md-7" style = "text-align: left;">
                    <h5 class="progress-title">{{this.songIdToNameMap[this.clustersBestTwoSongIds[1][0]]}} <br/> {{this.songIdToNameMap[this.clustersBestTwoSongIds[1][1]]}}</h5>
                    <div class="progress">                    
                        <div class="progress-bar" role="progressbar" v-bind:style="styleStrings[1]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-value">{{this.compositionRatios[1]}}%</div>
                        </div>
                    </div>
              </div>

<!-- 
            <div class = "col-md-2">
                  <br/>
                  <br/>
                  <br/>
                  <div class = "row"></div>
                  <div class = "row"></div>
                  <br/>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #EA8FCB; color: white;">
                          <br/>
                          <div class="text-center container-fluid row" style = "text-align: center;">
                                  <div>
                                    <center>
                                      <br/>
                                    <h6>&nbsp; Find similar music </h6>
                                    <br>
                                  </center>
                                  </div>
                          </div>
                          <br/>
                    </div> -->
                    <!-- <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #117133; color: white;">
                          <br/>
                          <div class="text-center container-fluid row" style = "text-align: center;">
                                  <div>
                                    <center>
                                      <br/>
                                    <h6>&nbsp; Find different music </h6>
                                    <br>
                                  </center>
                                  </div>
                          </div>
                          <br/>
                    </div> -->
                <!-- </div> -->


              <div class="col-md-5">
                <div class="img-container">
                  <img :style="this.albumStyles" id="second-img" :src="this.clusterImage[this.clustersBestTwoSongIds[1][0]]"/>
                </div>
              </div>
            
          </div>
          </a>
    
    <a @click = "toRecommend(2)" style="text-decoration: none; color:white">
          <div class="row cluster-result" :style="this.clusterRowStyles">
                <div class="col-md-7" style = "text-align: left;">
                    <h5 class="progress-title">{{this.songIdToNameMap[this.clustersBestTwoSongIds[2][0]]}} <br/> {{this.songIdToNameMap[this.clustersBestTwoSongIds[2][1]]}}</h5>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" v-bind:style="styleStrings[2]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-value">{{this.compositionRatios[2]}}%</div>
                        </div>
                    </div>
                </div>


                 <!-- <div class = "col-md-2">
                  <br/>
                  <br/>
                  <br/>
                  <div class = "row"></div>
                   <div class = "row"></div>
                   <br/>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #77dd77; color: white;">
                          <br/>
                          <div class="text-center container-fluid row" style = "text-align: center;">
                                  <div>
                                    <center>
                                      <br/>
                                    <h6>&nbsp; Find similar music </h6>
                                    <br>
                                  </center>
                                  </div>
                          </div>
                          <br/>
                    </div> -->
                    <!-- <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #872186; color: white;">
                          <br/>
                          <div class="text-center container-fluid row" style = "text-align: center;">
                                  <div>
                                    <center>
                                      <br/>
                                    <h6>&nbsp; Find different music </h6>
                                    <br>
                                  </center>
                                  </div>
                          </div>
                          <br/>
                    </div> -->
                    
                <!-- </div> -->



                <div class="col-md-5">
                  <div class="img-container">
                    <img :style="this.albumStyles" id="third-img" :src="this.clusterImage[this.clustersBestTwoSongIds[2][0]]"/>
                  </div>
                </div>
          </div>
          </a>

    <a @click = "toRecommend(3)" style="text-decoration: none; color:white">
          <div class="row cluster-result" :style="this.clusterRowStyles">
                    <div class="col-md-7" style = "text-align: left;">
                        <h5 class="progress-title">{{this.songIdToNameMap[this.clustersBestTwoSongIds[3][0]]}} <br/> {{this.songIdToNameMap[this.clustersBestTwoSongIds[3][1]]}}</h5>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" v-bind:style="styleStrings[3]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-value">{{this.compositionRatios[3]}}%</div>
                            </div>
                        </div>
                    </div>


                  <!-- <div class = "col-md-2">
                  <br/>
                  <br/>
                  <br/>
                  <div class = "row"></div>
                  <div class = "row"></div>
                  <br/>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #C293FF; color: white;">
                          <br/>
                          <div class="text-center container-fluid row" style = "text-align: center;">
                                  <div>
                                    <center>
                                      <br/>
                                    <h6>&nbsp; Find similar music </h6>
                                    <br>
                                  </center>
                                  </div>
                          </div>
                          <br/>
                    </div> -->
                    <!-- <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #3c6a00; color: white;">
                          <br/>
                          <div class="text-center container-fluid row" style = "text-align: center;">
                                  <div>
                                    <center>
                                      <br/>
                                    <h6>&nbsp; Find different music </h6>
                                    <br>
                                  </center>
                                  </div>
                          </div>
                          <br/>
                    </div> -->
                <!-- </div> -->
                
                <div class="col-md-5">
                      <div class="img-container">
                        <img :style="this.albumStyles" id="fourth-img" :src="this.clusterImage[this.clustersBestTwoSongIds[3][0]]"/>
  
                      </div>
                </div>

          </div>
          </a>
            <!-- <div class="row">
              
              <div class="col-md-6">
              <img :src="this.clusterImage[this.clustersBestTwoSongIds[0][0]]" style= "height: auto; width: 50%;"/>
              </div>
              <div class="col-md-6">
              <img :src="this.clusterImage[this.clustersBestTwoSongIds[1][0]]" style= "height: auto; width: 50%;"/>
              </div>
              <div class="col-md-6">
              <img :src="this.clusterImage[this.clustersBestTwoSongIds[2][0]]" style= "height: auto; width: 50%;"/>
              </div>
              <div class="col-md-6">
              <img :src="this.clusterImage[this.clustersBestTwoSongIds[3][0]]" style= "height: auto; width: 50%;"/>
              </div>
          </div> -->
   
      

  </div>  
</div>

  




</body>
</template>


<script>
  import router from '../router';
import Api from '../services/Api';

  export default {
    name: 'Login',
    data () {
      return {
        access_token: 'temp',
        refresh_token: 'temp',
        username: getCookie('username') ? (', ' + getCookie('username'))  : '',
        dataHasLoaded: false,
        clusterList: [[1,1][1,1],[1,1],[1,1]],
        compositionRatios: Array(4),
        styleStrings: Array(4),
        clusterImage: {},
        ID: Array(50),
        songIdToNameMap: null,
        clustersBestTwoSongIds: "",
        albumStyles: "opacity: 0%;",
        clusterRowStyles: "opacity: 0%;",
        titleRowStyles: "opacity: 0%;",
        profileStyle: ""
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

       toRecommend : function (clusterIndex){
          console.log('in to recommend')
          
          try {
           
            if( this.clustersBestTwoSongIds != null){
              console.log('this better be null')
              // split paramaters by |*|
                let recommendParameterString = "";
                recommendParameterString += (this.$data.clustersBestTwoSongIds[clusterIndex][0] + "|*|");
                recommendParameterString += (this.$data.clustersBestTwoSongIds[clusterIndex][1] + "|*|");
                recommendParameterString += (this.$data.clustersBestTwoSongIds[clusterIndex][2] + "|*|");

                let topIds = [
                                     this.$data.clustersBestTwoSongIds[clusterIndex][0],
                                     this.$data.clustersBestTwoSongIds[clusterIndex][1], 
                                     this.$data.clustersBestTwoSongIds[clusterIndex][2]
                                    ]
                if(this.clusterList[clusterIndex].length > 3)
                {
                    let firstRandomId  = "";
                    do
                    {
                      firstRandomId = getRandomSongWithinCluster(this.clusterList, clusterIndex, this.songIdToNameMap)
                    }                  
                    while (topIds.includes(firstRandomId));
                    topIds.push(firstRandomId);
                    console.log('FRI ' + firstRandomId);
                    recommendParameterString += (firstRandomId+ "|*|")
                }


                if(this.clusterList[clusterIndex].length > 4)
                {
                    let secondRandomId  = "";
                    do
                    {
                      secondRandomId = getRandomSongWithinCluster(this.clusterList, clusterIndex, this.songIdToNameMap)
                    }                  
                    while (topIds.includes(secondRandomId));
                    topIds.push(secondRandomId);
                    console.log('SRI' + secondRandomId);
                    recommendParameterString += (secondRandomId+ "|*|");
                }
                                   
                if(this.clustersBestTwoSongIds != null && this.songIdToNameMap != null)
                  recommendParameterString += "TOPSONGS:" + this.songIdToNameMap[this.clustersBestTwoSongIds[clusterIndex][0]]+"|" + this.songIdToNameMap[this.clustersBestTwoSongIds[clusterIndex][1]]


                console.log(recommendParameterString)


                router.replace('/recommend/' + recommendParameterString);
            }
            else
            console.log('important homie wrong')
          }
          catch(error)
          {
            console.log(error)
          }
          
      },
      
      logout: async() => {
        setCookie("access_token", "", 0);
        setCookie("refresh_token", "", 0);

        window.location.reload();
      },
  },

  async mounted(){
    /* eslint-disable */
    const tokens = [getCookie("access_token"), getCookie("refresh_token")]
    // refresh token if access expired
    if(this.access_token === "" || !this.access_token || getCookie("access_token") === "")
    {
      refreshToken();
      this.access_token = getCookie("access_token");

    }
    else  {

        this.access_token = tokens[0];
        this.refresh_token = tokens[1];
    }
    
    


    // go home if both tokens are missing
    if(getCookie("access_token") === "" && getCookie("refresh_token") === "")
      router.replace("/")

    // refresh token if access expired
    

    console.log('token on mount ' + this.access_token)

    if(!this.access_token)
      return;

    for(let i = 0; i < 4; i++) {
      this.styleStrings[i] = "width: 0%";
    }

    try {
      const response = await Api().post('/getprofile', {token: this.access_token})
      const pfp = await response.data.pfp;

      this.profileStyle = "background-image: url('" + pfp + "');";
    }
    catch (error) {
      console.log('something went wrong fetching profile picture');
      console.log(error);
    }

    this.dataHasLoaded = true;
    
    window.history.replaceState({}, document.title, "/");

    const clusterResponse = await Api().post('/getclusters', {token: this.access_token})
    const topResponse = await Api().post('gettopcovers', {token: this.access_token})

    console.log("test_nick");
    console.log(topResponse);
    console.log(clusterResponse);

    // retrieve data from server response
    const clusterGroups = await clusterResponse.data.clusterGroups;
    const songID = await clusterResponse.data.songIdList;
    const songImage = await clusterResponse.data.idAndImage;
    const clustersBestTwoSongIds = await clusterResponse.data.clustersBestTwoSongs;
    const songIdToNameMap = await clusterResponse.data.songIdToName;

    console.log('toppies')
   
    // retrieve data from top response
    const topSongID = await topResponse.data.topTracksID

    console.log("nick2");
    console.log(topSongID);

    console.log(songID);

    // assign to class instance variables
    this.clusterList = clusterGroups.sort((a,b) => {return b.length- a.length;});
    this.clusterImage = songImage;
    this.ID = songID;
    this.songIdToNameMap = songIdToNameMap;
    this.clustersBestTwoSongIds = clustersBestTwoSongIds;
    


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

        }, 20);
      }, 500);
    }, 10);
  }
}


  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
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
    console.log("attempting refresh")
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

  // TODO: Inefficient bruh
  function getRandomSongWithinCluster(allTheClusters, clusterIndex, songIdToNameMap)
  {
      if(allTheClusters == null)
        return "";

      let thisCluster = allTheClusters[clusterIndex];
      if(thisCluster != null && songIdToNameMap != null)
      {
        let randomIndex = Math.floor(Math.random() * thisCluster.length);
        let randomSongName = thisCluster[randomIndex];
        let randomId = "";

        // inefficiency, iterate linearly to find corresponding id
        for (const [key, value] of Object.entries(songIdToNameMap))
          if(value == randomSongName)
          {
            randomId = key;
          }

        console.log('random song log ' + randomId);
        return randomId;

      }
      else
        return "";
  }

  
    
</script>

<!-- <script>
        const spinHTML = '<div class="spinner-border" role="status"><span class="sr-only"></span></div>'
        document.getElementById("spin-box").innerHTML = spinHTML;
        const calculateButtonHTML = '<a href="/calculate" class="btn btn-primary rounded-pill" style = "background-color: #1db954; color: white"> Calculate my music tastes</a>'
        
        setTimeout(function(){
          document.getElementById("spin-box").innerHTML = checkHTML;
        }, 2000);

        setTimeout(function() {
          window.location.replace("genre.html");
        }, 4000);
        

        const checkHTML = '<h1><span class="bi bi-check"></span></h1>'
</script> -->



<style scoped>
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
/* button {
  color: #42b983;
} */

.cluster-result {
  transition: opacity 500ms;
  transition: height 0.25s;
  position: relative;
}

.cluster-result:hover {
  z-index: 10;
}

.cluster-result:hover .img-container img{
    box-shadow: 0px 6px 8px rgba(34, 25, 25, 0.4);
} 

.cluster-result:not(:hover) .img-container img{
    box-shadow: -2px 4px 4px rgba(34, 25, 25, 0.4);
    z-index: -10;
} 

.cluster-result:hover .progress{
    box-shadow: -2px 6px 8px rgba(59, 50, 50, 0.4);
    transform: scale(1.05) perspective(1px);
} 

.cluster-result:not(:hover) .progress{
    box-shadow: -2px 4px 4px rgba(59, 50, 50, 0.4);
} 

#title-row {
  transition: opacity 500ms;

}

.img-container img {
  border: 5px white solid;
  border-radius: 15px; 
  transition: box-shadow 0.3s ease-in-out;
  transition: opacity 500ms;
  transition: width 250ms ease-in-out;

}

.progress {
  height: 100px; 
  width:100%;
  border-radius: 15px;
  transition: box-shadow 0.1s ease-in-out;
  transition: transform 0.1s ease-in-out;
  margin-top: 20px;

}

.progress-bar {
    -webkit-transition: width 2.5s ease;
    transition: width 2.5s ease;
    
}

.progress-value {
  font-size: 18px;
}


@media (min-width: 768px) {
  .img-container img {
    animation: float 6s ease-in-out infinite;
  }

  #third-img {
    position: relative;
    left: 100px;
  }

  #first-img {
    position: relative;
    left: 100px;
  }

  .cluster-result {
    height: 200px;
  }

}

@media (min-width: 1200px) {

  .img-container img {
    height: auto;
    width: 235px;
  }

  .cluster-result:hover .img-container img{
    height: auto;
    width: 265px;
  }


}

@media (max-width: 1199px) {

  .img-container {
    float: left;
  }

  .img-container img {
    height: auto;
    width: 215px;
  }

  #second-img {
    position: relative;
    left: 45px;
  }

  #fourth-img {
    position: relative;
    left: 45px;
  }

    #third-img {
    position: relative;
    left: 130px;
  }

  #first-img {
    position: relative;
    left: 130px;
  }

  .cluster-result:hover .img-container img{
    height: auto;
    width: 235px;
  }

  .progress {
    height: 90px; 
  }
}

@media (max-width: 991px) {

  .img-container img {
    height: auto;
    width: 200px;
  }

  .cluster-result:hover .img-container img{
    height: auto;
    width: 220px;
  }

  .img-container {
    float: left;
  }

  .img-container img {
    height: auto;
    width: 190px;
  }

  .cluster-result:hover .img-container img{
    height: auto;
    width: 210px;
  }

  .progress {
    height: 80px; 
  }
}

@media (max-width: 767px) {
  .img-container {
    margin-top: 5%;
    margin-bottom: 5%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

  }

  /* .cluster-result {
    height: 460px;
  } */

  #second-img {
    position: relative;
    left: 0px;
  }

  #fourth-img {
    position: relative;
    left: 0px;
  }

    #third-img {
    position: relative;
    left: 0px;
  }

  #first-img {
    position: relative;
    left: 0px;
  }


}

@keyframes float {
	0% {
		transform: translate(0px, 0px) rotate(0deg);
    box-shadow: -2px 4px 4px rgba(59, 50, 50, 0.4);
	}

  50% {
    transform: translate(10px, -10px);
    box-shadow: -4px 8px 8px rgba(59, 50, 50, 0.4);

  }
	100% {
    transform: translate(0px, 0px) rotate(0deg);
    box-shadow: -2px 4px 4px rgba(59, 50, 50, 0.4);

	}
}

.img-container {
  transition: all 0.25s;
  /* transform-origin: 50% 50%; */
  perspective: 500px;
}

#second-img {
  animation-delay: -1s;
}

#third-img {
  animation-delay: -2s;
}

#fourth-img {
  animation-delay: -3s;
}

#profile-pic {
  /* display: inline-block; */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.nav-link {
  color: white;
}
.nav-link:hover {
  color: white;
  text-shadow: -1px 1px 8px white;
}

body {
  color: white;
	overflow-y: auto;
}

#loading-row {
  margin-top: 60px;
}



</style>
<style>
      .my-custom-row {
        background-color:beige;
        height: 400px;
      }
      .hero {
        width: 100%;
        height: 70vh;
        display: flex;
        align-items: center;
      }

      #spotify-container {
        width: 100vw;
      }

      #icon {
        border-radius: 100%;
        width: 25px;
        height: auto;
      }
    </style>
      <style>
      .my-custom-row {
        background-color:beige;
        height: 400px;
      }
    </style>

    <style>
      .hero {
        /* background: white; */
        width: 100%;
        height: 20vh;
        display: flex;
        align-items: center;
      }

      #spotify-container {
        width: 100vw;
      }

      #icon {
        border-radius: 100%;
        width: 25px;
        height: auto;
      }
    </style>



