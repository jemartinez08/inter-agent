<template>
    <div class="page-container">
        <div class="uploader-card">
            <h1 class="title">Upload PDF document</h1>
            <p class="subtitle">
                Select a PDF file from your transcription file and send it for processing.
            </p>

            <label class="file-drop" :class="{ 'is-dragging': isDragging }" @dragenter.prevent="onDragEnter"
                @dragover.prevent @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
                <input type="file" accept="application/pdf" @change="onFileChange" />
                <span v-if="!file">
                    Click to select a PDF file or drag and drop it here.
                </span>
                <span v-else>
                    {{ file.name }}
                </span>
            </label>

            <button class="upload-button" :disabled="!file || loading" @click="uploadPdf">
                {{ loading ? "Processing..." : "Send PDF" }}
            </button>

            <p v-if="error" class="error">
                {{ error }}
            </p>

            <!-- <pre v-if="response" class="response">
                {{ response }}
            </pre> -->

            <div v-if="response" class="response markdown-body" v-html="renderedMarkdown"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";

const file = ref<File | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const response = ref<{ response: string } | null>(null);
const isDragging = ref(false);

const renderedMarkdown = computed(() => {
    if (!response.value) return "";
    const html: any = marked.parse(response.value.response);
    return DOMPurify.sanitize(html);
});


function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];
    if (!selectedFile) return;

    handleFile(selectedFile);
}

async function uploadPdf() {
    if (!file.value) return;

    loading.value = true;
    error.value = null;
    response.value = null;

    try {
        const formData = new FormData();
        formData.append("file", file.value);
        formData.append("action", "process_pdf");

        const res = await fetch("https://inter-agent-backend.vercel.app/api/automation", {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        }

        const apiResponse = await res.json();
        response.value = apiResponse
    } catch (err) {
        console.error(err);
        error.value = "Error al enviar el documento";
    } finally {
        loading.value = false;
    }
}

function handleFile(selectedFile: File) {
    error.value = null;
    response.value = null;

    if (selectedFile.type !== "application/pdf") {
        error.value = "Solo se permiten archivos PDF";
        file.value = null;
        return;
    }

    file.value = selectedFile;
}

function onDragEnter() {
    isDragging.value = true;
}

function onDragLeave() {
    isDragging.value = false;
}

function onDrop(event: DragEvent) {
    isDragging.value = false;

    const droppedFile = event.dataTransfer?.files?.[0];
    if (!droppedFile) return;

    handleFile(droppedFile);
}
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
    background-color: #161a20;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55);
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
    margin-bottom: 24px;
    line-height: 1.4;
}

/* ===== File input estilizado ===== */
.file-drop {
    height: 120px;
    border: 2px dashed #2a2f3a;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    color: #9ca3af;
    font-size: 14px;
    transition: all 0.2s ease;
    margin-bottom: 20px;
}

.file-drop.is-dragging {
    border-color: #6366f1;
    background-color: #1b1f27;
}

.file-drop:hover {
    border-color: #6366f1;
    background-color: #1b1f27;
}

.file-drop input {
    display: none;
}

/* ===== Botón ===== */
.upload-button {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: none;
    font-size: 14px;
    font-weight: 500;
    background-color: #6366f1;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease;
}

.upload-button:hover:not(:disabled) {
    background-color: #4f46e5;
}

.upload-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* ===== Estados ===== */
.error {
    margin-top: 16px;
    color: #f87171;
    font-size: 13px;
}

.response {
    margin-top: 20px;
    background-color: #0f1115;
    padding: 12px;
    border-radius: 8px;
    font-size: 12px;
    color: #d1d5db;
    max-height: 300px;
    overflow: auto;
}

/* Markdown component */
.markdown-body {
    line-height: 1.6;
    white-space: normal;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
    margin-top: 1.2em;
}

.markdown-body pre {
    background: #0f172a;
    color: #e5e7eb;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
}

.markdown-body code {
    background: #e5e7eb;
    padding: 0.2em 0.4em;
    border-radius: 4px;
}
</style>
