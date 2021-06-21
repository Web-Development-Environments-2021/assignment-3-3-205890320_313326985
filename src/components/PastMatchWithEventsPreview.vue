<template>
  <div>
      
  </div>
</template>

<script>
import PastMatchPreview from "./PastMatchPreview.vue";
import MatchEventPreview from "./MatchEventPreview.vue";
export default {
    name: "pastMatches",
    components:{
        PastMatchPreview,MatchEventPreview
    },
    data(){
        // return{
        //     updatePastMatches()
        // };
        return {
            
        };
    },
    methods:{
        async updatePastMatches(){
          console.log("response");
          try {
            const response = await this.axios.get(
              "http://localhost:3000/games/favoriteGames",
            );
            const games = response.data.games;
            this.games = [];
            this.games.push(...games);
            console.log(response);
          } catch (error) {
            console.log("error in update games")
            console.log(error);
          }
        }
    },
    mounted(){
        console.log("Past matches mounted");
        this.updatePastMatches(); 
    }
};

</script>

<style>

</style>