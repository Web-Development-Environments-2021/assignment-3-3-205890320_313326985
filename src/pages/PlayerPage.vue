<template>
<div>
<div v-if="dataReady" class ="playerdata">

    <h1 class="display-4" style="text-align:center; color:black;">Welcome to {{name}}'s Player Page</h1>
    <img id=#img style="margin-top:20px;" class="rounded border border-dark mx-auto d-block" :src="image" height="300px" width="300px"><img/> 
    <div id="info" class="border border-5" style=" background-image: linear-gradient(to right,#2980b9, #2c3e50);">
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
<div v-else>
  <div class="box">
  <div class="shadow"></div>
  <div class="gravity">
    <div class="ball"></div>
  </div>
</div>
</div>
</div>

</template>

<script>
export default {
    name:"PlayerPage",
    data(){
        return{
            dataReady: false,
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
        this.dataReady = true;
    }

}
</script>

<style>
#info{
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
    margin-top:20px;
    padding-top: 75px;
    padding-right: 100px;
    padding-left: 100px;
    color: white;
    text-align: center;
    height: 500px;
}



.box {
  margin: 0 auto;
  padding-bottom: 50px;
  width: 150px;
  height: 245px;
  position: relative;
}
.shadow {
  position: absolute;
  width: 100%;
  height: 10px;
  background-color: grey;
  bottom: 0;
  border-radius: 100%;
  transform: scaleX(.8);
  opacity: .6;
  animation: shadowScale 1s linear infinite;
}

.gravity {
  width: 40px;
  height: 40px;
  animation: bounce 1s cubic-bezier(0.68, 0.35, 0.29, 0.54) infinite;
}
.ball {
  width: 150px;
  height: 150px;
  background-image: url('https://image.flaticon.com/icons/svg/33/33736.svg');
  background-size: cover;
  animation: roll .6s linear infinite;
}

@keyframes roll {
  0% {}
  100% { transform: rotate(360deg) }
}
@keyframes bounce {
  0% {}
  50% { transform: translateY(100px) }
  100% {}
}
@keyframes shadowScale {
  0% {}
  50% { transform: scaleX(1); opacity: .8;}
  100% {}
}
</style>