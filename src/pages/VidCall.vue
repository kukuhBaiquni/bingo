<script setup lang="ts">
import Control from "../components/Control.vue";
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-black">
    <div class="flex gap-x-2">
      <video
        class="h-[400px] w-[400px] border border-zinc-500 bg-black"
        autoPlay
        playsInline
      ></video>
      <video
        class="h-[400px] w-[400px] border border-zinc-500 bg-black"
        autoPlay
        playsInline
      ></video>
    </div>
    <Control />
  </div>
</template>
