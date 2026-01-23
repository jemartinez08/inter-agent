<template>
    <div class="page-container">
        <div class="admin-card">
            <!-- Header -->
            <div class="controls-header">
                <div>
                    <h1 class="title">Admin Panel</h1>
                    <p class="subtitle">
                        Vista administrativa con información de ejemplo.
                        Este contenido puede modificarse o extenderse posteriormente.
                    </p>
                </div>

                <button class="primary-btn">
                    Acción
                </button>
            </div>

            <!-- Tabla -->
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Última actualización</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.role }}</td>
                            <td>
                                <span class="status" :class="item.status">
                                    {{ item.status }}
                                </span>
                            </td>
                            <td>{{ item.updatedAt }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * Datos de ejemplo
 * Posteriormente puedes reemplazar esto por:
 *  - API calls
 *  - Props
 *  - Pinia
 *  - Slots
 */
const items = [
    {
        id: 1,
        name: 'Juan Pérez',
        role: 'Admin',
        status: 'active',
        updatedAt: '2026-01-10',
    },
    {
        id: 2,
        name: 'María López',
        role: 'Editor',
        status: 'inactive',
        updatedAt: '2026-01-08',
    },
    {
        id: 3,
        name: 'Carlos Gómez',
        role: 'Viewer',
        status: 'active',
        updatedAt: '2026-01-05',
    },
];
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
.admin-card {
    width: 100%;
    max-width: 1100px;
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

/* ===== Tabla ===== */
.table-wrapper {
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.data-table thead {
    background-color: #1f2430;
}

.data-table th {
    text-align: left;
    padding: 12px;
    color: #9ca3af;
    font-weight: 500;
    border-bottom: 1px solid #2a2f3a;
}

.data-table td {
    padding: 12px;
    border-bottom: 1px solid #2a2f3a;
}

.data-table tbody tr:hover {
    background-color: #1c212b;
}

/* ===== Estados ===== */
.status {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
}

.status.active {
    background-color: rgba(34, 197, 94, 0.15);
    color: #22c55e;
}

.status.inactive {
    background-color: rgba(239, 68, 68, 0.15);
    color: #ef4444;
}

/* ===== Botón ===== */
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
    .admin-card {
        padding: 24px;
    }

    .controls-header {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
