
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
  

    
      <div class="hero" v-if="!dataHasLoaded">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-20 text-center">
              <h2 class="display-1"><strong>Hello there{{username}}</strong></h2>
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
          <div class="row">
                    <div class="col-lg-20 offset-1" style = "text-align: left;">
                      <h1 class="display-4" align = 'left' style = "color: black"><strong>We think you like this{{username}}.</strong></h1>     
                        <p class="lead"><strong>Here's a breakdown your music taste according to our algorithms:</strong></p>
                    </div>
          </div>
      </div>
    </div>

  <div class="container" style = "color: black">
          <div class="row">
              <div class="col-md-6" style = "text-align: left; padding-right: 10px;">
                  <h3 class="progress-title">Music like {{this.songIdToNameMap[this.clustersBestTwoSongIds[0][0]]}} and <br/> {{this.songIdToNameMap[this.clustersBestTwoSongIds[0][1]]}}</h3>
                    <div class="progress" style="height: 60px; width:100%">
                        <div class="progress-bar" role="progressbar" :style="this.styleStrings[0]" aria-valuenow="25" aria-valuemin="0" aria-valuem  ="100">
                              <div class="progress-value">{{this.compositionRatios[0]}}%</div>
                        </div>

                        
                    </div>
              </div>


              <div class = "col-md-2">
                  <br/>
                  <br/>
                  <br/>
                  <div class = "row"></div>
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
                    </div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #6CC9CF; filter: invert(100%);">
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
                    </div>
                </div>


              
               <div class="col-md-4">
                <div class="img-container">
                  <img @mousemove="mousemove" :src="this.clusterImage[this.clustersBestTwoSongIds[0][0]]"/>
                </div>
              </div>
             
          </div>

         <br>
          <div class="row">
              <div class="col-md-6" style = "text-align: left;">
                    <h3 class="progress-title">Music like {{this.songIdToNameMap[this.clustersBestTwoSongIds[1][0]]}} and <br/> {{this.songIdToNameMap[this.clustersBestTwoSongIds[1][1]]}}</h3>
                    <div class="progress" style="height: 60px; width:100%">                    
                        <div class="progress-bar" role="progressbar" :style="this.styleStrings[1]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-value">{{this.compositionRatios[1]}}%</div>
                        </div>
                    </div>
              </div>


            <div class = "col-md-2">
                  <br/>
                  <br/>
                  <br/>
                  <div class = "row"></div>
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
                    </div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #EA8FCB; filter: invert(100%);">
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
                    </div>
                </div>


              <div class="col-md-4">
                <div class="img-container">
                  <img @mousemove="mousemove" :src="this.clusterImage[this.clustersBestTwoSongIds[1][0]]"/>
                </div>
              </div>
            
          </div>
    <br/>
          <div class="row">
                <div class="col-md-6" style = "text-align: left;">
                    <h3 class="progress-title">Music like {{this.songIdToNameMap[this.clustersBestTwoSongIds[2][0]]}} and <br/> {{this.songIdToNameMap[this.clustersBestTwoSongIds[2][1]]}}</h3>
                    <div class="progress" style="height: 60px; width:100%">
                        <div class="progress-bar" role="progressbar" :style="this.styleStrings[2]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-value">{{this.compositionRatios[2]}}%</div>
                        </div>
                    </div>
                </div>


                 <div class = "col-md-2">
                  <br/>
                  <br/>
                  <br/>
                  <div class = "row"></div>
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
                    </div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #77dd77; filter: invert(100%);">
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
                    </div>
                </div>



                <div class="col-md-4">
                  <div class="img-container">
                    <img @mousemove="mousemove" :src="this.clusterImage[this.clustersBestTwoSongIds[2][0]]"/>
                  </div>
                </div>
          </div>
    <br>
          <div class="row">
                    <div class="col-md-6" style = "text-align: left;">
                        <h3 class="progress-title">Music like {{this.songIdToNameMap[this.clustersBestTwoSongIds[3][0]]}} and <br/> {{this.songIdToNameMap[this.clustersBestTwoSongIds[3][1]]}}</h3>
                        <div class="progress" style="height: 60px; width:100%">
                            <div class="progress-bar" role="progressbar" :style="this.styleStrings[3]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-value">{{this.compositionRatios[3]}}%</div>
                            </div>
                        </div>
                    </div>


                  <div class = "col-md-2">
                  <br/>
                  <br/>
                  <br/>
                  <div class = "row"></div>
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
                    </div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class = "row" style = "padding-bottom: 2%; padding-top: 2%;"></div>
                    <div class="progress button" style="height: 60px; width:100%; background-color: #C293FF; filter: invert(100%);">
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
                    </div>
                </div>
                
              
                    <div class="col-md-4">
