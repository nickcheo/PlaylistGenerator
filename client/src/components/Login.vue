
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
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" >
      
      
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
      <div class="dropdown"> <button class="btn-primary dropdown-toggle" data-toggle="dropdown" aria-pressed="false" autocomplete="off"><img id="profile-pic" :style="this.profileStyle"/></button>
             
          <!-- Dropdown Menu -->
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li class="dropdown__menu-item">
                    <div style="transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;"><a class="nav-link" href="#">Account</a></div>
                </li>
                <hr>
                <li class="dropdown__menu-item" @click="logout">
                    <div style="transform: none; opacity: 1; transform-origin: 50% 50% 0px; border-radius: 0px;"><a class="nav-link" href="#">Sign out</a></div>
                  
                </li>
            </div>
       </div>
       </li>
       </ul>
      
  </div>
  
  </div>
  
</nav>


    <div id="login-container">
      <div class="row main-row justify-content-between align-items-center" v-if="dataHasLoaded">
        <div class="col-sm">
            <img :src="this.topURLImages[0]" alt="bg image" class="album-covers" id="first-img"/>
        </div>
        <div class="col-sm">
            <img :src="this.topURLImages[1]" alt="bg image" class="album-covers" id="second-img"/>
        </div>
        <div class="col-sm">
            <img :src="this.topURLImages[2]" alt="bg image" class="album-covers" id="third-img"/>
        </div>
      </div>
      

      <div class="row main-row align-items-center">
        <div class="container">
              <!-- id="App" :style="{'background-image': `url(${require(image)})`, width: '100px', height: '100px'}"> -->
              <!-- :style="{'background-image': `url(${require(image)})`, width: '100px', height: '100px',}"> -->
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-20 text-center">
                      <h2 class="display-1"><strong >Hello there{{username}}.</strong></h2>
                        <p class="lead">Variefy analyzes data of your top songs and performs calculations to recommend you fresh songs.</p>
                        <br>
                        <!-- <div id = 'spin-box'>
                        </div> 
                        <div id = 'check-box'></div> -->
                        
                        <button  class="btn"
                          @click = "goToClusters">
                          Find me fresh music
                        <img src="../assets/rightarrow.png" id="icon"/>
                        </button>
                        <!-- <button type:"button" class="btn btn-primary">Connect with Spotify</button> -->
                          <!--Button-->
                    </div>
                  </div>
                </div>
            </div>
      </div>

      <div class="row main-row justify-content-between align-items-center" v-if="dataHasLoaded">
        <div class="col-sm">
            <img :src="this.topURLImages[3]" alt="bg image" class="album-covers" id="fourth-img"/>
        </div>
        <div class="col-sm">
            <img :src="this.topURLImages[4]" alt="bg image" class="album-covers" id="fifth-img"/>
        </div>
        <div class="col-sm">
            <img :src="this.topURLImages[5]" alt="bg image" class="album-covers" id="sixth-img"/>
        </div>
      </div>
    </div>


  
<!--Grid row-->
  


</body>
</template>


<script>




  import Vue, { onBeforeMount, ref } from 'vue';
