<template>
  <v-app-bar
    class="pl-0 pdf-hidden default-toolbar"
    app
    color="rgb(194, 216, 235)"
    fixed
    dark
    clipped-left
  >
    <img
      class="logo-bar"
      height="90"
      max-height="90"
      src="../assets/logo2.png"
    />
    <v-spacer />
    <div class="logged">
      <span class="pr-3" style="color: black">Beremiz Samir</span>
      <v-avatar color="indigo" size="36">
        <span class="white--text text-h5">LP</span>
      </v-avatar>
      <v-btn icon to="/">
        <v-icon color="black">mdi-export</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Toolbar",
};
</script>

<style lang="scss">
.default-toolbar {
  .v-toolbar__extension {
    padding: 0;
  }
  img {
    height: 50px !important;
  }
  z-index: 9 !important;
}
.z-index {
  z-index: 9 !important;
}
.logged {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>