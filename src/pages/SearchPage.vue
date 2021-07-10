<template>
  <div class="search-page">
  <div class="container-search">
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
    <h1 class="title">Search</h1>


    <div class="search-input">
      <b-input-group prepend="Search Query:" >
        <b-form-input  id="searchQuery"
        v-model="$v.searchQuery.$model"
         :state="validateState('searchQuery')" >
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.searchQuery.required">
          Search Query is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.searchQuery.length">
          Search Query cannot be empty
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.searchQuery.alpha">
          Search Query consists only of letters
        </b-form-invalid-feedback>

      </b-input-group>
        <br/>
    </div>
    
    <div class="search-input">
    <h3 class="title">Search for..</h3>
    <b-form-group id="searchByObject">
        <b-form-select v-model="$v.searchByObject.$model"
         :state="validateState('searchByObject')"
        :options="searchingObjects"
        
        ></b-form-select>
        <b-form-invalid-feedback v-if="!$v.searchByObject.required">
          It is required to search by Teams or by Players
        </b-form-invalid-feedback>
      </b-form-group>
        <br/>
    </div>

    <div v-if="searchByObject === 'Players'" class="search-input">
      <h3 class="title">Filter your search results?</h3>
      <b-form-group id="filterByAttribue">
          <b-form-select v-model="$v.filterByAttribue.$model"
          :state="validateState('filterByAttribue')"
          :options="filterAttributes"
          @change=emptyValuesOfHiddenAfterFilter()
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.filterByAttribue.required">
          Please choose whether you want to filter or not
        </b-form-invalid-feedback>
        </b-form-group>
          <br/>
    </div>

    <div v-if="filterByAttribue != 'none' && filterByAttribue && searchByObject!='Teams'">
        <b-input-group prepend="Filter Query:" class="search-input">

          <div v-if="filterByAttribue === 'team name'">
              <b-form-input id="filterQueryByTeamName" v-model="$v.filterQueryByTeamName.$model"
              :state="validateState('filterQueryByTeamName')"></b-form-input>
              <b-form-invalid-feedback v-if="!$v.filterQueryByTeamName.required">
                Filter Query cannot be empty
              </b-form-invalid-feedback>
               <b-form-invalid-feedback v-if="filterByAttribue === 'team name' && !$v.filterQueryByTeamName.alpha">
                Filter Query consists only of letters
              </b-form-invalid-feedback>
          </div>
          <div v-if="filterByAttribue != 'team name'">
              <b-form-input id="filterQueryByPosId" v-model="$v.filterQueryByPosId.$model"
              :state="validateState('filterQueryByPosId')"></b-form-input>
              <b-form-invalid-feedback v-if="!$v.filterQueryByPosId.required">
                Filter Query cannot be empty
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="filterByAttribue != 'team name' && !$v.filterQueryByPosId.integer">
                Filter Query consists only of numbers
              </b-form-invalid-feedback>
          </div>

        </b-input-group>
          <br/>
    </div>


  
  <div class="fixed-bottom">

    <b-button id="reset" type="reset" variant="danger">Reset</b-button>
    <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-25"
    >Search</b-button>
    
  </div>
  

  </b-form>
  </div>
  <div class="container-results">
    <h2 class="subtitle">Results</h2>
    <div v-if="dataReady">
    <team-search-display v-if="teamFlag" :teamResults ="teamRes"></team-search-display>
    <player-search-display v-if="playerFlag" :playerResults ="playerRes"></player-search-display>
    </div>
    <div v-if="!dataReady && searchPressed">
      <div class="box">
      <div class="shadow"></div>
      <div class="gravity">
      <div class="ball"></div>
    </div>
</div>
</div>
  </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  alpha,
  integer
} from "vuelidate/lib/validators";

import PlayerSearchDisplay from "../components/PlayerSearchDisplay";
import TeamSearchDisplay from "../components/TeamSearchDisplay";

