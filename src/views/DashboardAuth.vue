<template>
	<div class="dashboard-container">
		<div class="dashboard-header">
			<img src="" alt="" />
			<h2 v-if="user">Привіт, {{ user.displayName || "Гість" }}!</h2>
			<p v-if="user">Ласкаво просимо до вашої особистої сторінки.</p>
			<p v-else>Завантаження даних користувача...</p>
		</div>
		<div class="dashboard-actions">
			<button v-if="user" @click="logout">Вийти</button>
		</div>
	</div>
</template>

<script>
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default {
	data() {
		return {
			user: null,
		};
	},
	methods: {
		async logout() {
			await signOut(auth);
			this.$router.push("/login");
		},
	},
	mounted() {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.user = user;
			} else {
				this.$router.push("/login");
			}
		});
	},
};
</script>

<style scoped>
.dashboard-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-family: "Roboto", sans-serif;
	padding: 20px;
}

.dashboard-header {
	text-align: center;
	margin-bottom: 30px;
}

.dashboard-header h2 {
	font-size: 28px;
	color: #1c325b;
	font-weight: 500;
}

.dashboard-header p {
	font-size: 18px;
	color: #5a6f8e;
}

.dashboard-actions {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.dashboard-actions button {
	padding: 12px 20px;
	background-color: #1c325b;
	color: white;
	font-size: 16px;
	font-weight: 500;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
}

.dashboard-actions button:hover {
	background-color: #ff8000;
	color: white;
	transform: translateY(-3px);
}

.dashboard-actions button:focus {
	outline: none;
}
</style>
