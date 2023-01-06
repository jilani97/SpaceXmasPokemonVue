<script setup>
const props = defineProps({
  dataName: String,
  characterName: String,
  imgSrc: String,
  id: String,
});
</script>

<template>
  <a
    class="character"
    :id="characterName"
    :data-name="dataName"
    :rel="characterName"
    ><img class="character__img" :alt="characterName" :src="imgSrc" />
    <p class="character__name">{{ characterName }}</p></a
  >
</template>

<style scoped lang="scss">
.character {
  margin-bottom: 4px;
  width: auto;
  max-height: 120px;
  align-self: stretch;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  position: relative;
  text-align: center;
  &__name {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: none;
  }
  &__img,
  &__name {
    margin: 0;
    padding: 0;
  }
  &__img {
    filter: grayscale(0.84);
    height: 120px;
  }
  &.active {
    transform: scale(1.05);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    z-index: 100;
    .character__name {
      display: block;
      width: 100%;
      background: #e3231e;
      color: white;
      -webkit-text-fill-color: white;
      -webkit-text-stroke: 0px;
      opacity: 0.9;
      margin-top: 0.8em;
      font-size: 0.7em;
      border-radius: 50px;
      text-transform: uppercase;
      font-weight: 700;
      padding: 0.3em 0;
    }
    &:after {
      content: "1P";
      position: absolute;
      text-align: center;
      top: -15px;
      left: 30%;
      font-size: 36px;
      color: #e3231e;
      font-weight: 700;
      text-shadow: 0px 0px 5px rgba(255, 255, 255, 1);
    }
    &.p2:after {
      content: "2P";
    }
    .character__img {
      filter: grayscale(0);
      outline: 4px solid white;
      animation: flash 300ms linear;
    }
  }
}

@keyframes flash {
  0% {
    filter: brightness(100%);
  }
  20% {
    filter: brightness(150%);
  }
  40% {
    filter: brightness(100%);
  }
  60% {
    filter: brightness(150%);
  }
  80% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(150%);
  }
}
</style>
