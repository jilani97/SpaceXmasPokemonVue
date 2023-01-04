<template>
  <div>
    <nav class="pokeball-border text-center">
      <div class="title h1">
        <NuxtLink to="/"> SpaceXmasPokemon </NuxtLink>
      </div>
    </nav>
    <NuxtPage />
    <div class="footerText text-center">
      Use Arrow keys to Move and x to attack
    </div>
    <footer class="footerText absolute bottom-0 text-center w-100">
      <p>
        Credit to
        <a
          href="https://www.pokecommunity.com/showpost.php?p=9938453&postcount=4"
          >WolfPP from the PokéCommunity forums</a
        >
        for the excellent Pokéball sprite work! <br />
        Pokémon Sprites from <a href="http://pokemondb.net">pokemondb.net</a>,
        and pokémon exit flourish borrowed from
        <a href="https://www.artstation.com/artwork/809NQ"
          >Jimena on Artstation.</a
        >
      </p>
    </footer>
  </div>
</template>

<style lang="scss">
.footerText {
  -webkit-text-fill-color: black;
  -webkit-text-stroke: 0px black;
}

$pokeball-top-border: #e33a1c;
$pokeball-middle: #ee7f56;
$pokeball-end: #ce2312;
$pokeball-bottom-border: #758bc4;

$pokemon-base: #f4c41e;
$pokemon-font-border: #3068a8;

.pokeball-border {
  border-top: 2px solid $pokeball-top-border;
  border-bottom: 2px solid $pokeball-bottom-border;
}

body {
  -webkit-text-fill-color: $pokemon-base;
  -webkit-text-stroke: 2px $pokemon-font-border;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow-x: hidden;
}

.title {
  vertical-align: middle;
  padding: 3rem 0;
  background-image: linear-gradient(to bottom, $pokeball-end 50%, white 50%);
}

.title a {
  z-index: 2;
  position: relative;
  background-color: white;
  border: 5px solid black;
  border-radius: 50px;
  padding: 10px;
  text-decoration: none;
}

.title a:visited {
  -webkit-text-fill-color: $pokemon-base;
  -webkit-text-stroke: 1px $pokemon-font-border;
}

.title::after {
  content: "";
  width: 100%;
  height: 5px;
  bottom: 24.5px;
  background: black;
  display: block;
  position: relative;
}
</style>

<script setup></script>
