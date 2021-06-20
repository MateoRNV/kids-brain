<template>
  <div class="hero-section">
    <img src="~/assets/images/hero-section.png" />
    <div class="text-content">
      <h2>Get Your Daily</h2>
      <h1>Dose of Brain Exercise</h1>
      <v-btn color="primary cta" elevation="2" large>Try Now</v-btn>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.hero-section {
  width: 100%;
  position: relative;
  background-color: #000;
}
.hero-section img{
    opacity: 0.5;
}
.hero-section .text-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hero-section h1 {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 45px;
  text-align: center;
  color: #fff;
}
.hero-section h2 {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  text-align: center;
  color: #fff;
}
.hero-section .cta {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  text-transform: uppercase;
}
</style>