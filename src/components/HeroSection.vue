<script setup>
import { useProjects } from '@/components/modules/useProjects';
import { ref, onMounted, onUnmounted } from 'vue';

const { 
  projects,
  cardOffsets,
  handleMouseMove
} = useProjects();

const heroImages = ref([]);
const isMobile = ref(window.innerWidth < 768);

const onMouseMove = (e) => handleMouseMove(e, heroImages.value);

onMounted(() => {
  if (isMobile.value) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          
          cardOffsets.value.forEach((card, index) => {
            card.y = progress * 150 - 75;
            card.x = (progress - 0.5) * 120;
          });
        }
      });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    const heroSection = document.getElementById('home');
    if (heroSection) observer.observe(heroSection);
  } else {
    window.addEventListener('mousemove', onMouseMove);
  }

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
  });
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
});
</script>

<template>
    <div class="bg-main-black min-h-screen pb-5" id="home">

      <div class="flex flex-col text-center text-main-beige-light font-body text-[14px] md:text-[16px] pt-4 def">
        <p class="font-bold">Esbjerg, Denmark</p>
        <p>lucasalm.media@gmail.com</p>
      </div>

      <div class="flex flex-col items-center pt-10 def">
        <h1 class="font-title text-main-beige-light uppercase font-black text-[30px] md:text-[60px] text-center">Lucas Almeida</h1>
      </div>

      <div class="flex flex-col md:flex-row justify-center items-center py-10 px-4">
        <img 
          v-for="(card, index) in cardOffsets" 
          :key="card.id"
          :ref="el => heroImages[index] = el"
          :src="projects[index]?.imageArray?.[0] || projects[index]?.image" :alt="projects[index]?.title"
          class="w-48 h-48 rounded-[2rem] transition-transform duration-75 ease-out"
          :class="{ '-ml-12': index > 0 }"
          :style="{
            transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg)`
          }"
        >
      </div>

      <div class="flex flex-col items-center pt-5 def">
        <h1 class="font-title text-main-white uppercase font-black text-[30px] md:text-[40px] opacity-80 text-center">Illustrator,<br> frontend & video</h1>
      </div>

    </div>
</template>