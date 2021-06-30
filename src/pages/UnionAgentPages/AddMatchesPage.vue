<template>
  <div class="card" >
      <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#/UnionAgent/leagueManage">Matches list</a></li>
            <li class="breadcrumb-item active" aria-current="page">Add match</li>
        </ol>
    </nav>
    <div class="card-body">
      <h1 class="title">Add Match</h1>
        <b-form>
            <b-form-group
                id="input-group-LocalTeamName"
                label-cols-sm="2"
                label="Local Team Name:"
                label-for="LoalTeamName"
            >
                <b-form-select 
                    class="form-select form-select-sm" aria-label=".form-select-sm example"
                    id="LoalTeamName"
                    v-model="$v.form.localteam.$model"

                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </b-form-select>
                <b-form-invalid-feedback>
                  Local team name is required
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                id="input-group-VisitorTeamName"
                label-cols-sm="2"
                label="Visitor Team Name:"
                label-for="VisitorTeamName"
            >
                <b-form-select
                    class="form-select form-select-sm" aria-label=".form-select-sm example"
                    id="VisitorTeamName"
                    v-model="$v.form.visitorteam.$model"

                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </b-form-select>
                <b-form-invalid-feedback>
                  Visitor team name is required
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                id="input-group-VenueName"
                label-cols-sm="2"
                label="Venue Name:"
                label-for="VenueName"
            >
                <b-form-select
                    class="form-select form-select-sm" aria-label=".form-select-sm example"
                    id="VenueName"
                    v-model="$v.form.venue.$model"

                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </b-form-select>
                <b-form-invalid-feedback>
                  Visitor team name is required
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                id="input-group-Referee"
            >
            <h4>Select Referee</h4>
                <b-form-select 
                    class="form-select form-select-sm" aria-label=".form-select-sm example"
                    id="LoalTeamName"
                    v-model="$v.form.localteam.$model"

                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </b-form-select>
                <b-form-invalid-feedback>
                  Local team name is required
                </b-form-invalid-feedback>
            </b-form-group>

        </b-form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
    data(){
        return{
            teamNames: [],
            venueNames: [],
            referees: [],
            form: {
            localteam: "",
            visitorteam: "",
            venue: "",
            submitError: undefined
            }
        };
    },
    validations: {
        form: {
            localteam: {
                required, 
            },
            visitorteam: {
                required,
            },
            venue: {
                required
            }
        }
    },
    methods: {
        async updateValues(){
            console.log("response");
            try {
                this.axios.defaults.withCredentials = true;
                const response = await this.axios.get(
                    "http://localhost:3000/UnionAgent/addMatch"
                );
                this.axios.defaults.withCredentials = false;
                const values = response.data
                this.teamNames = [];
                this.venueNames = [];
                this.referees = [];
                console.log(values);
                this.teamNames.push(...values["teams"]);
                this.venueNames.push(...values["venues"]);
                this.referees.push(...values["referees"]);
            } catch (error) {
              console.log("error in update matches")
              console.log(error);
            }
        }
    },
    mounted(){
        console.log("add game page mounted");
        this.updateValues();
    }

}
</script>

<style>

</style>