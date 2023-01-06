<template>
  <div id="app" :style="{ '--poke1': p1.imgUrl, '--poke2': p2.imgUrl }">
    <div class="playerStats row w-100">
      <div class="col-4 offset-sm-1">
        <HealthBar
          :name="p1.pokemon.name"
          :health="p1.health"
          :maxHealth="p1.maxHealth"
          :x-pos="p1.xPos"
          :y-pos="p1.yPos"
          id="p1"
        ></HealthBar>
      </div>
      <div class="col-4 offset-sm-2">
        <HealthBar
          :name="p2.pokemon.name"
          :health="p2.health"
          :maxHealth="p2.maxHealth"
          :x-pos="p2.xPos"
          :y-pos="p2.yPos"
          id="p2"
        ></HealthBar>
      </div>
    </div>
    <div
      class="winner text-5xl absolute text-center top-1/3 w-100 mx-auto playerStats hidden"
    >
      {{ winnerAnnoucement }}
    </div>
    <div
      class="pokemon w-100 pt-48 mt-36 relative"
      tabindex="0"
      @keydown.left="onArrowLeft(p2)"
      @keydown.up="onArrowUp(p2.direction)"
      @keydown.right="onArrowRight(p2)"
      @keyup.x="onAttack(p2, p1, 'x')"
      @keypress.a="onArrowLeft(p1)"
      @keypress.w="onArrowUp(p1.direction)"
      @keypress.d="onArrowRight(p1)"
      @keyup.s="onAttack(p1, p2, 'x')"
      @keyboard.enter="iChooseYou()"
    >
      <div
        class="pkmn exit left flip"
        :style="{
          '--p1xPos': p1.xPos + 'px',
          '--p1yPos': p1.yPos + 'px',
        }"
      >
        <div class="ultra ball">
          <span class="x">
            <span class="y">
              <span class="sprite"> </span>
            </span>
          </span>
        </div>
        <div class="mon p2"></div>
        <div class="explode"></div>
      </div>
      <div
        class="pkmn exit right"
        :style="{
          '--p2xPos': p2.xPos + 'px',
          '--p2yPos': p2.yPos + 'px',
        }"
      >
        <div class="master ball">
          <span class="x">
            <span class="y">
              <span class="sprite"> </span>
            </span>
          </span>
        </div>
        <div class="mon p1"></div>
        <div class="explode"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const player1Character = localStorage.getItem("player1");
const player2Character = localStorage.getItem("player2");
const winnerAnnoucement = ref("");

const p1 = reactive({
  pokemon: "null",
  imgUrl: "null",
  xPos: 30,
  yPos: 0,
  health: 100,
  maxHealth: 100,
  direction: "left",
});
const p2 = reactive({
  pokemon: "null",
  imgUrl: "null",
  xPos: 100,
  yPos: 0,
  health: 100,
  maxHealth: 100,
  direction: "right",
});

const playerSpeed = 10;

function onArrowUp(playerDirection) {
  const pkmn = document.querySelector(".pkmn." + playerDirection);
  pkmn.classList.add("playerJump");
  const pkmnMon = document.querySelector(".pkmn." + playerDirection + " .mon");
  console.log(pkmnMon.getAnimations()[0].playState);
  if (pkmnMon.getAnimations()[0].playState != "running") {
    pkmn.classList.remove("playerJump");
  }
}

const onArrowLeft = (player) => {
  flipHorizontal(player, "ArrowLeft");
  player.xPos -= playerSpeed;
  if (player.xPos <= -1000) {
    player.xPos = -999;
  }
};
const onArrowRight = (player) => {
  flipHorizontal(player, "ArrowRight");
  player.xPos -= playerSpeed;
  if (player.xPos <= -825) {
    player.xPos = -820;
  }
};

