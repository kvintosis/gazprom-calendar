<template>
    <div>
        <h2>Мои данные</h2>
        <div class="my-data-container">
            <div class="profile-info">
                <div class="profile">
                    <div class="profile-avatar">
                        <img src="@/assets/avatar.png" alt="Аватар">
                    </div>
                </div>
                <div class="info-text">
                    <div class="name">{{ profile.name }}</div>
                    <div class="mail">{{ profile.mail }}</div>
                    <div class="job">Должность: {{ profile.job }}</div>
                    <div class="department">Отдел: {{ profile.department }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            profile: {
                name: 'Иванов Иван Иванович',
                mail: 'youraddress@gail.com',
                job: 'Системный администратор',
                department: 'Название отдела',
            },
        };
    },
};
</script>

<style scoped>
.my-data-container {
    display: flex;
    align-items: flex-start;
    padding: 20px;
}

.profile {
  width: 200px;
  margin-right: 20px;
}
</style>