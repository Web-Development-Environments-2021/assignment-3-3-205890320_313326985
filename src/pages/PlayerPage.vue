<template>
<div>

    <h1 class="display-4">Welcome to {{name}}'s Player Page</h1>
    <img id=#player-img style="margin-top:20px;" class="rounded border border-dark" :src="image" height="300px" width="300px"><img/> 
    <div id="info" class="border border-5" style=" background-image: linear-gradient(to right,#4d4d62, #1b1818);">
    <h3>
    Position : {{position}}
    </h3>
    <h3>
    Team Name : {{team_name}}
    </h3>
    <h3>
    Full Name : {{commonName}}
    </h3>
    <h3>        
    Nationality : {{nationality}}
    </h3>
    <h3>         
    BirthDate : {{birthDate}}
    </h3>
    <h3>        
    BirthCountry : {{birthCountry}}
    </h3>
    <h3>        
    Height : {{height}}
    </h3>
    <h3>        
    Weight : {{weight}}
    </h3>
    </div>
</div>
  
</template>

<script>
export default {
    name:"PlayerPage",
    data(){
        return{
            name:"",
            image:"",
            position:0,
            team_name:"",
            commonName:"",
            nationality:"",
            birthDate:"",
            birthCountry:"",
            height:"",
            weight:"",
        }
    },
    methods:{
        async getPlayerData(){
    try {
        const res = await this.axios.get(
          "http://localhost:3000/players/playerFullDetails/"+this.$route.params.id,
        );

        this.playerData = res.data;
        this.name=this.playerData.name || "-";
        this.image=this.playerData.image || "-";
        this.position=this.playerData.position || "-";
        this.team_name=this.playerData.team_name || "-";
        this.commonName=this.playerData.commonName || "-";
        this.nationality=this.playerData.nationality || "-";
        this.birthDate=this.playerData.birthDate || "-";
        this.birthCountry=this.playerData.birthCountry || "-";
        this.height=this.playerData.height || "-";
        this.weight=this.playerData.weight || "-";

      } catch (error) {
        console.log("error in player page")
        console.log(error);
      }
  },
    },
    async mounted(){
        await this.getPlayerData();
    }

}
</script>

<style>
#info{
    float: right;
    margin-top:20px;
    padding-top: 75px;
    padding-right: 100px;
    padding-left: 100px;
    margin-right: 300px;
    color: white;
    text-align: left;
    height: 500px;
}
</style>