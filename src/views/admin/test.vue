<template>
  <v-data-table
    :headers="headers"
    :items="faculties"
    class="elevation-1"
    @click:row="editFaculty($event)"
    @delete-row="deleteFaculty($event)"
  >
    <template slot="header.name">
      <v-text-field
        v-model="search"
        label="Search"
        clearable
      />
    </template>
    <template slot="item.name">
      {{ faculty.name }}
    </template>
    <template slot="item.department">
      {{ faculty.department }}
    </template>
    <template slot="item.qualification">
      {{ faculty.qualification }}
    </template>
    <template slot="item.dob">
      {{ faculty.dob }}
    </template>
    <template slot="item.email">
      {{ faculty.email }}
    </template>
    <template slot="item.password">
      {{ faculty.password }}
    </template>
    <template slot="item.areaOfInterest">
      {{ faculty.areaOfInterest }}
    </template>
    <template slot="actions">
      <v-icon
        small
        class="mr-2"
        @click="editFaculty($event)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteFaculty($event)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>



export default {
  name: 'FacultyTable',
  data() {
    return {
      faculties: [
  {
    "name": "John Doe",
    "department": "Computer Science",
    "qualification": "PhD",
    "dob": "1980-01-01",
    "email": "johndoe@example.com",
    "password": "password123",
    "areaOfInterest": "Machine Learning"
  },
  {
    "name": "Jane Doe",
    "department": "Mathematics",
    "qualification": "MS",
    "dob": "1985-02-02",
    "email": "janedoe@example.com",
    "password": "password456",
    "areaOfInterest": "Number Theory"
  }
],
      search: '',
    };
  },
  methods: {
    editFaculty(faculty) {
      this.$emit('editFaculty', faculty);
    },
    deleteFaculty(faculty) {
      this.$emit('deleteFaculty', faculty);
    },
  },
};
</script>

<style>
.elevation-1 {
  elevation: 1;
}
</style>