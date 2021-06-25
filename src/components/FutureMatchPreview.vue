<template>
  <div class="match-preview">
    <div :title="match_id" class="match-title">
      <b>Match Id:</b> {{ match_id }}
    </div>
    <ul class="match-content">
      <li> Date And Time: {{ date_time }}</li>
      <li> Local Team Id: {{ local_team_id }}</li>
      <li> Local Team Name: {{ local_team_name }}</li>
      <li> Visitor Team Id: {{ visitor_team_id }}</li>
      <li> Visitor Team Name: {{ visitor_team_name }}</li>
      <li> Venue Id: {{venue_id}}</li>
      <li> Venue Name: {{venue_name}}</li>
      <li> Referee Id: {{referee_id}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FutureMatchPreview",
  props: {
      match_id: {
        type: Number,
        required: true
      },
      date_time: {
        type: String,
        required: true
      },
      local_team_id: {
        type: Number,
        required: true
      },
      local_team_name: {
        type: String,
        required: true
      },
      visitor_team_id: {
        type: Number,
        required: true
      },
      visitor_team_name: {
        type: String,
        required: true
      },
      venue_id: {
        type: Number,
        required: true
      },
      venue_name: {
        type: String,
        required: true
      },
      referee_id: {
        type: Number,
        required: true
      }
  }, 
  mounted(){
    console.log("Match preview mounted")
  } 
};
</script>

<style>
.match-preview {
  display: inline-block;
  width: 250px;
  height: 300px;
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
