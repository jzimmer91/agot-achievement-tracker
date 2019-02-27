<template>
  <div>
    <h1>AGOT Achievement Tracker</h1>
    <v-flex xs12 sm6 d-flex>
      <v-select
        v-model="selectedTournament"
        :items="tournamentOptions"
        item-text="tournament_name"
        item-value="tournament_id"
        placeholder="Choose your tournament"
        label="Tournament"
        outline
      ></v-select>
    </v-flex>

    <v-flex xs12 sm6 d-flex>
      <v-select
        v-model="selectedAchievementList"
        :items="achievementLists"
        item-text="title"
        item-value="id"
        placeholder="Choose your achievement list"
        label="Achievement List"
        outline
      ></v-select>
    </v-flex>

    <v-flex>
      <v-btn
        color="success"
        @click="generateAchievementSession"
        :disabled="!areOptionsSelected"
        >Go</v-btn
      >
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  mounted() {
    this.getAchievementLists();
    this.getJPTournaments();
  },
  data: () => {
    return {
      selectedTournament: "",
      selectedAchievementList: "",
      tournamentOptions: [],
      achievementLists: []
    };
  },
  computed: {
    areOptionsSelected() {
      return this.selectedTournament && this.selectedAchievementList;
    },
    oneWeekAgo() {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      return date.toISOString().split("T")[0];
    }
  },
  methods: {
    getAchievementLists(){
      this.$http
        .get(`${process.env.VUE_APP_DATA_SOURCE}/achievementlists`)
        .then(res => {
          this.achievementLists = res.data;
        })
        .catch(err => {
          console.log("get err", err);
        });
    },

    getJPTournaments(){
      this.$http
        .get(
          `https://thejoustingpavilion.com/api/v3/tournaments?after=${
            this.oneWeekAgo
          }`
        )
        .then(res => {
          this.tournamentOptions = res.data;
        })
        .catch(err => {
          console.log("get err", err);
        });
    },

    generateAchievementSession() {
      console.log("load up tournament", this.selectedTournament, this.selectedAchievementList);
      //fetch tourney from jp;
      //post /session  with player data and linked achievement list
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
