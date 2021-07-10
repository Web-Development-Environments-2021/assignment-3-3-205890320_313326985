<template>
 <div>
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#/UnionAgent/leagueManage">Matches list</a></li>
            <li class="breadcrumb-item active" aria-current="page">Add match</li>
        </ol>
    </nav>
    <b-card bg-variant="light">
        <b-form-group
            label-cols-lg="3"
            label="Add New Match"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
        >
        <b-form-group
            label="Local Team Name:"
            label-cols-sm="3"
            label-align-sm="right"
        >
           <b-form-select
                v-model="selectedLocal"
                :options="teamNames"
                class="mb-3"
                disabled-field="notEnabled"
                :state="stateLocal"
            ></b-form-select>
            <b-form-invalid-feedback :state="stateLocal">Please select team</b-form-invalid-feedback>
            <b-form-valid-feedback :state="stateLocal">ok</b-form-valid-feedback>
        </b-form-group>

        <b-form-group
            label="Visitor Team Name:"
            label-cols-sm="3"
            label-align-sm="right"
        >
           <b-form-select
                v-model="selectedVisitor"
                :options="teamNames"
                class="mb-3"
                disabled-field="notEnabled"
                :state="stateVisitor"
            ></b-form-select>
            <b-form-invalid-feedback :state="stateVisitor">Please select team</b-form-invalid-feedback>
            <b-form-valid-feedback :state="stateVisitor">ok</b-form-valid-feedback>
        </b-form-group>


        <b-form-group
            label="Venue Name:"
            label-cols-sm="3"
            label-align-sm="right"
        >
           <b-form-select
                v-model="selectedVenue"
                :options="venueNames"
                class="mb-3"
                disabled-field="notEnabled"
                :state="stateVenue"
            ></b-form-select>
            <b-form-invalid-feedback :state="stateVenue">Please select venue</b-form-invalid-feedback>
            <b-form-valid-feedback :state="stateVenue">ok</b-form-valid-feedback>
        </b-form-group>


        <b-form-group
            label="Referee:"
            label-cols-sm="3"
            label-align-sm="right"

        >

            <b-form-radio-group v-model="selectedReferee" :options="referees" :state="stateReferee" name="radio-validation">
              <b-form-invalid-feedback :state="stateReferee">Please select one referee</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateReferee">ok</b-form-valid-feedback>
            </b-form-radio-group>

        </b-form-group>

        <b-form-group
            label="Date:"
            label-cols-sm="3"
            label-align-sm="right"

        >

            <b-form-datepicker v-model="selectedDate" :min="min" :max="max" locale="en" :state="stateDate"></b-form-datepicker>
            <b-form-invalid-feedback :state="stateDate">Please select date</b-form-invalid-feedback>
            <b-form-valid-feedback :state="stateDate">ok</b-form-valid-feedback>

        </b-form-group>

        <b-form-group
            label="Time:"
            label-cols-sm="3"
            label-align-sm="right"

        >
            <b-form-timepicker v-model="selectedTime" locale="en" :state="stateTime"></b-form-timepicker>
            <b-form-invalid-feedback :state="stateTime">Please select time</b-form-invalid-feedback>
            <b-form-valid-feedback :state="stateTime">ok</b-form-valid-feedback>

        </b-form-group>

        <b-row>
            <b-col>
                <b-button size="lg" :to="{name: 'leagueManage'}" ><b-icon icon="arrow-left-circle" aria-hidden="true"></b-icon> Back</b-button>
            </b-col>
            <b-col>
                <b-button  class="float-right" variant="primary" squared size="lg" :disabled="disableAddButton()" @click="insertTableMatch" >Add match</b-button>
            </b-col>
        
        </b-row>
        </b-form-group>


    </b-card>
  </div>
</template>

<script>
export default {
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        // 15th two months prior
        const minDate = new Date(today)
        minDate.setMonth(minDate.getMonth())
        minDate.setDate(minDate.getDate())
        // 15th in two months
        const maxDate = new Date(today)
        maxDate.setMonth(maxDate.getMonth() + 12)
        maxDate.setDate(maxDate.getDate())

      return {
        matchInsert: '',
        selectedLocal: null,
        selectedVisitor: null,
        selectedVenue: null,
        selectedReferee: null,
        selectedDate: '',
        selectedTime: '',
        min: minDate,
        max: maxDate,
        teamNames: [],
        venueNames: [],
        referees: [],
        


      }
    },
methods: {
    async updateValues(){
        console.log("response");
        try {
            this.axios.defaults.withCredentials = true;
            const response = await this.axios.get(
                "http://localhost:3000/UnionAgent/addMatch"
            );
            this.axios.defaults.withCredentials = false;
            const values = response.data
            const teamNames = [];
            const venueNames = [];
            const referees = [];

            this.teamNames = [];
            this.venueNames = [];
            this.referees = [];

            console.log(values);
            teamNames.push(...values["teams"]);
            for(var i=0 ; i<teamNames.length;i++){
                this.teamNames.push(teamNames[i]["name"])
            }
            venueNames.push(...values["venues"]);
            for(var i=0 ; i<venueNames.length;i++){
                this.venueNames.push(venueNames[i]["name"])
            }
            referees.push(...values["referees"]);
            for(var i=0 ; i<referees.length;i++){
                this.referees.push({text: referees[i]["firstname"] + ' ' + referees[i]["lastname"] + ' - ' + referees[i]["course"] + ' Referee', value: referees[i]["referee_id"]})
            }

        } catch (error) {
          console.log("error in update matches")
          console.log(error);
        }
    },
    disableAddButton(){
        return !Boolean(this.selectedReferee && this.selectedDate && this.selectedTime && this.selectedLocal && this.selectedVisitor && this.selectedVenue)

    },
    async insertTableMatch(){
        console.log("response");
        try {
            this.axios.defaults.withCredentials = true;
            const response = await this.axios.post(
                "http://localhost:3000/UnionAgent/addMatch", {match_id: '', date_time: this.selectedDate + ' ' + this.selectedTime, local_team_id: '', local_team_name: this.selectedLocal, visitor_team_id: '', visitor_team_name: this.selectedVisitor, venue_id: '', venue_name: this.selectedVenue, referee_id: this.selectedReferee} 
            );
            this.axios.defaults.withCredentials = false;

            if(respone.status == 201){
                this.$root.toast("Add match", "Match Added successfully", "success");
            }

            this.matchInsert = ''
            this.$bvModal.msgBoxOk('ok', {
            title: 'Confirmation',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'success',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
            })
                .then(value => {
                  this.boxTwo = value
                })
                .catch(err => {
                  // An error occurred
                })


        } catch (error) {
            console.log("error in add matche")
            console.log(error);
            console.log(error.response);
            this.$root.toast("Add match", error.response.data, "danger");

        }
    }
},
mounted(){
    console.log("add game page mounted");
    this.updateValues();
},
computed: {
    stateReferee() {
        return Boolean(this.selectedReferee)
    },
    stateDate(){
        return Boolean(this.selectedDate)
    },
    stateTime(){
      return Boolean(this.selectedTime)
    },
    stateLocal(){
      return Boolean(this.selectedLocal)
    },
    stateVisitor(){
      return Boolean(this.selectedVisitor)
    },
    stateVenue(){
      return Boolean(this.selectedVenue)
    },
}
}
</script>

<style>

</style>