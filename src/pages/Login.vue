<template>
  <v-layout
    class="login-layout my-5"
    align-center
    justify-center
    row
    fill-height
  >
    <v-card class="login pa-5" color="#F3F3F3">
      <v-toolbar dark color="primary">
        <span class="pa-3 title"> Samir </span>
      </v-toolbar>

      <v-form class="pa-3" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="nameRules"
          label="Nome"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Senha"
          type="password"
          required
        ></v-text-field>
        <v-btn depressed :loading="loading" color="primary" @click="validate"
          >LOGIN</v-btn
        >
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      username: "",
      password: "",
      valid: true,
      nameRules: [(v) => !!v || "Digite o Nome!"],
      passwordRules: [
        (v) => !!v || "Digite a Senha!",
        (v) => (v && v.length >= 6) || "Senha com menos de 6 caracteres!",
      ],
      loading: false,
    };
  },
  methods: {
    signin() {
      this.$router.push({ path: "/processos" });
    },
    async validate() {
      try {
        await this.$refs.form.validate();
      } catch {
        this.$snackbar({ message: "ERROR!", snackbarColor: "#FF5252" });
      } finally {
        this.loading = true;
        this.$router.push({ path: "/home" });
      }
    },
  },
};
</script>

<style>
.login-layout {
  /* width: 100%; */
  height: auto;
  /* min-height: 110vh; */
  background-color: F3F3F3;
  /* display: flex;
  justify-content: center; */
}
.login {
  width: 600px;
}
</style>