<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useProjects } from '@/components/modules/useProjects';
import AboutButton from './components/AboutButton.vue';

const { 
  scrollProgress,
  isScrolled,
} = useProjects();


</script>

<template>
  <div class="fixed top-0 left-0 w-full h-2 z-100 bg-transparent">
      <div 
      class="h-full bg-main-orange transition-all duration-150 ease-out rounded-2xl" 
      :style="{ width: scrollProgress + '%' }"
      >
    </div>

    <about-button />

    </div>
  <header class="fixed top-auto left-0 w-full z-99 bottom-0 right-0 pointer-events-none" :class="{ 'nav-at-top': isScrolled }">
    <div>

      <nav class="w-full text-[14px] md:text-[16px] pr-10 flex justify-end gap-10 font-body text-main-beige-light bg-main-black p-4 pointer-events-auto">
        <a href="#home" class="relative group py-1 transition-colors duration-300 hover:text-main-white hover:opacity-80">
          Home
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-main-orange transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </a>
        <a href="#projects" class="relative group py-1 transition-colors duration-300 hover:text-main-white hover:opacity-80">
          Selected Projects
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-main-orange transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </a>
        <a href="#links" class="relative group py-1 transition-colors duration-300 hover:text-main-white hover:opacity-80">
          Links
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-main-orange transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </a>
      </nav>

    </div>
  </header>

  <RouterView />
</template>

<style>
header {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), top 0s 0.3s;
}

header.nav-at-top {
  top: 0;
  bottom: auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
</style>
