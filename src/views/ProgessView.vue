<template>
	<div class="main">
		<div v-if="completedCourses.length > 0" class="title">
			<h2>Завершені курси</h2>
			<p>{{ getTotalProgress(sections) }}%</p>
		</div>
		<ul class="flex-container">
			<li
				v-for="course in completedCourses"
				:key="course.id"
				class="img-container"
			>
				<router-link
					:to="{
						name: 'CourseDetail',
						params: { id: course.id },
					}"
					class="course-link"
				>
					<img
						:src="course.image"
						:alt="course.title"
						class="images"
					/>
				</router-link>
			</li>
		</ul>
		<div
			v-if="completedCourses.length === 0"
			class="no-courses"
			style="
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				height: 100%;
			"
		>
			<p style="text-align: center; font-size: 18px; font-weight: 600">
				Поки не пройдено жодного курсу.
			</p>
			<img src="../assets/not-found.png" alt="gif" style="width: 600px" />
		</div>
	</div>
</template>

<script>
import { sections } from "../data/coursesData";
import { mapGetters } from "vuex";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default {
	data() {
		return {
			sections,
		};
	},
	computed: {
		...mapGetters("courses", ["completedCourses"]),
	},
	methods: {
		getTotalProgress(sections) {
			if (!sections || !Array.isArray(sections)) {
				console.error("Sections is not a valid array:", sections);
				return 0;
			}

			let totalCourses = 0;
			let completedCourses = 0;

			sections.forEach((section) => {
				if (section.items && Array.isArray(section.items)) {
					section.items.forEach((item) => {
						if (item.clickable) {
							totalCourses++;
							if (item.completed) {
								completedCourses++;
							}
						}
					});
				}
			});

			if (totalCourses === 0) return 0;

			return Math.round((completedCourses / totalCourses) * 100);
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

<style lang="css" scoped>
.main {
	padding: 20px;
	margin: 0 auto;
	max-width: 500px;
}

.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.title h2,
.title p {
	font-size: 18px;
	margin: 10px;
	font-weight: 500;
}

.flex-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 10px;
	padding: 10px 40px;
	list-style: none;
}

@media (max-width: 370px) {
	.flex-container {
		padding: 10px 20px;
	}
}

@media (max-width: 331px) {
	.flex-container {
		padding: 10px 0px;
		justify-content: center;
	}
}

.img-container::after {
	content: "Завершенно";
	color: black;
	display: flex;
	justify-content: center;
	padding-top: 5px;
}

.images {
	width: 120px;
	height: 160px;
	border-radius: 20px;
}
.images::after {
	content: "Завершенно";
	color: black;
	display: flex;
	justify-content: center;
	padding-top: 20px;
}
</style>
