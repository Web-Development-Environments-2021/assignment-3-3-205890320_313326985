<template>
<div style="color:black;">
    <div class="jumbotron">
      <img id=#team-img :src="image" height="150px" width="150px"><img/> 
    <h1 class="display-4" style="color:black;">Welcome to {{teamName}} Team Page</h1>
          
    <hr class="my-4">
    <h4>What can you see in this page:</h4>
    

    <a class="btn btn-primary btn-lg"  id ="refmatches" @click="scrollMeTo('matches')" role="button">{{teamName}}'s matches</a>
    <a class="btn btn-primary btn-lg" id ="refplayers" @click="scrollMeTo('playersView')" role="button">{{teamName}}'s players</a>
    </div>
    <div id="matches" class="futureAndpastMatches" ref="matches" style="background-color: rgb(255,255,255,.8);">
        <h1 >
            Team Matches
        </h1>
        <button class="btn  btn-lg btn-dark btn-outline-info" data-toggle="button" @click="display_flag=!display_flag">
          Change between Past and Future matches
        </button>
          <div id="past" class="match-prev" v-if="display_flag">
            <h2> Past Matches </h2>
          <table-match-past-preview :pastLeagueMatches="teamPastMatches"></table-match-past-preview >
          </div>
          <div id="future" class="match-prev" v-if="!display_flag">
            <h2> Future Matches </h2>
          <table-match-future-preview :futureLeagueMatches="teamFutureMatches"  :favMatches="favMatches" ></table-match-future-preview >
          </div>
    </div>

    <div class="teamPlayers" id = "playersView" ref="playersView">
        <h1 >
            Players View
        </h1>
        <player-search-display :playerResults ="players"></player-search-display>
    </div>
</div>
  
</template>

