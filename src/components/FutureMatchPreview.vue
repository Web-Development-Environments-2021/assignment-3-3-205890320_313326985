<template>
  <div class="match-preview">
    <div :title="id" class="match-title">
      <b>Match Id:</b> {{ id }}
    </div>
    <ul class="match-content">
      <li> Local Team Name: {{ hostTeam }}</li>
      <li> Visitor Team Name: {{ guestTeam }}</li>
      <li> Venue Name: {{venueName}}</li>
      <li> Date And Time: {{ date_time }}</li>
      <li> Referee Id: {{referee_id}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MatchPreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      venueName: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date_time: {
        type: String,
        required: true
      },
      referee_id: {
        type: String,
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
  height: 200px;
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
