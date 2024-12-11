<template>
	<div>
		<router-link
			v-if="item.clickable !== false"
			class="scroll-content"
			:style="{ backgroundImage: `url(${item.image})` }"
			:to="{ name: 'CourseDetail', params: { id: item.id } }"
		>
		</router-link>
		<div
			v-else
			class="scroll-content non-clickable"
			:style="{ backgroundImage: `url(${item.image})` }"
		></div>
	</div>
</template>

<script>
export default {
	name: "CourseCard",
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>
.scroll-content {
	position: relative;
	height: 160px;
	width: 120px;
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	border-radius: 20px;
	display: flex;
	align-items: flex-end;
	justify-content: center;
}

.non-clickable {
	cursor: default;
}

.item-title {
	color: #fff;
	text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
	margin: 0;
	padding: 5px;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 5px;
}
</style>
