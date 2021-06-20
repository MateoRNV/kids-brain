<template>
  <div class="home-navbar">
    <div class="mr-auto">
      <img src="~/assets/images/home-logo.png" />
    </div>
    <v-menu offset-y v-for="item in navItems" :key="item.title">
      <template v-slot:activator="{ on, attrs }">
        <div class="item p-1">
          {{ item.title }}
          <v-icon
            class="primary--text"
            v-if="item.child"
            v-on="on"
            v-bind="attrs"
          >
            mdi-chevron-down
          </v-icon>
        </div>
      </template>
      <v-list>
        <v-list-item v-for="(child, index) in item.child" :key="index">
          <v-list-item-title>
            <span class="nav-title">{{ child.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="item">
      <v-icon>mdi-bell</v-icon>
    </div>
    <div class="profile">
      <img
        class="profile-img"
        src="~/assets/images/profile.png"
        v-on:click="showProfileMenu = !showProfileMenu"
      />
      <div class="profileMenu" :class="showProfileMenu ? 'active' : ''">
        <v-card height="450px">
          <v-navigation-drawer absolute permanent right>
            <v-list dense c>
              <v-list-item
                v-for="item in profileMenuItems"
                :key="item.title"
                class="pa-0"
              >
                <v-list-item-content>
                  <v-expansion-panels accordion>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="menu-item pr-2 pl-4 ma-0"
                        :expand-icon="item.child ? 'mdi-chevron-down' : ''"
                        :class="item.active ? 'item-active' : ''"
                      >
                        {{ item.title }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content v-if="item.child">
                        <div
                          class="menu-item"
                          v-for="childItem in item.child"
                          :key="childItem.title"
                        >
                          {{ childItem.title }}
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showProfileMenu: false,
      profileMenuItems: [
        {
          title: "My Profile",
          route: "/",
        },
        {
          title: "My Base level (04)",
          route: "/",
          active: true,
          child: [
            {
              title: "English",
              route: "/",
            },
            {
              title: "Maths",
              route: "/",
            },
            {
              title: "Real World",
              route: "/",
            },
          ],
        },
        {
          title: "Badge",
          route: "/",
        },
        {
          title: "Logout",
          route: "/",
        },
      ],
      navItems: [
        {
          title: "Learning Points",
          route: "/",
        },
        {
          title: "Subscription",
          route: "/",
          child: [
            {
              title: "Subscription 1",
              route: "/",
            },
            {
              title: "Subscription 2",
              route: "/",
            },
            {
              title: "Subscription 3",
              route: "/",
            },
          ],
        },
        {
          title: "Switch accounts",
          route: "/",
          child: [
            {
              title: "Subscription 1",
              route: "/",
            },
            {
              title: "Subscription 2",
              route: "/",
            },
            {
              title: "Subscription 3",
              route: "/",
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>
<style>
.home-navbar {
  padding: 0 18px;
  display: flex;
  align-items: center;
}
.home-navbar .item {
  margin: 0 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.home-navbar .menu-item {
  margin: 0 12px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 48px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0;
}
.home-navbar .profile-img {
  border-radius: 50%;
  overflow: hidden;
}
.home-navbar .profile {
  position: relative;
}
.home-navbar .profileMenu {
  position: absolute;
  right: -400px;
  width: 250px;
  transition: 0.3s all ease-in-out;
}
.home-navbar .profileMenu .v-list-item__content {
  overflow: unset;
}
.home-navbar .profileMenu .v-expansion-panel::before {
  box-shadow: unset;
}
.home-navbar .profileMenu .theme--light.v-expansion-panels .v-expansion-panel {
  background-color: unset;
}
.home-navbar
  .profileMenu
  .v-expansion-panel--active
  > .v-expansion-panel-header {
  min-height: unset;
}
.home-navbar .profileMenu .item-active {
  background-color: #fff4df;
}
.home-navbar .profileMenu .item-active * {
  color: #fca532 !important;
}
.home-navbar .profileMenu.active {
  right: 2px;
}
</style>
