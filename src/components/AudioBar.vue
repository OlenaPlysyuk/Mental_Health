<template>
	<div class="dots" :class="['dots', { hidden: isHidden }]">
		<a
			href="#"
			@click.prevent="toggleAudioBar"
			:class="['hidden-bar', { hidden: isHidden }]"
			class="hidden-bar"
			>{{ isHidden ? "show" : "hidden" }}</a
		>
	</div>
	<div
		class="audio-bar"
		:class="['audio-bar', { hidden: isHidden }]"
		v-if="(visible = true)"
	>
		<div class="progress-container" @click="seekTrack">
			<div
				class="progress"
				:style="{ width: progressPercentage + '%' }"
			></div>
		</div>
		<div class="for-bar">
			<div class="audio-info">
				<img :src="track.image" alt="Album cover" class="audio-cover" />
				<div class="audio-details">
					<h3>{{ track.title }}</h3>
					<div class="audio-time">
						<span
							>{{ formattedCurrentTime }} /
							{{ formattedDuration }}</span
						>
					</div>
				</div>
			</div>
			<div class="audio-controls">
				<button @click="togglePlayPause">
					<img
						:src="isPlaying ? pause : play"
						alt="Play/Pause"
						style="width: 30px"
					/>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";

export default {
	data() {
		return {
			isHidden: false,
			play,
			pause,
		};
	},
	props: {
		track: {
			type: Object,
			required: true,
		},
		isPlaying: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		progressPercentage() {
			return (this.track.currentTime / this.track.duration) * 100 || 0;
		},
		formattedCurrentTime() {
			return this.formatTime(this.track.currentTime);
		},
		formattedDuration() {
			return this.formatTime(this.track.duration);
		},
	},

	methods: {
		togglePlayPause() {
			this.$emit("toggle-play-pause");
		},

		formatTime(time) {
			const minutes = Math.floor(time / 60);
			const seconds = Math.floor(time % 60);
			return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
		},

		seekTrack(event) {
			const progressBar = event.currentTarget;
			const clickX = event.offsetX;
			const barWidth = progressBar.offsetWidth;

			const newTime = (clickX / barWidth) * this.track.duration;

			this.$emit("seek", newTime);
		},

		toggleAudioBar() {
			this.isHidden = !this.isHidden;
		},
	},
};
</script>

<style scoped>
.dots {
	padding-top: 90px;
	transition: 333ms ease-in-out;
}

.dots.hidden {
	padding-top: 0px;
}

.hidden-bar {
	position: fixed;
	top: 89px;
	left: 50%;
	transform: translateX(-50%);
	text-decoration: none;
	text-transform: uppercase;
	font-size: 12px;
	background-color: grey;
	color: white;
	padding: 5px 10px;
	border-radius: 0 0 10px 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	z-index: 1;
	transition: 333ms ease-in-out;
}

.hidden-bar.hidden {
	top: 0px;
}

.audio-bar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 90px;
	background: linear-gradient(to right, #f0f0f0, #d9e5f0);
	color: black;
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	z-index: 1000;
	transition: 333ms ease-in-out;
}

.audio-bar.hidden {
	top: -100px;
}

button {
	border: none;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
}

.for-bar {
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
}

.audio-info {
	display: flex;
	align-items: center;
	gap: 15px;
}

.audio-cover {
	width: 50px;
	height: 60px;
	border-radius: 5px;
}

.audio-details h3,
.audio-details p {
	font-size: 18px;
	margin: 0;
}

.audio-controls {
	display: flex;
	align-items: center;
	gap: 10px;
}

.progress-container {
	width: 100%;
	height: 4px;
	background: grey;
	overflow: hidden;
	transition: 200ms ease;
}

.progress-container:hover {
	height: 8px;
}

.progress {
	height: 100%;
	background-color: black;
	transition: width 0.3s ease;
}
</style>
