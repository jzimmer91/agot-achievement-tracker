<template>
  <div class="achievement-listing" :class="{ completed: isCompleted }" v-bind="$attrs" v-on="$listeners">
      <h4>{{achievement.name}}</h4>
      <p>{{achievement.description}}</p>
      <p>Points - {{achievement.points}}</p>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'AchievementListing',
  props: ['achievement', 'player'],
  computed: {
    isCompleted(){
      if (this.player)
        return this.player.completed_achievements.indexOf(this.achievement.id) > -1
      else return false;
    }
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .achievement-listing {
    padding: .5em;
    margin: 1em 0em;
    border: 2px solid #666;
    border-radius: 5px;
  }
  .completed {
    background-color: greenyellow;
  }
</style>
