<template>
<div class = "">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Variefy - a playlist generator for daring music listeners </title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous"/>
    </head>

  


<div class="hero">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-20 text-center">
              <h2 class="display-1"><strong>Variefy</strong></h2>
                <p class="lead">A playlist generator for daring music listeners.</p>
                <br>
                <!-- <div id = 'spin-box'>
                </div> 
                <div id = 'check-box'></div> -->
                
                <!-- <button  class="btn btn-dark rounded-pill"
                  @click = "goToClusters">
                  Find me fresh music
                <img src="../assets/rightarrow.png" id="icon"/>
                </button> -->
                <button  class="loginbutton"
                  @click = "getSpotifyLogin">
                   <img src="spotifylogo.png">
                  Connect with Spotify
                </button>
                

               

          
                <!-- <button type:"button" class="btn btn-primary">Connect with Spotify</button> -->
                  <!--Button-->
            </div>
          </div>
        </div>
      </div>
  </div>

<!--Grid row-->
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getSpotifyLogin: async () => {
      /* eslint-disable */
      const querystring = require('querystring')
      const scope = 'user-read-private user-read-email user-library-read user-top-read';
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
        const redir = 'http://localhost:8080/next'
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
  mounted() {
      /* eslint-disable */
      // directs to /next route in router after access token is registered
      // enough information to either query songs or refresh the access token upon login
      if((getCookie("access_token") != "" && getCookie("access_token") != "undefined")|| (getCookie("refresh_token") != "" && getCookie("refresh_token") != "undefined" )) {
        console.log(getCookie("access_token"))
        this.$router.replace("next")
      }
  }
    
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



