<script setup>
import { useProjects } from '@/components/modules/useProjects';
import { ref, watch, onUnmounted, onMounted} from 'vue';

const { 
  projects,
  selectedProject,
  openModal,
  closeModal,
  isVideo,
  videoRefs,
  playingIndex,
  toggleVideo
} = useProjects();

watch(selectedProject, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}, { immediate: true });

onUnmounted(() => {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
});
</script>

<template>
  <div id="projects" class="bg-main-beige-light pb-[5%]">

    <div class="w-full p-8">
      <h2 class="font-body text-main-black text-[14px] md:text-[18px] def">Selected Works /</h2>
    </div>

    <div class="grid grid-cols-12 gap-4 px-4 md:px-8 bg-main-beige-light">
      <div class="col-span-12 px-4 md:px-25 py-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          <div v-for="(project, index) in projects" :key="project.id" class="relative group">
            <div class="aspect-square bg-white rounded-[2.5rem] shadow-xl shadow-black/5 overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]">
              <img :src="project.imageArray ? project.imageArray[0] : project.image" :alt="project.title" class="w-full h-full object-cover" @click="openModal(project)">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div v-if="selectedProject" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    @click="closeModal">
    <div class="window-style" 
      @click.stop>

      <button class="close-btn" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="p-8 md:p-12 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 pb-16">
        <img :src="selectedProject.imageArray[1]" class="rounded-4xl w-full object-contain shadow-sm mb-5">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center px-4">
          <div>
            <h2 class="font-title text-2xl uppercase font-black text-main-black">
              {{ selectedProject.title }}
            </h2>
            <div class="flex gap-4 mt-2 text-sm text-gray-600 font-body">
              <p><strong>Type:</strong> {{ selectedProject.type }}</p>
              <p><strong>Date:</strong> {{ selectedProject.date }}</p>
            </div>
            <p class="font-body mt-6 text-base">{{ selectedProject.description }}</p>
          </div>
        </div>
        <template v-for="(media, index) in selectedProject.imageArray.slice(2)" :key="index">
          <img v-if="!isVideo(media)" :src="media" class="rounded-2xl w-full object-contain shadow-sm mb-4 bg-white">
          <div v-else class="relative group rounded-2xl overflow-hidden shadow-sm mb-4 min-h-fit">
            <video :ref="el => videoRefs[index] = el" muted class="rounded-2xl w-full h-auto object-contain">
              <source :src="media" type="video/mp4">
              Your browser doesn't support video playback.
            </video>
            <button @click="toggleVideo(index)" class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg v-if="playingIndex !== index" class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg v-else class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </button>
          </div>
        </template>
      </div>
      <div class="col-span-full h-12 w-full"></div>
    </div>
  </div>
</template>