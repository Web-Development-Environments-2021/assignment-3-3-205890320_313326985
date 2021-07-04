<template>
  <div>
    <h1 class="title">Search Page</h1>

    <div class="search-input">
      <b-input-group prepend="Search Query:" id="search">
        <b-form-input v-model="searchQuery"></b-form-input>
        <!-- <b-input-group-append>
        <button type="button" class="btn btn-outline-primary">Search</button>
        </b-input-group-append> -->
      </b-input-group>
        <br/>
        Your search Query: {{ searchQuery }}
    </div>
    
    <div class="search-input">
    <h3 class="title">Search for..</h3>
    <b-form-group>
        <b-form-select 
        v-model="filterByObject"
        :options="filteringObjects"
        ></b-form-select>
      </b-form-group>
        <br/>
        Your filterByObject: {{ filterByObject }}
    </div>

    <div v-if="filterByObject === 'Players'" class="search-input">
      <h3 class="title">Filter your search results?</h3>
      <b-form-group >
          <b-form-select 
          v-model="filterByAttribue"
          :options="filterAttributes"
          ></b-form-select>
        </b-form-group>
          <br/>
          Your filterByAttribue: {{ filterByAttribue }}
    </div>

    <div v-if="filterByAttribue != 'None' && filterByAttribue">
        <b-input-group prepend="Filter Query:" class="search-input">
          <b-form-input v-model="filterQuery"></b-form-input>
          <!-- <b-input-group-append>
          <button type="button" class="btn btn-outline-primary">Search</button>
          </b-input-group-append> -->
        </b-input-group>
          <br/>
          Your filter Query: {{ filterQuery }}
    </div>

  </div>

</template>

<script>
export default {
 data() {
    return {
      searchQuery:"",
      filterByObject: "",
      filterByAttribue: "",
      filterQuery:"",
      filteringObjects:["Teams","Players"],
      filterAttributes:["Player's position","Team name","None"]
    };
},
validations:{
  searchQuery:{
    required,
    alpha
  },
  
}
}
</script>

<style scoped>

.search-input {
  margin-left: 20px; 
  width: 400px; 
  
}

#search{
  padding-top: 30px;
}

#filterbutton{
display: inline-block; 
}
</style>