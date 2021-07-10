<template>
  <div>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <future-match-preview class="w3-padding w3-black w3-opacity-min"
      v-for="m in matches"
        :match_id="m[0].match_id"
        :date_time="(m[0].date_time.replace('T',' ').replace('Z',' ')).substr(0,16)" 
        :local_team_id="m[0].local_team_id"
        :local_team_name="m[0].local_team_name"
        :visitor_team_id="m[0].visitor_team_id"
        :visitor_team_name ="m[0].visitor_team_name"
        :venue_id="m[0].venue_id"
        :venue_name ="m[0].venue_name"
        :referee_id ="m[0].referee_id"
      :key="m[0].match_id">
      </future-match-preview>
  </div>
</template>

<script>
import FutureMatchPreview from "./FutureMatchPreview.vue";
export default {
  name: "FavoriteMatches",
  components: {
    FutureMatchPreview
  }, 
  props: {
    matches:{
      required: true,
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped
></style>
