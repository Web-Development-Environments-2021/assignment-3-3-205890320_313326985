<template>
  <div class="container">
    <h1 class="title">Favorite Matches Page</h1>
    <login-page v-if="!$root.store.username"></login-page>
    <favorite-matches v-else></favorite-matches>
  </div>
</template>

<script>
import FavoriteMatches from "../components/FavoriteMatches";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LoginPage, 
    FavoriteMatches
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
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
