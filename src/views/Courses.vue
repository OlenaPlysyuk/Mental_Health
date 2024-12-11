<template>
	<div class="box">
		<div
			class="f-section"
			v-for="(section, sIndex) in sections"
			:key="sIndex"
		>
			<div class="title">
				<h2>{{ section.title }}</h2>
				<p>{{ getSectionProgress(section) }}%</p>
			</div>

			<div class="horizontal-scroll-container">
				<CourseCard
					v-for="(item, index) in section.items"
					:key="item.id || `non-clickable-${sIndex}-${index}`"
					:item="item"
					:class="{ completed: item.completed }"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { sections } from "../data/coursesData";
import CourseCard from "../components/CourseCard.vue";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default {
	name: "CoursesView",
	components: {
		CourseCard,
	},
	data() {
		return {
			sections,
			user: null,
		};
	},
	methods: {
		getSectionProgress(section) {
			const totalCourses = section.items.filter(
				(item) => item.clickable
			).length;

			if (totalCourses === 0) return 0;

			const completedCourses = section.items.filter(
				(item) => item.completed && item.clickable
			).length;

			return Math.round((completedCourses / totalCourses) * 100);
		},

		saveCourseProgress(course) {
			localStorage.setItem(
				`course-${course.id}-completed`,
				course.completed
			);
		},

		loadCourseProgress(course) {
			const savedStatus = localStorage.getItem(
				`course-${course.id}-completed`
			);
			if (savedStatus !== null) {
				course.completed = savedStatus === "true";
			}
		},

		syncCourseData(event) {
			if (
				event.key &&
				event.key.startsWith("course-") &&
				event.key.endsWith("-completed")
			) {
				const courseId = event.key.split("-")[1];
				const course = this.findCourseById(courseId);
				if (course) {
					this.loadCourseProgress(course);
				}
			}
		},

		findCourseById(courseId) {
			for (const section of this.sections) {
				const course = section.items.find(
					(item) => item.id === courseId
				);
				if (course) return course;
			}
			return null;
		},
	},

	created() {
		this.sections.forEach((section) => {
			section.items.forEach((course) => {
				this.loadCourseProgress(course);
			});
		});

		window.addEventListener("storage", this.syncCourseData);
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
.box {
	max-width: 600px;
	margin: 0 auto;
}

.f-section {
	max-width: 500px;
	margin: 0 auto;
	margin: 10px 20px;
	z-index: 1;
}

.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.title h2,
.title p {
	font-size: 16px;
	margin: 10px;
	font-weight: 500;
}

.horizontal-scroll-container::-webkit-scrollbar {
	display: none;
}

.horizontal-scroll-container {
	display: flex;
	gap: 10px;
	overflow-x: auto;
}

.horizontal-scroll-container .completed::after {
	content: "Завершено";
	color: black;
	display: flex;
	justify-content: center;
	padding-top: 0px;
	font-size: 14px;
}

.non-clickable {
	cursor: default;
}
</style>
