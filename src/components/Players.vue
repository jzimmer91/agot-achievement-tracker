<template>
  <div>
      <div v-if="!selectedPlayer">
        <player-listing 
          @click="goToPlayer(player)"
          class="player" 
          v-for="player in players" 
          :key="player.id" 
          :player="player"
        >
        </player-listing>
      </div>
      

      <div v-if="selectedPlayer" >
        <v-btn @click="goBack">Back</v-btn>
        <player-view :player="selectedPlayer"></player-view>
      </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import PlayerListing from '@/components/PlayerListing';
import PlayerView from '@/components/PlayerView';

export default {
  name: 'Players',
  components: {
      PlayerListing,
      PlayerView
  },
  computed: {
      ...mapState(['players'])
  },
  data () {
    return {
      selectedPlayer: null
    }
  },
  methods: {
    goToPlayer(player){
      console.log('go to player', player)
      this.selectedPlayer = player
    },
    goBack(){
      this.selectedPlayer = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
