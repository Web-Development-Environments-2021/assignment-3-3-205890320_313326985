<template >
  <div>
    <!-- <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination> -->

    <!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->

    <!-- <b-table
      id="my-table"
      :items="teamResults"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
    <template v-slot:cell(logo path)="data">
   <img :src="data.item['logo path']" />          
    </template>

    </b-table> -->



    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Team</th>
          <th scope="col">Position</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
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
    </table>

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
            key: 'team name',
            label: 'Team Name',
          },
          {
            key: 'logo path',
            label: 'Team Logo',
            image: true
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
