<template>
  <div class="container">
    <h1 class="title">Home Page</h1>
    <div class="login">
    <login-page v-if="!$root.store.username"></login-page>
    </div>
    <div>
    <league-info></league-info>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage
  }
};
</script>

<style lang="scss" scoped>
.login{
  float: right;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur{
  pointer-events: none;
  cursor: default;
}
</style>
