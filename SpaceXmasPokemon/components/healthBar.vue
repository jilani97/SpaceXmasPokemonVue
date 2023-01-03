<script setup>
const props = defineProps({
  name: String,
  health: Number,
  maxHealth: Number,
  xPos: Number,
  yPos: Number,
});
</script>

<template>
  <div class="sao-healthbar">
    <div class="main-container">
      <div class="character-name">
        {{ name }}
      </div>
      <div class="health-bar--outline">
        <div class="health-bar--border">
          <div class="health-bar--background">
            <div
              class="health-bar--health"
              :style="{
                '--health': health,
                '--maxhHealth': maxHealth,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="health-indicator"
      :style="{ '--health': health, '--maxHealth': maxHealth }"
    >
      {{ health + " / " + maxHealth }}
    </div>
    <div class="character-level">
      {{ xPos + "," + yPos }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.sao-healthbar {
  width: 400px;
  height: 50px;
  display: flex;
  &.flip {
    transform: scaleX(-1);
  }

  .main-container {
    height: 50px;
    width: 400px;
    background: rgba(#000, 0.6);
    clip-path: polygon(
      400px 0,
      380px 36.5px,
      230px 36.5px,
      230px 51px,
      0 51px,
      0 0
    );
    display: flex;
    align-items: center;

    .character-name {
      width: 60px;
      color: #fff;
      text-align: center;
      margin-right: 40px;
      margin-left: 7px;
      &.flip {
        transform: scaleX(-1);
        margin-right: 15px;
        margin-left: 25px;
      }
    }

    .health-bar--outline {
      width: 274px;
      height: 34px;
      background: #fff;
      clip-path: polygon(
        262px 20.55px,
        122.5px 20.55px,
        113.5px 35px,
        0 35px,
        0 0,
        274px 0
      );
      display: flex;
      justify-content: center;
      align-items: center;

      .health-bar--border {
        width: 272px;
        height: 32px;
        background: rgba(#000, 0.6);
        clip-path: polygon(
          260px 18px,
          120px 18px,
          110px 35px,
          0 35px,
          0 0,
          271px 0
        );
        display: flex;
        justify-content: center;
        align-items: center;

        .health-bar--background {
          width: 268px;
          height: 28px;
          background: #fff;
          clip-path: polygon(
            256px 14px,
            116.5px 14px,
            103.5px 35px,
            0 35px,
            0 0,
            265px 0
          );

          .health-bar--health {
            width: calc(var(--health) / (var(--maxHealth)) * 100%);
            height: 28px;
            background: linear-gradient(to bottom, #71af1b 0%, #94c94f 100%);
            clip-path: polygon(100% 0, 0 0, 0 102%, calc(100% - 18px) 102%);
          }
        }
      }
    }
  }
  .health-indicator {
    width: 90px;
    height: 26px;
    margin: 38px 0 0 240px;
    padding-right: 10px;
    background: rgba(#000, 0.4);
    border-radius: 3px 0 0 3px;
    color: #fff;
    font-size: 0.8em;
    line-height: 26px;
    text-align: right;
    position: absolute;

    &.flip {
      transform: scaleX(-1);
    }

    &:before {
      content: var(--health);
      margin-right: 5px;
    }
    &:after {
      content: var(--health);
      margin-left: 5px;
    }
  }
  .character-level {
    width: 40px;
    height: 26px;
    margin: 38px 0 0 340px;
    padding-left: 10px;
    background: rgba(#000, 0.4);
    border-radius: 0 3px 3px 0;
    color: #fff;
    font-size: 0.8em;
    line-height: 26px;
    position: absolute;
    &.flip {
      transform: scaleX(-1);
    }
  }
}
</style>
