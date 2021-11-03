const assignmentApp = {
    data() {
      return {
        games: [],
        referees : [],
        gamesData : [],
        
        assignmentForm :{},
        selectedAssignment: null
      }
    },
    computed: {},
    methods: {
        fetchGameAssignmentData() {
          fetch('/api/assignments/index.php')
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
        postAssignment(evt){
  
          if(this.selectedAssignment){
            this.postEditAssignment(evt);
          }
          else{
            this.postNewAssignment(evt);
          }
        },
        postNewAssignment(evt) {             
          fetch('api/assignments/create.php', {
              method:'POST',
              body: JSON.stringify(this.assignmentForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              this.handleResetEdit();
            })
            .catch( err => {
              alert("Oops, we have an error. Can you try again with correct values.");
            });
        },

        postEditAssignment(evt){
          console.log(this.assignmentForm.game_id);
          alert(this.assignmentForm.game_id[0]);
          alert(this.assignmentForm.referee_id);
          alert(this.assignment_refereeStatus);
          fetch('api/assignments/update.php', {
              method:'POST',
              body: JSON.stringify(this.assignmentForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
                       
              // reset the form
              this.handleResetEdit();
            })
            .catch( err => {
              alert("Oops, we have an error. Can you try again with correct values.");
            });
        },
        postDeleteAssignment(g) {  
          if ( !confirm("Are you sure you want to delete the Assignment?") ) {
              return;
          }  
          fetch('api/assignments/delete.php', {
              method:'POST',
              body: JSON.stringify(g),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              this.fetchGameAssignmentData();

           }).catch( err => {
            alert("Oops, we have an error. Can you try again with correct values.");
          });;
        },
        handleEditAssignment(game) {
          this.selectedAssignment = game;
          this.assignmentForm = Object.assign({}, this.selectedAssignment);
        }, 
        handleResetEdit() {
            this.selectedAssignment = null;
            this.assignmentForm = {};
        },
        fetchRefereeData() {
            fetch('/api/referee/')
            .then( response => response.json() )
              .then( (responseJson) => {
                  console.log(responseJson);
                  this.referees = responseJson;
              })
              .catch( (err) => {
                  console.error(err);
              })
          },
          fetchGameData() {
            fetch('/api/game/index.php')
            .then( response => response.json())
              .then( (responseJson) => {
                  console.log(responseJson);
                  this.gamesData = responseJson;
                  console.log(this.games)
              })
              .catch( (err) => {
                  console.error(err);
              })
          }
    },
    created() {
        this.fetchGameAssignmentData();
        this.fetchGameData()
        this.fetchRefereeData()
    }
  
  }
  
  Vue.createApp(assignmentApp).mount('#assignmentTable');
  
  // Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c