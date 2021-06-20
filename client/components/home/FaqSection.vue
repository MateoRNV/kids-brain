<template>
  <div class="faq-section">
    <div class="d-flex flex-column flex-md-row justify-end col-10 mx-auto">
      <div class="col-12 col-md-8">
        <h3 class="mb-10">FAQ</h3>
        <p>Questions and Answers on Professional Traffic Permits:</p>
      </div>
      <img class="ma-auto" src="~/assets/images/faq.png" />
    </div>
    <div class="my-16">
      <v-row>
        <v-col cols="12" md="6" sm="12" v-for="(item, i) in faqList" :key="i">
          <v-expansion-panels class="mb-6 panel-header">
            <v-expansion-panel class="panel-header">
              <v-expansion-panel-header
                class="panel-header-text"
                expand-icon="mdi-plus"
              >
                <span class="">{{ item.title }}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ item.description }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </div>
    <div class="info-text text-center py-10 my-16">
      If you need further more information, kindliy contact us.
    </div>
  </div>
</template>
<script>
export default {
  name: "FaqSection",
  data() {
    return {
      faqList: [
        {
          title: "What is BrainGymJr?",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title:
            "I feel the exercises are easy for my child. Can I get the exercises for the next level?",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title: "How does it work?",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title: "When does my subscription start?",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title: "What will my child learn?",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title:
            "I have paid and have been charged. But I have not got an e-mail receipt. What do I do?",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title:
            "I lost connection during the Registration process. How do I know if the payment has been made?",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.faq-section h3 {
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 40px;
  color: #fca532;
}
.faq-section p {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 38px;
  line-height: 140%;
  color: #402b2b;
}
.faq-section span {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: #402b2b;
}
.faq-section .panel-header,
.faq-section .v-expansion-panel::before {
  box-shadow: unset;
  border-radius: 0;
  border: none;
  border-right: none;
  border-bottom: none;
}
.faq-section .mdi-plus::before,
.faq-section .info-text {
  color: #fca532 !important;
}
.faq-section .panel-header-text span {
  color: #402b2b !important;
}
.faq-section .v-expansion-panel::before {
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(252, 165, 50, 0.1);
  border-radius: 10px;
}
</style>