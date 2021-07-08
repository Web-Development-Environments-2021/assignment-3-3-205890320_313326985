<template >
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>


    <b-container fluid>
    <b-table 
      striped
      hover
      :items="teamResults"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
    >

      <template v-slot:cell(logopath)="row">
        <img :src="row.value" height="70px" width="70px" />
      </template>
      
      <template v-slot:cell(teamname)="row">
      <router-link :to="`/team/${row.value}`">{{ row.value }}</router-link>   
      </template>

    </b-table>
  </b-container>



    <!-- <table class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th scope="col">Team Name</th>
          <th scope="col">Team Logo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teamResults" :key="team['team name']">
          <th scope="row">{{team['team name']}}</th>
          <td > <img :src="team['logo path']" height="70px" width="70px"><img/> </td>
        </tr>

      </tbody>
    </table> -->

  </div>
</template>

<script>
export default {
    name:"TeamSearchDisplay",
    data(){
      return{
        perPage: 3,
        currentPage: 1,
        logo:"logo path"
      }
    },
    props: {
    teamResults: {
      type: Array,
      required: true
      
    }
  },
  computed:{
    rows() {
        return this.teamResults.length;
      }
      ,
      fields(){
        return[
          {
            key: 'teamname',
            label: 'Team Name',
            sortable: true
          },
          {
            key: 'logopath',
            label: 'Team Logo',
            editable: true,
            image: true
          }
        ]
      }
  },
  methods: {
  },
  async mounted(){
    console.log("team search display mounted")
  },
  
};
</script>


<style>

</style>
