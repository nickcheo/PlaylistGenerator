<template>

    <nav class="navbar navbar-expand-lg navbar-light jumbotron orange-moon">
	<div class="container-fluid">
		<a class="navbar-brand forceMaven" id="HomeButton" href="/" align = 'right'>Variefy</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#content">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse justify-content-end" id="content">
			<ul class="forceMaven navbar-nav" v-if="(getCookie('access_token') === '' || getCookie('access_token') === 'undefined') ">
				
				<li class="nav-item"><a class="nav-link NB-Button" href="/">Home</a></li>
				<li class="nav-item"><a class="nav-link NB-Button" href="/about">About</a></li>
				<li class="" v-if="getCookie('access_token') != '' && getCookie('access_token') !== 'undefined'">
                    <div class="dropdown">
                        <a type = "button"><img id="profile-pic" :style="this.profileStyle"/></a>
                    </div>
                </li>
			</ul>
            <ul class="forceMaven navbar-nav" v-if="!(getCookie('access_token') === '' || getCookie('access_token') === 'undefined') ">
				
				<li class="nav-item"><a class="nav-link NB-Button" href="/">Home</a></li>
				<li class="nav-item"><a class="nav-link NB-Button" href="/about">About</a></li>
			    <li class = 'nav-item'>	
                    <a class="nav-link" @click = "logOut()">Logout</a>
                </li>
                <li class="" id = "profliePic">
                    <div class="dropdown">
                        <a type = "button"><img id="profile-pic" :style="this.profileStyle"/></a>
                    </div>
                </li>
			</ul>
		</div>
	</div>
    </nav>

</template>
<script>
import router from '../router';
import Api from '../services/Api';


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
  methods: {
    getSpotifyLogin: async () => {
      /* eslint-disable */
      const querystring = require('querystring')
      const scope = 'user-read-private user-read-email user-library-read user-top-read playlist-modify-public playlist-modify-private';
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
    },
    logOut: function () {
          setCookie('access_token', "")
          setCookie('refresh_token', "")
          router.replace('/')
      }
    ,
    getCookie: function (cname) {
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
  },
  async mounted() {
      
      try {
        if(getCookie('access_token') != "" && getCookie('access_token') != "undefined")
        {
        const response = await Api().post('/getprofile', {token: getCookie('access_token')})
        const pfp = await response.data.pfp;

        this.profileStyle = "background-image: url('" + pfp + "');";
        }
      }
      catch (error) 
      {
        console.log('something went wrong fetching profile picture');
        console.log(error);
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


function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + exhours * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

</script>
<style>


    #HomeButton {
		font-weight: 700;
		color: white;
		font-size: 32px;
	}

    .NB-Button {
		font-weight: 300;
		padding-top: 5px;
		padding-bottom: 5px;
		color: white !important;
		text-decoration: none;
		padding-left: 5px;
		padding-right: 5px;
	}

	ul li.nav-item a {
		list-style: none;
		position: relative;
		display: inline;
	}

	ul li.nav-item a {
		text-decoration: none;
	}

	ul li.nav-item a:after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: -2px;
		width: 0px;
		height: 2px;
		background: white;
		transition: all 0.45s;
	}

	ul li.nav-item a:hover:after {
		width: 100%;
		left: 0;
	}

	ul li.nav-item a:hover {
		text-decoration: none;
	}

	ul li.nav-item {
		margin-top: 10px;
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


</style>