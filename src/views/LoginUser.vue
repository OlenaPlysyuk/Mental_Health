<template>
	<div class="login-form">
		<form @submit.prevent="login">
			<h2>
				Увійдіть<br />
				у ваш акаунт
			</h2>
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
			<button type="submit">Увійти</button>
			<p class="forget-pass">
				<router-link
					to="/forgot-password"
					@click.prevent="forgotPassword"
				>
					Забули пароль?
				</router-link>
			</p>
			<p>{{ errorMessage }}</p>

			<p class="create-acc">
				Немає акаунту?
				<router-link to="/register">Створити</router-link>
			</p>
		</form>
	</div>
</template>

<script>
import { auth } from "../firebase";
import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";

export default {
	data() {
		return {
			email: "",
			password: "",
			errorMessage: "",
		};
	},
	methods: {
		async login() {
			try {
				await signInWithEmailAndPassword(
					auth,
					this.email,
					this.password
				);
				this.$router.push("/dashboard");
			} catch (error) {
				this.errorMessage = error.message;
			}
		},

		async forgotPassword() {
			try {
				await sendPasswordResetEmail(auth, this.email);
				alert(
					"Інструкції для скидання пароля надіслані на вашу електронну пошту."
				);
			} catch (error) {
				this.errorMessage = error.message;
			}
		},
	},
};
</script>

<style scoped>
.login-form {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-image: url("../assets//formbg.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.login-form h2 {
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

form div input:focus {
	background-color: transparent;
}

form div input:valid {
	background-color: transparent;
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
	color: #1c325b;
	background-color: transparent;
}

form button:hover {
	border: 1px solid black;
	color: black;
	background-color: transparent;
}

.forget-pass,
.forget-pass a {
	font-size: 14px;
	text-decoration: none;
	margin-top: 5px;
	color: white;
}

.create-acc,
.create-acc a {
	color: white;
	text-align: center;
	font-size: 16px;
	font-weight: 500;
	text-decoration: none;
}
.create-acc a {
	color: #ff8000;
	font-weight: 600;
}
</style>
