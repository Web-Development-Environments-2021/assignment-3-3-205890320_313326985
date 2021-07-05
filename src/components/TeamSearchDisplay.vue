<template >
  <div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Team Name</th>
          <th scope="col">Team Logo</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teamResults" :key="team['team name']">
          <th scope="row">{{team['team name']}}</th>
          <td > <img :src="team['logo path']" height="100px" width="100px"><img/> </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name:"TeamSearchDisplay",
    data(){
      return{
      }
    },
    props: {
    teamResults: {
      type: Array,
      required: true
      
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
