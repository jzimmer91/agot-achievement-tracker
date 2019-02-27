<template>
  <div>
      <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-tab
        v-for="view in views"
        :key="view"
        ripple
      >
        {{view}}
      </v-tab>
      
      <v-tab-item
        v-for="view in views"
        :key="view"
      >
        <component :is="view"></component>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<script>

import Players from '@/components/Players';
import Achievements from '@/components/Achievements';
import Leaderboard from '@/components/Leaderboard';

export default {
  name: 'Tournament',
  components: {
    Players,
    Achievements,
    Leaderboard
  },
  created() {
      let sessionId = this.$route.params.id;
      this.$http
        .get(`${process.env.VUE_APP_DATA_SOURCE}/sessions/${sessionId}`)
        .then(res => {
            let session = res.data;
            this.$store.commit('setPlayers', session.players);
            this.$store.dispatch('fetchAchievementsByList', session.achievement_list);
        })
        .catch(err => {
          console.log("get err", err);
        });
  },
  data: () => {
    return {
      active: '',
      views: ['players', 'achievements', 'leaderboard']
    };
  },
  computed: {

  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
