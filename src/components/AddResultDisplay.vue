<template>
<div>
        <b-button :disabled="disableResults(currentRow.match_id)" @click="showAddResult=!showAddResult" size="sm"  class="mr-1">
          add results
        </b-button>

          <b-modal
            v-model="showAddResult"
            title="Add results"
            header-bg-variant="info"
            header-text-variant="light"
            hide-backdrop content-class="shadow"
          >
            <b-container fluid>
              <b-row class="mb-1 text-center">
                <b-col><b>Enter goals number for match {{currentRow.match_id}}</b></b-col>
              </b-row>

              <b-row class="mb-1">
                <b-col cols="5">Local Team - {{currentRow.local_team_name}} </b-col>
                <b-col>
                  <b-form-select
                    v-model="localGoals"
                    :options="goals"
                  ></b-form-select>
                </b-col>
              </b-row>

              <b-row class="mb-1">
                <b-col cols="5">Visitor Team - {{currentRow.visitor_team_name}} </b-col>
                <b-col>
                  <b-form-select
                    v-model="visitorGoals"
                    :options="goals"
                  ></b-form-select>
                </b-col>
              </b-row>
            </b-container>

      
            <template #modal-footer>
                <b-button 
                  @click="addResultToTable(currentRow.match_id)"
                  class="float-right"
                >
                  Update
                </b-button>
            </template>
          </b-modal>

</div>
</template>

<script>
export default {
    data(){
        return{
            goals: [0,1, 2, 3, 4, 5, 6, 7, 8],
            localGoals: 0,
            visitorGoals: 0,
            showAddResult: false,
            disableButton: false
        }
    },
    props: {
        currentRow: {
            type: Object,
            required: true
        },
        matchesResults:{
            type: Array,
            required: true
        }
    },
    methods: {
        async addResultToTable(matchId){
          console.log("response");
          try {
            this.axios.defaults.withCredentials = true;
            const response = await this.axios.put(
              "http://localhost:3000/UnionAgent/UpdateResultsMatch", null,{params:{match_id: Number.parseInt(matchId), home_goals: Number.parseInt(this.localGoals), away_goals: Number.parseInt(this.visitorGoals)}}
            );
            this.axios.defaults.withCredentials = false;
            console.log(response);
            if(response.status == 201){
                var row = this.currentRow;
                row.home_goals = this.localGoals;
                row.away_goals = this.visitorGoals;
                console.log(row);
                this.$emit('result-updated', row);
                this.$root.toast("Add Results", "Results Added successfully", "success");
                this.localGoals = 0;
                this.visitorGoals = 0;
                this.showAddResult = false;
                this.disableButton = true;

            }

          } catch (error) {
            console.log("error in update results")
            console.log(error);
            this.$root.toast("Add Results", "Results not added", "danger");
            this.localGoals = 0;
            this.visitorGoals = 0;
          }
        },
        disableResults(match_id){
            if(this.matchesResults.find((element) => element.match_id == match_id) && this.disableButton == false){
              return false;
            }
            else{
              return true;
            }
        }

    }
}
</script>

<style>

</style>