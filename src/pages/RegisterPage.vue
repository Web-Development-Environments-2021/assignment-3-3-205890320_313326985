<template>
  <div class="container" style="background-color: rgb(255,255,255,.8);">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="Firstname:"
        label-for="firstname"
      >
        <b-form-input
          id="firstname"
          v-model="$v.form.firstname.$model"
          type="text"
          :state="validateState('firstname')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstname.alpha">
          First name consists only of letters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Lastname:"
        label-for="lastname"
      >
        <b-form-input
          id="lastname"
          v-model="$v.form.lastname.$model"
          type="text"
          :state="validateState('lastname')"
        ></b-form-input>
         <b-form-invalid-feedback v-if="!$v.form.lastname.alpha">
          Last name consists only of letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="!$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.mustHaveOneSpecialChar"
        >
          Have at least one special char 
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.mustHaveOneNumber"
        >
          Have at least one number
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
        ></b-form-input>
        
        <b-form-invalid-feedback 
        v-if="!$v.form.email.required">
        Email is required</b-form-invalid-feedback>
        <b-form-invalid-feedback 
        v-if="!$v.form.email.email">
        Email is invalid</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-imageurl"
        label-cols-sm="3"
        label="Image URL:"
        label-for="imageurl"
      >
        <b-form-input
          id="imageurl"
          v-model="$v.form.imageurl.$model"
          type="text"
          :state="validateState('imageurl')"
        ></b-form-input>
        
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        @click="checkIfSubmitOK()"
        >Register</b-button
      >
      <div class="mt-2">
        Already have an account?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>

  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  helpers
} from "vuelidate/lib/validators";
const mustHaveOneSpecialChar = (value) => /[#?!@$%^&*-]/.test(value)
const mustHaveOneNumber = (value) => /[0-9]/.test(value)

import { isWebUri } from 'valid-url'
const url = helpers.withParams(
  { type: 'url' },
  (value) => !helpers.req(value) || !!isWebUri(value)
)

export default {
  name: "Register", 
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        imageurl:"",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstname: {
        alpha
      },
      lastname: {
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        mustHaveOneSpecialChar,
        mustHaveOneNumber
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email:{
        required,
        email
      },
      imageurl:{
        url
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    checkIfSubmitOK(){
      if(this.$v.$anyError != false){
        
        this.$root.toast("Register", "Error in registration", "danger");
      }
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/Register",
          {
            username: this.form.username,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email,
            imageurl: this.form.imageurl,
          }
        );
        this.$router.push("/login");
        this.$root.toast("Register", this.form.username+ " Registered successfully", "success");

      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
        this.$root.toast("Register", err.response.data, "danger");

      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        imageurl:""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
