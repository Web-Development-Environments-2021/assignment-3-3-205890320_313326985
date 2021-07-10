<template >
  <div>
    
    <b-pagination 
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3" >Current Page: {{ currentPage }}</p>

    <b-container fluid>
    <b-table 
      striped
      hover
      :items="pastLeagueMatches"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      stacked="md"
      show-empty
      small
    >
     <template #cell(match_id)="row">
        <b>{{ row.item.MatchDetails.match_id }}</b>
      </template>

      <template #cell(date_time)="row">
        {{ (row.item.MatchDetails.date_time.replace('T',' ').replace('Z',' ')).substr(0,16) }}
      </template>

      <template #cell(local_team_name)="row">
        <b>{{ row.item.MatchDetails.local_team_name }}</b>
      </template>

      <template #cell(visitor_team_name)="row">
        <b>{{ row.item.MatchDetails.visitor_team_name }}</b>
      </template>

      <template #cell(venue_name)="row">
        <b>{{ row.item.MatchDetails.venue_name }}</b>
      </template>

      <template #cell(home_goals)="row">
        <b>{{ row.item.MatchDetails.home_goals }}</b>
      </template>

      <template #cell(away_goals)="row">
        <b>{{ row.item.MatchDetails.away_goals }}</b>
      </template>

      <template #cell(actions)="row">
    <b-button size="sm" @click="row.toggleDetails" class="mr-1">
          {{ row.detailsShowing ? 'hide' : 'show' }} details
    </b-button>
      </template>
      <template #row-details="row">
        <b-card 
          header="Events details"
          class="mb-2"
          align="center"
        >
      <b-card-text>
        <b-table show-empty  
         :items="row.item.MatchEvents" :fields="fieldsEvents">
        <template #cell(date_and_time_happend)="row">
          {{ row.value.slice(0,10) }} {{ row.value.slice(11,16)}}
        </template>
      
        </b-table>
      </b-card-text>
          </b-card>
      </template>

          </b-table>
  </b-container>

  </div>
</template>

<script>
export default {
  data(){
    return{
      items: [],
      fields: [
        {key: 'match_id', label: '#MatchId'},
        {key: 'date_time', label: 'Date and Time'},
        {key: 'local_team_name', label: 'Local team'},
        {key: 'visitor_team_name', label: 'Visitor team'},
        {key: 'venue_name', label: 'Venue'},
        {key: 'home_goals', label: 'Local goals', class: 'text-center'},
        {key: 'away_goals', label: 'Visitor goals', class: 'text-center'},
        {key: 'actions', label: 'Actions' }        
      ],
      fieldsEvents:[
        // {key: 'event_id', label: 'Id'},
        {key: 'date_and_time_happend', label: 'Date and Time'},
        {key: 'minute', label: 'Minute'},
        {key: 'type', label: 'Type'},
        {key: 'description', label: 'Description'}
      ],
      perPage: 3,
      currentPage: 1
    }
  },
  computed:{
    rows() {
        return this.pastLeagueMatches.length;
      }
  },
  props:{
    pastLeagueMatches:{
      required: true,
      type: Array
    }
  }
};



// <!-- <table class="table table-striped table-hover">
//       <thead>
//         <tr>
//           <th scope="col">#MatchId </th>
//           <th scope="col">Date</th>
//           <th scope="col">Time</th>
//           <th scope="col">Local Team </th>
//           <th scope="col">Visitor Team </th>
//           <th scope="col">Venue</th>
//           <th scope="col">Referee</th>
//           <th scope="col">Local Goals</th>
//           <th scope="col">Visitor Goals</th>
//           <th scope="col">Events</th>
//           <th scope="col"></th>
//           <th scope="col"></th>
//           <th scope="col"></th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr v-for="match in pastLeagueMatches" :key="match.MatchDetails.match_id">
//           <th scope="row">{{match.MatchDetails.match_id}}</th>
//           <td> {{match.MatchDetails.date_time.slice(0,10)}} </td>
//           <td> {{match.MatchDetails.date_time.slice(11,16)}} </td>
//           <td> {{match.MatchDetails.local_team_name}} </td>
//           <td> {{match.MatchDetails.visitor_team_name}} </td>
//           <td> {{match.MatchDetails.venue_name}} </td>
//           <td> {{match.MatchDetails.referee_id}} </td>
//           <td> {{match.MatchDetails.home_goals}} </td>
//           <td> {{match.MatchDetails.away_goals}} </td>
//           <td>
//                 <table class="table table-striped table-hover">
//                   <thead>
//                     <tr>
//                       <th scope="col">When Happend</th>
//                       <th scope="col">Minute</th>
//                       <th scope="col">Type</th>
//                       <th scope="col">Description</th>
//                       <th scope="col"></th>
//                       <th scope="col"></th>
//                       <th scope="col"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr v-for="event in match.MatchEvents" :key="event.date_and_time_happend">
//                       <th scope="row">{{event.date_and_time_happend.slice(11,16)}}</th>
//                       <td> {{event.minute}} </td>
//                       <td> {{event.type}} </td>
//                       <td> {{event.description}} </td>
//                   </tr>
//                   </tbody>
//               </table>
//           </td>
//         </tr>
//       </tbody>
//     </table> -->

</script>

<style>
</style>