<<<<<<< HEAD
                      <img :src="this.clusterImage[this.clustersBestTwoSongIds[3][0]]" style= "height: auto; width: 50%;"/>
=======
                      <div class="img-container">
                        <img @mousemove="mousemove" :src="this.clusterImage[this.clustersBestTwoSongIds[3][0]]"/>
                      </div>
>>>>>>> 63ff05faf5a68a3bc4dc5e76e5b7a9d92f7f17e5
                    </div>
          </div>
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
    <br/>
      

  </div>  
</div>

  




</body>
</template>


<script>
  import Api from '../services/Api';

  export default {
    name: 'Login',
    data () {
      return {
        access_token: 'temp',
        refresh_token: 'temp',
        username: getCookie('username') ? (', ' + getCookie('username'))  : '',
        dataHasLoaded: false,
        clusterList: Array(4),
        compositionRatios: Array(4),
        styleStrings: Array(4),
        clusterImage: {},
        ID: Array(50),
        songIdToNameMap: null,
        clustersBestTwoSongIds: null
      }
    },
    methods:
    {
      mousemove: (e) => {
        let el = e.currentTarget;
        let delta_x = parseFloat(e.offsetX / el.offsetWidth).toFixed(3)
        let delta_y = parseFloat(e.offsetY / el.offsetHeight).toFixed(3)
        console.log(delta_x, delta_y)

        var transform = "translateY(" + ((delta_y - 0.5) * 30) + "px) " +
            "translateX(" + (-(delta_x - 0.5) * -30) + "px)"
        
        var boxShadow = parseInt(-(delta_x - 0.5) * 12) +"px " + 
            parseInt(-((delta_y - 0.5) * 12) + 2) + 
            "px 4px rgba(234, 225, 225, 0.4);"

        el.setAttribute('style', 
                        "transform: " + transform + "; " + 
                        "box-shadow: " + boxShadow);
      },
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
      calculateTrackData: async () => {
      
      }
    },
    async mounted(){
      /* eslint-disable */
      const tokens = await this.getAccessToken()
      this.access_token = tokens[0];
      this.refresh_token = tokens[1];

      console.log('token on mount ' + this.access_token)

      if(!this.access_token)
        return;
      
      const clusterResponse = await Api().post('/getclusters', 
      {
        token: this.access_token
      })

      console.log(clusterResponse);

      // retrieve data from server response
      const clusterGroups = await clusterResponse.data.clusterGroups;
      const songID = await clusterResponse.data.songIdList;
      const songImage = await clusterResponse.data.idAndImage;
      const clustersBestTwoSongIds = await clusterResponse.data.clustersBestTwoSongs;
      const songIdToNameMap = await clusterResponse.data.songIdToName;

      console.log(songID);

      // assign to class instance variables
      this.clusterList = clusterGroups;
      this.clusterImage = songImage;
      this.ID = songID;
      this.songIdToNameMap = songIdToNameMap;
      this.clustersBestTwoSongIds = clustersBestTwoSongIds;


      const colorMap = ["#6CC9CF", "#EA8FCB",
                    // "#F2E991", pastel yellow
                    "#77dd77",
                     "#C293FF"]

      for(let i = 0; i < this.compositionRatios.length; i++)
      {
        this.compositionRatios[i] = String(Math.floor(((this.clusterList[i].length / 50) * 100)));
        this.styleStrings[i] = "width: " + this.compositionRatios[i] + "%; " + ("background: " + colorMap[i] + ";");
      }

       this.dataHasLoaded = true;


      
      window.history.replaceState({}, document.title, "/");
      
  },
  beforeMount()
  {
     
      // document.getElementById('app').style = "background: linear-gradient(to left, #eac9a3, #d6ae7b) !important;"
      
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
.img-container {
  transition: all 0.25s;
  transform-origin: 50% 50%;
  perspective: 500px;
}
/* .img-container:hover {
  transform: translateZ(25px);
} */
.img-container img {
  border: 5px white solid;
  border-radius: 5px; 
  height: auto;
  width: 50%;
  box-shadow: 0 2px 4px rgba(234, 225, 225, 0.4);
  transition: transform 250ms;
}
.img-container img:not(:hover) {
  transform: rotateY(0deg) rotateX(0deg) !important;
  box-shadow: 0 2px 4px rgba(34, 25, 25, 0.4) !important;
}


body {
  background: linear-gradient(to left, #eacda3, #d6ae7b) !important;
  background-color: #e8c7c8  
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



