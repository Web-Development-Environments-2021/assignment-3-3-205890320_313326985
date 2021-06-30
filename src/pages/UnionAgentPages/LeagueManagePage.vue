<template>
    <div>
        <matches-preview :leaugeMatches="matches" :matchesResults="matchesResults" :matchesEvents="matchesEvents"></matches-preview>
        <b-button :to="{name: 'addMatch'}" class="btn btn-secondary btn-lg">Add New Match</b-button>

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
        const results = response.data
        this.matchesResults = [];
        console.log(results);
        this.matchesResults.push(...results);
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
        const events = response.data
        this.matchesEvents = [];
        console.log(events);
        this.matchesEvents.push(...events);
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