<template>
    <div>
        <h2>Проекты</h2>
        <div v-if="projects.length > 0" class="container">
            <div class="row project-header">
                <div class="col-3 name">Название</div>
                <div class="col-6 description">Описание</div>
            </div>
            <div v-for="project in projects" :key="project.id" class="row project-item">
                <div class="col-3 project-name">{{ project.name }}</div>
                <div class="col-6 project-description">{{ project.description }}</div>
            </div>
        </div>
        <p v-else>Нет доступных проектов.</p>
    </div>
</template>

<script>
export default {
    data() {
    return {
        projects: [],
    };
    },
    mounted() {
        this.loadProjects();
    },
    methods: {
        async loadProjects() {
            setTimeout(() => {
                this.projects = [
                    { id: 1, name: 'Тут название', description: 'Тут описание' },
                    { id: 2, name: 'Тут название', description: 'Тут описание' },
                ];
            }, 200);
        },
    },
};
</script>

<style scoped>
.project-header {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    align-items: center;
}

.project-item {
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.project-photo img {
    background-color: #ddd;
    object-fit: cover;
}

.project-actions {
    text-align: right;
}

.btn {
    width: 120px;
    height: 30px;
    border-radius: 30px;
    background: #007AC2;
    color: #FFFFFF;
    size: 32px;
    text-align: center;
    padding: 5px;
}
</style>