<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Superliga System</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        <b-nav-item :to="{ name: 'seasonMatches' }">Season's Matches</b-nav-item>
        </b-navbar-nav>
        
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
        <b-nav-text id=helloguest>Hello, guest</b-nav-text>
        <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
        <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right v-if="$root.store.unionAgent">
          <template #button-content>
            UnionAgent
          </template>
          <b-dropdown-item href="#/UnionAgent/leagueManage">League Management</b-dropdown-item>
          <!-- <b-dropdown-item href="#/addEventsLog">Add Events-Log to match</b-dropdown-item>
          <b-dropdown-item href="#/updateMatchResults">Update match results </b-dropdown-item>
          <b-dropdown-item href="#/updateMatchReferee">Update match referee</b-dropdown-item> -->
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template #button-content>
            Hello, {{$root.store.username}}
          </template>
          <b-dropdown-item href="#/favoriteMatches">Favorites</b-dropdown-item>
          <b-dropdown-item href="#" @click="Logout()">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#helloguest{
  padding-right:10px;
}
</style>
