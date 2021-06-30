<template >
  <div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#id </th>
          <th scope="col">Date </th>
          <th scope="col">Time</th>
          <th scope="col">Local Team </th>
          <th scope="col">Visitor Team </th>
          <th scope="col">Venue</th>
          <th scope="col">Referee</th>
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
          <td> <button :disabled="FavorMatch(match.match_id)" type="button" class="btn btn-outline-secondary btn-sm">add to favorites</button> </td>
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
    }
  },
  methods: {
    async updateMatches(){
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/matches/futureMatches"
        );
        this.axios.defaults.withCredentials = false;
        const matches = response.data
        this.leagueMatches = [];
        this.leagueMatches.push(...matches);
        console.log(this.leagueMatches);
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },
    async getFavoriteMatches(){
      try {
        this.axios.defaults.withCredentials = true;
        const futureMatches = await this.axios.get(
          "http://localhost:3000/users/favoriteMatches",
        );
        this.axios.defaults.withCredentials = false;
        this.favMatches = [];
        this.favMatches.push(...(futureMatches.data));
      } catch (error) {
        console.log("error in update favorite matches")
        console.log(error);
      }
    }
    ,
    FavorMatch(match_id){
      console.log(this.favMatches);
      if(this.favMatches.find((element) => (element[0]).match_id == match_id)){
        return true;
      }
      else{
        return false;
      }
    }
  },
  async mounted(){
    console.log("past matches preview mounted");
    await this.getFavoriteMatches();
    await this.updateMatches();
    console.log("fire emit")
    
  }

};
</script>

<style>
</style>