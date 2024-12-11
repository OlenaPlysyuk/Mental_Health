import { createRouter, createWebHistory } from "vue-router";
import Courses from "../views/Courses.vue";
import Progress from "../views/ProgessView.vue";
import Webinars from "../views/Webinars.vue";
import CourseDetail from "../views/CourseDetail.vue";
import Register from "../views/RegisterUser.vue";
import Login from "../views/LoginUser.vue";
import Dashboard from "../views/DashboardAuth.vue";
import ForgotPassword from "../views/ForgotPassword.vue";

const routes = [
	{ path: "/courses", component: Courses },
	{ path: "/progessView", component: Progress },
	{ path: "/webinarsView", component: Webinars },
	{ path: "/", redirect: "/courses" },
	{
		path: "/register", // Маршрут для реєстрації
		name: "Register",
		component: Register,
	},
	{
		path: "/login", // Маршрут для входу
		name: "Login",
		component: Login,
	},
	{
		path: "/dashboard", // Маршрут для Dashboard
		name: "Dashboard",
		component: Dashboard,
	},
	{
		path: "/forgot-password", // Маршрут для скидання пароля
		name: "ForgotPassword",
		component: ForgotPassword,
	},
	{
		path: "/courses/:id",
		name: "CourseDetail",
		component: CourseDetail,
		meta: { title: "Деталі Курсу" },
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
