<template>
  <div class="container">
    <h1 class="title">Season Matches</h1>
    <login-page v-if="!$root.store.username"></login-page>
    <div class="season-matches" v-else>
      <button class="btn  btn-lg btn-dark btn-outline-info" data-toggle="button" @click="display_flag=!display_flag">
        Change Matches Table Between Past & Future
      </button>
        <div id="future" class="match-prev" v-if="display_flag">
          <h2> Future Matches </h2>
        <season-future-preview></season-future-preview >
        </div>
        <div id="past" class="match-prev" v-if="!display_flag">
          <h2> Past Matches </h2>
        <season-past-preview></season-past-preview >
        </div>
    </div>
  </div>
</template>

<script>
import SeasonPastPreview from "../components/SeasonPastPreview";
import SeasonFuturePreview from "../components/SeasonFuturePreview";
import LoginPage from "../pages/LoginPage";
export default {
    components:
    {
        SeasonPastPreview,
        SeasonFuturePreview,
        LoginPage
    },
    data(){
      return{
        display_flag:true
      }
    }
};
</script>

<style>

/* * {
  box-sizing: border-box;
}

.season-matches{
  display: flex;
  margin-left:-180px;
}

.title{
  margin-left:-180px;
}

.match-prev {
  flex: 50%;
  padding: 5px;
} */

</style>
