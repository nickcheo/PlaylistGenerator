
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
  
    <nav class="navbar navbar-light bg-light">
      
      <div class="container-fluid">
        <button class="navbar-toggler ms-auto" type="button" data-mdb-toggle="collapse"
          data-mdb-target="#navbarToggleExternalContent3" aria-controls="navbarToggleExternalContent3"
          aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>
      </div>

          <div class="collapse" id="navbarToggleExternalContent3">
            <div class="bg-light shadow-3 p-4">
              <button class="btn btn-link btn-block border-bottom m-0">Link 1</button>
              <button class="btn btn-link btn-block border-bottom m-0">Link 2</button>
              <button class="btn btn-link btn-block m-0">Link 3</button>
            </div>
          </div>
    </nav>
    
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

    <div class="hero">
      <div class="container-fluid">
          <div class="row">
                    <div class="col-lg-20 offset-1" style = "text-align: left;">
                      <h1 class="display-4" align = 'left'><strong>We think you like this{{username}}.</strong></h1>     
                        <p class="lead"><strong>Here's a breakdown your music taste according to our algorithms:</strong></p>
                    </div>
          </div>
      </div>
    </div>

  <div class="container">
          <div class="row">
              <div class="col-md-12" style = "text-align: left;">
                  <h3 class="progress-title">Music like {{this.clusterList[0][0]}} and <br/> {{this.clusterList[0][1]}}</h3>
                    <div class="progress" style="height: 60px; width:75%">
                        <div class="progress-bar" role="progressbar" :style="this.styleStrings[0]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                              <div class="progress-value">{{this.compositionRatios[0]}}%</div>
                        </div>
                    </div>
              </div>
          </div>
         <br>
          <div class="row">
              <div class="col-md-12" style = "text-align: left;">
                    <h3 class="progress-title">Music like {{this.clusterList[1][0]}} and <br/> {{this.clusterList[1][1]}}</h3>
                    <div class="progress" style="height: 60px; width:75%">                    
                        <div class="progress-bar" role="progressbar" :style="this.styleStrings[1]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-value">{{this.compositionRatios[1]}}%</div>
                        </div>
                    </div>
              </div>
          </div>
    <br/>
          <div class="row">
                <div class="col-md-12" style = "text-align: left;">
                    <h3 class="progress-title">Music like {{this.clusterList[2][0]}} and <br/> {{this.clusterList[2][1]}}</h3>
                    <div class="progress" style="height: 60px; width:75%">
                        <div class="progress-bar" role="progressbar" :style="this.styleStrings[2]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-value">{{this.compositionRatios[2]}}%</div>
                        </div>
                    </div>
                </div>
          </div>
    <br>
          <div class="row">
                    <div class="col-md-12" style = "text-align: left;">
                        <h3 class="progress-title">Music like {{this.clusterList[3][0]}} and <br/> {{this.clusterList[3][1]}}</h3>
                        <div class="progress" style="height: 60px; width:75%">
                            <div class="progress-bar" role="progressbar" :style="this.styleStrings[3]" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-value">{{this.compositionRatios[3]}}%</div>
                            </div>
                        </div>
                    </div>
          </div>
            <div class="row">
              <div class="col-md-12">
              <img :src="this.clusterImage[this.ID[0]]"/>
              </div>
          </div>
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
        ID: Array(50)
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

      const clusterGroups = await clusterResponse.data.clusterGroups;
      const songID = await clusterResponse.data.songIdList;
      const songImage = await clusterResponse.data.idAndImage;

      console.log(songID);

      try
      {
        this.clusterList = clusterGroups;
      }
      catch (error)
      {
        console.log(error);
      }

      this.clusterImage = songImage;
      this.ID = songID;

      const colorMap = ["#6CC9CF", "#EA8FCB","#F2E991", "#C293FF"]

      for(let i = 0; i < this.compositionRatios.length; i++)
      {
        this.compositionRatios[i] = String(Math.floor(((this.clusterList[i].length / 50) * 100)));
        this.styleStrings[i] = "width: " + this.compositionRatios[i] + "%; " + ("background: " + colorMap[i] + ";");
      }

       this.dataHasLoaded = true;


      
      window.history.replaceState({}, document.title, "/");
      
  },

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
button {
  color: #42b983;
}
</style>
<style>
      .my-custom-row {
        background-color:beige;
        height: 400px;
      }
      .hero {
        background: white;
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
        background: white;
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



