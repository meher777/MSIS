const gameApp = {
  data() {
    return {
      games: [],
      gameForm: {},
      selectedGame: null
    }
  },
  computed: {},
  methods: {
      fetchGameData() {
        fetch('/api/game/index.php')
        .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.games = responseJson;
              console.log(this.games)
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      selectGame(g) {
        if (g == this.selectedGame) {
            return;
        }
        this.selectedGame = g;
        this.games = [];
        this.fetchGameData(this.selectedGame);
    },
      postNewGame(evt) {     
        console.log("Creating:", this.gameForm);

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
      },
      postGame(evt){

        if(this.selectedGame){
          this.postEditGame(evt);
        }
        else{
          this.postNewGame(evt);
        }
      },
      postEditGame(evt){
        this.gameForm.id = this.selectedGame.id;
        this.gameForm.id = this.selectedGame.id;        
        console.log("Editing:", this.gameForm);
        // alert("Posting!");

        fetch('api/game/update.php', {
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
            this.handleResetEdit = {};
          })
          .catch( err => {
            alert("Oops, we have an error. Can you try again with correct values.");
          });
      },
      postDeleteGame(o) {  
        if ( !confirm("Are you sure you want to delete the game?") ) {
            return;
        }  
        
        console.log("Delete!", o);

        fetch('api/game/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
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
            this.handleResetEdit();
          }).catch( err => {
            alert("Oops, we cant delete this game. Please delete the assignment for this game.");
          });;
      },
      handleEditGame(game) {
        this.selectedGame = game;
        this.gameForm = Object.assign({}, this.selectedGame);
      },
      handleResetEdit() {
          this.selectedGame = null;
          this.gameForm = {};
      }
  },
  created() {
      this.fetchGameData();
  }

}

Vue.createApp(gameApp).mount('#gameTable');

// Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c