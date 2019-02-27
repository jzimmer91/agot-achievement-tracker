<template>
  <div>

    <div class="title-area">
      <h1>AGOT Achievement Tracker</h1>
      <h3>Select your tournament and the achievement list you would like to use to get started.</h3>
    </div>

    <v-flex xs12 sm6 d-flex>
      <v-select
        v-model="selectedTournament"
        :items="tournamentOptions"
        item-text="tournament_name"
        return-object
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
        >Create your tracker</v-btn
      >
    </v-flex>
  </div>
</template>

<script>

export default {
  name: "Home",
  created() {
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
      this.$http
        .get(
          `https://thejoustingpavilion.com/api/v3/tournaments/${
            this.selectedTournament.tournament_id
          }`
        )
        .then(res => {
          console.log('tourney data!', res.data)
          let players = res.data.map(({
            player_id, player_name, faction, agenda
          }) => {
            return {
              id: player_id,
              name: player_name,
              faction: faction,
              agenda: agenda,
              completed_achievements: []
            }
          })
          //post /session  with player data and linked achievement list
          this.$http.post(`${process.env.VUE_APP_DATA_SOURCE}/sessions`, {
            name: this.selectedTournament.tournament_name,
            achievement_list: this.selectedAchievementList,
            players: players
          })
          .then(res => {
            console.log('create tournament response', res);
            this.$router.push({path: `/tournament/${res.data.id}`})
          })
        })
        .catch(err => {
          console.log("get err", err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title-area {
    margin: 1em 0em;
  }
</style>
