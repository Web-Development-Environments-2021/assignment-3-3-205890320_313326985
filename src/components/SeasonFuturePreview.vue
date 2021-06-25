<template >
  <div>
    
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#MatchId </th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Local Team </th>
          <th scope="col">Visitor Team </th>
          <th scope="col">Venue</th>
          <th scope="col">Referee</th>
          <th scope="col">Local Goals</th>
          <th scope="col">Visitor Goals</th>
          <th scope="col">#EventId </th>
          <th scope="col">Time Happend</th>
          <th scope="col">Minute</th>
          <th scope="col">Type</th>
          <th scope="col">Description</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="match in leagueMatches" :key="match.match_id">
          <th scope="row">{{match.match_id}}</th>
          <td> {{match.date_time.slice(0,10)}} </td>
          <td> {{match.date_time.slice(11,16)}} </td>
          <td> {{match.local_team_name}} </td>
          <td> {{match.visitor_team_name}} </td>
          <td> {{match.venue_name}} </td>
          <td> {{match.referee_id}} </td>
          <td> {{match.home_goals}} </td>
          <td> {{match.away_goals}} </td>
          <td> <button :disabled="disableEvents(match.match_id)" type="button" class="btn btn-outline-secondary btn-sm">add to favorites</button> </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    leagueMatches: {
      type: Array,
      required: true
    },
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
    async sortBy(sort_type){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/UnionAgent", {params:{sort: sort_type}}
        );
        this.axios.defaults.withCredentials = false;
        const matches = response.data
        this.leagueMatches = [];
        console.log(matches);
        this.leagueMatches.push(...matches);
        console.log(this.leagueMatches);
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },
    async disableEvents(match_id){
      if(this.matchesEvents.find((element) => element.match_id == match_id)){
        return false;
      }
      else{
        return true;
      }
    },


  },
  mounted(){
    console.log("matches preview mounted")
  }

};
</script>

<style>
</style>
