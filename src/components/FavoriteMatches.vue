<template>
  <div>
    <FutureMatchPreview
      v-for="m in futureMatches"
      :id="m.id" 
      :hostTeam="m.hostTeam" 
      :guestTeam="m.guestTeam" 
      :venueName="m.venueName" 
      :date_time="m.date_time" 
      :referee_id="m.referee_id"
      :key="m.id"></FutureMatchPreview>
  </div>
</template>

<script>
import FutureMatchPreview from "./FutureMatchPreview.vue";
export default {
  name: "FavoriteGames",
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
          "http://localhost:3000/api/users/favoriteMatches",
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
