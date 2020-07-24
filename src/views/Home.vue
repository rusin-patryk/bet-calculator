<template>
  <v-row
    align="center"
    justify="center"
    class="pl-lg-16 pr-lg-16 pl-sm-10 pr-sm-10 pt-3"
  >
    <v-col cols="12" xs="12" md="6" class="pr-6">
      <v-text-field label="Kwota wpłaty" number required v-model="wallet"></v-text-field>
      <v-text-field label="Kwota jednego obstawienia" number required v-model="bet"></v-text-field>
      <v-text-field label="Czas 1 losowania w sec" number required v-model="time"></v-text-field>
      <v-text-field label="Liczba losowań" number required v-model="games"></v-text-field>
      <div class="d-flex justify-space-between">
        <v-btn medium @click.stop="startSpin" large class="secondary menu-text-button mb-7 mt-5 d-block">
          START LOSOWANIA
        </v-btn>
        <v-btn medium @click.stop="reload" large class="menu-text-button mb-7 mt-5 d-block">
          WYCZYŚ WSZYSTKO
        </v-btn>
      </div>
      <v-divider></v-divider>
      <v-divider class="mb-8"></v-divider>

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
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header color="#eeeeee">Wyniki losowania</v-expansion-panel-header>
          <v-expansion-panel-content class="pt-5">
            <v-text-field label="Szukaj liczb" @input="searchNumbers" v-model="search"></v-text-field>
            <div v-for="(number, index) in filteredNumbersList" :key="index" class="d-flex">
              <div style="width: 40px">{{index + 1}}.</div>
              <strong>{{number}}</strong>
            </div>
            <div v-if="filteredNumbersList.length < 1">
              Nie losowano
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col cols="12" xs="12" md="6">
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="4">
          <v-card
            height="110px"
            color="#F64E60"
            dark
            class="pt-3 pl-4 pb-3 pr-4"
          >
            <v-card-title class="headline"><strong>{{sumOutputWallet}}</strong></v-card-title>

            <v-card-subtitle>Sumaryczny stan portfela</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            height="110px"
            color="#4AB58E"
            dark
            class="pt-3 pl-4 pb-3 pr-4"
          >
            <v-card-title class="headline"><strong>{{sumOutputWinRatio}}</strong></v-card-title>

            <v-card-subtitle>Sumaryczny procent wygranych</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            height="110px"
            color="#8950FC"
            dark
            class="pt-3 pl-4 pb-3 pr-4"
          >
            <v-card-title class="headline"><strong>{{sumOutputWalletByTime}}</strong></v-card-title>

            <v-card-subtitle>Średni zarobek na godzinę</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-sheet color="transparent">
        <v-sparkline
          :key="String()"
          :smooth="16"
          :gradient="['#1feaea', '#ffd200', '#f72047']"
          :line-width="2"
          :value="resultsSparkline"
          :auto-draw="true"
          stroke-linecap="round"
          height="50"
        ></v-sparkline>
      </v-sheet>

      <v-data-table
        :headers="headers"
        :items="results"
        :items-per-page="10"
        :fixed-header="true"
        :sort-by="['index']"
        :sort-desc="[true]"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status" color="green" dark>Wygrana</v-chip>
          <v-chip v-if="!item.status" color="red" dark>Przegrana</v-chip>
        </template>
      </v-data-table>
    </v-col>

  </v-row>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      wallet: 256,
      outputWallet: 0,
      outputWalletByTime: 0,
      bet: 1,
      time: 10,
      outputTime: 0,
      games: 1000,
      outputLost: 0,
      outputGames: 0,
      outputWinRatio: 0,
      resultsSparkline: [],
      numbers: [],
      filteredNumbersList: [],
      sumOutputWallet: 0,
      sumOutputWinRatio: 0,
      sumOutputWalletByTime: 0,
      search: '',
      results: [],
      index: 0,
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
      startSpin () {
        let lastBet = false
        let newBet = false
        let maxValue = 0
        let gameBet = this.bet
        let won = 0
        let randomResult = 0
        this.outputTime = 0
        this.outputLost = 0
        this.outputWallet = this.wallet
        this.outputGames = 0
        this.outputWinRatio = 0
        this.numbers = []

        for (let i = 0; i < this.games; i++) {
          this.outputGames++
          this.outputWallet -= gameBet
          this.outputTime += this.time
          newBet = false
          randomResult = this.getRandom()
          this.numbers.push(randomResult)
          if (randomResult !== 0 && randomResult % 2 !== 0) {
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
              break
            }
          } else {
            gameBet = this.bet
          }
        }
        this.prepareOutputs(won)
      },

      prepareOutputs (won) {
        this.outputTime = Math.floor((this.outputTime / 60 / 60) * 100) / 100
        this.outputWallet -= this.wallet
        this.outputWalletByTime = Math.floor((this.outputWallet / this.outputTime) * 100) / 100
        this.outputWinRatio = `${Math.floor((won * 100 / this.outputGames) * 100) / 100} %`
        this.filteredNumbersList = this.numbers
        this.index++
        this.resultsSparkline.push(this.outputWallet)
        this.results.push({
          index: this.index,
          outputLost: this.outputLost,
          outputWallet: this.outputWallet,
          outputTime: this.outputTime,
          outputWalletByTime: this.outputWalletByTime,
          outputGames: this.outputGames,
          outputWinRatio: this.outputWinRatio,
          status: this.outputWallet > 0
        })
        this.prepareAvg(won)
      },

      prepareAvg (won) {
        this.sumOutputWallet = 0
        this.sumOutputWinRatio = 0
        this.sumOutputWalletByTime = 0
        for (let i = 0; i < this.results.length; i++) {
          this.sumOutputWallet += this.results[i].outputWallet
          if (this.results[i].status) {
            this.sumOutputWinRatio++
          }
          this.sumOutputWalletByTime += this.results[i].outputWalletByTime
        }
        this.sumOutputWinRatio = `${Math.floor((this.sumOutputWinRatio * 100 / this.results.length) * 100) / 100} %`
        this.sumOutputWalletByTime = Math.floor((this.sumOutputWalletByTime / this.results.length) * 100) / 100
      },

      getRandom () {
        return Math.trunc(Math.random() * 37)
      },

      searchNumbers () {
        if (this.search) {
          this.filteredNumbersList = this.numbers.filter(this.isTheSame)
        } else {
          this.filteredNumbersList = this.numbers
        }
      },

      isTheSame (value) {
        return value * 1 === this.search * 1
      },

      reload () {
        window.location.reload()
      }
    },
  }
</script>
