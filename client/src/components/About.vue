<template>
  <body>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Bootstrap demo</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
        crossorigin="anonymous"
      />
      <!-- Option 1: Include in HTML -->
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      />
    </head>

    <Header></Header>

    <div id="login-container">
      <div
        class="row main-row justify-content-between align-items-center"
        v-if="dataHasLoaded"
      >
        <div class="col-sm">
          <img
            :src="this.topURLImages[0]"
            alt="bg image"
            class="album-covers"
            id="first-img"
          />
        </div>
        <div class="col-sm">
          <img
            :src="this.topURLImages[1]"
            alt="bg image"
            class="album-covers"
            id="second-img"
          />
        </div>
        <div class="col-sm">
          <img
            :src="this.topURLImages[2]"
            alt="bg image"
            class="album-covers"
            id="third-img"
          />
        </div>
      </div>

      <div class="row main-row align-items-center">
        <div class="container">
          <!-- id="App" :style="{'background-image': `url(${require(image)})`, width: '100px', height: '100px'}"> -->
          <!-- :style="{'background-image': `url(${require(image)})`, width: '100px', height: '100px',}"> -->

          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-20 text-center">
                <h2 id="display1"><strong>About Variefy</strong></h2>
              </div>
            </div>
          </div>

          <div class="container-fluid" id="developers">
            <ul>
              <li>
                <p class="lead">
                  Variefy is an app that generates playlists on Spotify with
                  unfamiliar / fresh music that is similar to a user's current
                  music taste.
                </p>
              </li>
              <li>
                <p class="lead">
                  Using the K-Means clustering machine learning algorithm,
                  Variefy breaks down a user's top 50 songs into 4 categories
                  <br />
                  that are representative of types of songs they listen to.
                </p>
              </li>
              <li>
                <p class="lead">
                  A user chooses to generate a playlist based off one of these 4
                  categories, receiving a customized music recommendation.
                </p>
              </li>
            </ul>
          </div>

          <div class="container-fluid" id="developers">
            <hr />
            <h2>Our Team</h2>
            <div class="row">
              <div class="col-sm-4 text-center align-middle">
                <img
                  src="../assets/adam.png"
                  class="rounded-circle about_img"
                />
                <p>
                  Adam Kelch<br />
                  <a href="https://linkedin.com/in/adam-kelch"
                    ><i class="bi bi-linkedin"></i
                  ></a>
                  <a href="https://github.com/akelch11"
                    ><i class="bi bi-github"></i
                  ></a>
                </p>
              </div>
              <div class="col-sm-4 text-center align-middle">
                <img
                  src="../assets/yash.png"
                  class="rounded-circle about_img"
                />
                <p>
                  Yash Patel<br />
                  <a href="https://linkedin.com/in/yash-patel-0389921a2"
                    ><i class="bi bi-linkedin"></i
                  ></a>
                  <a href="https://github.com/yashpatel21"
                    ><i class="bi bi-github"></i
                  ></a>
                </p>
              </div>
              <div class="col-sm-4 text-center align-middle">
                <img
                  src="../assets/nick.png"
                  class="rounded-circle about_img"
                />
                <p>
                  Nicholas Cheong<br />
                  <a href="https://linkedin.com/in/nickcheo"
                    ><i class="bi bi-linkedin"></i
                  ></a>
                  <a href="https://github.com/nickcheo"
                    ><i class="bi bi-github"></i
                  ></a>
                </p>
              </div>
            </div>
          </div>

          <div class="container-fluid" id="developers">
            <hr />
            <h2>Github Repo</h2>
            <p class="lead">
              Want to see how we built Variefy? Check it out here!
            </p>
            <br />
            <a
              href="https://github.com/nickcheo/PlaylistGenerator"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
                style="color: white;"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </a>
          </div>

          <div class="container-fluid" id="developers">
            <hr />
            <ul>
              <li>
                <p class="lead">
                  Variefy uses the Spotify API to retrieve metadata including
                  user song data and audio feature data, and to generate
                  recommendations.
                </p>
              </li>
              <br />
              <li>
                <p class="lead">
                  Variefy is not affiliated with Spotify or its partners in any
                  way.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container-fluid" id="developers">
		<h2>Our Team </h2>
		<div class="row">
			<div class = "col-sm-3 text-center align-middle">
				<img src = "/static/photos/rajiv.png"  class="rounded-circle about_img">
				<p>Yash Patel<br>rswamy@princeton.edu</p>				
			</div>
			<div class = "col-sm-3 text-center align-middle">
				<img src = "../assets/adam.png"   class="rounded-circle about_img">
				<p>Adam Kelch<br><a href = 'https://linkedin.com/in/adam-kelch'><i class="bi bi-linkedin"></i></a></p>
			</div>
			<div class = "col-sm-3 text-center align-middle">
				<img src = "/static/photos/ameya.png"  class="rounded-circle about_img">
				<p>Nicholas Cheong<br>avaidya@princeton.edu</p>
			</div>
			<div class = "col-sm-3 text-center align-middle">
				<img src = "/static/photos/jeremy.png" class="rounded-circle about_img">
				<p>Rahul Nalam<br>jdapaah@princeton.edu</p>
			</div>
		</div>
	</div> -->

    <div
      class="row main-row justify-content-between align-items-center"
      v-if="dataHasLoaded"
    ></div>
  </body>

  <!--Grid row-->
