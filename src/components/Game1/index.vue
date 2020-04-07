<template>
  <div class="2048-container">
    <header>
      <!-- <h1>2048</h1> -->
      <div @click="newGame" id="newgamebtn">New Game!</div>
      <p>
        score:
        <span id="score">0</span>
      </p>
    </header>

    <div id="grid-container">
      <div class="grid-cell" id="grid-cell-0-0"></div>
      <div class="grid-cell" id="grid-cell-0-1"></div>
      <div class="grid-cell" id="grid-cell-0-2"></div>
      <div class="grid-cell" id="grid-cell-0-3"></div>

      <div class="grid-cell" id="grid-cell-1-0"></div>
      <div class="grid-cell" id="grid-cell-1-1"></div>
      <div class="grid-cell" id="grid-cell-1-2"></div>
      <div class="grid-cell" id="grid-cell-1-3"></div>

      <div class="grid-cell" id="grid-cell-2-0"></div>
      <div class="grid-cell" id="grid-cell-2-1"></div>
      <div class="grid-cell" id="grid-cell-2-2"></div>
      <div class="grid-cell" id="grid-cell-2-3"></div>

      <div class="grid-cell" id="grid-cell-3-0"></div>
      <div class="grid-cell" id="grid-cell-3-1"></div>
      <div class="grid-cell" id="grid-cell-3-2"></div>
      <div class="grid-cell" id="grid-cell-3-3"></div>
    </div>
  </div>
</template>

<script>
import common from "./js/main2048";
// import $ from 'jquery';

export default {
  data() {
    return {};
  },
  mounted() {
    common.newGame();
  },
  methods: {
    newGame() {
      common.newGame();
    }
  }
};
</script>

<style lang="css">
@import "./css/index.css";
</style>
