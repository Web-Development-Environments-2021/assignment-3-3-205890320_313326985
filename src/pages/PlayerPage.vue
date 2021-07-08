<template>
<div>
    <h1>
        {{name}}
    </h1>
    <img :src="image" height="70px" width="70px"><img/>
    <h3>
        {{position}}
    </h3>
    <h3>
        {{team_name}}
    </h3><h3>
        {{commonName}}
    </h3><h3>
        {{nationality}}
    </h3 ><h3>
        {{birthDate}}
    </h3><h3>
        {{birthCountry}}
    </h3><h3>
        {{height}}
    </h3><h3>
        {{weight}}
    </h3>
    <!-- <h3>
        {{this.$route.params.id}}
    </h3> -->
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

        // console.log(res);
        this.playerData = res.data;
        this.name=this.playerData.name;
        this.image=this.playerData.image;
        this.position=this.playerData.position;
        this.team_name=this.playerData.team_name;
        this.commonName=this.playerData.commonName;
        this.nationality=this.playerData.nationality;
        this.birthDate=this.playerData.birthDate;
        this.birthCountry=this.playerData.birthCountry;
        this.height=this.playerData.height;
        this.weight=this.playerData.weight;

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

</style>