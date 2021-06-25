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
        <tr v-for="match in leagueMatches" :key="match.MatchDetails.match_id">
          <th scope="row">{{match.MatchDetails.match_id}}</th>
          <td> {{match.MatchDetails.date_time.slice(0,10)}} </td>
          <td> {{match.MatchDetails.date_time.slice(11,16)}} </td>
          <td> {{match.MatchDetails.local_team_name}} </td>
          <td> {{match.MatchDetails.visitor_team_name}} </td>
          <td> {{match.MatchDetails.venue_name}} </td>
          <td> {{match.MatchDetails.referee_id}} </td>
          <td> {{match.MatchDetails.home_goals}} </td>
          <td> {{match.MatchDetails.away_goals}} </td>
          <!-- <td> {{match.MatchEvents.away_goals}} </td>
          <td> {{match.MatchEvents.away_goals}} </td>
          <td> {{match.MatchEvents.away_goals}} </td>
          <td> {{match.MatchEvents.away_goals}} </td>
          <td> {{match.MatchEvents.away_goals}} </td> -->
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    async updateMatches(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/matches/pastMatches"
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        const matches = response.data;
        this.leagueMatches = [];
        console.log(matches);
        this.leagueMatches.push(...matches);
        console.log(this.leagueMatches);
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },
  },
  async mounted(){
    await this.updateMatches();
    console.log("matches preview mounted")
  }
};
</script>

<style>
</style>
