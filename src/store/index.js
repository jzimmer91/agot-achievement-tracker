import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import axios from 'axios';

export default new Vuex.Store({
  modules: {},
  state: {
    players: [],
    achievements: []
  },
  getters: {
    getPlayers(state){
      return state.players;
    },
    getAchievements(state){
      return status.achievements;
    }
  },
  mutations: {
    setPlayers(state, players){
      Vue.set(state, 'players', players)
    },
    setAchievements(state, achievements){
      Vue.set(state, 'achievements', achievements)
    }
  },
  actions: {
    fetchAchievementsByList({state, commit}, listId){
      axios.get(`${process.env.VUE_APP_DATA_SOURCE}/achievementlists/${listId}`)
        .then(res => {
          commit('setAchievements', res.data.achievements);
        })
        .catch(err => {
          console.error('achievement fetching error', err)
        })
    }
  }
});
