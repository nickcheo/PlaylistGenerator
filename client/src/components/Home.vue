<template>

<body>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Bootstrap demo</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
      <!-- Option 1: Include in HTML -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    </head>
  
<Header></Header>


 <div id="login-container">
      <!-- <div class="row main-row justify-content-between align-items-center" v-if="dataHasLoaded">
        <div class="col-sm">
            <img :src="this.topURLImages[0]" alt="bg image" class="album-covers" id="first-img"/>
        </div>
        <div class="col-sm">
            <img :src="this.topURLImages[1]" alt="bg image" class="album-covers" id="second-img"/>
        </div>
        <div class="col-sm">
            <img :src="this.topURLImages[2]" alt="bg image" class="album-covers" id="third-img"/>
        </div>
      </div> -->

      <div class="row main-row align-items-center">
        <div class="container">
              <!-- id="App" :style="{'background-image': `url(${require(image)})`, width: '100px', height: '100px'}"> -->
              <!-- :style="{'background-image': `url(${require(image)})`, width: '100px', height: '100px',}"> -->
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-20 text-center">
                      <h2 id="display1"><strong >Variefy</strong></h2>
                        <p class="lead">A playlist generator for daring music listeners</p>
                        <br>
                        <!-- <div id = 'spin-box'>
                        </div> 
                        <div id = 'check-box'></div> -->
                        
                        <button  class="btn" @click = "getSpotifyLogin" style = 'color: white !important'>
                  Connect with Spotify
                  <img src="../assets/Spotify_Icon_RGB_White.png" id="icon"/>
                </button>

                      

                        
                        <!-- <button type:"button" class="btn btn-primary">Connect with Spotify</button> -->
                          <!--Button-->
                    </div>
                  </div>
                </div>
            </div>
      </div>


      <!-- <div class="row main-row justify-content-between align-items-center" v-if="dataHasLoaded">
        <div class="col-sm">
            <img :src="this.topURLImages[3]" alt="bg image" class="album-covers" id="fourth-img"/>
        </div>
        <div class="col-sm">
            <img :src="this.topURLImages[4]" alt="bg image" class="album-covers" id="fifth-img"/>
        </div>
        <div class="col-sm">
            <img :src="this.topURLImages[5]" alt="bg image" class="album-covers" id="sixth-img"/>
        </div>
      </div> -->
    </div>
    </body>


<!--Grid row-->
</template>

<script>

import router from '../router';
import Api from '../services/Api';
import Header from './Header.vue';


