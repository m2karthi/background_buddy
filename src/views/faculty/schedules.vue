<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="schedules"
    class="elevation-1"
    @click:row="handleClick"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Schedule Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch> -->
      </v-toolbar>

      <v-dialog v-model="dialogDelete" max-width="550px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to request for schedule change??</v-card-title
            >
            <!-- <v-card-text> -->
              <v-col class="ml-8" cols="12" sm="6" md="4">
                    <v-text-field
                      clearable
                      required
                      v-model="resDesc"
                      label="Remarks"
                      type="text"
                      maxlength="30"
                      minlength="3"
                    ></v-text-field>
                  </v-col>
            <!-- </v-card-text> -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Request</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogAccept" max-width="550px">
          <v-card>
            <v-card-title class="text-h6"
              >The Schedule change is  <span :class="clas" color="white" class="pa-2 ml-2">  {{ stat }} </span></v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Close</v-btn
              >
              
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>

    
    <!-- <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about {{ item.name }}
      </td>
    </template> -->
  </v-data-table>
</template>

<script>
import { facultyService, scheduleService } from '../../service'
  export default {
    data () {
      return {
    dialogDelete: false,
    dialogAccept:false,
    deleItem: null,
    editedItem: null,
    stat: "Requested",
    clas: "red",
    resDesc: null,


        expanded: [],
        singleExpand: false,
        dessertHeaders: [
         {
        text: "Exam",
        align: "start",
        value: "exam.title",
      },
      { text: "Faculty", value: "selectedFaculty.name" },
      { text: "class", value: "class" },
      // { text: "Subject", value: "subject" },
      { text: "Date", value: "date" },
      { text: "StartTime", value: "startTime" },
      { text: "EndTime", value: "endTime" },
        ],
        schedules: [
          
        ],
      }
    },
    watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
    created(){
      this.init()
    },
    methods: {
      async init() {
       const res=  await facultyService.getUserById()
       this.schedules= res.schedules

      },

       handleClick(row) {
        if(row.status == "Accept"){
          this.stat= "Accepted"
          this.clas= "green"
          this.dialogAccept = true
        }
        else if(row.status == "Request"){
          this.stat= "Requested"
          this.clas= "yellow"
          this.dialogAccept = true
        }else if(row.status == "Reject"){
          this.stat= "Rejected"
          this.clas= "red"

          this.dialogAccept = true
        }else{
          this.deleteItem(row);
          console.log(row);

        }
    },

    deleteItem(item) {
      console.log("deleteItem", item);
      // this.editedIndex = this.allFaculties.indexOf(item)
      this.deleItem = item
      

      console.log("index deleteItem", this.editedIndex);
      this.editedItem = Object.assign({}, item);
     
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {

      this.deleItem['status'] = 'Request'
      this.deleItem['description'] = this.resDesc

      console.log("delete Item", this.deleItem);
      console.log("deleteItemConfirm");
      await scheduleService.updateScheduleData(this.deleItem)
      this.closeDelete();
      this.init()
    },

    close() {
    
     this.editedItem = null;
     this.deleItem = null
    },

    closeDelete() {
      this.dialogDelete = false;
      this.dialogAccept= false
      this.editedItem = null;
     this.deleItem = null
      
    },
    }
  }
</script>

<style>

</style>