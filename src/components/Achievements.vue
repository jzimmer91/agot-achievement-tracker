<template>
  <div>
      <achievement-listing 
          v-for="achievement in achievements" 
          :key="achievement.id" 
          :achievement="achievement"
        >
        </achievement-listing>
  </div>
</template>
<script>

import {mapState} from 'vuex';
import AchievementListing from '@/components/AchievementListing';

export default {
  name: 'Achievements',
  components: {
    AchievementListing
  },
  computed: {
    ...mapState(['achievements']),
  },
  methods: {

  }
};
</script>