export default {
 name: "SearchPage",
 components:{
   PlayerSearchDisplay,
   TeamSearchDisplay
 },
 data() {
    return {
      dataReady: false,
      searchPressed:false,
      searchQuery:"",
      searchByObject: "",
      filterByAttribue: "none",
      filterQueryByTeamName:"TeamName",
      filterQueryByPosId:"1",
      filterQuery:"",
      searchingObjects:["Teams","Players"],
      filterAttributes:["player's position","team name","none"],
      teamFlag:false,
      playerFlag: false,
      teamRes:[],
      playerRes:[]
    };
},
validations:{
  searchQuery:{
    required,
    length: (u) => minLength(1)(u),
    alpha
  },
  searchByObject:{
    required
  },
  filterByAttribue:{
    required
  },
  filterQueryByTeamName:{
    required,
    length: (u) => minLength(1)(u),
    alpha
  },
  filterQueryByPosId:{
    required,
    length: (u) => minLength(1)(u),
    integer
  }

},
methods:{  
  validateState(param) {
      const { $dirty, $error } = this.$v[param];
      return $dirty ? !$error : null; 
  },
  emptyValuesOfHiddenAfterFilter(){
    if (this.filterByAttribue == "none"){
        this.filterQueryByTeamName = "TeamName";
        this.filterQueryByPosId = "1";
    }
    else if(this.filterByAttribue == "team name"){
        this.filterQueryByTeamName = "";
        this.filterQueryByPosId = "1";
    }
    else{
        this.filterQueryByTeamName = "TeamName";
        this.filterQueryByPosId = "";
    }
  },
  onReset(){
    this.searchQuery="";
    this.searchByObject= "";
    this.filterByAttribue= "";
    this.filterQueryByTeamName="TeamName";
    this.filterQueryByPosId="1";
    this.$nextTick(() => {
        this.$v.$reset();
    });
  },
  async searchTeams(){
    try {
      this.dataReady = false;
        const res = await this.axios.get(
          "http://localhost:3000/search/Teams",
          {params:{
            "query":this.searchQuery,
            "sort":"none"
          }}
        );
        this.teamRes=[];
    //     var not_real_res = {
    //       data:[
    //         {
    // "id": 85,
    // "team name": "København",
    // "logo path": "https://cdn.sportmonks.com/images//soccer/teams/21/85.png"
    //         },
    //         {
    // "id": 939,
    // "team name": "Midtjylland",
    // "logo path": "https://cdn.sportmonks.com/images//soccer/teams/11/939.png"
    //         }
    //          ]
    //     };
        
        // transfers data key logo path and team name, to without spaces form
        for(var i = 0; i < res.data.length; i++){
            res.data[i].logopath = res.data[i]['logo path'];
            delete res.data[i]['logo path'];
            res.data[i].teamname = res.data[i]['team name'];
            delete res.data[i]['team name'];
        }
        this.teamRes.push(...(res.data));
        // this.teamRes.push(...(not_real_res.data));
        this.dataReady = true;
      } catch (error) {
        console.log("error in searching teams");
        console.log(error);
      }
  },
  async searchPlayers(){
      if(this.filterByAttribue == "team name"){
        this.filterQuery = this.filterQueryByTeamName;
      }
      else if(this.filterByAttribue == "player's position"){
        this.filterQuery = this.filterQueryByPosId;
      }
       try {
        this.dataReady = false;
        const res = await this.axios.get(
          "http://localhost:3000/search/Players",
          {params:{
            "query":this.searchQuery,
            "sort":"none",
            "filter":this.filterByAttribue,
            "filter query":this.filterQuery
          }}
        );
        this.playerRes=[];
        // var not_real_res = {
        //   data:[
        //     { "name": "David Nii Addy", "id": 62570, "image": "https://cdn.sportmonks.com/images/soccer/players/10/62570.png", "position": 2, "team_name": "Randers" },
        //     { "name": "David Jean Nielsen", "id": 458696, "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png", "position": 9, "team_name": "Vejle" }
        //      ]
        // };
        
        this.playerRes.push(...(res.data));
        // this.playerRes.push(...(not_real_res.data));
        this.dataReady = true;
      } catch (error) {
        console.log("error in searching players")
        console.log(error);
      }
  },
  async onSearch(){
    this.$v.searchQuery.$touch();
    this.$v.searchByObject.$touch();
    this.$v.filterByAttribue.$touch();
    this.$v.filterQueryByTeamName.$touch();
    this.$v.filterQueryByPosId.$touch();

    if (
    this.$v.searchQuery.$anyError || 
    this.$v.searchByObject.$anyError ||
    this.$v.filterByAttribue.$anyError ||
    this.$v.filterQueryByTeamName.$anyError ||
    this.$v.filterQueryByPosId.$anyError 
    ) {
        return;
    }

    this.searchPressed=true;

    if(this.searchByObject == "Teams"){
      this.playerFlag = false;
      await this.searchTeams();
      this.teamFlag = true;
      
    }
    else if(this.searchByObject == "Players"){
      this.teamFlag = false;
      await this.searchPlayers();
      this.playerFlag = true;
    }
  }
}
}
</script>

<style scoped>

.search-input {
  margin-left: 20px; 
  width: 400px; 
  
}
#reset{
  margin-left: 20px; 
}

#search{
  padding-top: 30px;
}

.container-search{
  width: 40%;
  float: left;
}
.container-results{
  width: 60%;
  float: right;
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