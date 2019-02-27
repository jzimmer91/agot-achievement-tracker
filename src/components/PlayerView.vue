<template>
<div>
    <div class="player-view">
      <h4>{{name}}</h4>
      <p>{{playing}}</p>
      <p>Current Points - {{points}}</p>
    </div>

    <div>
      <h4>Achievements</h4>  
      <achievement-listing 
          @click="toggleAchievement(achievement)"
          v-for="achievement in achievements" 
          :key="achievement.id" 
          :achievement="achievement"
          :player="player"
        >
        </achievement-listing>
    </div>

</div>
  
</template>

<script>

import { mapState } from 'vuex';
import AchievementListing from '@/components/AchievementListing';

export default {
  name: 'PlayerView',
  props: ['player'],
  components: {
    AchievementListing
  },
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
    toggleAchievement(achievement){
      console.log('toggle achievement!', this.player, achievement)
      let i = this.player.completed_achievements.indexOf(achievement.id);
      if (i > -1)
        this.player.completed_achievements.splice(i,1);
      else
        this.player.completed_achievements.push(achievement.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .player-view {

    }
</style>
