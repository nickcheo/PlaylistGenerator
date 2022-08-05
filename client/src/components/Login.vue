
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
  
  
  
      <div class="hero">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-20 text-center">
              <h2 class="display-1"><strong>Hello there{{username}}</strong></h2>
                <p class="lead">Variefy analyzes data of your top songs and performs calculations to recommend you fresh songs.</p>
                <br>
                <!-- <div id = 'spin-box'>
                </div> 
                <div id = 'check-box'></div> -->
                
                <button  class="btn btn-dark rounded-pill"
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

  
<!--Grid row-->
  


</body>
</template>


<script>
  import { onBeforeMount } from 'vue';
import router from '../router';
import Api from '../services/Api';

  export default {
    name: 'Login',
    data () {
      return {
        access_token: 'temp',
        refresh_token: 'temp',
        username: getCookie('username') ? (', ' + getCookie('username'))  : ''
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
      goToClusters: async () => {

          console.log('going to clusters')
          router.replace({path : '/clusters'});
      }
    },
    async mounted(){
      /* eslint-disable */
      const tokens = await this.getAccessToken()
      this.access_token = tokens[0];
      this.refresh_token = tokens[1];

      console.log('token on mount ' + this.access_token)

      if(this.access_token)
      {

        const usernameResult = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + this.access_token,
					   'Content-Type' : 'application/json'}
        });

	      const usernameData  = await (usernameResult.json());
        // console.log("username ")
        // console.log(username);
        if(!getCookie("username"))
          setCookie("username", usernameData['display_name']);
        this.username = ", " + getCookie('username');
        // console.log(this.username)



      }
      
      window.history.replaceState({}, document.title, "/");
      
  },
  beforeMount()
      {
        document.getElementById('app').style = "background: linear-gradient(to left, #e0eafc, #cfdef3) !important;"
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
a, button {
  color: white;
}

/* body {
    background: linear-gradient(to left, #e0eafc, #cfdef3) !important;
 
} */
</style>
<style>
      .my-custom-row {
        background-color:beige;
        height: 400px;
      }
      .hero {
        /* background: white; */
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



