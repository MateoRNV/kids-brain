<template>
  <v-list dense outlined class="home-sidebar">
    <v-list-item
      class="justify-center"
      v-for="item in items"
      :key="item.title"
      :class="item.name == 'home' ? 'active' : ''"
      link
    >
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { name: "home", icon: "mdi-home-outline" },
        { name: "", icon: "mdi-view-dashboard" },
        { name: "", icon: "mdi-file-document-outline" },
        { name: "", icon: "mdi-folder-outline" },
        { name: "", icon: "mdi-account-circle-outline" },
        { name: "", icon: "mdi-book-outline" },
        { name: "", icon: "mdi-chart-bar" },
        { name: "", icon: "mdi-tune-variant" },
        { name: "", icon: "mdi-help-circle-outline" },
      ],
    };
  },
};
</script>
<style scoped>
.home-sidebar {
  width: 193px;
  padding: 15px 40px;
  background: #ffffff;
  box-shadow: 0px 0px 30px 12px rgba(0, 0, 0, 0.05);
}
.home-sidebar .v-list-item {
  padding: 0;
  height: 100px;
  display: flex;
  align-items: center;
}
.home-sidebar .v-list-item.active {
  background-color: #fff4df;
}
</style>