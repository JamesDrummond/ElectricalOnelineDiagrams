<template>
    <v-list dense class="pt-0">
      <v-list-tile v-for="item in items" :key="item.title" @click="action(item.title)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <Help/>
    </v-list>
</template>

<script>

import Help from "./dialogHelp.vue";
import { mapState,mapActions  } from "vuex";
export default {
  components: {
    Help
  },
  data: () => ({
    items: [
      { title: "Electrical Equipment", icon: "flash_on", action: "dialogShow" },
      { title: "Help", icon: "question_answer", action: "dialogShow"  }
    ],
    right: null
  }),
  computed: {
    localComputed () { 
      store = this.$store;
    },
    ...mapState({
      dialog: 'dialog'
    })
  },
  methods: {
    action(title){
      if(title=='Help'){
        this.dialogShow();
      }
    },
    ...mapActions([
        'dialogShow',
        'dialogHide'
    ])
  }
};
</script>