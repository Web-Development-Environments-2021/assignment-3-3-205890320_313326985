<template>
  <div class="matchEvent-preview">
    <div :title="type" class="matchEvent-title">
      <b>Event Type:</b> {{ type }}
    </div>
    <ul class="matchEvent-content">
      <li> Date And Time Happend: {{ date_and_time_happend }}</li>
      <li> Minute: {{minute}}</li>
      <li> Description: {{ description }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "matchEventPreview",
  props: {
      type: {
        type: String,
        required: true
      },
      date_and_time_happend: {
        type: String,
        required: true
      },
      minute: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      }
      
  }
};
</script>

<style lang="scss" scoped
>
.matchEvent-preview {
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

.matchEvent-preview .match-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.matchEvent-preview .match-content {
  width: 100%;
  overflow: hidden;
}



</style>
