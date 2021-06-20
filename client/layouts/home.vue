<template>
  <v-app class="home-page">
    <v-main>
      <home-navbar />
      <home-sidebar class="sideBarContainer"/>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import HomeNavbar from "../components/home/HomeNavbar.vue";
import HomeSidebar from "../components/home/HomeSidebar.vue";
export default {
  components: {
    HomeSidebar,
    HomeNavbar,
  },
   head: {
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
      },
    ],
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.home-page{
  width: 100%;
  overflow-x: hidden;
}
.nav-title {
  margin: 0;
}
.sideBarContainer{
  position: absolute;
  z-index: 10;
}
</style>