function flipHorizontal(player, movement) {
  const pkmn = document.querySelector("." + player.direction);
  if (!pkmn.classList.contains("flip") && movement == "ArrowRight") {
    pkmn.classList.add("flip");
    player.xPos = player.xPos + player.xPos * -2;
  }
  if (pkmn.classList.contains("flip") && movement == "ArrowLeft") {
    pkmn.classList.remove("flip");
    player.xPos = player.xPos + player.xPos * -2;
  }
}

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
function iChooseYou() {
  const pkmn = document.querySelector(".pkmn");
  pkmn.classList.remove("exit");
  let poke1;
  if (!player2Character) {
    poke1 = pokes[Math.floor(Math.random() * pokes.length)];
  }
  if (player2Character) {
    poke1 = pokes.filter((poke) => poke.name.includes(player2Character))[0];
  }
  const poke2 = pokes.filter((poke) => poke.name.includes(player1Character))[0];
  p1.pokemon = poke1;
  p2.pokemon = poke2;
  idleState(p1);
  idleState(p2);

  pkmn.classList.add("exit");
}

function idleState(player) {
  player.imgUrl = "url(" + player.pokemon.url + player.pokemon.name + ".gif)";
}

function attackState(player) {
  player.imgUrl =
    "url(" +
    "/gif-pokemon-actions/" +
    player.pokemon.name +
    "/" +
    player.pokemon.name +
    "-attack.gif)";
}

const onAttack = (player, opponent, e) => {
  if (e == "x") {
    const pkmn = document.querySelector(".pkmn." + player.direction);
    pkmn.classList.add("attack");
    if (pkmn.classList.contains("attack")) {
      attackState(player);
    }
    setTimeout(() => {
      pkmn.classList.remove("attack");
      idleState(player);
    }, 2000);
    if (opponent.health <= 41) {
      document.querySelector("#p1 .health-bar--health").classList.add("lowHp");
    }
    if (opponent.health > 0 && pokemonCollision()) {
      opponent.health -= 20;
    }
    if (opponent.health <= 0) {
      declareWinner(player, opponent);
    }
  }
};

function pokemonCollision() {
  const width = 30;
  return width >= Math.abs(p2.xPos - p1.xPos);
}

function declareWinner(winner, loser) {
  const notWinner = document.querySelector(".pkmn." + loser.direction);
  notWinner.classList.add("loser");
  const winnerMsg = document.querySelector(".winner");
  winnerMsg.classList.remove("hidden");
  if (winner.direction == "right") {
    winnerAnnoucement.value = "YOU WIN! Start new Battle by pressing Enter";
  }
  if (winner.direction == "left") {
    winnerAnnoucement.value = "YOU LOSE! Start new Battle by pressing Enter";
  }
  clearInterval(intervalId);
}
let intervalId;
onMounted(() => {
  iChooseYou();
  if (!player2Character) {
    intervalId = setInterval(opponentAI, 500);
  }
});
function opponentAI() {
  const random = Math.floor(Math.random() * 4);
  const ball = document.querySelectorAll(".pkmn.exit .ball");
  if (ball[0].getAnimations()[0].playState == "finished") {
    if (random == 0) {
      onArrowLeft(p1);
    }
    if (random == 1) {
      onArrowRight(p1);
    }
    if (random == 2) {
      onArrowUp(p1.direction);
    }
    if (random == 3 && pokemonCollision()) {
      onAttack(p1, p2, "x");
    }
  }
}
</script>

<style lang="scss" scoped>
.health-bar--health.lowHp {
  background: linear-gradient(to bottom, #fc2e02 0%, #e13510 100%) !important;
}

.pkmn.loser .mon {
  animation: loseBattle 1s;
  animation-fill-mode: forwards;
}

@keyframes loseBattle {
  0% {
    transform: rotateZ(-30deg);
  }

  50% {
    transform: translateX(-2rem) translateY(2.5rem) rotateZ(-50deg);
  }

  100% {
    transform: translateX(-4rem) translateY(2.5rem) rotateZ(-70deg);
  }
}

.pkmn.playerJump .mon {
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  animation-name: playerJump;
}

@keyframes playerJump {
  0% {
    transform: translateY(0rem);
  }

  33% {
    transform: translateY(0rem);
  }

  50% {
    transform: translateY(-10rem) rotate(240deg);
  }

  66% {
    transform: rotate(360deg);
  }

  100% {
    transform: translateY(0rem) rotate(360deg);
  }
}

.pkmn.flip {
  transform: rotateY(180deg) !important;
}

#app {
  background-image: url("https://i.gifer.com/NCWB.gif");
  background-size: contain;
}

