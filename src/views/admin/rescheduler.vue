<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="exam in exams" :key="exam.id" cols="4">
          <v-card class="pa-4" :color="exam.color">
            <div class="headline font-weight-bold title">{{ exam.exam.title }}</div>
            <div class="caption duration">{{ exam.startTime }} - {{ exam.endTime }}</div>
            <div class="name">{{ exam.selectedFaculty.name }}, {{ exam.selectedFaculty.designation}}</div>
            <div class="body-2 mt-4 description">{{ exam.description }}</div>
            <v-row class="mt-4">
              <v-col v-if="exam.status == 'Request'"  cols="6">
                <v-btn
                  color="green"
                  dark
                  @click="updateStatus(exam, 'Accept')"
                >
                  Accept
                </v-btn>
              </v-col>
              <v-col v-if="exam.status == 'Request'" cols="6">
                <v-btn
                  color="red"
                  dark
                  @click="updateStatus(exam, 'Reject')"
                >
                  Reject
                </v-btn>
              </v-col>

              <v-col v-if="exam.status == 'Accept'" cols="6">
                <v-btn
                  color="green"
                  dark
                  
                >
                  Accepted Request
                </v-btn>
              </v-col>

              <v-col v-if="exam.status == 'Reject'" cols="6">
                <v-btn
                  color="red"
                  dark
               
                >
                  Rejected Request
                </v-btn>
              </v-col>
            </v-row>

           
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { scheduleService } from '../../service';
export default {
  data() {
    return {
      exams: [
        {
          id: 1,
          title: 'Exam 1',
          startTime: '10:00 AM',
          endTime: '12:00 PM',
          assignee: 'John Doe',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          color: 'blue lighten-1',
          status: 'Pending',
        },
        {
          id: 2,
          title: 'Exam 2',
          startTime: '2:00 PM',
          endTime: '4:00 PM',
          assignee: 'Jane Smith',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
          color: 'green lighten-1',
          status: 'Pending',
        },
        {
          id: 3,
          title: 'Exam 3',
          startTime: '4:30 PM',
          endTime: '6:30 PM',
          assignee: 'Alice Johnson',
          description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui.',
          color: 'orange lighten-1',
          status: 'Pending',
        },
        {
          id: 3,
          title: 'Exam 3',
          startTime: '4:30 PM',
          endTime: '6:30 PM',
          assignee: 'Alice Johnson',
          description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui.',
          color: 'orange lighten-1',
          status: 'Pending',
        },
        
        // Add more exams as needed
      ],
    };
  },
  created(){
    this.init()
  },
  methods: {

    async init(){
      this.exams= await scheduleService.getReScheduleData()
      console.log("this.exams",this.exams)
    },

    async updateStatus(exam, status) {
      exam['status'] = status
      console.log("exam",exam)

      await scheduleService.updateScheduleData(exam)
      this.init()
      
    },
  },
};
</script>

<style>
.headline {
  font-size: 18px;
}

.caption {
  font-size: 14px;
}

.body-2 {
  font-size: 16px;
}
</style>
