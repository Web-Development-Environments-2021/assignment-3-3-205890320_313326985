<template>
  <div>
    <FutureMatchPreview
      v-for="m in matches"
        :match_id="m.match_id"
        :date_time="m.date_time"
        :local_team_id="m.local_team_id"
        :local_team_name="m.local_team_name"
        :visitor_team_id="m.visitor_team_id"
        :visitor_team_name ="m.visitor_team_name"
        :venue_id="m.venue_id"
        :venue_name ="m.venue_name"
        :referee_id ="m.referee_id"
      :key="m.match_id"></FutureMatchPreview>
  </div>
</template>

<script>
import FutureMatchPreview from "./FutureMatchPreview.vue";
export default {
  name: "FavoriteMatches",
  components: {
    FutureMatchPreview
  }, 
  data() {
    return {
      matches:[]
    };
  },
  methods: {
    async updateFavoriteMatches(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const futureMatches = await this.axios.get(
          "http://localhost:3000/users/favoriteMatches",
        );
        this.axios.defaults.withCredentials = false;
        this.matches = [];
        this.matches.push(...futureMatches.data);
        console.log(futureMatches.status);
      } catch (error) {
        console.log("error in update favorite matches")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateFavoriteMatches(); 
  }
};
</script>

<style></style>
