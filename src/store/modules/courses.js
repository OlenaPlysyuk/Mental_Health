import { sections } from "../../data/coursesData";

const state = {
	allCourses: sections.flatMap((section) => section.items),
};

const mutations = {
	SET_COURSES(state, courses) {
		state.allCourses = courses;
	},
	UPDATE_COURSE_STATUS(state, { id, completed }) {
		const course = state.allCourses.find((c) => c.id === id);
		if (course) {
			course.completed = completed;
		}
	},
};

const actions = {
	initCourses({ commit }, courses) {
		commit("SET_COURSES", courses);
	},
	updateCourseStatus({ commit }, payload) {
		commit("UPDATE_COURSE_STATUS", payload);
	},
};

const getters = {
	completedCourses: (state) => state.allCourses.filter((c) => c.completed),
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
