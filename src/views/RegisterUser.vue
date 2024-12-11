<template>
	<div class="reg-form">
		<form @submit.prevent="register">
			<h2>Зареєструватися</h2>
			<div>
				<input
					type="text"
					v-model="name"
					id="name"
					placeholder="Name*"
					required
				/>
			</div>
			<div>
				<input
					type="email"
					v-model="email"
					id="email"
					placeholder="Email*"
					required
				/>
			</div>

			<div>
				<input
					type="password"
					v-model="password"
					id="password"
					placeholder="Password*"
					required
				/>
			</div>
			<button type="submit">Зареєструватися</button>
			<p>{{ errorMessage }}</p>
			<p class="login-acc">
				Є акаунт? <router-link to="/login">Увійти</router-link>
			</p>
		</form>
	</div>
</template>

<script>
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default {
	data() {
		return {
			name: "",
			email: "",
			password: "",
			errorMessage: "",
		};
	},
	methods: {
		async register() {
			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					this.email,
					this.password
				);

				await updateProfile(userCredential.user, {
					displayName: this.name,
				});

				this.$router.push("/dashboard");
			} catch (error) {
				this.errorMessage = error.message;
			}
		},
	},
};
</script>

<style scoped>
.reg-form {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-image: url("../assets/formbg.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.reg-form h2 {
	font-size: 24px;
	margin: 10px;
	text-align: center;
	color: white;
}

form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 20px 40px;
	width: 340px;
	border: 1px solid gainsboro;
	border-radius: 20px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(8px);
}

form div {
	display: flex;
	flex-direction: column;
	margin-top: 20px;
}

form div input {
	border: none;
	outline: none;
	font-size: 16px;
	color: #1c325b;
	font-weight: 300;

	border: 1px solid #1c325b;
	background-color: transparent;
	padding: 4px 8px;
	border-radius: 4px;

	transition: 333ms ease-in-out;
}

form div input::placeholder {
	color: white;
	font-style: italic;
}

form button {
	border: none;
	margin-top: 30px;
	border-radius: 5px;
	padding: 5px 0px;
	background: #1c325b;
	color: white;
	transition: 333ms ease-in-out;
	border: 1px solid #1c325b;
}

form button:focus {
	border: 1px solid #1c325b;
	color: transparent;
	background-color: transparent;
}

form button:hover {
	border: 1px solid #1c325b;
	color: #1c325b;
	background-color: transparent;
}

.login-acc,
.login-acc a {
	color: white;
	text-align: center;
	font-size: 16px;
	font-weight: 500;
	text-decoration: none;
}

.login-acc a {
	color: #ff8000;
	font-weight: 600;
}
</style>