.playerStats {
  -webkit-text-fill-color: white;
  -webkit-text-stroke: 0px;
}

/* pokeballs code */

$cell: 41px;
$celly: 40px;

.ball {
  margin: 1px;
  position: relative;
  bottom: -9px;
}
.ball.flip {
  transform: scaleX(-1);
}

$offset-poke: $cell * 0;
$offset-great: $cell * 1;
$offset-safari: $cell * 2;
$offset-ultra: $cell * 3;
$offset-master: $cell * 4;
$offset-net: $cell * 5;
$offset-dive: $cell * 6;
$offset-nest: $cell * 7;
$offset-repeat: $cell * 8;
$offset-timer: $cell * 9;
$offset-luxury: $cell * 10;
$offset-premier: $cell * 11;
$offset-dusk: $cell * 12;
$offset-heal: $cell * 13;
$offset-quick: $cell * 14;
$offset-cherish: $cell * 15;
$offset-fast: $cell * 16;
$offset-level: $cell * 17;
$offset-lure: $cell * 18;
$offset-heavy: $cell * 19;
$offset-love: $cell * 20;
$offset-friend: $cell * 21;
$offset-moon: $cell * 22;
$offset-sport: $cell * 23;
$offset-park: $cell * 24;
$offset-dream: $cell * 25;
$offset-beast: $cell * 26;

