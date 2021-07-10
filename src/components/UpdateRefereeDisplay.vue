<template>
<div>
        <b-card>
          <b-row>
            <b-col>
                <b-card 
                  header="Referee details"
                  class="mb-2"
                  align="center"

                >
                    <b-card-text>
                      <b-table show-empty stacked :items="currentRow.referee" :fields="fieldsReferee">
                      </b-table>
                    </b-card-text>

                    <b-button :disabled="disableReferee(currentRow.home_goals)"  @click="showUpdateReferee=!showUpdateReferee" class="mr-1">
                      update referee
                    </b-button>
                </b-card>
            </b-col>
            </b-row>
        </b-card>

          <b-modal
            v-model="showUpdateReferee"
            title="Update referee"
            header-bg-variant="info"
            header-text-variant="light"
            hide-backdrop content-class="shadow"

          >
            <b-container fluid>
              <b-row class="mb-1 text-center">
                <b-col><b>Choose referee for match {{currentRow.match_id}}:</b></b-col>
              </b-row>

              <b-row class="mb-1">
                <b-col>
                <b-form-group
                    label-cols-sm="3"
                    label-align-sm="right"
                >
                    <b-form-radio-group v-model="selectedReferee" :options="referees" name="radio-options"></b-form-radio-group>
                </b-form-group>
                </b-col>
              </b-row>

            </b-container>

      
            <template #modal-footer>
                <b-button 
                    @click="UpdateRefereeInTable(currentRow.match_id)"
                    class="float-right"
                    :disabled="disableUpdateButton()"
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
            referees: [],
            selectedReferee: null,
            showUpdateReferee: false,
            fieldsReferee:[
                {key: 'firstname', label: 'First Name'},
                {key: 'lastname', label: 'Last Name'},
                {key: 'course', label: 'Course'},
            ],
        }
    },
    props: {
        currentRow: {
            type: Object,
            required: true
        },
    },
    methods: {
        disableUpdateButton(){
            return !Boolean(this.selectedReferee)
        },
        async updateReferees(){
          console.log("response");
          try {
            this.axios.defaults.withCredentials = true;
            const response = await this.axios.get(
              "http://localhost:3000/UnionAgent/UpdateRefereeMatch"
            );
            this.axios.defaults.withCredentials = false;
            console.log(response);

            this.referees = [];
            let referees = []
            referees.push(...response.data);

            for(var i=0 ; i<referees.length;i++){
                this.referees.push({text: referees[i]["firstname"] + ' ' + referees[i]["lastname"] + ' - ' + referees[i]["course"] + ' Referee', value: referees[i]})
            }


          } catch (error) {
            console.log("error in update referee")
            console.log(error);

          }
        },
        async UpdateRefereeInTable(matchId){
          console.log("response");
          try {
            this.axios.defaults.withCredentials = true;
            const response = await this.axios.put(
              "http://localhost:3000/UnionAgent/UpdateRefereeMatch", null,{params:{referee_id: Number.parseInt(this.selectedReferee.referee_id), match_id: Number.parseInt(matchId)}}
            );
            this.axios.defaults.withCredentials = false;
            console.log(response);
            if(response.status == 201){
                this.$root.toast("Update referee", "Referee updated successfully", "success");
                var row = this.currentRow;
                console.log(this.currentRow);
                row.referee = [this.selectedReferee];
                this.$emit('referee-updated', row);
                this.selectedReferee = null;

            }

          } catch (error) {
            console.log("error in update results")
            console.log(error);
            this.$root.toast("Update referee", "Referee not updated", "danger");
          }
        },
        disableReferee(home_goals){
            return Number.isInteger(home_goals);
    },
    },
    mounted(){
        this.updateReferees();
        // this.row = this.currentRow;
        console.log("update referee mounted");
  },
}
</script>

<style>

</style>