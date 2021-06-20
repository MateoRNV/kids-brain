<template>
 <CreateAccount userType="Parent" :displayRow="false" />
</template>
<script>
import CreateAccount from '../components/createAccount';

export default {
    data () {
        return {
        };
    },
    methods: {
      redirectUser() {
        const { role } = this.$auth.user;
        switch (role) {
          case "Admin":
          case "Parent":
          case "Student":
            this.$router.replace("/dashboard");
            break;
        }
      },
    }
};
</script>
