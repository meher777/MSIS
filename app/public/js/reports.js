const reportsApp = {
    data() {
      return {
        games: [],
        referees : [],
        gamesForm: {},
        gameReportsForm : {},
            
      
      }
    },
    computed: {},
    methods: {
        listFutureGames(evt){

            fetch('api/report/listFutureGames.php', {
                method:'POST',
                body: JSON.stringify(this.gamesForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
                
              
              })
              .catch( err => {
                alert("Something went wrong.");
              });
          },
          fetchRefereeData() {
            fetch('/api/referee/')
            .then( response => response.json() )
              .then( (responseJson) => {
                  console.log(responseJson);
                  this.referees = responseJson;
              })
              .catch( err => {
                alert("Oops, we have an error. Can you try again with correct values.");
              });
          },
          listGamesDateRange(evt){
            
            alert(this.gameReportsForm.referee_name)
            alert(this.gameReportsForm.start_date)
             fetch('api/report/listGamesDateRange.php', {
                method:'POST',
                body: JSON.stringify(this.gameReportsForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
                
              
              })
              .catch( err => {
                alert("Oops, we have an error. Can you try again with correct values.");
              });
          }, 

    },
    created() {
        this.fetchRefereeData(); 
    }
   
  
  }
  
  Vue.createApp(reportsApp).mount('#reportsTable');
  
  // Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c