<template >
  <div>

    <!-- <table class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Team</th>
          <th scope="col">Position</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in playerResults" :key="player.name">
          <th scope="row">{{player.name}}</th>
          <td> <img :src="player.image" height="70px" width="70px"><img/> </td>
          <td> {{player.team_name}}</td>
          <td> {{player.position}}</td>
          
        </tr>

      </tbody>
    </table> -->

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
      :items="playerResults"
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



      <template v-slot:cell(id)="row">
      <!-- <router-link :to="`/player/${row.value}`">{{ row.value }}</router-link>      -->
      <router-link :to="`/player/${row.value}`">{{ row.value }}</router-link>   
      <!-- <a :href="`#/player/${row.value}`">{{ row.value }}</a> -->
      </template>

      <!-- <router-link :to="'player'" params:{playerId: 62571}>Places, but 101</router-link> -->

      <template v-slot:cell(image)="row">
        <img :src="row.value" height="70px" width="70px" />
      </template>
      

    </b-table>
  </b-container>

  </div>
</template>

<script>
export default {
    name:"PlayerSearchDisplay",
    data(){
      return{
        perPage: 3,
        currentPage: 1,
      }
    },
    props: {
    playerResults: {
      type: Array,
      required: true
      
    }
  },
  computed:{
    rows() {
        return this.playerResults.length
      }
      ,
      fields(){
        return[
          {
            key:'id',
            label:'Id'
          },
          {
            key: 'name',
            label: 'Name',
            sortable: true
          },
          {
            key: 'image',
            label: 'Image',
            image: true
          },
          {
            key: 'team_name',
            label: 'Team',
            sortable: true
          },
          {
            key: 'position',
            label: 'Position',
          }
        ]
      }
  },
  methods: {
  },
  async mounted(){
    console.log("player search display mounted")
  },
  
};
</script>


<style>

</style>
