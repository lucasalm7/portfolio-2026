<script setup>
import { studies } from '@/components/modules/useProjects';
import { work } from '@/components/modules/useProjects';
</script>

<template>
    <div class="w-full p-8 bg-main-beige-light" id="about">
        <h2 class="font-body text-main-black text-[14px] md:text-[18px] def">About /</h2>
    </div>
  
    <div class="grid grid-cols-12 gap-4 px-4 md:px-30 bg-main-beige-light md:pb-10">
        <div class="col-span-12 md:col-span-4 px-4 md:px-4 py-2 md:py-4">
            <div>
                <p class="font-title uppercase font-black opacity-80 text-main-black text-[16px] md:text-[20px] leading-relaxed def">
                    Multimedia designer with a technical and creative background, experienced in audiovisual production,
                    typesetting, and event technology. Driven by curiosity and a passion for digital experiences, storytelling,
                    and user-centered design, with hands-on experience in front-end development, UX/UI, and visual communication.
                </p>
            </div>
        </div>

        <div class="flex justify-center col-span-12  md:col-span-4 py-2 md:py-4">
            <img src="@/assets/images/cv_photo.jpg" alt="Profile Picture" class="rounded-4xl w-[60%] h-auto object-cover" />
        </div>

        <div class="col-span-12 md:col-span-2">
            <div class="font-body">
                <p class="font-black mb-4 text-[14px] md:text-[16px]">
                Studies
                </p>
                <p v-for="(study, index) in studies" :key="index" class="text-[13px] md:text-[14px] leading-relaxed pb-2">
                <span class="font-bold mr-4">{{ String(index + 1).padStart(2, '0') }}</span> {{ study.date }}, {{ study.school }}, {{ study.program }}
                </p>
            </div>
        </div>

        <div class="col-span-12 md:col-span-2 mb-12">
            <div class="font-body">
                <p class="font-black mb-4 text-[14px] md:text-[16px]">
                Experience
                </p>
                <p v-for="(job, index) in work" :key="index" class="text-[13px] md:text-[14px] leading-relaxed pb-2">
                <span class="font-bold mr-4">{{ String(index + 1).padStart(2, '0') }}</span> {{ job.date }}: {{ job.position }}, {{ job.company }}, {{ job.location }}
                </p>
            </div>
        </div>
            

</div>
</template>


