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
        <tr v-for="team in teamResults" :key="team.myTextOptions['team name']">
          <th scope="row">{{team.myTextOptions['team name']}}</th>
          <td> {{team.myTextOptions['logo path']}} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name:"TeamSearchDisplay",
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
  }
};
</script>

<style>
</style>
