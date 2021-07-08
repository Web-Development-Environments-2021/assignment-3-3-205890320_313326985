<template>
<div>
    <div class="futureAndpastMatches">
        <h1>
            season team matches
        </h1>
        <div class="season-matches" >
            <button class="btn  btn-lg btn-dark btn-outline-info" data-toggle="button" @click="display_flag=!display_flag">
              Change between Past and Future matches
            </button>
              <div id="past" class="match-prev" v-if="display_flag">
                <h2> Past Matches </h2>
              <season-past-preview></season-past-preview >
              </div>
              <div id="future" class="match-prev" v-if="!display_flag">
                <h2> Future Matches </h2>
              <season-future-preview></season-future-preview >
              </div>
        </div>
    </div>
    <div class="teamDetails">
            <img :src="image" height="150px" width="150px">image of team<img/>
                
        <h1>
            team name : {{teamName}}
        </h1>

        <div class="teamPlayers">

        <h1>
            players view
        </h1>
        <player-search-display></player-search-display>
    </div>
    </div>
    
    <!-- <h3>
        {{this.$route.params.id}}
    </h3> -->
</div>
  
</template>

<script>
import SeasonPastPreview from "../components/SeasonPastPreview.vue"
import SeasonFuturePreview from "../components/SeasonFuturePreview.vue"
import PlayerSearchDisplay from "../components/PlayerSearchDisplay.vue"
export default {
    name:"PlayerPage",
    components:{
        SeasonPastPreview,SeasonFuturePreview,PlayerSearchDisplay
    },
    data(){
        return{
            teamName:"",
            image:"",
            players:[],
            teamPastMatches:[],
            teamFutureMatches:[],
            display_flag:true
        }
    },
    methods:{
        async getTeamData(){
    try {
        const res = await this.axios.get(
          "http://localhost:3000/teams/teamFullDetails/"+this.$route.params.id,
        );

        // console.log(res);
        this.TeamData = res.data;
        this.teamName=this.TeamData['team name'];
        this.image=this.TeamData['logo path'];
        this.players=this.TeamData.players;

        this.teamPastMatches=this.TeamData["team's past matches"];
        this.teamFutureMatches=this.TeamData["team's future matches"];

      } catch (error) {
        console.log("error in player page")
        console.log(error);
      }
  },
    },
    async mounted(){
        await this.getTeamData();
    }

}
</script>

<style>
.futureAndpastMatches{
    float:right;
    padding-right: 100px;
}
.teamDetails{
    float:left;
    padding-left: 50px;
}

</style>