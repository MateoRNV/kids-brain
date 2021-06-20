<template>
  <div class="newsletter">
    <v-card class="col-12 card-container mx-auto text-center pa-6 pa-md-16">
      <p class="mb-0">Suscribe to our</p>
      <h3>Newsletter</h3>
      <p class="mb-10">Never miss out on an update. Join the newsletter.</p>
      <div class="d-flex align-stretch flex-column flex-md-row">
        <v-text-field
          label="Enter your email id"
          outlined
          class="input"
        ></v-text-field>
        <v-btn class="subscribe m-0 ml-md-10" rounded>subscribe</v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Newsletter",
};
</script>
<style scoped>
.newsletter{
}
.newsletter h3 {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  line-height: 50px;
  font-size: 50px;
  letter-spacing: 0.15px;
  color: #000000;
  margin-bottom:15px;
}
.newsletter p {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  letter-spacing: 0.15px;
  color: #535353;
  margin-bottom: 5px;
}
.newsletter .subscribe {
  background-color: #fca532 !important;
  border-radius: 12px;
  color: #fff;
  height: 56px;
  padding: 0 30px;
}
.newsletter .card-container {
  background: #fff4df;
  box-shadow: 0px 0px 4px rgba(255, 145, 0, 0.5);
}
.v-text-field--outlined >>> fieldset {
  border: 1px solid #fca532;
  box-sizing: border-box;
  border-radius: 12px;
}
.v-text-field--outlined >>> label {
  color:#fca532 !important;
}
</style>