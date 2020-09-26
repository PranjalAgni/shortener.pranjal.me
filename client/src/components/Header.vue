<template>
  <header>
    <img class="logo" src="../assets/logo.svg" />
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.logo {
  max-width: 40%;
  max-height: 40%;
  image-rendering: crisp-edges;
}

@media only screen and (max-width: 600px) {
  .logo {
    max-width: 80%;
    image-rendering: crisp-edges;
  }
}
</style>
