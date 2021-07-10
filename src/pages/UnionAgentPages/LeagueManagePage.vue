<template>
    <div>
      <div v-if="$root.store.unionAgent">
        <matches-preview :matchesResults="matchesResults" :matchesEvents="matchesEvents"></matches-preview>
        <b-button  :to="{name: 'addMatch'}" class="btn btn-secondary btn-lg" >Add New Match</b-button>
      </div>
      <div v-else>
       <not-found-page></not-found-page> 
      </div>
      

    </div>
  
</template>

<script>
import MatchesPreview from "../../components/MatchesPreview.vue";
import NotFoundPage from '../NotFoundPage.vue';
export default {
  components: { 
    MatchesPreview,
    NotFoundPage
  },
    data() {
    return {
      matchesResults: [],
      matchesEvents: []
    };
  },
  methods: {
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
    if(this.$root.store.unionAgent){
      console.log("league manage mounted");
      this.updateMatchesResults();
      this.updateMatchesEvents();      
    }

  }
};

</script>

<style>

</style>