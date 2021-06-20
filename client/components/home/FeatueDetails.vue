<template>
  <div class="feature-details">
    <v-row no-gutters class="align-center">
      <v-col cols="12" sm="6" md="6">
        <div class="ma-auto col-10">
          <h3 class="mb-4">Welcome to Braingym Jr</h3>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. In pulvinar orci turpis, vel feugiat nisi
            efficitur a. Aliquam eget feugiat felis, ultricies semper purus.
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="6" class="img-container py-16">
        <img src="~/assets/images/feature-details.png"  width="100%"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "FeatureDetails",
};
</script>
<style scoped>
.feature-details {
}
.feature-details h3 {
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 45px;
  color: #1e1c24;
}
.feature-details p {
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #6f6f6f;
}
.feature-details .img-container {
  background-color: #ededed;
}
</style>
