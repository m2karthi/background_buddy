<template>
  <v-data-table
    :headers="headers"
    :items="allExams"
    class="elevation-1 [item.selected && 'selected']"
    @click:row="handleClick"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Exams Table</v-toolbar-title>
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add New
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      clearable
                      required
                      v-model="editedItem.title"
                      label="Title"
                      type="text"
                      maxlength="30"
                      minlength="2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="allDept"
                      required
                      v-model="editedItem.dept"
                      label="Dept"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="allCourse"
                      required
                      v-model="editedItem.course"
                      label="Course"
                    ></v-select>
                  </v-col>
                
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      clearable
                      required
                      v-model="editedItem.startTime"
                      label="startTime"
                      type="time"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      v-model="editedItem.endTime"
                      label="endTime"
                      type="time"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      v-model="editedItem.date"
                      label="Date"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      clearable
                      required
                      :items="allYear"
                      v-model="editedItem.year"
                      label="Year"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      v-model="editedItem.subject"
                      label="Subject"
                      clearable
                      maxlength="30"
                      minlength="2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      v-model="editedItem.section"
                      label="Section"
                      clearable
                      maxlength="30"
                      minlength="2"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn
                v-if="editedIndex != -1"
                color="error darken-1"
                text
                @click="deleteItem(editedItem)"
              >
                Delete
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template> -->
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { examService } from "../../service";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    allDept: ["CSE", "ECE", "CCE", "EEE", "ELC", "MECH", "CIVIL"],
    allYear: [1,2,3,4],
    allCourse: ["B.Tech", "M.Tech", "Bsc", "Msc"],
    headers: [
      {
        text: "Title",
        align: "start",
        value: "title",
      },
      { text: "Course", value: "course" },
      { text: "Dept", value: "dept" },
      { text: "Subject", value: "subject" },
      { text: "Date", value: "date" },
      { text: "StartTime", value: "startTime" },
      { text: "EndTime", value: "endTime" },
      { text: "Year", value: "year" },
      { text: "Section", value: "section" },

      // { text: 'Actions', value: 'actions', sortable: false },
    ],
    allExams: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      title: null,
      dept: null,
      section: null,
      startTime: null,
      course: null,
      date: null,
      endTime: null,
      year: null,
      subject: null,
    },
    defaultItem: {
       id: null,
      title: null,
      dept: null,
      section: null,
      startTime: null,
      course: null,
      date: null,
      endTime: null,
      year: null,
      subject: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add New Exam"
        : "Edit Exam Details";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.allExams = await examService.getAllExamData();
      //       this.allExams = [{
      //     id: "f1",
      //     title: "John Doe",
      //     dept: "Professor",
      //     email: "johndoe@example.com",
      //     startTime: "1234567890",
      //     password: "password123",
      //     date: "1990-01-01",
      //     endTime: "2010-05-15",
      //     year: "Male",
      //     subject: "Ph.D.",
      //   },
      //   {
      //     id: "f2",
      //     title: "Jane Smith",
      //     dept: "Assistant Professor",
      //     email: "janesmith@example.com",
      //     startTime: "9876543210",
      //     password: "pass123",
      //     date: "1985-08-10",
      //     endTime: "2015-09-20",
      //     year: "Female",
      //     subject: "M.Sc.",
      //   },
      //   // Add more faculty objects as needed
      // ];
    },

    editItem(item) {
      this.editedIndex = this.allExams.findIndex((object) => {
        return object.id === item.id;
      });
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log("deleteItem", item);
      // this.editedIndex = this.allExams.indexOf(item)
      this.editedIndex = this.allExams.findIndex((object) => {
        return object.id === item.id;
      });

      console.log("index deleteItem", this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = false;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      // this.allExams.splice(this.editedIndex, 1);
      // await examService.deleteFaculty(this.editedItem);
      console.log("delete Item", this.editedItem);
      console.log("deleteItemConfirm");
      this.closeDelete();
      this.initialize()
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    handleClick(row) {
      // set active row and deselect others
      // this.allExams.map((item, index) => {
      //     item.selected = item === row

      //     this.$set(this.allExams, index, item)
      // })

      // or just do something with your current clicked row item data
      this.editItem(row);
      console.log(row);
    },

    async save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.allExams[this.editedIndex], this.editedItem);
        await examService.updateExamData(this.editedItem);
        console.log("edit item", this.editedItem);
        this.initialize();
      } else {
        // this.allExams.push(this.editedItem);
        console.log("New item added", this.editedItem);
        await examService.addExamData(this.editedItem);
        this.initialize();
      }
      this.close();
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: red;
}
</style>