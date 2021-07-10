<template>
<div>
    
    <b-button :disabled="disableEvents(currentRow.match_id, currentRow.events)"  v-b-toggle.collapse-1 class="mr-1">
      add event 
    </b-button>
    <b-collapse id="collapse-1" class="mt-2">
        <b-card>
            <b-form inline>
                <b-row>
                <b-col>
                <label for="sb-inline">Minute</label>
                <b-form-spinbutton 
                    id="sb-inline" 
                    v-model="minute" 
                    inline
                    min="0"
                    max="130"
                    step="1" >
                </b-form-spinbutton>
                </b-col>
                <b-col>
                    <label>Type</label>
                    <b-form-select
                      id="inline-form-custom-select-pref"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      :options="['Goal', 'Red Card', 'Yellow Card', 'Injury', 'Substitute','None']"
                      v-model="selectType"
                    ></b-form-select>
                </b-col>
                <b-col>
                <label >Description</label>
                <b-form-input v-model="description" id="inline-form-input-username" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Description"></b-form-input>
                </b-col>
                <b-col>
                 <br>
                <b-button variant="primary" @click="addEventToTable()">Save</b-button>
                </b-col>
                </b-row>
            </b-form>

        </b-card>
  </b-collapse>
</div>

</template>

<script>
export default {
    data(){
        return{
            minute: 0,
            selectType: 'None',
            description: ''

        }

    },
    props: {
        currentRow:{
            type: Object,
            required: true
        },
        matchesEvents:{
            type: Array,
            required: true
        }

    },
    methods: {
        disableEvents(match_id, event){
          if(this.matchesEvents.find((element) => element.match_id == match_id)){
            return false;
          }
          else{
            return true;
          }
        },
        async addEventToTable(){
          console.log("response");
          var date = new Date(this.currentRow.date_time)
          var new_date = new Date(date.getTime() + this.minute*60000)
          try {
            this.axios.defaults.withCredentials = true;
            const response = await this.axios.post(
              "http://localhost:3000/UnionAgent/addEventsLog",null,{params:{match_id: Number.parseInt(this.currentRow.match_id)}, data:new Array({date_and_time_happend: new_date,minute: Number.parseInt(this.minute), type: this.selectType, description: this.description })}
            );
            this.axios.defaults.withCredentials = false;
            console.log(response);
            if(response.status == 201){
                this.$root.toast("Add event", "Event Added successfully", "success");
                var row = this.currentRow;
                console.log(this.currentRow);
                row.events.push({'event_id': '', 'date_and_time_happend': new_date.toISOString(),'minute': Number.parseInt(this.minute), 'type': this.selectType, 'description': this.description});
                this.$emit('event-updated', row);
                this.minute=0;
                this.selectType='None';
                this.description= '';
            }
            if(response.status == 206){
                this.$root.toast("Add event", "This event already exist", "danger");
            }

          } catch (error) {
            console.log("error in add event")
            console.log(error);
            this.$root.toast("Add event", "Event not added", "danger");

          }
        },
    }

}
</script>

<style lang="scss" scoped
>

</style>