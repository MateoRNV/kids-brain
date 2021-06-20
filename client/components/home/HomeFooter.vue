<template>
  <div class="d-flex my-16 home-footer">
    <span class="copyright-text mr-auto">Copyright @ 2021</span>
    <v-icon class="ml-5">mdi-facebook</v-icon>
    <v-icon class="ml-5">mdi-twitter</v-icon>
    <v-icon class="ml-5">mdi-instagram</v-icon>
  </div>
</template>
<script>
export default {
  name: "HomeFooter",
};
</script>
<style scoped>
.home-footer >>> i.v-icon.v-icon {
  color: #fca532;
}
.home-footer .copyright-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #402b2b;
}
</style>