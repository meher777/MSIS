const RefereeApp = {
  data() {
    return {
      referees: [],
      refereeForm: {},
      selectedReferee: null
    }
  },
  computed: {},
  methods: {
      fetchRefereeData() {
        fetch('/api/referee/index.php')
        .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.referees = responseJson;
              console.log(this.referees)
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      selectReferee(r) {
        if (r == this.selectedReferee) {
            return;
        }
        this.selectedReferee = r;
        this.referees = [];
        this.fetchRefereeData(this.selectedReferee);
    },
      postNewReferee(evt) {     
        console.log("Creating:", this.refereeForm);

        fetch('api/referee/create.php', {
            method:'POST',
            body: JSON.stringify(this.refereeForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.referees = json;
            
            // reset the form
            this.refereeForm = {};
          }).catch( err => {
            alert("Oops, we have an error. Can you try again with correct values.");
          });
      },
      postReferee(evt){

        if(this.selectedReferee){
          this.postEditReferee(evt);
        }
        else{
          this.postNewReferee(evt);
        }
      },
      postEditReferee(evt){
        this.refereeForm.id = this.selectedReferee.id;              
        console.log("Editing:", this.refereeForm);
        // alert("Posting!");

        fetch('api/referee/update.php', {
            method:'POST',
            body: JSON.stringify(this.refereeForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.referees = json;
            
            // reset the form
            this.handleResetEdit();
            this.handleResetEdit = {};
          })
          .catch( err => {
            alert("Oops, we have an error. Can you try again with correct values.");
          });
      },
     /* postDeleteReferee(o) {  
        if ( !confirm("Are you sure you want to delete the Referee?") ) {
            return;
        }  
        
        console.log("Delete!", o);

        fetch('api/referee/delete.php', {
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
            this.referees = json;
            
            // reset the form
            this.handleResetEdit();
          });
      },*/
      handleEditReferee(referee) {
        this.selectedReferee = referee;
        this.refereeForm = Object.assign({}, this.selectedReferee);
      },
      handleResetEdit() {
          this.selectedReferee = null;
          this.refereeForm = {};
      }
  },
  created() {
      this.fetchRefereeData();
  }

}

Vue.createApp(RefereeApp).mount('#refereeTable');

// Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c