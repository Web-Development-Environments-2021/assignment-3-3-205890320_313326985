<template>
  <div>
    <FutureMatchPreview
      v-for="m in futureMatches"
        :match_id="m.match_id"
        :date_time="m.date_time"
        :local_team_id="m.local_team_id"
        :local_team_name="m.local_team_name"
        :visitor_team_id ="m.visitor_team_id"
        :visitor_team_name ="m.visitor_team_name"
        :venue_id ="m.venue_id"
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
      futureMatches: [
        {
          id:25,
          hostTeam: "Maccabi Tel-Aviv",
          guestTeam: "Hapoel Beer-Sheva",
          venueName:"Teddy",
          date_time: "27/5/21 20:00",
          referee_id: "3"
        },
        {
          id:39,
          hostTeam: "Hapoel Tel-Aviv",
          guestTeam: "Maccabi Haifa",
          venueName:"Sammy Ofer",
          date_time: "29/5/21 19:00",
          referee_id: "2"
        }
      ]
    };
  },
  methods: {
    async updateFavoriteMatches(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteMatches",
        );
        const games = response.data.games;
        this.games = [];
        this.games.push(...games);
        console.log(response);
      } catch (error) {
        console.log("error in update favorite matches")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateFavoriteGames(); 
  }
};
</script>

<style></style>
