<template>
    <div class="page-container">
        <div class="uploader-card">
            <div class="controls-header">
                <div>
                    <h1 class="title">Página no encontrada</h1>
                    <p class="subtitle">
                        La ruta que intentas acceder no existe o fue movida.
                        Verifica la URL o regresa a una sección válida.
                    </p>
                </div>
            </div>

            <!-- Zona preparada para imagen / ícono -->
            <div class="image-container">
                <img src="../assets/not-found.png" alt="Not found" />
            </div>

            <div class="actions">
                <button class="primary-btn" @click="goHome">
                    Volver al inicio
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>

<style scoped>
/* ===== Layout global ===== */
.page-container {
    height: 100%;
    background-color: #0f1115;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    color: #e5e7eb;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}

/* ===== Card ===== */
.uploader-card {
    width: 60%;
    max-width: 720px;
    background-color: #161a20;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55);
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* ===== Textos ===== */
.title {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: #9ca3af;
    line-height: 1.4;
}

/* ===== Header ===== */
.controls-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

/* ===== Imagen / Ícono ===== */
.image-container {
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-size: 14px;
}
.image-container img {
    height: 300px;
}

/* ===== Acciones ===== */
.actions {
    display: flex;
    justify-content: flex-end;
}

.primary-btn {
    background-color: #2563eb;
    color: #ffffff;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}

.primary-btn:hover {
    background-color: #1d4ed8;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
    .uploader-card {
        width: 100%;
        padding: 24px;
    }

    .image-container {
        height: 160px;
    }
}
</style>
