<template >
  <b-container fluid>
    <h1>Matches</h1>
    <b-table 
      striped
      hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(match_id)="row">
        <b>{{ row.value }}</b>
      </template>

      <template #cell(date_time)="row">
        {{ row.value.slice(0,10) }} {{ row.value.slice(11,16)}}
      </template>

      <template #cell(referee)="row">
        {{ row.value[0].firstname}} {{ row.value[0].lastname}} 
      </template>

      <template #cell(actions)="row">
        <b-button @click="showAddResult=true" :disabled="disableResults(row.item.match_id)" size="sm"  class="mr-1">
          add results
         
        </b-button>
         <b-modal
            v-model="showAddResult"
            title="Add results"
            header-bg-variant="info"
            header-text-variant="light"
            hide-backdrop content-class="shadow"


          >
          <b-container fluid>
            <b-row class="mb-1 text-center">
              <b-col cols="3"></b-col>
              <b-col><b>Goals Number</b></b-col>
            </b-row>

            <b-row class="mb-1">
              <b-col cols="5">Local Team - {{row.item.local_team_name}} </b-col>
              <b-col>
                <b-form-select
                  v-model="localGoals"
                  :options="goals"
                ></b-form-select>
              </b-col>
            </b-row>

            <b-row class="mb-1">
              <b-col cols="5">Visitor Team - {{row.item.visitor_team_name}} </b-col>
              <b-col>
                <b-form-select
                  v-model="visitorGoals"
                  :options="goals"
                ></b-form-select>
              </b-col>
            </b-row>
      </b-container>

      <template #modal-footer>
          <b-button 
            @click="addResultToTable(row.item.match_id)"
            class="float-right"
          >
            Update
          </b-button>
      </template>
    </b-modal>


        <b-button size="sm" @click="row.toggleDetails" class="mr-1">
          {{ row.detailsShowing ? 'hide' : 'show' }} details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row>
            <b-col>
            <b-card 
              header="Referee details"
              class="mb-2"
              align="center"

            >
            <b-card-text>
              <b-table show-empty stacked :items="row.item.referee" :fields="fieldsReferee">
              </b-table>
            </b-card-text>

            <b-button :disabled="disableReferee(row.item.home_goals)"  @click="info(row.item, row.index, $event.target)" class="mr-1">
              update referee
            </b-button>
            </b-card>

          </b-col>
          <b-col>
          <b-card 
              header="Events details"
              class="mb-2"
              align="center"

            >
          <b-card-text>
            <b-table show-empty  
             :items="row.item.events" :fields="fieldsEvents">
            <template #cell(date_and_time_happend)="row">
              {{ row.value.slice(0,10) }} {{ row.value.slice(11,16)}}
            </template>
            <template #cell(event_id)="row">
              <b>{{ row.value }}</b>
            </template>
          
          </b-table>
          </b-card-text>
            <b-button :disabled="disableEvents(row.item.match_id, row.item.events)"  @click="info(row.item, row.index, $event.target)" class="mr-1">
              add event log 
            </b-button>
          </b-card>
          </b-col>

          </b-row>

        </b-card>
      </template>
    </b-table>
  </b-container>
</template>


<script>
export default {
  data(){
    return{
      items: [],

      fields: [
        {key: 'match_id', label: 'Id', sortable: true, sortDirection: 'desc'},
        {key: 'date_time', label: 'Date and Time', sortable: true},
        {key: 'local_team_name', label: 'Local team', sortable: true},
        {key: 'visitor_team_name', label: 'Visitor team', sortable: true},
        {key: 'venue_name', label: 'Venue'},
        {key: 'referee', label: 'Referee'},
        {key: 'home_goals', label: 'Local goals', class: 'text-center'},
        {key: 'away_goals', label: 'Visitor goals', class: 'text-center'},
        {key: 'actions', label: 'Actions' }
        
      ],
      fieldsEvents:[
        {key: 'event_id', label: 'Id'},
        {key: 'date_and_time_happend', label: 'Date and Time'},
        {key: 'minute', label: 'Minute'},
        {key: 'type', label: 'Type'},
        {key: 'description', label: 'Description'},

      ],
      fieldsReferee:[
        {key: 'firstname', label: 'First Name'},
        {key: 'lastname', label: 'Last Name'},
        {key: 'course', label: 'Course'},
      ],
      showAddResult: false,
      goals: [0,1, 2, 3, 4, 5, 6, 7, 8],
      localGoals: 0,
      visitorGoals: 0


    }
  },
  props: {
    matchesResults:{
      type: Array,
      required: true
    },
    matchesEvents:{
      type: Array,
      required: true
    }
  },
  methods: {
    async updateMatches(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/UnionAgent", {params:{sort: "none"}}
        );
        this.axios.defaults.withCredentials = false;
        const matches = response.data
        this.items = [];
        console.log(matches);
        this.items.push(...matches);
        console.log(this.matches);
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },

    disableResults(match_id){
      if(this.matchesResults.find((element) => element.match_id == match_id)){
        return false;
      }
      else{
        return true;
      }
    },
    disableEvents(match_id, event){
      if(this.matchesEvents.find((element) => element.match_id == match_id) && event.length == 0){
        return false;
      }
      else{
        return true;
      }
    },
    disableReferee(home_goals){
      return Number.isInteger(home_goals);
    },
    async addResultToTable(matchId){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.put(
          "http://localhost:3000/UnionAgent/UpdateResultsMatch", {params:{match_id:matchId, home_goals: this.localGoals, away_goals: this.visitorGoals}}
        );
        this.axios.defaults.withCredentials = false;
        this.localGoals = 0;
        this.visitorGoals = 0;
        this.showAddResult = false;


      } catch (error) {
        console.log("error in update results")
        console.log(error);
      }
    }
  },
  mounted(){
    this.updateMatches();
    console.log("matches preview mounted");
  },


};
</script>

<style>
</style>
