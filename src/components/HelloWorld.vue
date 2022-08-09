<script>
import { ref } from 'vue'
export default {
	setup() {

		const text = ref('')
		const formatedText = ref('')
		let phrases = []

		const formatText = () => {
			formatedText.value = text.value.split().reduce((a, e, i)=> a + e + (i % 39 === 0 ? '\\n' : ''), '');
		}

		


		return {
			text,
			formatedText,
			formatText
		}

	}
}
</script>

<template>
	<input type="text" @input="formatText()" v-model="text">
	<p>	
		{{ formatedText}}
	</p>
</template>
