<template >
  <div>
    
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#id <font-awesome-icon @click="sortBy('none')" type="button" icon="sort"/></th>
          <th scope="col">Date <font-awesome-icon @click="sortBy('Date')" type="button" icon="sort"/></th>
          <th scope="col">Time</th>
          <th scope="col">Local Team <font-awesome-icon @click="sortBy('Local Teams')" type="button" icon="sort"/></th>
          <th scope="col">Visitor Team <font-awesome-icon @click="sortBy('Visitor Teams')" type="button" icon="sort"/></th>
          <th scope="col">Venue</th>
          <th scope="col">Referee</th>
          <th scope="col">Local Goals</th>
          <th scope="col">Visitor Goals</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="match in leaugeMatches" :key="match.match_id">
          <th scope="row">{{match.match_id}}</th>
          <td> {{match.date_time.slice(0,10)}} </td>
          <td> {{match.date_time.slice(11,16)}} </td>
          <td> {{match.local_team_name}} </td>
          <td> {{match.visitor_team_name}} </td>
          <td> {{match.venue_name}} </td>
          <td> {{match.referee_id}} </td>
          <td> {{match.home_goals}} </td>
          <td> {{match.away_goals}} </td>
          <td> <button :disabled="disableResults(match.match_id)" type="button" class="btn btn-outline-secondary btn-sm">add results</button> </td>
          <td> <button :disabled="disableEvents(match.match_id)" type="button" class="btn btn-outline-secondary btn-sm">add events</button> </td>
          <td> <button type="button" class="btn btn-outline-secondary btn-sm">update referee</button> </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    leaugeMatches: {
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
        this.leaugeMatches = [];
        console.log(matches);
        this.leaugeMatches.push(...matches);
        console.log(this.leaugeMatches);
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },
    async disableResults(match_id){
      if(this.matchesResults.find((element) => element.match_id == match_id)){
        console.log("i am here")
        return false;
      }
      else{
        return true;
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
