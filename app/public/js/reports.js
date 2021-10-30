const reportsApp = {
    data() {
      return {
        referees: [],
        reportsRefereeForm: {},
        
      
      }
    },
    computed: {},
    methods: {
        listFutureGames(){
            const current = new Date();
            
            // alert("Posting!");
    
            fetch('api/report/listFutureGames.php', {
                method:'POST',
                body: JSON.stringify(this.current),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                
              
              })
              .catch( err => {
                alert("Something went wrong.");
              });
          },
          listGamesDateRange(evt){
           
            
            // alert("Posting!");
    
            fetch('api/report/listGamesDateRange.php', {
                method:'POST',
                body: JSON.stringify(this.reportsRefereeForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                
              
              })
              .catch( err => {
                alert("Something went wrong.");
              });
          },

    },
    created() {
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(reportsApp).mount('#reportsTable');
  
  // Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c