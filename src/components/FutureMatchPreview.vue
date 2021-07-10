<template>
  <div class="match-preview">
    <div class="match-title">
      <b> {{ local_team_name }} - {{ visitor_team_name }} </b>
    </div>
    <ul class="match-content">
      <li> Date And Time: {{ date_time }}</li>
      <li> Venue Name: {{venue_name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FutureMatchPreview",
  props: {
      date_time: {
        type: String,
        required: true
      },
      local_team_name: {
        type: String,
        required: true
      },
      visitor_team_name: {
        type: String,
        required: true
      },
      venue_name: {
        type: String,
        required: true
      }
  }
};
</script>

<style>
.match-preview {
  display: inline-block;
  width: 315px;
  height: 150px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.match-preview .match-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.match-preview .match-content {
  width: 100%;
  overflow: hidden;
}



</style>
