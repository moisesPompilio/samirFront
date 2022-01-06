<template>
  <v-app>
    <v-content>
      <v-container fluid class="pa-0">
        <transition-group>
          <div key="page-template">
            <toolbar />
          </div>
          <div key="page">
            <Content />
          </div>
        </transition-group>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import Login from "./pages/Login";
import Content from "./components/Content.vue";
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",

  components: {
    // Login,
    Toolbar,
    Content,
  },

  data: () => ({
    //
  }),
};
</script>
