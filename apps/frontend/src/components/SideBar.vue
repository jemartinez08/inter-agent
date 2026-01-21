<template>
    <!-- Overlay para móvil -->
    <div v-if="isMobile && isOpen" class="overlay" @click="toggleSidebar"></div>

    <aside :class="['sidebar', { open: isOpen || !isMobile }]">
        <div class="sidebar-header">
            <h2>My App</h2>
            <button class="close-btn" v-if="isMobile" @click="toggleSidebar">
                ✕
            </button>
        </div>

        <nav class="menu">
            <button v-for="item in menu" :key="item.name" class="menu-item"
                :class="{ active: route.name === item.name }" @click="navigate(item)">
                {{ item.label }}
            </button>
        </nav>
    </aside>

    <!-- Botón hamburguesa -->
    <button class="menu-toggle" v-if="isMobile" @click="toggleSidebar">
        ☰
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

/**
 * Definición del menú (rutas)
 * TODO está centralizado en este archivo
 */
const menu = [
    { name: 'admin-panel', label: 'Admin Panel', path: '/' },
    { name: 'resume-analyzer', label: 'Resume Analyzer', path: '/resume-analyzer' },
    { name: 'interview-analyzer', label: 'Interview Analyzer', path: '/interview-analyzer' },
];

const isOpen = ref(false);
const isMobile = ref(false);

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
};

const navigate = (item) => {
    router.push(item.path);
    if (isMobile.value) {
        isOpen.value = false;
    }
};

const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
    if (!isMobile.value) {
        isOpen.value = true;
    }
};

onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Base */
.sidebar {
    position: fixed;
    top: 100;
    left: 100;
    height: 100%;
    width: 280px;
    background-color: #1f2937;
    color: #fff;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

.sidebar.open {
    transform: translateX(0);
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #374151;
}

.menu {
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.menu-item {
    background: none;
    border: none;
    color: #d1d5db;
    text-align: left;
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-radius: 6px;
    margin-bottom: 0.5rem;
}

.menu-item:hover {
    background-color: #374151;
    color: #fff;
}

.menu-item.active {
    background-color: #6366f1;
    color: #fff;
}

/* Botón hamburguesa */
.menu-toggle {
    position: fixed;
    top: 1rem;
    left: 1rem;
    background-color: #2563eb;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    font-size: 1.25rem;
    z-index: 1100;
}

/* Overlay móvil */
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 900;
}

/* Desktop */
@media (min-width: 769px) {
    .sidebar {
        transform: translateX(0);
    }

    .menu-toggle {
        display: none;
    }
}
</style>
