<template>
    <div class="personal-cabinet__container">
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
                <MyData v-if="activateTab='my-data'"/>
                <Projects v-if="activateTab='projects'"/>
                <Events v-if="activateTab='events'"/>
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

</style>