const app = {
    data() {
      return {
        games:[],
        refs:[],
        gameForm:{}
      }
    },
    computed: {},
    methods: {
        fetchOfferData(r) {
            console.log("Fetching game data for ", r);
            fetch('/api/game/?ref=' + r.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postNewGame(evt) {
          this.gameForm.gameID = this.selectedGame.id;        
          console.log("Posting:", this.gameForm);
          // alert("Posting!");
  
          fetch('api/game/create.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              
              // reset the form
              this.gameForm = {};
            });
        }
    },
    created() {
        this.fetchGameData();
    }
  }
  
  Vue.createApp(app).mount('#results');
  
  // Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c