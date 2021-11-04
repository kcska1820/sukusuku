<template>
  <img
    class="sukusukuLogo"
    alt="sukusuku Logo"
    src="/sukusuku.svg"
  >
</template>

<style>
.sukusukuLogo {
  height: 450px;
  width: 450px;
  border-radius: 50%;
  background-position: center center;
  animation: fadeIn 1.5s cubic-bezier(0.33, 1, 0.68, 1) 1 forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
