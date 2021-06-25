<template>
  <div class="container">
    <h1 class="title">Season Matches</h1>
    <login-page v-if="!$root.store.username"></login-page>
    <div class="season-matches" v-else>
        <div class="match-prev">
        <season-future-preview></season-future-preview >
        </div>
        <div class="match-prev">
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
    }
};
</script>

<style>

* {
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
}

</style>
