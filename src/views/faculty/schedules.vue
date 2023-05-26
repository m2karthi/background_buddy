<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="schedules"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch> -->
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about {{ item.name }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { facultyService } from '../../service'
  export default {
    data () {
      return {
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
    created(){
      this.init()
    },
    methods: {
      async init() {
       const res=  await facultyService.getUserById()
       this.schedules= res.schedules

      }
    }
  }
</script>

<style>

</style>