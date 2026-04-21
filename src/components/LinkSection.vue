<script setup>
import { contactLinks } from '@/components/modules/useProjects'; 

</script>

<template>
  <div id="links" class="grid grid-cols-12 gap-4 px-4 md:px-8 bg-main-black" style="scroll-margin-top: 6rem;">
    <div class="col-span-12 bg-main-black py-6 md:py-10 px-4 md:px-25 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
      <a 
        v-for="link in contactLinks" 
        :key="link.label"
        :href="link.url"
        :download="link.isDownload ? 'CV_LucasAlmeida.pdf' : undefined"
        target="_blank"
        class="nav-pill">
        {{ link.label }}
      </a>
    </div>
  </div>
</template>

<style>

</style>