export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      access_token: "",
      dataHasLoaded: false,
      topURLImages: [],
      profileStyle: "",
    }
  },
  components: {Header},
  methods: {
    goAbout: function() {
      router.replace('/about');
    },
    getSpotifyLogin: async () => {
      /* eslint-disable */
      const querystring = require('querystring')
      const scope = 'user-read-private user-top-read playlist-modify-public';
      console.log('login func heree')

      function generateRandomString(n)
    {  
      var str = ""
      for(let i = 0; i < n; i++)
        str += String(Math.floor(Math.random() * 10));

      return str;
    }   
      const state = generateRandomString(16);
      try {
        // let response = await fetch('http://localhost:2000/login')

        const clientId="a1c0d6debc2c49038fb8a43eb5df637a"
        const clientSecret="76669d3b28f94e8da7662d91cc39cc94"
        const redir = (process.env.NODE_ENV != 'development' ? "https://variefy.herokuapp.com/" : 'http://localhost:8080/') + 'next'
        console.log(redir)

        
        
       var authUrl = 'https://accounts.spotify.com/authorize?' +
		    querystring.stringify({
		    response_type: 'code',
		    client_id: clientId,
		    scope: scope,
		    redirect_uri: redir,
		    state: state
      })
        console.log('response here hopefully')
        window.location.href = authUrl
        console.log('redirect maybe???')

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code"); 
        console.log("this should be the code " + code)
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
      /* eslint-disable */
      // directs to /next route in router after access token is registered
      // enough information to either query songs or refresh the access token upon login

      if(getCookie('access_token') === 'undefined')
        console.log('undefined AT');

      if((getCookie("access_token") != "" && getCookie("access_token") != "undefined")|| (getCookie("refresh_token") != "" && getCookie("refresh_token") != "undefined" )) {
        console.log(getCookie("access_token"))
        this.$router.replace("next")
      } else {
          
         const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
          const client_secret="76669d3b28f94e8da7662d91cc39cc94"
          const querystring = require('querystring')
          
          const tokenBaseUrl = 'https://accounts.spotify.com/api/token';
        
          const result = await fetch(tokenBaseUrl, {
          method: 'POST',
          headers: {
            'Content-Type' : "application/x-www-form-urlencoded",
            'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
          },
          body: querystring.stringify({
            grant_type: "client_credentials"
            })
          });


          const data = await result.json();
          console.log('data for inital tokens')
          console.log(data);
          this.access_token = data.access_token;

          try {
            const topResponse = await Api().post('/gettopartists', {token: this.access_token})
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

// async function getSpotifyLogin () {
//   try {
//     let response = await fetch('http://localhost:2000/login')
//     let token = await response.json()
//     console.log(JSON.stringify(token))
//   } catch (error) {
//     console.log(error)
//   }
// }

</script>
<!-- TODO: uncomment and get bootstrap back -->
 <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

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
a {
  color: #42b983;
} 

#login-container {
  height: 100%;
  color: white;
}
.main-row {
  height: 33%;
}

#display1 {
  font-size: 5rem;
  line-height: 1.2;
}


.album-covers {
  border: 5px white solid;
  border-radius: 15px; 
  transition: box-shadow 0.3s ease-in-out;
  transition: opacity 500ms;
  transition: width 250ms ease-in-out, height 250ms ease-in-out;
  animation: float 6s ease infinite;
  overflow: hidden;


}

.album-covers:hover{
    box-shadow: 0px 6px 8px rgba(34, 25, 25, 0.4);
    height: 275px;
    width: 275px;
} 

.album-covers:not(:hover){
    box-shadow: -2px 4px 4px rgba(34, 25, 25, 0.4);
    height: 250px;
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

.nav-link {
  color: white !important;
}

.nav-link:hover {
  color: white !important;
  text-shadow: -1px 1px 8px white;
}

body {
        overflow-y: auto;
      }

</style>
<style>

#smallButton {
  background-color: #1DB954;
}
      .my-custom-row {
        background-color:beige;
        height: 400px;
      }
    </style>

    <style>

    body {
      color: white
        }
      .hero {
        /* background: white; */
        width: 100%;
        height: 70vh;
        display: flex;
        align-items: center;
      }

      #icon {
        border-radius: 100%;
        width: 25px;
        height: auto;
      }
      .loginbutton{
      font-size: 20px;
      border-radius: 12px; 
      color: gradient rgb (#ee7752, #e73c7e, #23a6d5, #23d5ab);  
      box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.2);
      background: #1DB954;
      border: none; 
      transition: all 0.2s ease-in-out;
      padding: 5px 10px;
      }
      .loginbutton2 {
        font-size: 0px;
      border-radius: 100%; 
      color: gradient rgb (#ee7752, #e73c7e, #23a6d5, #23d5ab);  
      box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.2);
      background: transparent;
      border: none; 
      transition: all 0.2s ease-in-out;
      padding: 0px 0px;
      
      }
      .loginbutton:link,
.loginbutton:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 15px 40px;
    display: inline-block;
    border-radius: 100px;
    transition: all .2s;
    position: absolute;
}
      .loginbutton:hover{ 
        transform: translateY(-3px);
        box-shadow: -4px 20px 30px rgba(2, 2, 2, 0.2); 

        }
      .loginbutton:after{
         content: "";
         display: inline-block;
         height: 100%;
         width: 100%;
         border-radius: 100px;
         position: absolute;
         top: 0;
         left: 0; 
         z-index: -1;
         transition: all .4s;
      }
      .loginbutton-white::after {
    background-color: #fff;
      }
      .loginbutton:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
      }
      .loginbutton-animated {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
}
@keyframes moveInBottom {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
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





