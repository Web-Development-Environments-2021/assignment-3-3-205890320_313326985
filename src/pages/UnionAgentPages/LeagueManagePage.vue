<template>
    <div>
        <MatchesPreview :leaugeMatches="matches" :matchesResults="matchesResults" :matchesEvents="matchesEvents"></MatchesPreview>
        <button type="button" class="btn btn-secondary btn-lg">Add New Match</button>

    </div>
  
</template>

<script>
import MatchesPreview from "../../components/MatchesPreview.vue";
export default {
  components: { 
    MatchesPreview
  },
    data() {
    return {
      matches: [],
      matchesResults: [],
      matchesEvents: []
    };
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
        this.matches = [];
        console.log(matches);
        this.matches.push(...matches);
        console.log(this.matches);
      } catch (error) {
        console.log("error in update matches")
        console.log(error);
      }
    },
    async updateMatchesResults(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/UnionAgent/UpdateResultsMatch"
        );
        this.axios.defaults.withCredentials = false;
        const matches = response.data
        this.matchesResults = [];
        console.log(matches);
        this.matchesResults.push(...matches);
        console.log(this.matchesResults);
      } catch (error) {
        console.log("error in update matches results")
        console.log(error);
      }
    },
    async updateMatchesEvents(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/UnionAgent/addEventsLog"
        );
        this.axios.defaults.withCredentials = false;
        const matches = response.data
        this.matchesEvents = [];
        console.log(matches);
        this.matchesEvents.push(...matches);
        console.log(this.matchesEvents);
      } catch (error) {
        console.log("error in update matches events")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("league manage mounted");
    this.updateMatches();
    this.updateMatchesResults();
    this.updateMatchesEvents();
  }
};

</script>

<style>

</style>