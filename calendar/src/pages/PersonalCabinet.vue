<template>
    <div class="container">
        <div class="content">
            <nav class="navigation">
                <ul>
                    <li
                    :class="{ active: activeTab === 'my-data' }"
                    @click="setActivateTab('my-data')"
                    >
                        Мои данные 
                    </li>
                    <li
                    :class="{ active: activeTab === 'projects' }"
                    @click="setActivateTab('projects')"
                    >
                        Проекты
                    </li>
                    <li
                    :class="{ active: activeTab === 'events' }"
                    @click="setActivateTab('events')"
                    >
                        Мероприятия
                    </li>
                </ul>
            </nav>

            <div class="tab-content">
                <MyData v-if="activeTab === 'my-data'"/>
                <Projects v-if="activeTab === 'projects'"/>
                <Events v-if="activeTab === 'events'"/>
            </div>
        </div>
    </div>
</template>

<script>
import MyData from '@/components/MyData.vue';
import Projects from '@/components/Projects.vue';
import Events from '@/components/Events.vue';

export default {
    components: {
        MyData,
        Projects,
        Events,
    },
    data() {
        return {
            activeTab: 'my-data',
        };
    },
    methods: {
        setActivateTab(tab) {
            this.activeTab = tab;
        },
    },
};
</script>

<style scoped>
.content {
    padding: 20px;
}

.navigation {
    margin-top: 60px;
    display: flex;
    justify-content: flex-end;
}

.navigation ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

.navigation li {
    background-color: #eee;
    width: 140px;
    height: 40px;
    align-content: center;
    text-align: center;
    cursor: pointer;
}

.navigation li.active {
    background-color: white;
    font-weight: bold;
}

.tab-content {
    border-top: 1px solid #ccc;
    padding: 10px;
}

</style>