import router from '../router';
import Api from '../services/Api';


  export default {
    name: 'Login',
    data () {
      return {
        access_token: 'temp',
        refresh_token: 'temp',
        username: getCookie('username') != "" ? (', ' + getCookie('username'))  : '',
        dataHasLoaded: false,
        topURLImages: [],
        profileStyle: ""
        // image: "https://i.scdn.co/image/ab67616d0000b27368968350c2550e36d96344ee",
      }
    },
    // name: "App",
    // data() {
    //   return {
    //     // image: "https://i.scdn.co/image/ab67616d0000b27368968350c2550e36d96344ee",
    //   }
    // },


    methods:
    {
   
    
      getAccessToken: async () => {
        /* eslint-disable */
        if(getCookie("access_token") === "" || getCookie("refresh_token") === "" || getCookie("access_token") === undefined
          || getCookie("username") === "" || getCookie("username") == undefined) {
          const params = new URLSearchParams(document.location.search);
          const authCode = params.get('code');
          const state = params.get('state');
          const querystring = require('querystring')

          const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
        const client_secret="76669d3b28f94e8da7662d91cc39cc94"

          if(state == null)
            return null;
          
          const tokenBaseUrl = 'https://accounts.spotify.com/api/token?';
          const redir = (process.env.NODE_ENV != 'development' ? "https://variefy.herokuapp.com/#/next" : 'http://localhost:8080/next');
          console.log('redir ' + redir);
          const result = await fetch(tokenBaseUrl, {
          method: 'POST',
          headers: {
            'Content-Type' : "application/x-www-form-urlencoded",
            'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
          },
          body: querystring.stringify({
            grant_type: "authorization_code",
            code: authCode,
            redirect_uri: redir,
            })
          });

          if(process.env.NODE_ENV != 'development')
          window.href.url = "https://variefy.herokuapp.com/?code="+authCode+'&state='+state+'/#/next';


          const data = await result.json();
          console.log("AT: " + data.access_token);
          console.log("SCOPE " + data.scope);
          console.log("EXPIRES_IN: " + data.expires_in)
          console.log("REFRESH TOKEN" + data.refresh_token)

          const access_token = data.access_token;
          const refresh_token = data.refresh_token;

          setCookie("access_token", access_token, 1);
          setCookie("refresh_token", refresh_token, 24 * 365);

          console.log('at: '+ access_token);


          return [access_token, refresh_token];
        } else {
          return [getCookie("access_token"), getCookie("refresh_token")];
        }
        
      },

      logout: async() => {
        setCookie("access_token", "", 0);
        setCookie("refresh_token", "", 0);

        window.location.reload();
      },

      goToClusters: async () => {

          console.log('going to clusters')
          if(getCookie("access_token") === "")
            refreshToken();
          router.replace({path : '/clusters'});
      },
      refreshToken: async () => {
        console.log("attempting token refresh")
        if(getCookie("access_token") === "" )
        {
              const client_id=process.env.VUE_APP_CLIENT_ID
              const client_secret=process.env.VUE_APP_CLIENT_SECRET
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

      changeImage: async () => {
        console.log("attempting to change image");

      }
    },
    async mounted(){
      /* eslint-disable */

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
          await getUsername();
          
      }
      
      this.username = await (", " + getCookie('username'))

      // really make sure username is visble after first login
      try {
        await getUsername();
      }
      catch (error) 
      {console.log(error)}
      
      console.log('token on mount ' + this.access_token)      
      window.history.replaceState({}, document.title, "/");

      // getTopTrackImage(this.access_token);
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
        }, 10000);
      }
      catch (error){
        console.log('something went wrong fetching top album pics');
        console.log(error);
      }

      try {
        if(this.access_token != "" && this.access_token != "undefined")
        {
        const response = await Api().post('/getprofile', {token: this.access_token})
        const pfp = await response.data.pfp;

        this.profileStyle = "background-image: url('" + pfp + "');";
        }
      }
      catch (error) {
        console.log('something went wrong fetching profile picture');
        console.log(error);
      }


    }
}

 

  async function getTopTrackImage(token)
  {
      const topResponse = await Api().post('/gettopcovers', {token: token})
      console.log(topResponse)
      const topSongID = await topResponse.data.topTracksID
      const topURLImage = await topResponse.data.topImageToURL

      // ensure page waits for image to be loaded
      this.topSongID = await topSongID;
      this.topURLImage = await topURLImage;
  }
  
  async function getUsername()
  {
    console.log("GET USERNAME CALLED");
    if(getCookie("access_token") != "" && getCookie("access_token") != "undefined")
      {

        const usernameResult = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + getCookie("access_token"),
					   'Content-Type' : 'application/json'}
        });

	      const usernameData  = await (usernameResult.json());
        // console.log("username ")
        // console.log(username);
        if(getCookie("username") === "")
        {
          setCookie("username", usernameData['display_name'], 1);
        }
          
        
      }
  }

  function shuffle(array) {
    let new_array = array.slice()
    let currentIndex = new_array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [new_array[currentIndex], new_array[randomIndex]] = [
        new_array[randomIndex], new_array[currentIndex]];
    }

    return new_array;
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
              const client_id=process.env.VUE_APP_CLIENT_ID
              const client_secret=process.env.VUE_APP_CLIENT_SECRET
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

#login-container {
  height: 100%;
}

.main-row {
  height: 33%;
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

#second-img {
  animation-delay: -1s;
}

#third-img {
  animation-delay: -2s;
}

#fourth-img {
  animation-delay: -3s;
}

#fifth-img {
  animation-delay: -4s;
}

#sixth-img {
  animation-delay: -5s;
}
</style>
<style>
      
      .my-custom-row {
        background-color:beige;
        height: 400px;
      }
      .hero {
        background-image: v-bind(background-image);
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

      .myDiv {
        height:100px;
      }
    </style>



