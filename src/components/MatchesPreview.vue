<template >
<div>
  <b-container fluid>
    <b-table v-if="dataReady" 
      striped
      hover
      :items="items"
      :fields="fields"
      stacked="md"
      show-empty
      small
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

      <template #cell(actions1)="row">
        <add-result-display :currentRow="row.item" :matchesResults="matchesResults" @result-updated="updated"> </add-result-display>
      </template>

      <template #cell(actions2)="row">

  

        <b-button size="sm" @click="row.toggleDetails" class="mr-1">
          {{ row.detailsShowing ? 'hide' : 'show' }} details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row>
            <b-col>

            <update-referee-display :currentRow="row.item" @referee-updated="updated"></update-referee-display>

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

          <add-event-log-display :matchesEvents="matchesEvents" :currentRow="row.item" @event-updated="updated"></add-event-log-display>

          </b-card>
          </b-col>

          </b-row>

        </b-card>
      </template>
    </b-table>

  

  </b-container>
    <div class="text-center" v-if="!dataReady">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <br>
</div>
</template>


<script>
import AddEventLogDisplay from './AddEventLogDisplay.vue';
import AddResultDisplay from './AddResultDisplay.vue';
import UpdateRefereeDisplay from './UpdateRefereeDisplay.vue';
export default {
    components: { 
      AddResultDisplay,
      UpdateRefereeDisplay,
      AddEventLogDisplay
  },
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
        {key: 'actions1', label: 'Actions' },
        {key: 'actions2', label: ' '  }
        
      ],
      fieldsEvents:[
        {key: 'date_and_time_happend', label: 'Date and Time'},
        {key: 'minute', label: 'Minute'},
        {key: 'type', label: 'Type'},
        {key: 'description', label: 'Description'},

      ],
      dataReady: false

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
      try {
        //  this.dataReady = false;
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/UnionAgent", {params:{sort: "none"}}
        );
        this.axios.defaults.withCredentials = false;
        const matches = response.data
        this.items = [];
        console.log(matches);
        this.items.push(...matches);
        // console.log(this.matches);
        this.dataReady = true;
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },
    updated(e){
      console.log(e);
      console.log(this.items);
      for(var i=0 ; i<this.items.length; i++){
        if(this.items[i].match_id == e.match_id){
          this.items[i] = e;
        }
      }
      console.log(this.items);
    },
  },
  mounted(){
    this.updateMatches();
    console.log("matches preview mounted");
  },


};
</script>

<style lang="scss" scoped
>


</style>
