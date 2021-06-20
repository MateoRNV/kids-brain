<template>
  <div>
    <hero-section />
    <v-container>
      <featue-details class="ma-auto my-16" />
      <faq-section class="my-16" />
      <newsletter class="my-16"/>
    </v-container>
    <contact-us />
    <v-container>
      <home-footer />
    </v-container>
  </div>
</template>

<script>
import ContactUs from "../components/home/ContactUs.vue";
import FaqSection from "../components/home/FaqSection.vue";
import FeatueDetails from "../components/home/FeatueDetails.vue";
import HeroSection from "../components/home/HeroSection.vue";
import HomeFooter from "../components/home/HomeFooter.vue";
import Newsletter from "../components/home/Newsletter.vue";

export default {
  layout: "home",
  components: {
    HeroSection,
    FeatueDetails,
    FaqSection,
    Newsletter,
    HomeFooter,
    ContactUs,
  },
};
</script>