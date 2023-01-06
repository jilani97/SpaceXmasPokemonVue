<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-4">
        <img class="sf-logo" src="/stadium.png" alt="Pokemon Stadium" />
      </div>
      <div class="col-7 opponentContainer">
        <div class="opponentMenu">
          <h2>Play versus</h2>
          <div class="computer selected" @click="selectOpponent('computer')">
            <span>COMPUTER</span>
          </div>
          <div class="friend" @click="selectOpponent('friend')">
            <span>FRIEND</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="select-container">
        <CharacterSelect
          v-for="item in pokes"
          :dataName="item.name"
          :characterName="item.name"
          :imgSrc="item.url + item.name + '.gif'"
          :id="item.name"
          :key="item.name"
          @click="select(item.name)"
        ></CharacterSelect>
      </div>
      <h1 class="align-self-center headTitle">{{ selectPlayerMsg }}</h1>

      <NuxtLink to="game" class="self-center">
        <div
          class="option faded"
          id="option1"
          @mouseover="startGameHoverEffect"
          @mouseleave="endGameHoverEffect"
        >
          <div class="pokeball unselected">
            <div class="upper-half"></div>
            <div class="lower-half"></div>
            <div class="base"></div>
            <div class="inner-circle"></div>
            <div class="indicator visible"></div>
            <div class="indicator-inner"></div>
          </div>
          <div>Start Game</div>
        </div></NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const pokeDbUrl = "https://img.pokemondb.net/sprites/black-white/anim/normal/";
const localUrl = "/gif/";
const pokes = reactive([
  { name: "charizard", url: pokeDbUrl },
  { name: "pikachu", url: pokeDbUrl },
  { name: "lucario", url: pokeDbUrl },
  { name: "blaziken", url: pokeDbUrl },
  { name: "mew", url: pokeDbUrl },
  { name: "mewtwo", url: pokeDbUrl },

  { name: "erik-electabuzz", url: localUrl },
  { name: "stephan-snorlax", url: localUrl },
  { name: "marius-machamp", url: localUrl },
  { name: "ilham-ivysaur", url: localUrl },
  { name: "tobi-toxicroak", url: localUrl },

  { name: "gengar", url: pokeDbUrl },
]);
const isOpponentFriend = ref(false);
const selectPlayerMsg = ref("Select Your Player");
const player1Selected = ref(false);
const player2Selected = ref(false);

function selectOpponent(opponent) {
  const computer = document.querySelector(".computer");
  const friend = document.querySelector(".friend");
  if (opponent == "friend") {
    isOpponentFriend.value = true;
    selectPlayerMsg.value = "Select Player 1";
    computer.classList.remove("selected");
    friend.classList.add("selected");
  }
  if (opponent == "computer") {
    isOpponentFriend.value = false;
    selectPlayerMsg.value = "Select Your Player";
    friend.classList.remove("selected");
    computer.classList.add("selected");
    player1Selected.value = false;
    player2Selected.value = false;
    if (localStorage.getItem("player2")) {
      localStorage.removeItem("player2");
    }
    disSelect();
  }
}

function startGameHoverEffect() {
  const pokeball = document.querySelector(".pokeball");
  pokeball.classList.add("selected");
  pokeball.parentNode.classList.remove("faded");
}

function endGameHoverEffect() {
  const pokeball = document.querySelector(".pokeball");
  pokeball.classList.remove("selected");
}

function select(id) {
  const character = document.getElementById(id);
  disSelect(character);
  if (
    !player2Selected.value &&
    player1Selected.value &&
    isOpponentFriend.value
  ) {
    character.classList.add("active");
    localStorage.setItem("player2", character.getAttribute("id"));
    character.classList.add("p2");
    player2Selected.value = true;
  }
  if (!player1Selected.value) {
    character.classList.add("active");
    localStorage.setItem("player1", character.getAttribute("id"));
    character.classList.add("p1");
    player1Selected.value = true;
  }
  console.log(
    player1Selected.value,
    player2Selected.value,
    "select(" + id + ") after diselect"
  );
}