.ball,
.ball .sprite {
  width: $cell;
  height: $cell;
  background-image: url(https://assets.codepen.io/13471/pokeballs.png);
  background-position: 0 0;
  transform-origin: center bottom;
  &:before {
    content: "";
    position: absolute;
    left: 30%;
    bottom: 8px;
    width: 40%;
    height: 3px;
    border-radius: 100%;
    background: black;
    box-shadow: 0 1px 2px black;
    opacity: 0.3;
  }
}
.poke.ball {
  &,
  .sprite {
    background-position-x: -$offset-poke;
  }
}
.great.ball {
  &,
  .sprite {
    background-position-x: -$offset-great;
  }
}
.safari.ball {
  &,
  .sprite {
    background-position-x: -$offset-safari;
  }
}
.ultra.ball {
  &,
  .sprite {
    background-position-x: -$offset-ultra;
  }
}
.master.ball {
  &,
  .sprite {
    background-position-x: -$offset-master;
  }
}
.net.ball {
  &,
  .sprite {
    background-position-x: -$offset-net;
  }
}
.dive.ball {
  &,
  .sprite {
    background-position-x: -$offset-dive;
  }
}
.nest.ball {
  &,
  .sprite {
    background-position-x: -$offset-nest;
  }
}
.repeat.ball {
  &,
  .sprite {
    background-position-x: -$offset-repeat;
  }
}
.timer.ball {
  &,
  .sprite {
    background-position-x: -$offset-timer;
  }
}
.luxury.ball {
  &,
  .sprite {
    background-position-x: -$offset-luxury;
  }
}
.premier.ball {
  &,
  .sprite {
    background-position-x: -$offset-premier;
  }
}
.dusk.ball {
  &,
  .sprite {
    background-position-x: -$offset-dusk;
  }
}
.heal.ball {
  &,
  .sprite {
    background-position-x: -$offset-heal;
  }
}
.quick.ball {
  &,
  .sprite {
    background-position-x: -$offset-quick;
  }
}
.cherish.ball {
  &,
  .sprite {
    background-position-x: -$offset-cherish;
  }
}
.fast.ball {
  &,
  .sprite {
    background-position-x: -$offset-fast;
  }
}
.level.ball {
  &,
  .sprite {
    background-position-x: -$offset-level;
  }
}
.lure.ball {
  &,
  .sprite {
    background-position-x: -$offset-lure;
  }
}
.heavy.ball {
  &,
  .sprite {
    background-position-x: -$offset-heavy;
  }
}
.love.ball {
  &,
  .sprite {
    background-position-x: -$offset-love;
  }
}
.friend.ball {
  &,
  .sprite {
    background-position-x: -$offset-friend;
  }
}
.moon.ball {
  &,
  .sprite {
    background-position-x: -$offset-moon;
  }
}
.sport.ball {
  &,
  .sprite {
    background-position-x: -$offset-sport;
  }
}
.park.ball {
  &,
  .sprite {
    background-position-x: -$offset-park;
  }
}
.dream.ball {
  &,
  .sprite {
    background-position-x: -$offset-dream;
  }
}
.beast.ball {
  &,
  .sprite {
    background-position-x: -$offset-beast;
  }
}

.ball.open {
  background-position-y: -($celly * 10) - 1.5;
}
.ball.side {
  background-position-y: -($celly * 9) - 1.5;
}
.ball.roll {
  animation: ball-roll 1s steps(1) infinite;
}
.ball.rock {
  animation: ball-rock 1.22s steps(1) infinite;
}
.ball.bounce {
  animation-name: bounce;
  &:before {
    animation-name: bounce-shadow;
  }
  &,
  &:before {
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
}

@keyframes ball-roll {
  0% {
    background-position-y: 0;
  }
  12.5% {
    background-position-y: -$celly * 1;
  }
  25% {
    background-position-y: -$celly * 2;
  }
  37.5% {
    background-position-y: -$celly * 3;
  }
  50% {
    background-position-y: -$celly * 4;
  }
  62.5% {
    background-position-y: -$celly * 5;
  }
  75% {
    background-position-y: -$celly * 6;
  }
  87.5% {
    background-position-y: -$celly * 7;
  }
  100% {
    background-position-y: -$celly * 8;
  }
}

@keyframes ball-rock {
  0% {
    background-position-y: 0;
  }
  8.33% {
    background-position-y: -$celly * 11;
  }
  16.66% {
    background-position-y: -$celly * 12;
  }
  25% {
    background-position-y: -$celly * 13;
  }
  33.33% {
    background-position-y: -$celly * 12;
  }
  41.66% {
    background-position-y: -$celly * 11;
  }
  50% {
    background-position-y: -$celly * 0;
  }
  58.33% {
    background-position-y: -$celly * 14;
  }
  66.66% {
    background-position-y: -$celly * 15;
  }
  75% {
    background-position-y: -$celly * 16;
  }
  83.33% {
    background-position-y: -$celly * 15;
  }
  91.66% {
    background-position-y: -$celly * 14;
  }
  100% {
    background-position-y: -$celly * 0;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) scaleY(0.75) scaleX(1.15);
    animation-timing-function: ease-in;
  }
  10% {
    transform: translateY(-10%) scaleY(1) scaleX(1);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translateY(-80%) scaleY(1.1) scaleX(0.95);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(-10%) scaleY(1) scaleX(1);
    animation-timing-function: ease-out;
  }
}

@keyframes bounce-shadow {
  0%,
  100% {
    opacity: 0.4;
    transform: translateY(0) scaleY(1) scaleX(1);
  }
  10%,
  90% {
    opacity: 0;
    transform: translateY(200%) scaleY(0.3) scaleX(0.3);
  }
}

/* pokemon throw/exit animation code */

.pkmn {
  width: 85px;
  height: 140px;
  margin: 2px;
  position: absolute;
  left: 50%;
  top: 50px;
}

.pkmn .mon {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.pkmn .mon:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: var(--p1xPos);
  top: var(--p1yPos);
  background-repeat: no-repeat;
  background-position: center bottom;
  transform-origin: center 125px;
  background-image: var(--poke1);
}

.pkmn:nth-child(2) .mon:before {
  background-image: var(--poke2);
  left: var(--p2xPos);
  top: var(--p2yPos);
}

.pkmn .ball {
  position: absolute;
  left: calc(10% - 30px);
  bottom: -3px;
  top: auto;
  z-index: 1;
}

.pkmn .explode {
  will-change: opacity;
  overflow: hidden;
  z-index: 3;
}

.pkmn.exit .mon:before {
  animation-name: mon-poof;
  animation-delay: 1.5s;
  animation-duration: 0.75s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-direction: forwards;
}

.pkmn.exit:nth-child(2) .mon:before {
  animation-name: mon-poof-2;
}

.pkmn .mon {
  transform: scaleX(1);
}

.pkmn.right .ball {
  transform: scaleX(-1);
  left: calc(63% + 100px);
}

@keyframes mon-poof {
  0% {
    opacity: 0;
    transform: scale(3);
    filter: blur(9px) contrast(0.25) brightness(0.65) sepia(1) saturate(3)
      hue-rotate(-90deg) contrast(2.2) brightness(5) blur(9px);
  }
  30% {
    opacity: 1;
  }
  75% {
    transform: scale(1);
    filter: blur(2px) contrast(0.25) brightness(0.65) sepia(1) saturate(4)
      hue-rotate(-90deg) contrast(2) brightness(4) blur(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px) contrast(1) brightness(1) sepia(0) saturate(1)
      hue-rotate(0deg) contrast(1) brightness(1) blur(0px);
  }
}

@keyframes mon-poof-2 {
  0% {
    opacity: 0;
    transform: scale(3);
    filter: blur(9px) contrast(0.3) brightness(0.7) sepia(1) saturate(4)
      hue-rotate(140deg) contrast(2.2) brightness(6) blur(9px);
  }
  30% {
    opacity: 1;
  }
  75% {
    transform: scale(1);
    filter: blur(2px) contrast(0.1) brightness(0.66) sepia(1) saturate(1)
      hue-rotate(140deg) contrast(2.2) brightness(6) blur(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px) contrast(1) brightness(1) sepia(0) saturate(1)
      hue-rotate(0deg) contrast(1) brightness(1) blur(0px);
  }
}

/* ball throwing / bouncing / opening code */

.ball.throw,
.pkmn.exit .ball {
  animation-duration: 5s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  animation-name: throw;
  background: none;
}
.ball.throw:before,
.pkmn.exit .ball:before {
  display: none;
}

.ball.throw *,
.pkmn.exit .ball *,
.ball.throw .sprite:before,
.pkmn.exit .ball .sprite:before {
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

.ball.throw *,
.pkmn.exit .ball * {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.ball.throw .x,
.pkmn.exit .ball .x {
  animation-name: throw-x;
}

.ball.throw .y,
.pkmn.exit .ball .y {
  animation-name: throw-y;
}

.ball.throw .sprite,
.pkmn.exit .ball .sprite {
  animation-duration: 2.5s;
  animation-name: throw-sprite;
  animation-timing-function: steps(1);
}
.ball.throw .sprite:before,
.pkmn.exit .ball .sprite:before {
  animation-name: throw-shadow;
}

@keyframes throw {
  0%,
  100% {
    opacity: 0;
    animation-timing-function: ease-out;
  }
  20%,
  90% {
    opacity: 1;
  }
}

@keyframes throw-x {
  0% {
    transform: translateX(-240%);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translateX(-45%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes throw-y {
  0% {
    transform: translateY(-140%) scaleY(1.05) scaleX(0.95);
    animation-timing-function: ease-in;
  }
  50% {
    transform: translateY(-6%) scaleY(0.95) scaleX(1.1);
    animation-timing-function: ease-out;
  }
  75% {
    transform: translateY(-50%) scaleY(1.05) scaleX(0.95);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0%) scaleY(1) scaleX(1);
  }
}

@keyframes throw-sprite {
  0% {
    background-position-y: -40px;
  }
  3% {
    background-position-y: -80px;
  }
  6% {
    background-position-y: -120px;
  }
  9% {
    background-position-y: -160px;
  }
  12% {
    background-position-y: -200px;
  }
  18% {
    background-position-y: -240px;
  }
  23% {
    background-position-y: -320px;
  }
  28% {
    background-position-y: -360px;
  }
  35%,
  90% {
    background-position-y: -400px;
  }
  95% {
    background-position-y: -320px;
  }
  100% {
    background-position-y: -360px;
  }
}

@keyframes throw-shadow {
  0% {
    opacity: 0;
    transform: translateY(1px) scaleY(1) scaleX(1);
    animation-timing-function: ease;
  }
  35%,
  65%,
  95% {
    opacity: 0;
    transform: translateY(200%) scaleY(0.3) scaleX(0.3);
  }
  52% {
    opacity: 0.3;
    transform: translateY(1px) scaleY(1) scaleX(1);
  }
  100% {
    opacity: 0.3;
    transform: translateY(1px) scaleY(1) scaleX(1);
  }
}

/* pokemon exiting animation code */

$ecell: 240px;

.explode {
  width: $ecell;
  height: $ecell;
  position: absolute;
  left: 50%;
  top: 87%;
  transform: translate(-50%, -50%);
  mix-blend-mode: color-dodge;
  will-change: opacity, filter;
  opacity: 0;
}

.explode:before {
  content: "";
  background-image: url("https://assets.codepen.io/13471/jimena-cuenca-changeworld-sprite.jpg");
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  will-change: opacity;
}

.exit .explode,
.exit .explode:before {
  animation-delay: 1.2s;
  animation-duration: 0.66s;
  animation-iteration-count: 1;
}

.pkmn.exit .explode {
  animation-name: explode-filters;
  animation-timing-function: linear;
  opacity: 0;
  left: 0px;
}
.pkmn.exit:nth-child(2) .explode {
  animation-name: explode-filters-2;
  left: 130px;
}

.exit .explode:before {
  animation-name: explode;
  animation-timing-function: steps(1);
}

.pkmn.exit .explode,
.pkmn.exit .explode:before {
  animation-delay: 1s;
  animation-duration: var(--slowsplode, 0.75s);
}
.pkmn.exit .ball,
.pkmn.exit .ball *,
.pkmn.exit .ball .sprite:before {
  animation-delay: 0s;
}

@keyframes explode {
  0% {
    background-position: 0 0;
  }
  5% {
    background-position: -$ecell 0;
  }
  10% {
    background-position: -($ecell * 2) 0;
  }
  15% {
    background-position: -($ecell * 3) 0;
  }
  20% {
    background-position: -($ecell * 4) 0;
  }
  25% {
    background-position: -($ecell * 5) 0;
  }
  30% {
    background-position: -($ecell * 6) 0;
  }
  35% {
    background-position: -($ecell * 7) 0;
  }
  40% {
    background-position: -$ecell (-$ecell);
  }
  45% {
    background-position: -($ecell * 2) (-$ecell);
  }
  50% {
    background-position: -($ecell * 3) (-$ecell);
  }
  55% {
    background-position: -($ecell * 4) (-$ecell);
  }
  60% {
    background-position: -($ecell * 5) (-$ecell);
  }
  65% {
    background-position: -($ecell * 6) (-$ecell);
  }
  70% {
    background-position: -$ecell (-$ecell * 2);
  }
  75% {
    background-position: -($ecell * 1) (-$ecell * 2);
  }
  80% {
    background-position: -($ecell * 2) (-$ecell * 2);
  }
  85% {
    background-position: -($ecell * 3) (-$ecell * 2);
  }
  90% {
    background-position: -($ecell * 4) (-$ecell * 2);
  }
  95% {
    background-position: -($ecell * 5) (-$ecell * 2);
  }
  100% {
    background-position: -($ecell * 6) (-$ecell * 2);
  }
}

@keyframes explode-filters {
  0% {
    filter: blur(0px) brightness(1) contrast(1) sepia(0.75) saturate(1)
      hue-rotate(270deg);
    opacity: 1;
  }
  40% {
    filter: blur(0px) brightness(1) contrast(1) sepia(0.75) saturate(1)
      hue-rotate(270deg);
  }
  50% {
    opacity: 1;
    filter: blur(2px) brightness(1) contrast(1) sepia(1) saturate(2)
      hue-rotate(270deg);
  }
  75% {
    opacity: 1;
  }
  100% {
    filter: blur(12px) brightness(0.5) contrast(1) sepia(1) saturate(0)
      hue-rotate(270deg);
    opacity: 0;
  }
}

@keyframes explode-filters-2 {
  0% {
    filter: blur(0px) brightness(1) contrast(1) sepia(0.75) saturate(1)
      hue-rotate(190deg);
    opacity: 1;
  }
  40% {
    filter: blur(0px) brightness(1) contrast(1) sepia(0.75) saturate(1)
      hue-rotate(190deg);
  }
  50% {
    opacity: 1;
    filter: blur(2px) brightness(1) contrast(1) sepia(1) saturate(2)
      hue-rotate(190deg);
  }
  75% {
    opacity: 1;
  }
  100% {
    filter: blur(12px) brightness(0.5) contrast(1) sepia(1) saturate(0)
      hue-rotate(190deg);
    opacity: 0;
  }
}
</style>
