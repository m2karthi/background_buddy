<template>
  <v-data-table
    :headers="headers"
    :items="allFaculties"
    sort-by="designation"
    class="elevation-1 [item.selected && 'selected']"
    @click:row="handleClick"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Faculty Table</v-toolbar-title>
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
                      v-model="editedItem.name"
                      label="Name"
                      type="text"
                      maxlength="30"
                      minlength="3"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="allDesignations"
                      required
                      v-model="editedItem.designation"
                      label="Designation"
                    ></v-select>
                  </v-col>
                  <v-col v-if="editedIndex == -1" cols="12" sm="6" md="4">
                    <v-text-field
                      clearable
                      required
                      v-model="editedItem.email"
                      label="Email"
                      type="email"
                      maxlength="50"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="editedIndex == -1" cols="12" sm="6" md="4">
                    <v-text-field
                      clearable
                      required
                      v-model="editedItem.password"
                      label="Password"
                      type="password"
                      maxlength="30"
                      minlength="6"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      clearable
                      required
                      v-model="editedItem.mobile"
                      label="Mobile (+91)"
                      type="number"
                      maxlength="10"
                      minlength="10"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      v-model="editedItem.dob"
                      label="DOB"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      v-model="editedItem.doj"
                      label="DOJ"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      clearable
                      required
                      :items="allGenders"
                      v-model="editedItem.gender"
                      label="Gender"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      v-model="editedItem.qualification"
                      label="Qualification"
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
import { facultyService } from "../../service";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    allDesignations: ["Assistant Professor", "Associate Profesor", "Professor"],
    allGenders: ["Male", "Female"],
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Designation", value: "designation" },
      { text: "Email", value: "email" },
      { text: "Mobile (+91)", value: "mobile" },
      { text: "DOJ", value: "doj" },
      { text: "Gender", value: "gender" },
      { text: "Qualification", value: "qualification" },

      // { text: 'Actions', value: 'actions', sortable: false },
    ],
    allFaculties: [],
    editedIndex: -1,
    deleItem: null,
    editedItem: {
      id: null,
      name: null,
      designation: null,
      email: null,
      mobile: null,
      password: null,
      dob: null,
      doj: null,
      gender: null,
      qualification: null,
    },
    defaultItem: {
      id: null,
      name: null,
      designation: null,
      email: null,
      mobile: null,
      password: null,
      dob: null,
      doj: null,
      gender: null,
      qualification: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add New Faculty"
        : "Edit Faculty Details";
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
      this.allFaculties = await facultyService.getAllFacultyData();
      //       this.allFaculties = [{
          // id: "f1",
          // name: "John Doe",
          // designation: "Professor",
          // email: "johndoe@example.com",
          // mobile: "1234567890",
          // password: "password123",
          // dob: "1990-01-01",
          // doj: "2010-05-15",
          // gender: "Male",
          // qualification: "Ph.D.",
      //   },
      //   {
      //     id: "f2",
      //     name: "Jane Smith",
      //     designation: "Assistant Professor",
      //     email: "janesmith@example.com",
      //     mobile: "9876543210",
      //     password: "pass123",
      //     dob: "1985-08-10",
      //     doj: "2015-09-20",
      //     gender: "Female",
      //     qualification: "M.Sc.",
      //   },
      //   // Add more faculty objects as needed
      // ];
    },

    editItem(item) {
      this.editedIndex = this.allFaculties.findIndex((object) => {
        return object.id === item.id;
      });
      this.editedItem = Object.assign({}, item);
      this.deleItem= item
      this.dialog = true;
    },

    deleteItem(item) {
      console.log("deleteItem", item);
      // this.editedIndex = this.allFaculties.indexOf(item)
      this.editedIndex = this.allFaculties.findIndex((object) => {
        return object.id === item.id;
      });
      

      console.log("index deleteItem", this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = false;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      // this.allFaculties.splice(this.editedIndex, 1);
      await facultyService.deleteFaculty(this.deleItem);
      console.log("delete Item", this.deleItem);
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
      // this.allFaculties.map((item, index) => {
      //     item.selected = item === row

      //     this.$set(this.allFaculties, index, item)
      // })

      // or just do something with your current clicked row item data
      this.editItem(row);
      console.log(row);
    },

    async save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.allFaculties[this.editedIndex], this.editedItem);
        await facultyService.editFaculty(this.editedItem);
        console.log("edit item", this.editedItem);
        this.initialize();
      } else {
        // this.allFaculties.push(this.editedItem);
        console.log("New item added", this.editedItem);
        await facultyService.signUpFaculty(this.editedItem);
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