function disSelect(character) {
  if (document.querySelector(".character.active")) {
    if (!player1Selected.value || !isOpponentFriend.value) {
      document.querySelector(".character.active").classList.remove("active");
      player1Selected.value = false;
      player2Selected.value = false;
    }
    if (
      !player2Selected.value &&
      player1Selected.value &&
      isOpponentFriend.value &&
      document.querySelector(".character.active.p2")
    ) {
      document.querySelector(".character.active.p1").classList.remove("active");
      character.classList.remove("p1");
      player1Selected.value = false;
    }
    if (
      (player1Selected.value && player2Selected.value) ||
      !isOpponentFriend.value
    ) {
      if (document.querySelector(".character.active.p2")) {
        document
          .querySelector(".character.active.p2")
          .classList.remove("active");
      }
      character.classList.remove("p2");
      player2Selected.value = false;
    }
  }
}
</script>

<style scoped lang="scss">
$black: #333;
$bg: #ffffff;
$red: #f15324;
$white: white;
$pokeball-top-border: #e33a1c;
$pokeball-middle: #ee7f56;
$pokeball-end: #ce2312;
$pokeball-bottom-border: #758bc4;

.opponentContainer {
  height: 100px;
  display: block;
  margin: 50px auto;
  position: relative;
}
.opponentMenu {
  position: absolute;
  width: 450px;
  height: 150px;
}

.opponentMenu h2 {
  text-align: center;
  font-weight: bold;
  font-size: 3em;
}

.opponentMenu div {
  display: inline-block;
  width: 210px;
  height: 70px;
  margin-top: 25px;
  padding-top: 15px;
  -webkit-text-stroke: 0.7px;
  font-size: 1.5em;
  vertical-align: middle;
  text-align: center;
  border-radius: 50px;
}

.opponentMenu {
  div:hover,
  & div.selected {
    border-top: 2px solid $pokeball-top-border;
    border-bottom: 2px solid $pokeball-bottom-border;
    background-image: linear-gradient(to bottom, $pokeball-end 50%, white 50%);
  }
  div:hover span,
  & div.selected span {
    z-index: 2;
    background-color: white;
    border: 2px solid black;
    border-radius: 50px;
    padding: 5px;
    text-decoration: none;
    position: relative;
  }
  div:hover:after,
  & div.selected:after {
    content: "";
    width: 100%;
    height: 4px;
    bottom: 19px;
    background: black;
    display: block;
    position: relative;
  }
}

.option {
  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  opacity: 1;
  transition: opacity 250ms ease-in-out;
  div {
    margin-right: 30px;
  }
  &.faded {
    opacity: 0.8;
  }
}

.pokeball {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 2px solid $black;
  transform-origin: center bottom;

  .base {
    background: $black;
    height: 80%;
    width: 80%;
    padding: 10%;
  }

  .upper-half {
    position: absolute;
    background: $red;
    height: 42%;
    width: 100%;
  }

  .lower-half {
    bottom: 0;
    position: absolute;
    background: $white;
    height: 42%;
    width: 100%;
  }

  .inner-circle {
    border-radius: 50%;
    height: 20%;
    width: 20%;
    background: $white;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid $black;
    transform: translate(-50%, -50%);
  }
}

.indicator-inner {
  border-radius: 50%;
  height: 20%;
  width: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $white;
}

.indicator {
  border-radius: 50%;
  height: 80%;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f64c4c;
  background: -webkit-radial-gradient(center, #f64c4c, #ff514f00);
  background: -moz-radial-gradient(center, #f64c4c, #ff514f00);
  background: radial-gradient(ellipse at center, #f64c4c, #ff514f00);

  opacity: 0;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

@keyframes shake {
  0% {
    transform: rotate(5deg);
  }
  5% {
    transform: rotate(-5deg);
  }
  10% {
    transform: rotate(5deg);
  }
  15% {
    transform: rotate(-5deg);
  }
  20% {
    transform: rotate(5deg);
  }
  25% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.selected {
  animation: shake 1.5s ease-in infinite;
  .indicator {
    opacity: 1;
    animation: blink 1s ease-in-out infinite;
  }
  .indicator-inner {
    background: $red;
  }
}

.sf-logo {
  width: 24rem;
  margin: 1em auto;
  display: block;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.headTitle {
  text-transform: uppercase;
  font-size: 3rem;
  letter-spacing: 0.1em;
  text-shadow: 0px 2px 2px rgba(255, 255, 255, 0.6);
}

.select-container {
  max-width: 860px;
  display: flex;
  margin: 1em auto 3em;
  flex-wrap: wrap;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.5);
  padding: 4px 4px 0px;
}
</style>
