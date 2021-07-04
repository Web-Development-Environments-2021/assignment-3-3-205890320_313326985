<template>
  <div @submit.prevent="onRegister" @reset.prevent="onReset">
    <h1 class="title">Search Page</h1>
    <div class="search-input">
      <b-input-group prepend="Search Query:" id="searchquery">
        <b-form-input v-model="searchQuery">
          :state="validateState('searchquery')"
        </b-form-input>
        <!-- <b-input-group-append>
        <button type="button" class="btn btn-outline-primary">Search</button>
        </b-input-group-append> -->
        <b-form-invalid-feedback v-if="!$v.searchQuery.required">
          Search Query is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.searchQuery.alpha">
          Search Query consists only of letters
        </b-form-invalid-feedback>
      </b-input-group>
        <br/>
        Your search Query: {{ searchQuery }}
    </div>
    
    <div class="search-input">
    <h3 class="title">Search for..</h3>
    <b-form-group id="searchobjects">
        <b-form-select 
        v-model="searchByObject"
        :options="searchingObjects"
        ></b-form-select>
      </b-form-group>
        <br/>
        Your searchByObject: {{ searchByObject }}
    </div>

    <div v-if="searchByObject === 'Players'" class="search-input">
      <h3 class="title">Filter your search results?</h3>
      <b-form-group id="filterattributes">
          <b-form-select 
          v-model="filterByAttribue"
          :options="filterAttributes"
          ></b-form-select>
        </b-form-group>
          <br/>
          Your filterByAttribue: {{ filterByAttribue }}
    </div>

    <div v-if="filterByAttribue != 'None' && filterByAttribue">
        <b-input-group prepend="Filter Query:" class="search-input" id="filterquery">
          <b-form-input v-model="filterQuery"></b-form-input>
          <!-- <b-input-group-append>
          <button type="button" class="btn btn-outline-primary">Search</button>
          </b-input-group-append> -->
        </b-input-group>
          <br/>
          Your filter Query: {{ filterQuery }}
    </div>

  <b-button type="reset" variant="danger">Reset</b-button>
  <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Search</b-button
      >

  <b-alert 
      class="mt-2"
      v-if="submitError"
      variant="warning"
      dismissible
      show
    >
      Search failed: {{ submitError }}
    </b-alert>


  </div>

</template>

<script>
import {
  required,
  alpha,
} from "vuelidate/lib/validators";

export default {
 data() {
    return {
      validated: false,
      submitError: undefined,
      errors: [],
      searchQuery:"",
      searchByObject: "",
      filterByAttribue: "",
      filterQuery:"",
      searchingObjects:["Teams","Players"],
      filterAttributes:["Player's position","Team name","None"]
    };
},
validations:{
  searchQuery:{
    required,
    alpha
  },

},
methods:{
  validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
  },
  onReset(){
    searchQuery="";
    filterByObject= "";
    filterByAttribue= "";
    filterQuery="";
    this.$nextTick(() => {
        this.$v.$reset();
    });
  }
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