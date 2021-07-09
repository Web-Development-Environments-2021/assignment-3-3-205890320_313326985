<template>
<div>
    <div class="futureAndpastMatches">
        <h1>
            team matches
        </h1>
        <button class="btn  btn-lg btn-dark btn-outline-info" data-toggle="button" @click="display_flag=!display_flag">
          Change between Past and Future matches
        </button>
          <div id="past" class="match-prev" v-if="display_flag">
            <h2> Past Matches </h2>
          <team-past-preview arrCheck="teamPastMatches"></team-past-preview >
          </div>
          <div id="future" class="match-prev" v-if="!display_flag">
            <h2> Future Matches </h2>
          <team-future-preview></team-future-preview >
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
</div>
  
</template>

<script>
import TeamPastPreview from "../components/TeamPastPreview.vue"
import TeamFuturePreview from "../components/TeamFuturePreview.vue"
import PlayerSearchDisplay from "../components/PlayerSearchDisplay.vue"
export default {
    name:"PlayerPage",
    components:{
        TeamPastPreview,TeamFuturePreview,PlayerSearchDisplay
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

        console.log(res);
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