</template>

<script>
import router from "../router";
import Api from "../services/Api";
import Header from "./Header.vue";

export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      access_token: "",
      dataHasLoaded: false,
      topURLImages: []
    };
  },
  components: {
    Header
  },
  methods: {
    getSpotifyLogin: async () => {
      /* eslint-disable */
      const querystring = require("querystring");
      const scope =
        "user-read-private user-library-read user-top-read playlist-modify-public playlist-modify-private";
      console.log("login func heree");

      function generateRandomString(n) {
        var str = "";
        for (let i = 0; i < n; i++)
          str += String(Math.floor(Math.random() * 10));

        return str;
      }
      const state = generateRandomString(16);
      try {
        // let response = await fetch('http://localhost:2000/login')

        const clientId = "a1c0d6debc2c49038fb8a43eb5df637a";
        const clientSecret = "76669d3b28f94e8da7662d91cc39cc94";
        const redir =
          (process.env.NODE_ENV != "development"
            ? "https://variefy.herokuapp.com/"
            : "http://localhost:8080/") + "next";
        console.log(redir);

        var authUrl =
          "https://accounts.spotify.com/authorize?" +
          querystring.stringify({
            response_type: "code",
            client_id: clientId,
            scope: scope,
            redirect_uri: redir,
            state: state
          });
        console.log("response here hopefully");
        window.location.href = authUrl;
        console.log("redirect maybe???");

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        console.log("this should be the code " + code);
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    /* eslint-disable */
    // directs to /next route in router after access token is registered
    // enough information to either query songs or refresh the access token upon login
    //   if(getCookie('access_token') === 'undefined')
    //     console.log('undefined AT');
    //   if((getCookie("access_token") != "" && getCookie("access_token") != "undefined")|| (getCookie("refresh_token") != "" && getCookie("refresh_token") != "undefined" )) {
    //     console.log(getCookie("access_token"))
    //     this.$router.replace("next")
    //   } else {
    //      const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
    //       const client_secret="76669d3b28f94e8da7662d91cc39cc94"
    //       const querystring = require('querystring')
    //       const tokenBaseUrl = 'https://accounts.spotify.com/api/token';
    //       const result = await fetch(tokenBaseUrl, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type' : "application/x-www-form-urlencoded",
    //         'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
    //       },
    //       body: querystring.stringify({
    //         grant_type: "client_credentials"
    //         })
    //       });
    //       const data = await result.json();
    //       console.log('data for inital tokens')
    //       console.log(data);
    //       this.access_token = data.access_token;
    //       try {
    //         const topResponse = await Api().post('/gettopartists', {token: this.access_token})
    //         console.log(topResponse)
    //         // const topSongID = await topResponse.data.topTracksID
    //         const topURLImages = await topResponse.data.ImageURLs
    //         // ensure page waits for image to be loaded
    //         // this.topSongID = await topSongID;
    //         this.topURLImages = await shuffle(topURLImages);
    //         this.dataHasLoaded = true;
    //         setInterval(() => {
    //           let currentImages = this.topURLImages.slice(0, 6);
    //           let shuffledImages = shuffle(this.topURLImages.slice(6));
    //           shuffledImages = shuffledImages.concat(currentImages);
    //           this.topURLImages = shuffledImages;
    //         }, 10000);
    //       }
    //       catch (error){
    //         console.log('something went wrong fetching top album pics');
    //         console.log(error);
    //       }
    //   }
  }
};

function shuffle(array) {
  let new_array = array.slice();
  let currentIndex = new_array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [new_array[currentIndex], new_array[randomIndex]] = [
      new_array[randomIndex],
      new_array[currentIndex]
    ];
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
body {
  overflow-y: scroll;
}

.btn {
  font-size: 20px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: -4px 20px 30px rgba(2, 2, 2, 0.2);
  transition: all 0.2s ease-in-out;
}
.btn:hover {
  border: 3.5px white solid;
}
.btn:hover + .display-1 {
  box-shadow: -2px 6px 8pxgba (59, 50, 50, r0.4);
}
h1,
h2 {
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
}

.album-covers:hover {
  box-shadow: 0px 6px 8px rgba(34, 25, 25, 0.4);
  height: 275px;
  width: 275px;
}

.album-covers:not(:hover) {
  box-shadow: -2px 4px 4px rgba(34, 25, 25, 0.4);
  height: 250px;
  width: 250px;
}

.about_img {
  height: 200px;
  border: 1px;
  border-radius: 10px;
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
</style>
<style>
#smallButton {
  background-color: #1db954;
}
.my-custom-row {
  background-color: beige;
  height: 400px;
}
</style>

<style>
body {
  color: white;
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
.loginbutton {
  font-size: 20px;
  border-radius: 12px;
  color: gradient rgb (#ee7752, #e73c7e, #23a6d5, #23d5ab);
  box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.2);
  background: #1db954;
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
  transition: all 0.2s;
  position: absolute;
}
.loginbutton:hover {
  transform: translateY(-3px);
  box-shadow: -4px 20px 30px rgba(2, 2, 2, 0.2);
}
.loginbutton:after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
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
  background-color: beige;
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
  height: 100px;
}

i.bi {
  color: white;
}
</style>
