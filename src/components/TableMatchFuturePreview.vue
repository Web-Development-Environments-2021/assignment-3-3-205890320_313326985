<template >
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-container fluid>
    <b-table 
      striped
      hover
      :items="futureLeagueMatches"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      stacked="md"
      show-empty
      small
    >
+


    <template #cell(date_time)="row">
        {{ row.value.substr(0,16) }}
      </template>


    <template #cell(local_team_name)="row">
        <router-link :to="`/team/${row.item.local_team_id}`">{{ row.item.local_team_name }}</router-link>   
      </template>

      <template #cell(visitor_team_name)="row">
        <router-link :to="`/team/${row.item.visitor_team_id}`">{{ row.item.visitor_team_name }}</router-link>   
      </template>

    <template #cell(actions)="row">
      <b-button v-if="$root.store.username" :disabled="FavorMatch(row.item.match_id)" @click="addMatchToFavorites(row.item.match_id)" size="sm" class="mr-1"  type="button" >add to favorites</b-button>
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
        {key: 'actions', label: 'Actions' }        
      ],
      perPage: 3,
      currentPage: 1
    }
  },
  computed:{
    rows() {
        return this.futureLeagueMatches.length;
      }
  },
  props:{
    futureLeagueMatches:{
      required: true,
      type: Array
    },
    favMatches:{
      required: true,
      type: Array
    }
  },
  methods: {
    async addMatchToFavorites(match_id){
      try {
        this.axios.defaults.withCredentials = true;
        await this.axios.post(
          "http://localhost:3000/users/favoriteMatches",
          {
           "match_id": match_id
          }
        );
        this.axios.defaults.withCredentials = false;
      
        await this.getFavoriteMatches();
        
      } catch (error) {
        console.log("error in update favorite matches")
        console.log(error);
      }
    },
    FavorMatch(match_id){
      if(this.favMatches.find((element) => (element[0]).match_id == match_id)){
        return true;
      }
      else{
        return false;
      }
    },
    async getFavoriteMatches(){
        try {
          this.axios.defaults.withCredentials = true;
          const futureMatches = await this.axios.get(
            "http://localhost:3000/users/favoriteMatches",
          );
          this.axios.defaults.withCredentials = false;
          this.favMatches=[];
          this.favMatches.push(...(futureMatches.data));
        } catch (error) {
          console.log("error in update favorite matches")
          console.log(error);
        }
      },
  }
};
    // <!-- <table class="table table-striped table-hover">
    //   <thead>
    //     <tr>
    //       <th scope="col">#id </th>
    //       <th scope="col">Date </th>
    //       <th scope="col">Time</th>
    //       <th scope="col">Local Team </th>
    //       <th scope="col">Visitor Team </th>
    //       <th scope="col">Venue</th>
    //       <th scope="col">Referee</th>
    //       <th scope="col"></th>
    //       <th scope="col"></th>
    //       <th scope="col"></th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr v-for="match in futureLeagueMatches" :key="match.match_id">
    //       <th scope="row">{{match.match_id}}</th>
    //       <td> {{match.date_time.slice(0,10)}} </td>
    //       <td> {{match.date_time.slice(11,16)}} </td>
    //       <td> {{match.local_team_name}} </td>
    //       <td> {{match.visitor_team_name}} </td>
    //       <td> {{match.venue_name}} </td>
    //       <td> {{match.referee_id}} </td>
    //       <td> <button v-if="$root.store.username" :disabled="FavorMatch(match.match_id)" @click="addMatchToFavorites(match.match_id)" type="button" class="btn btn-outline-secondary btn-sm">add to favorites</button> </td>
    //     </tr>

    //   </tbody>
    // </table> -->
</script>

<style>
</style>