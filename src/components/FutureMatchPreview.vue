<template>
  <div class="match-preview w3-padding w3-black w3-opacity-min">
    <div class="match-title">
       
      <b> <router-link :to="`/team/${local_team_id}`">{{ local_team_name }}</router-link> - <router-link :to="`/team/${visitor_team_id}`">{{ visitor_team_name }}</router-link>   </b>
    </div>
    <br>
    <div class="match-content" style="text-align: center;">
      <b>{{date_time}}</b>
      <br>
      <b>{{venue_name}}</b>
    </div>
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
      local_team_id: {
        type: Number,
        required: true
      },
      visitor_team_id: {
        type: Number,
        required: true
      },
      venue_name: {
        type: String,
        required: true
      }
  }
};
</script>

<style lang="scss" scoped
>
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
