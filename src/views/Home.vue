<template>
  <v-row
    justify="center"
    class="pl-lg-10 pr-lg-10 pl-md-6 pr-md-6 pl-sm-4 pr-sm-4 pl-2 pr-2"
  >
    <v-col cols="12" xs="12" md="5" class="pr-4 pt-3">
      <v-sheet color="#ffffff" class="sheet">
        <h2>Dane wejściowe</h2>

        <v-divider class="mt-2 mb-6"></v-divider>
        <v-text-field label="Kwota wpłaty" v-model="wallet" :rules="[rules.required, rules.number]"></v-text-field>
        <v-text-field label="Kwota jednego obstawienia" v-model="bet"
                      :rules="[rules.required, rules.number]"></v-text-field>
        <v-text-field label="Czas 1 losowania w sec" v-model="time"
                      :rules="[rules.required, rules.number]"></v-text-field>
        <v-text-field label="Liczba losowań" v-model="games" :rules="[rules.required, rules.number]"></v-text-field>
        <v-text-field label="* Dodatkowe próby po wykorzystaniu wpłaty *"
                      v-model="tryHard" :rules="[rules.required, rules.number]"></v-text-field>
        <div class="d-flex justify-space-between">
          <div class="d-flex">
            <v-btn @click.stop="startSpin" medium class="secondary menu-text-button mb-7 mt-5 d-block">
              START
            </v-btn>
            <v-btn @click="startSpinTenTimes" medium color="#656565" dark
                   class="ml-2 menu-text-button mb-7 mt-5 d-block">
              X 10
            </v-btn>
          </div>

          <v-btn @click.stop="reload" medium class="menu-text-button mb-7 mt-5 d-block">
            WYCZYŚ WSZYSTKO
          </v-btn>
        </div>
      </v-sheet>
      <v-sheet color="#ffffff" class="sheet pb-10">

        <h2>Wyniki losowania</h2>

        <v-divider class="mt-2 mb-6"></v-divider>

        <v-text-field label="Liczba przegranych pod rząd" required readonly number
                      v-model="outputLost"></v-text-field>
        <v-text-field label="Zarobiono / stracono" required readonly number
                      v-model="outputWallet"></v-text-field>
        <v-text-field label="Poświęcony czas w godzinach" required readonly number
                      v-model="outputTime"></v-text-field>
        <v-text-field label="Zarobiono na godzinę" required readonly number
                      v-model="outputWalletByTime"></v-text-field>
        <v-text-field label="Wykonano losowań" required readonly number
                      v-model="outputGames"></v-text-field>
        <v-text-field label="Procent wygranych" required readonly number
                      v-model="outputWinRatio"></v-text-field>
        <v-expansion-panels accordion class="mt-8">
          <v-expansion-panel>
            <v-expansion-panel-header color="#efefef">Wszystkie liczby z losowania</v-expansion-panel-header>
            <v-expansion-panel-content class="pt-2">
              <small>Wyników: <strong>{{filteredNumbersList.length}}</strong></small>
              <v-text-field label="Szukaj liczby" @input="searchNumbers" v-model="search"></v-text-field>
              <div v-for="(number, index) in filteredNumbersList" :key="index" class="d-flex">
                <div style="width: 40px">{{number.id}}.</div>
                <strong style="width: 40px">{{number.value}}</strong>&nbsp;|&nbsp;za&nbsp;{{number.bet}}&nbsp;<span
                v-if="number.tryHard">&nbsp;|&nbsp;* dodatkowa próba *</span>
              </div>
              <div v-if="filteredNumbersList.length < 1">
                Nie losowano
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-sheet>
    </v-col>
    <v-col cols="12" xs="12" md="7">
      <v-sheet color="#ffffff" class="sheet">
        <h2>Zbiorcze wyniki</h2>

        <v-divider class="mt-1 mb-2"></v-divider>
        <v-row
          justify="center"
        >
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="3">
            <v-card
              height="130px"
              color="#F64E60"
              dark
              class="pt-3 pl-4 pb-3 pr-4 d-flex flex-column justify-center"
            >
              <v-card-title class="headline"><strong>{{sumOutputWallet}}</strong></v-card-title>

              <v-card-subtitle>Sumaryczny zysk z losowań</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="3">
            <v-card
              height="130px"
              color="#4AB58E"
              dark
              class="pt-3 pl-4 pb-3 pr-4 d-flex flex-column justify-center"
            >
              <v-card-title class="headline"><strong>{{sumOutputWinRatio}}</strong></v-card-title>

              <v-card-subtitle>Sumaryczny procent wygranych</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="3">
            <v-card
              height="130px"
              color="#3699FF"
              dark
              class="pt-3 pl-4 pb-3 pr-4 d-flex flex-column justify-center"
            >
              <v-card-title class="headline"><strong>{{sumOutputTime}}</strong></v-card-title>

              <v-card-subtitle>Sumaryczny poświęcony czas</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="3">
            <v-card
              height="130px"
              color="#8950FC"
              dark
              class="pt-3 pl-4 pb-3 pr-4 d-flex flex-column justify-center"
            >
              <v-card-title class="headline"><strong>{{sumOutputWalletByTime}}</strong></v-card-title>

              <v-card-subtitle>Średni zarobek na godzinę</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet color="#ffffff" class="sheet" v-if="results.length > 1">
        <h2>Wykres zysków / strat</h2>

        <v-divider class="mt-1 mb-2"></v-divider>
        <v-sparkline
          :key="String()"
          :smooth="16"
          :gradient="['#1feaea', '#ffd200', '#f72047']"
          :line-width="2"
          :value="resultsSparkline"
          :auto-draw="true"
          stroke-linecap="round"
          height="40"
        ></v-sparkline>
      </v-sheet>

      <v-sheet color="#ffffff" class="sheet">

        <h2 class="mt-4 mb-1">Dane wszystkich losowań</h2>

        <v-data-table
          :headers="headers"
          :items="results"
          :items-per-page="10"
          :fixed-header="true"
          :sort-by="['index']"
          :sort-desc="[true]"
          class="elevation-1 mt-3"
        >
          <template v-slot:item.status="{ item }">
            <v-chip v-if="item.status" color="green" dark>Wygrana&nbsp;<span v-if="item.tryHardUsed > 0" class="ml-1"> * {{item.tryHardUsed}} *</span>
            </v-chip>
            <v-chip v-if="!item.status" color="red" dark>
              Przegrana&nbsp;<span v-if="item.tryHardUsed > 0" class="ml-1"> * {{item.tryHardUsed}} *</span>
            </v-chip>
          </template>
        </v-data-table>
      </v-sheet>
    </v-col>

  </v-row>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      wallet: 16384,
      tryHard: 1,
      tryHardUsed: 0,
      outputWallet: 0,
      outputWalletByTime: 0,
      bet: 1,
      time: 20,
      outputTime: 0,
      games: 500,
      outputLost: 0,
      outputGames: 0,
      outputWinRatio: 0,
      resultsSparkline: [],
      numbers: [],
      filteredNumbersList: [],
      sumOutputWallet: 0,
      sumOutputWinRatio: 0,
      sumOutputTime: 0,
      sumOutputWalletByTime: 0,
      search: '',
      results: [],
      index: 0,
      rules: {
        required: value => !!value || 'Pole wymagane.',
        number: value => !isNaN(value) || 'Wartość musi być liczbą.'
      },
      headers: [
        {
          text: 'Lp.',
          align: 'start',
          sortable: true,
          value: 'index',
        },
        {
          text: 'Przegranych pod rząd',
          align: 'start',
          sortable: true,
          value: 'outputLost',
        },
        {
          text: 'Zarobek',
          align: 'start',
          sortable: true,
          value: 'outputWallet',
        },
        {
          text: 'Czas w h',
          align: 'start',
          sortable: true,
          value: 'outputTime',
        },
        {
          text: 'Zarobek / h',
          align: 'start',
          sortable: true,
          value: 'outputWalletByTime',
        },
        {
          text: 'Liczba losowań',
          align: 'start',
          sortable: true,
          value: 'outputGames',
        },
        {
          text: 'Wygrane losowania',
          align: 'start',
          sortable: true,
          value: 'outputWinRatio',
        },
        {
          text: 'Wynik',
          align: 'end',
          sortable: true,
          value: 'status',
        },
      ],
    }),

    methods: {
      startSpinTenTimes () {
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            this.startSpin()
          }, 50)
        }
      },

      startSpin () {
        let lastBet = false
        let newBet = false
        let maxValue = 0
        let gameBet = this.bet
        let won = 0
        let randomResult = 0
        let triedHard = this.tryHard
        this.outputTime = 0
        this.outputLost = 0
        this.outputWallet = this.wallet
        this.outputGames = 0
        this.outputWinRatio = 0
        this.numbers = []
        this.tryHardUsed = 0

        for (let i = 0; i < this.games; i++) {
          this.outputGames++
          this.outputWallet -= gameBet
          this.outputTime += this.time
          newBet = false
          randomResult = this.getRandom()
          this.numbers.push({
            id: i + 1,
            value: randomResult,
            bet: gameBet,
            tryHard: triedHard !== this.tryHard
          })
          if (randomResult % 2 !== 0) {
            triedHard = this.tryHard
            newBet = true
            won++
            this.outputWallet += gameBet * 2
          }
          if (i > 0 && (!lastBet && !newBet)) {
            maxValue++
          } else {
            maxValue = 0
          }
          if (maxValue > this.outputLost) {
            this.outputLost = maxValue
          }
          lastBet = newBet
          if (!newBet) {
            gameBet *= 2
            if (gameBet > this.outputWallet) {
              if (triedHard > 0) {
                triedHard--
                this.tryHardUsed++
              } else {
                break
              }
            }
          } else {
            gameBet = this.bet
          }
        }
        this.prepareOutputs(won)
      },

      prepareOutputs (won) {
        this.outputTime = Math.floor((this.outputTime / 60 / 60) * 100) / 100
        this.outputWallet -= Math.floor(this.wallet * 100) / 100
        this.outputWallet = Math.floor(this.outputWallet * 100) / 100
        this.outputWalletByTime = Math.floor((this.outputWallet / this.outputTime) * 100) / 100
        this.outputWinRatio = `${Math.floor((won * 100 / this.outputGames) * 100) / 100} %`
        this.filteredNumbersList = this.numbers
        this.index++
        this.resultsSparkline.push(this.outputWallet)
        this.results.push({
          index: this.index,
          outputLost: this.outputLost,
          outputWallet: Math.floor(this.outputWallet * 100) / 100,
          outputTime: this.outputTime,
          outputWalletByTime: this.outputWalletByTime,
          outputGames: this.outputGames,
          outputWinRatio: this.outputWinRatio,
          status: this.outputWallet > 0,
          tryHardUsed: this.tryHardUsed
        })
        this.prepareAvg()
      },

      prepareAvg () {
        this.sumOutputWallet = 0
        this.sumOutputWinRatio = 0
        this.sumOutputTime = 0
        this.sumOutputWalletByTime = 0
        for (let i = 0; i < this.results.length; i++) {
          this.sumOutputWallet += this.results[i].outputWallet
          if (this.results[i].status) {
            this.sumOutputWinRatio++
          }
          this.sumOutputWalletByTime += this.results[i].outputWalletByTime
          this.sumOutputTime += this.results[i].outputTime
        }
        this.sumOutputWallet = Math.floor(this.sumOutputWallet * 100) / 100
        this.sumOutputWinRatio = `${Math.floor((this.sumOutputWinRatio * 100 / this.results.length) * 100) / 100} %`
        this.sumOutputWalletByTime = Math.floor((this.sumOutputWalletByTime / this.results.length) * 100) / 100
        this.sumOutputTime = Math.floor(this.sumOutputTime * 10) / 10
      },

      getRandom () {
        return Math.trunc(Math.random() * 37)
      },

      searchNumbers () {
        if (this.search) {
          this.filteredNumbersList = this.numbers.filter((element) => {
            return element.value * 1 === this.search * 1
          })
        } else {
          this.filteredNumbersList = this.numbers
        }
      },

      reload () {
        window.location.reload()
      }
    },
  }
</script>

<style>
  .sheet {
    border-radius: 12px;
    padding: 15px 20px;
    margin: 24px 0;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .1) !important;
  }
  .v-input__control {
    margin-bottom: 5px;
  }
</style>
