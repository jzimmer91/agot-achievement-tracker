<template>
  <div class="player-listing"  v-bind="$attrs" v-on="$listeners">
      <h4>{{name}}</h4>
      <p>{{playing}}</p>
      <p>Current Points - {{points}}</p>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'PlayerListing',
  props: ['player'],
  computed: {
    ...mapState(['achievements']),
    name() {
      return this.player.name
    },
    playing(){
      return `${this.player.faction} - ${this.player.agenda}`
    },      
    points(){
      return this.achievements.reduce((acc, achievement) => {
          return acc + 
          ( 
            this.player.completed_achievements.indexOf(achievement.id) > -1
            ? achievement.points
            : 0
          );
      }, 0)
    }
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .player-listing {
    padding: .5em;
    margin: 1em 0em;
    border: 2px solid #666;
    border-radius: 5px;
  }
</style>
