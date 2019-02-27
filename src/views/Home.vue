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
        item-text="achievement_list_name"
        item-value="achievement_list_id"
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
import db from '@/firebase'

export default {
  name: "Home",
  mounted() {
    console.log("log this", this);
    this.$http
      .get(
        `https://thejoustingpavilion.com/api/v3/tournaments?after=${
          this.oneWeekAgo
        }`
      )
      .then(res => {
        console.log("jp res", res);
        this.tournamentOptions = res.data;
      })
      .catch(err => {
        console.log("get err", err);
      });
  },
  firestore: {
    achievementLists: db.ref('achievementlists'), // this is a correct ref, i checked using my db browser and entering in this ref link
  },
  data: () => {
    return {
      selectedTournament: "",
      selectedAchievementList: "",
      tournamentOptions: [],
      achievementLists: [
        // {
        //   achievement_list_id: 1,
        //   achievement_list_name: "Brighton Charity Joust 2018"
        // },
        // {
        //   achievement_list_id: 2,
        //   achievement_list_name: "Brighton Charity Joust 2019"
        // }
      ]
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
    generateAchievementSession() {
      console.log("load up tournament", this.selectedTournament);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
