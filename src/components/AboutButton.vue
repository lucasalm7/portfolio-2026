<script setup>
import { ref, watch, nextTick} from 'vue';
import { studies, work } from '@/components/modules/useProjects';

const isOpen = ref(false);
const visibleHeadings = ref(new Set());
const isHovered = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

watch(isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
});

watch(isOpen, async (newVal) => {
  if (newVal) {
    await nextTick();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Array.from(document.querySelectorAll('[data-heading]')).indexOf(entry.target);
        if (entry.isIntersecting) {
          visibleHeadings.value.add(index);
        } else {
          visibleHeadings.value.delete(index);
        }
      });
    }, { threshold: 0.8 });

    document.querySelectorAll('[data-heading]').forEach(heading => {
      observer.observe(heading);
    });
  }
});
</script>

<template>
    <button @click="openModal"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="fixed left-8 top-1/2 -translate-y-1/2 z-40 w-12 md:w-16 h-12 md:h-16 rounded-full
    bg-main-orange shadow-lg hover:shadow-xl transition-all duration-300
    flex items-center justify-center pointer-events-auto hover:cursor-pointer"
    style="perspective: 1000px;">

    <span class="font-title text-main-black font-black text-[14px] md:text-[16px] uppercase absolute transition-transform duration-500" :style="{ transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)', backfaceVisibility: 'hidden' }">
      bio
    </span>
    
    <img src="@/assets/images/face.svg" alt="About" class="absolute w-12 h-12 transition-transform duration-500" :style="{ transform: isHovered ? 'rotateY(0deg)' : 'rotateY(180deg)', backfaceVisibility: 'hidden' }" />
  </button>

<transition name="modal">
  
<div v-if="isOpen" class="fixed inset-0 bg-main-beige-light z-50 flex flex-col p-8 md:p-12 overflow-y-auto">

    <div class="max-w-4xl mx-auto mt-16 text-center" @click.stop>
      <h1 data-heading class="font-title text-main-black uppercase font-black text-[40px] md:text-[60px] mb-8 transition-opacity duration-700" :class="{ 'opacity-100': visibleHeadings.has(0), 'opacity-30': !visibleHeadings.has(0) }">
        LUCAS ALMEIDA IS A MULTIMEDIA DESIGNER, ILLUSTRATOR, AND BRAND STRATEGIST BASED IN ESBJERG, DENMARK.
      </h1>
      <h1 data-heading class="font-title text-main-black uppercase font-black text-[40px] md:text-[60px] mb-8 transition-opacity duration-700" :class="{ 'opacity-100': visibleHeadings.has(1), 'opacity-30': !visibleHeadings.has(1) }">
        HIS WORK IS HEADLINED BY HUMAN-CENTERED UX, SUSTAINABLE URBAN CONCEPTS, AND VIBRANT VISUAL IDENTITIES.
      </h1>
      <h1 data-heading class="font-title text-main-black uppercase font-black text-[40px] md:text-[60px] mb-8 transition-opacity duration-700" :class="{ 'opacity-100': visibleHeadings.has(2), 'opacity-30': !visibleHeadings.has(2) }">
        FEATURED PROJECTS INCLUDE THE GREEN LOOP SUSTAINABILITY HUB, BELOW BAR REBRANDING, INNOVATIVE TRAVEL CONCEPTS, AND MULTI-CHANNEL EVENT BRANDING.
      </h1>
    </div>

    <div class="max-w-4xl mx-auto mt-20 px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
    <div>
      <h2 class="font-title text-main-black uppercase font-black text-[24px] md:text-[32px] mb-8">
        Studies
      </h2>
      <p v-for="(study, index) in studies" :key="index" class="font-body text-[14px] md:text-[18px] leading-relaxed pb-6 text-main-black opacity-80">
        <span class="font-bold mr-4">{{ String(index + 1).padStart(2, '0') }}</span> {{ study.date }}, {{ study.school }}, {{ study.program }}
      </p>
    </div>

    <div>
      <h2 class="font-title text-main-black uppercase font-black text-[24px] md:text-[32px] mb-8">
        Experience
      </h2>
      <p v-for="(job, index) in work" :key="index" class="font-body text-[14px] md:text-[18px] leading-relaxed pb-6 text-main-black opacity-80">
        <span class="font-bold mr-4">{{ String(index + 1).padStart(2, '0') }}</span> {{ job.date }}: {{ job.position }}, {{ job.company }}, {{ job.location }}
      </p>
    </div>
  </div>
</div>
</div>

</transition>


  <button v-if="isOpen" @click="closeModal" class="fixed top-8 right-8 z-51 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:opacity-60 cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
</template>