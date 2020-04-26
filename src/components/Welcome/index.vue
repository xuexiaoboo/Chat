<template>
  <div class="wel-container">
      <p>Welcome...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem("username")
    };
  }
};
</script>

<style scoped>
.wel-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: masked-animation 2s infinite linear;
}
@keyframes masked-animation {
         0%{ background-position: 0 0;}
         100% { background-position: -100% 0;}
    }

.wel-container p {
  font-size: 100px;
  font-family: cursive;
  margin: 0 10px;
}
</style>