<script>
import TableMatchPastPreview from "../components/TableMatchPastPreview.vue"
import TableMatchFuturePreview from "../components/TableMatchFuturePreview.vue"
import PlayerSearchDisplay from "../components/PlayerSearchDisplay.vue"
export default {
    name:"PlayerPage",
    components:{
        TableMatchPastPreview,TableMatchFuturePreview,PlayerSearchDisplay
    },
    data(){
        return{
            teamName:"",
            image:"",
            players:[],
            teamPastMatches:[],
            teamFutureMatches:[],
            display_flag:true,
            favMatches:[]
        }
    },
    methods:{
        scrollMeTo(refName) {
          var element = this.$refs[refName];
          var top = element.offsetTop;
          window.scrollTo(0, top);
        },
        async getTeamData(){
            try {
            const res = await this.axios.get(
              "http://localhost:3000/teams/teamFullDetails/"+this.$route.params.id,
            );
            // first, load fav matches for adding button
            await this.getFavoriteMatches();
            this.TeamData = res.data;
            this.teamName=this.TeamData['team name'];
            // this.teamName="OB";
            this.image=this.TeamData['logo path'];
            // this.image = "https://cdn.sportmonks.com/images//soccer/teams/29/1789.png";
            this.players=this.TeamData.players;
            // this.players=[
            //   {
            //     "name": "Hans Christian Bernat",
            //     "id": 24081697,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/1/24081697.png",
            //     "position": 1,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Oliver Christensen",
            //     "id": 85808,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/16/85808.png",
            //     "position": 1,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Mande Sayouba",
            //     "id": 151009,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/1/151009.png",
            //     "position": 1,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Marcus Ryu Alstrup",
            //     "id": 37459078,
            //     "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            //     "position": 1,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Oliver Lund Poulsen",
            //     "id": 84076,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/12/84076.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Alexander Juel Andersen",
            //     "id": 83796,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/20/83796.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Ryan Johnson Laursen",
            //     "id": 83965,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/29/83965.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Kasper Larsen",
            //     "id": 25517,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/13/25517.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Jeppe Tverskov",
            //     "id": 84292,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/4/84292.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Jørgen Skjelvik",
            //     "id": 150437,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/5/150437.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Christian Vestergaard",
            //     "id": 37337679,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/15/37337679.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Robin Dahl Østrøm",
            //     "id": 37509472,
            //     "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Mathias Brems",
            //     "id": 37516925,
            //     "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Jonathan Khemdee",
            //     "id": 37562640,
            //     "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            //     "position": 2,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Janus Drachmann",
            //     "id": 83623,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/7/83623.png",
            //     "position": 3,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Emmanuel Sabbi",
            //     "id": 4237060,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/4/4237060.png",
            //     "position": 4,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Jens Jakob Thomasen",
            //     "id": 84444,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/28/84444.png",
            //     "position": 3,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Aron Elís Þrándarson",
            //     "id": 118126,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/14/118126.png",
            //     "position": 3,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Ayo Simon Okosun",
            //     "id": 85390,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/14/85390.png",
            //     "position": 3,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Tarik Ibrahimagic",
            //     "id": 37429243,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/27/37429243.png",
            //     "position": 3,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Troels Kløve Hallstrom",
            //     "id": 83797,
            //     "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            //     "position": 3,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Moses Opondo",
            //     "id": 85950,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/30/85950.png",
            //     "position": 3,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Mads Frøkjær-Jensen",
            //     "id": 19979663,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/15/19979663.png",
            //     "position": 3,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Issam Jebali",
            //     "id": 192020,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/20/192020.png",
            //     "position": 4,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Mart Lieder",
            //     "id": 24700,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/28/24700.png",
            //     "position": 4,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Bashkim Kadrii",
            //     "id": 83720,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/8/83720.png",
            //     "position": 4,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Max Fenger",
            //     "id": 37503643,
            //     "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            //     "position": 4,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Sveinn Aron Gudjohnsen",
            //     "id": 119207,
            //     "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            //     "position": 4,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Rasmus Nissen",
            //     "id": 37524943,
            //     "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            //     "position": 4,
            //     "team_name": "OB"
            //   },
            //   {
            //     "name": "Mikkel Hyllegaard",
            //     "id": 37418801,
            //     "image": "https://cdn.sportmonks.com/images/soccer/players/17/37418801.png",
            //     "position": 4,
            //     "team_name": "OB"
            //   }
            // ]

            this.teamPastMatches=this.TeamData["team's past matches"];
            // this.teamPastMatches=[
            //   {
            //     "MatchDetails": {
            //       "match_id": 1,
            //       "date_time": "2021-06-06 21:53:00",
            //       "local_team_id": 1789,
            //       "local_team_name": "OB",
            //       "visitor_team_id": 86,
            //       "visitor_team_name": "Silkeborg",
            //       "venue_id": 5655,
            //       "venue_name": "Parken",
            //       "referee_id": 1,
            //       "home_goals": 2,
            //       "away_goals": 3
            //     },
            //     "MatchEvents": [
            //       {
            //         "event_id": 1,
            //         "match_id": 1,
            //         "date_and_time_happend": "2021-06-06T21:55:00.000Z",
            //         "minute": 2,
            //         "type": "Yellow Card",
            //         "description": "to Messi"
            //       },
            //       {
            //         "event_id": 2,
            //         "match_id": 1,
            //         "date_and_time_happend": "2021-06-06T21:58:00.000Z",
            //         "minute": 5,
            //         "type": "Red Card",
            //         "description": "to Liad"
            //       },
            //       {
            //         "event_id": 3,
            //         "match_id": 1,
            //         "date_and_time_happend": "2021-06-06T22:00:00.000Z",
            //         "minute": 7,
            //         "type": "Substitute",
            //         "description": "to Ronaldo"
            //       },
            //       {
            //         "event_id": 4,
            //         "match_id": 1,
            //         "date_and_time_happend": "2021-06-06T22:10:00.000Z",
            //         "minute": 17,
            //         "type": "Goal",
            //         "description": "Messi"
            //       }
            //     ]
            //   }
            // ]
            this.teamFutureMatches=this.TeamData["team's future matches"];
          //   this.teamFutureMatches=[
          //   {
          //     "match_id": 3,
          //     "date_time": "2021-08-05 16:20:00",
          //     "local_team_id": 1789,
          //     "local_team_name": "OB",
          //     "visitor_team_id": 86,
          //     "visitor_team_name": "Silkeborg",
          //     "venue_id": 5655,
          //     "venue_name": "Parken",
          //     "referee_id": 2
          //   },
          //   {
          //     "match_id": 4,
          //     "date_time": "2021-09-05 12:20:00",
          //     "local_team_id": 1789,
          //     "local_team_name": "OB",
          //     "visitor_team_id": 86,
          //     "visitor_team_name": "Silkeborg",
          //     "venue_id": 5655,
          //     "venue_name": "Parken",
          //     "referee_id": 1
          //   },
          //   {
          //     "match_id": 5,
          //     "date_time": "2021-10-05 23:20:00",
          //     "local_team_id": 1789,
          //     "local_team_name": "OB",
          //     "visitor_team_id": 86,
          //     "visitor_team_name": "Silkeborg",
          //     "venue_id": 5655,
          //     "venue_name": "Parken",
          //     "referee_id": 2
          //   }
          // ]
            } catch (error) {
              console.log("error in player page")
              console.log(error);
            }
        },
        async getFavoriteMatches(){
        try {
          this.axios.defaults.withCredentials = true;
          const futureMatches = await this.axios.get(
            "http://localhost:3000/users/favoriteMatches",
          );
          this.axios.defaults.withCredentials = false;
          this.favMatches.push(...(futureMatches.data));
        } catch (error) {
          console.log("error in update favorite matches")
          console.log(error);
        }
      },
    },
    async mounted(){
        await this.getTeamData();
    }

}
</script>

<style lang="scss" scoped
>
.futureAndpastMatches{
    float:left;
}
.teamPlayers{
    float:left;
    width:100%
}
.display-4{
  float: left;
  margin: auto;
  width: 50%;
  padding: 10px;
}
.team-img{
  float: left;
}
</style>