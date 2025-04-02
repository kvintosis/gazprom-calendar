<template>
    <div>
        <h2>Мои данные</h2>
        <div class="my-data-container">
            <div class="profile">
            <div class="profile-avatar">
                <img src="@/assets/avatar.png" alt="Аватар" />
            </div>
            </div>
            <div class="profile-info">
                <div class="name">{{ profile.name }}</div>
                <div class="mail">{{ profile.mail }}</div>
            <div class="job-container">
                <div class="job"> 
                    <div class="bold">Должность:</div> 
                    {{ profile.job }}
                </div>
                <div class="department">
                    <div class="bold">Отдел:</div>
                    {{ profile.department }}
                </div>
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
            mail: 'youraddress@gmail.com',
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

.profile-avatar {
    width: 150px;
    height: 150px;
    background-color: #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-info {
flex: 1;
}

.name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
}

.mail {
    color: #555;
}

.job-container {
    margin-top: 10px;
    border: 1px solid #ccc;
    padding: 10px;
}

.job,
.department {
    color: #333;
    margin-bottom: 5px;
}

.bold {
    font-weight: bold;
    display: inline-block;
}
</style>