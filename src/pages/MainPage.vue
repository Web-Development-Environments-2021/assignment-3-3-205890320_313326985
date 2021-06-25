<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="login">
    <LoginPage v-if="!$root.store.username"></LoginPage>
    </div>
    <div>
    <LeagueInfo v-if="$root.store.username"></LeagueInfo>
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
.RandomRecipes {
  margin: 10px 0 10px;
}
.login{
  float: right;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
