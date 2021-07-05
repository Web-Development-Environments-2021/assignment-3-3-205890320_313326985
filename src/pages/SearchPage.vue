<template>
  <div class="search-page">
  <div class="container-search">
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
    <h1 class="title">Search Page</h1>
    <h2 class="title">Search</h2>


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
    <b-form-group id="searchobjects">
        <b-form-select 
        v-model="searchByObject"
        :options="searchingObjects"
        ></b-form-select>
      </b-form-group>
        <br/>
    </div>

    <div v-if="searchByObject === 'Players'" class="search-input">
      <h3 class="title">Filter your search results?</h3>
      <b-form-group id="filterattributes">
          <b-form-select 
          v-model="filterByAttribue"
          :options="filterAttributes"
          ></b-form-select>
        </b-form-group>
          <br/>
    </div>

    <div v-if="filterByAttribue != 'None' && filterByAttribue">
        <b-input-group prepend="Filter Query:" class="search-input">

          <div v-if="filterByAttribue === 'Team name'">
              <b-form-input id="filterQueryByTeamName" v-model="$v.filterQueryByTeamName.$model"
              :state="validateState('filterQueryByTeamName')"></b-form-input>
              <b-form-invalid-feedback v-if="!$v.filterQueryByTeamName.required && !$v.filterQueryByTeamName.length">
                Filter Query cannot be empty
              </b-form-invalid-feedback>
               <b-form-invalid-feedback v-if="filterByAttribue === 'Team name' && !$v.filterQueryByTeamName.alpha">
                Filter Query consists only of letters
              </b-form-invalid-feedback>
          </div>
          <div v-if="filterByAttribue != 'Team name'">
              <b-form-input id="filterQueryByPosId" v-model="$v.filterQueryByPosId.$model"
              :state="validateState('filterQueryByPosId')"></b-form-input>
              <b-form-invalid-feedback v-if="!$v.filterQueryByPosId.required && !$v.filterQueryByPosId.length">
                Filter Query cannot be empty
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="filterByAttribue != 'Team name' && !$v.filterQueryByPosId.integer">
                Filter Query consists only of numbers
              </b-form-invalid-feedback>
          </div>

        </b-input-group>
          <br/>
    </div>


  <b-button id="reset" type="reset" variant="danger">Reset</b-button>
  <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-25"
>Search</b-button>

  </b-form>
  </div>
  <div class="container-results">
    <h2 class="subtitle">Results</h2>
    <team-search-display v-if="searchFlag" :teamResults =teamRes></team-search-display>
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

// import PlayerSearchDisplay from "../components/PlayerSearchDisplay";
import TeamSearchDisplay from "../components/TeamSearchDisplay";

export default {
 name: "SearchPage",
 components:{
  //  PlayerSearchDisplay,
   TeamSearchDisplay
 },
 data() {
    return {
      searchQuery:"",
      searchByObject: "",
      filterByAttribue: "",
      filterQueryByTeamName:"TeamName",
      filterQueryByPosId:"1",
      searchingObjects:["Teams","Players"],
      filterAttributes:["Player's position","Team name","None"],
      searchFlag:false
    };
},
validations:{
  searchQuery:{
    required,
    length: (u) => minLength(1)(u),
    alpha
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
  onReset(){
    this.searchQuery="";
    this.searchByObject= "";
    this.filterByObject= "";
    this.filterByAttribue= "";
    this.filterQueryByTeamName="";
    this.filterQueryByPosId="";
    this.$nextTick(() => {
        this.$v.$reset();
    });
  },
  async searchTeams(){
    try {
      console.log("activated api call");
        // const res = await this.axios.get(
        //   "http://localhost:3000/search/Teams",
        //   {params:{
        //     "query":this.searchQuery,
        //     "sort":"none"
        //   }}
        // );
        // console.log(res);

        const not_real_res = {
          data:[
            {
    "team name": "København",
    "logo path": "https://cdn.sportmonks.com/images//soccer/teams/21/85.png"
            },
            {
    "team name": "Midtjylland",
    "logo path": "https://cdn.sportmonks.com/images//soccer/teams/11/939.png"
            },
            {
    "team name": "AaB",
    "logo path": "https://cdn.sportmonks.com/images//soccer/teams/28/1020.png"
            },
            {
    "team name": "Randers",
    "logo path": "https://cdn.sportmonks.com/images//soccer/teams/20/2356.png"
            },
            { 
    "team name": "Nordsjælland",
    "logo path": "https://cdn.sportmonks.com/images//soccer/teams/26/2394.png"
            },
            {
    "team name": "AGF",
    "logo path": "https://cdn.sportmonks.com/images//soccer/teams/25/2905.png"
            }
          ]
        };
        this.teamRes = [];
        // this.teamRes.push(...(res.data));
        this.teamRes.push(...(not_real_res.data));

      } catch (error) {
        console.log("error in searching teams")
        console.log(error);
      }
  },
  async searchPlayers(){
       try {
        const res = await this.axios.get(
          "http://localhost:3000/search/Players",null,
          {params:{
            "query":searchQuery,
            "sort":"none",
            "filter":filterByAttribue,
            "filter query":filterQuery
          }}
          
        );
        console.log(not_real_res);
        this.teamRes = [];
        this.teamRes.push(...(res.data));
      } catch (error) {
        console.log("error in searching players")
        console.log(error);
      }
  },
  async onSearch(){

    this.$v.searchQuery.$touch();
    this.$v.filterQueryByTeamName.$touch();
    this.$v.filterQueryByPosId.$touch();

    if (
    this.$v.searchQuery.$anyError || 
    this.$v.filterQueryByTeamName.$anyError ||
    this.$v.filterQueryByPosId.$anyError
    ) {
        return;
    }

    if(this.searchByObject == "Teams"){
      await this.searchTeams();
      this.searchFlag = true;
      
    }
    else if(this.searchByObject == "Players"){
      await this.searchPlayers();
      this.searchFlag = true;
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

#filterbutton{
display: inline-block; 
}

.container-search{
  width: 40%;
  float: left;
}
.container-results{
  width: 60%;
  float: right;
}

</style>