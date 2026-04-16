import { ref, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid';

export function useProjects() {   
    const projects = ref([
        { id: uuidv4(),
        title: 'Green Loop',
        type: 'Illustrator / 3D Modeling',
        date: '2026-03',
        description: 'A university deep dive into upcycled urbanism and circular economies. I designed a multi-story community hub from repurposed containers, focusing on net-zero energy goals. The project features my 3D architectural modeling, an AI-generated concept video, and a full social media strategy designed to engage diverse local demographics.',
        imageArray: [
            new URL('@/assets/images/GreenLoopSquare.jpg', import.meta.url).href,
            new URL('@/assets/images/CompostInvit.jpg', import.meta.url).href,
            new URL('@/assets/videos/3dvideo.mp4', import.meta.url).href
        ]
    },
        { id: uuidv4(),
        title: 'Project 1',
        type: 'Illustrator',
        date: '2025-09',
        description: 'Project input',
        imageArray: [
            new URL('@/assets/images/GreenLoopSquare.jpg', import.meta.url).href,
            new URL('@/assets/images/GreenLoopSquare.jpg', import.meta.url).href,
        ]
    },
        { id: uuidv4(),
        title: 'Itinero ooopsie',
        type: 'Illustrator / Figma',
        date: '2026-04',
        description: 'A university assignment focused on the full UX-to-UI pipeline. I led the visual identity and logo design, and collaborated with a team to build a working Figma prototype based on public user needs.',
        imageArray: [
            new URL('@/assets/images/ItineroLogo.jpg', import.meta.url).href,
            new URL('@/assets/images/ItineroFullLogo.jpg', import.meta.url).href,
            new URL('@/assets/images/ItineroAppDashboard.png', import.meta.url).href,
            new URL('@/assets/images/ItineroAppGenerator.png', import.meta.url).href,
            new URL('@/assets/images/ItineroAppProfile.png', import.meta.url).href
        ]
    },
        { id: uuidv4(),
        title: 'Below Logo Design',
        type: 'Illustrator',
        date: '2025-10',
        description: 'A complete rebranding of a university bar to create a modern, international identity. I developed the name "BELOW" and a visual system centered on a logo that merges a beer mug with a staircase—symbolizing both the social atmosphere and the basement location. By using warm brown tones and rounded typography, I transitioned the space away from traditional pub aesthetics toward a cozy, youthful, and versatile brand identity.',
        imageArray: [
            new URL('@/assets/images/BelowThumb.jpg', import.meta.url).href,
            new URL('@/assets/images/BelowLogo.jpg', import.meta.url).href,
        ]
    },
        { id: uuidv4(),
        title: 'International Day',
        type: 'Illustrator',
        date: '2025-11',
        description: 'A promotional campaign for a university cultural festival. I created a flexible design system adapted for both print and digital displays, using a minimalist "world travel" concept. The project focuses on clear information hierarchy and bold typography to grab attention in a high-traffic campus environment.',
        imageArray: [
            new URL('@/assets/images/InternationalDayThumb.jpg', import.meta.url).href,
            new URL('@/assets/images/InternationalDayExportVertical.jpg', import.meta.url).href,
            new URL('@/assets/images/InternationalDayExport.jpg', import.meta.url).href
        ]
    }
    ])

    const selectedProject = ref(null);

    const openModal = (project) => {
        selectedProject.value = project;
    };

    const closeModal = () => {
        selectedProject.value = null;
    };

    const scrollProgress = ref(0);

    const updateScroll = () => {
    const pixelsScrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (totalHeight === 0) {
        scrollProgress.value = 0;
        return;
    }

    const percentage = (pixelsScrolled / totalHeight) * 100;
    scrollProgress.value = percentage;
    };

    onMounted(() => {
    window.addEventListener('scroll', updateScroll);
    });

    onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll);
    });

    const isScrolled = ref(false)

    const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
    }

    onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    })








    const cardOffsets = ref(
    projects.value.slice(0, 4).map((project, index) => ({
        id: project.id,
        x: 0,
        y: 0,
        rotate: index === 0 ? -12 : index === 1 ? -6 : index === 2 ? 12 : 6
    }))
    );

    const handleMouseMove = (e, elements) => {
        const radius = 200; // Distance where cards start moving
        const strength = 80; // How far they push away

        elements.forEach((el, index) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < radius) {
                const angle = Math.atan2(distanceY, distanceX);
                const push = (radius - distance) / radius * strength;
                
                cardOffsets.value[index].x = -Math.cos(angle) * push;
                cardOffsets.value[index].y = -Math.sin(angle) * push;
            } else {
                // Smoothly return to zero
                cardOffsets.value[index].x *= 0.9;
                cardOffsets.value[index].y *= 0.9;
            }
        });
    }

    const isVideo = (src) => /\.(mp4|webm|ogg)$/i.test(src);

    const videoRefs = ref({});
    const playingIndex = ref(null);

    const toggleVideo = (index) => {
    const video = videoRefs.value[index];
    if (video.paused) {
        video.play();
        playingIndex.value = index;
    } else {
        video.pause();
        playingIndex.value = null;
    }
    };






    return { 
        projects,
        selectedProject,
        openModal,
        closeModal,
        scrollProgress,
        isScrolled,
        cardOffsets,
        handleMouseMove,
        isVideo,
        videoRefs,
        playingIndex,
        toggleVideo
    };
  }








    export const contactLinks = [
        { label: 'DOWNLOAD CV', url: '#' },
        { label: 'VIDEO CV', url: 'https://youtu.be/nOVMEDgZWW4' },
        { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/lucas-almeida-media' },
        { label: 'EMAIL', url: 'mailto:lucasalm.media@gmail.com' },
        { label: 'GITHUB', url: 'https://github.com/lucasalm7' },
        ];
  

    export const studies = [
        {
        school: 'EASV',
        program: 'Multimedia Design',
        date: '2025 - 2027'
        },
        {
        school: 'Escola Secundária Martins Sarmento',
        program: 'Multimedia',
        date: '2016 - 2019'
        },
    ];

    export const work = [
        {
        company: 'Comwell Copenhagen Portside Dolce by Wyndham',
        location: 'Copenhagen, Denmark',
        date: '2022 - 2025',
        position: 'Event Assistant'
        },
        {
        company: 'Empage',
        location: 'Guimarães, Portugal',
        date: '2021 - 2022',
        position: 'Typesetter'
        },
        {
        company: 'OsFredericos',
        location: 'Guimarães, Portugal',
        date: '2018 - 2019',
        position: 'Video Editor Intern'
        }
    ];