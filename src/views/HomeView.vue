<script setup>
import HeroSection from '@/components/HeroSection.vue';
import TextSection from '@/components/TextSection.vue';
import LinkSection from '@/components/LinkSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
</script>

<template>
  <main>
    <HeroSection />

    <ProjectsSection />

    <link-section />

    <div class="hidden md:block">
      <TextSection/>
    </div>
  </main>
</template>
