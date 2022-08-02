<template>
  <div class="hello">
    <h2>WORK PLEASE</h2>
    <h3>{{token}}</h3>
    <button @click = "alert()">DO IT</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      token: 'temp'
    }
  },
  methods:
  {
    /* eslint-disable */
    getAccessToken: async () => {
      
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

      console.log('at: '+ access_token)


        return access_token;
    }
  },
   beforeMount(){
    token = this.getAccessToken()
 },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
a {
  color: #42b983;
}
</style>
