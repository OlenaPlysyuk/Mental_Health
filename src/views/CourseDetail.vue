<template>
	<div class="course-detail">
		<div class="our-course">
			<div class="course-image">
				<div>
					<p>{{ course?.title }}</p>
				</div>
				<button @click="startPlaying">Слухати курс</button>
			</div>
			<div class="left-c"></div>
			<h2>Про що курс</h2>
			<p>{{ course.description }}</p>
		</div>

		<div v-if="course">
			<input
				type="checkbox"
				v-model="course.completed"
				:id="'course-' + course.id"
				:disabled="!course.clickable"
				@change="saveData"
			/>
			<label :for="'course-' + course.id">Позначити завершеним</label>
		</div>
		<div v-else>
			<p>Курс не знайдено</p>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default {
	data() {
		return {
			user: null,
			course: null,
			savedVaule: localStorage.getItem("course.completed") || "",
		};
	},
	computed: {
		...mapState({
			courses: (state) => state.courses.allCourses,
		}),
		currentUser() {
			return auth.currentUser;
		},
	},
	created() {
		const id = this.$route.params.id;

		const course = this.courses.find((c) => c.id === id);
		if (!course) {
			this.$router.replace("/404");
		} else {
			this.course = course;
			const savedStatus = localStorage.getItem(
				`course-${course.id}-completed`
			);
			if (savedStatus !== null) {
				this.course.completed = savedStatus === "true";
			}
		}
	},
	methods: {
		...mapActions("courses", ["updateCourseStatus"]),

		startPlaying() {
			if (this.course && this.course.music) {
				this.$emit("play-track", {
					title: this.course.title,
					image: this.course.image,
					src: this.course.music,
					duration: 300,
				});
			} else {
				console.error("Audio file not found for this course.");
			}
		},

		saveData() {
			if (this.course) {
				localStorage.setItem(
					`course-${this.course.id}-completed`,
					this.course.completed
				);
			}
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
.course-detail {
	max-width: 800px;
	margin: 0 auto;
	padding: 10px 20px;
	text-align: center;
	font-family: Arial, sans-serif;
	display: flex;
	flex-direction: column;
	align-items: start;
}

.our-course {
	display: flex;
	flex-direction: column;
	align-items: start;
}

.our-course h2 {
	margin-top: 20px;
	font-size: 24px;
}

.our-course p {
	font-size: 14px;
	text-align: left;
}

.course-image {
	width: 100%;
	height: auto;
	max-width: 650px;
	height: 300px;
	margin: 0px auto;
	border-radius: 25px;
	background-image: url("../assets/bg1.jpg");
	background-position: center;
	background-size: cover;
	display: flex;
	justify-content: end;
	align-items: start;
	flex-direction: column;
	padding: 20px;
	text-align: left;
}

.course-image p {
	color: white;
	font-size: 16px;
	display: flex;
	justify-content: center;
	width: 180px;
	line-height: 22px;
	text-align: left;
}

button {
	margin-bottom: 10px;
	padding: 10px 40px;
	font-size: 16px;
	border: none;
	border-radius: 5px;
	background-color: #fff;
	color: #000;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button:hover {
	background-color: grey;
	color: white;
}

input[type="checkbox"] {
	margin-right: 10px;
	transform: scale(1.2);
	cursor: pointer;
}

.btn-return {
	position: fixed;
	background-color: black;
	width: 50px;
	height: 50px;
	right: 30px;
	bottom: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	transition: 333ms ease-in-out;
}

.btn-return img {
	width: 40px;
}
</style>
