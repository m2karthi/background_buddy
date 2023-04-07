<template>
  <v-app>
    <!-- Drawer -->
    <v-navigation-drawer
      app
      v-model="drawer"
      permanent
      height="100vh"
      class="primary"
    >
      <div id="logo">
        <h3 class="white--text">Student Portal</h3>
      </div>

      <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.route"
          link
          class="mt-2"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="ml-n6">
            <v-list-item-title class="caption white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <h4 class="mt-6 font-weight-medium white--text">Account</h4> -->
        <!-- <v-list-item
              v-for="item in accountItems"
              :key="item.title"
              :to="item.route"
              link
              class="mt-2"
            >
              <v-list-item-icon>
                <v-icon color="white">{{ item.icon }}</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content class="ml-n6">
                <v-list-item-title class="caption white--text">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app elevation="4" class="primary" id="navbar">
      <!-- <v-app-bar-nav-icon @click.stop="showHideNav()"></v-app-bar-nav-icon> -->
      <!-- <v-app-bar-title><h5>a</h5></v-app-bar-title> -->
      <!-- <div class="d-flex align-center ml-3">
            <v-img
              alt="WebHead Logo"
              class="shrink mr-2 mt-6"
              contain
              src="../../assets/logo.svg"
              transition="scale-transition"
            />
          </div> -->

      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        open-on-hover
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn icon class="mr-0">
      </v-btn> -->
          <v-btn text dark v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-bell-badge-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ username }}</v-list-item-title>
                <v-list-item-subtitle
                  >You have a new notification</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  :class="fav ? 'green--text' : ''"
                  icon
                  @click="fav = !fav"
                >
                  <v-icon>mdi-bell-badge</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch v-model="message" color="purple"></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable E-mail messages</v-list-item-title>
            </v-list-item>

            <v-list-item class="my-0">
              <!-- <v-icon class="pr-2">mdi-help-network</v-icon> -->
              <v-avatar class="my-0">
                <!-- <img src="../assets/profile-small.svg" width="5" alt="John" /> -->
                <v-icon small class=""> fa-brands fa-amazon </v-icon>
              </v-avatar>
              <v-list-item-title
                >A new opportunity here from Amazon</v-list-item-title
              >
            </v-list-item>
          </v-list>

          <!-- <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false"> Cancel </v-btn>
            <v-btn color="primary" text @click="menu = false"> Save </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-menu>
      <!-- <v-menu bottom origin="center center" transition="scale-transition">
        <template> -->
      <!-- <v-btn href="" text>
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="../assets/profile-small.svg"
        />
        <div class="mr-3 ml-2">
          <div class="black--text">{{ username }}</div>
          <div class="grey--text subtitle-2">Student</div>
        </div>
        <v-icon class="ml-1" color="black">mdi-chevron-down</v-icon>
      </v-btn> -->
      <!-- </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <v-menu offset-y class="error pa-0 ma-0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" text dark v-bind="attrs" v-on="on">
            <v-img
              alt="Vuetify Logo"
              class="shrink"
              contain
              src="../assets/profile-small.svg"
            />
            <div class="mr-3 ml-2">
              <div class="black--text">{{ username }}</div>
              <div class="grey--text subtitle-2">Student</div>
            </div>
            <v-icon class="ml-1" color="black">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list class="error pa-0 ma-0">
          <v-list-item @click="logout">
            <v-icon class="mr-1" color="black">mdi-logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="pa-4">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app color="black">
      <span
        >@2023 | Made with 💖 by<a
          class="link"
          target="_blank"
          href="https://webilicious.in"
        >
          Webilicious</a
        ></span
      >
      <v-spacer></v-spacer>
      <ul class="footer-right">
        <li>
          <a class="link" target="_blank" href="https://webilicious.in"
            >Webilicious</a
          >
        </li>
        <li>Help</li>
        <li>Terms</li>
      </ul>
    </v-footer>
  </v-app>
</template>
      
      <script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "userLayout",
  components: {},
  data() {
    return {
      drawer: true,
      isPermanent: false,
      isTemporary: false,
      menuItems: [],
      accountItems: [],
      fav: true,
      menu: false,
      message: false,
      hints: true,
      username: null,

      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
    };
  },
  created() {
    this.init();
  },
  computed: {},
  methods: {
    async init() {
      this.username = this.$route.params.id;
      console.log("username", this.username);
      this.getMenuItems();
    },

    async getMenuItems() {
      this.menuItems = [
        {
          title: "Home",
          icon: "fa-solid fa-house",
          route: "/student/dashboard/" + this.username,
        },
        {
          title: "Job Applicatons",
          route: "/student/drives/" + this.username,
          icon: "fa-solid fa-paperclip",
        },
        {
          title: "Profile",
          route: "/student/user/" + this.username,
          icon: "fa-solid fa-graduation-cap",
        },
        {
          title: "Help",
          route: "/student/help/" + this.username,
          icon: "mdi-help-network",
        },
      ];

      this.accountItems = [
        {
          title: "Institute",
          icon: "fa-solid fa-school",
          route: "/institute/1",
        },
        {
          title: "Settings",
          icon: "fa-solid fa-gear",
          route: "/settings/academy",
        },
      ];
    },
    logout() {
      this.$router.push(`/login`);
    },
    showHideNav() {
      if (this.drawer) {
        this.drawer = false;
        this.isPermanent = false;
        this.isTemporary = true;
      } else if (!this.drawer) {
        this.drawer = true;
        this.isPermanent = false;
        this.isTemporary = false;
      }
    },
  },
};
</script>
      
      <style scoped>
.mainn {
  background-color: rgb(211, 211, 211);
}

#logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-navigation-drawer {
  padding: 20px 20px;
}
.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none;
}
.v-list-item {
  padding: 5px 20px;
}

.v-footer {
  background-color: #f8f9fa;
  font-size: 12px;
  color: #ffffff;
}
.footer-right {
  display: flex;
  text-decoration: none;
  list-style-type: none;
}
.footer-right li {
  margin-left: 20px;
  cursor: pointer;
}
.link {
  color: #4fd1c5;
  text-decoration: none;
}
</style>
      