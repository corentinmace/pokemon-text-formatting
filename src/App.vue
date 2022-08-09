<script>
import { ref } from 'vue'
import FormatComposable from './composables/formatComposable' 
export default {
	setup() {

		const text = ref('')
		const formatedText = ref('')
		const previewText = ref('')
		const colorCodeText = ref('')
		const showColorText = ref(false)
		const selectedColor = ref('')

		const { format } = FormatComposable()

		const resetDefault = () => {
			colorCodeText.value = ''
			selectedColor.value = ''
			showColorText.value = false
		}
	
		const handleChange = () => {
			formatedText.value = format(text.value)
			if(typeof formatedText.value == "string") {
				previewText.value = formatedText.value.replaceAll('\\n', '\n').replaceAll('\\r', '\r')
				// previewText.value = previewText.value.replace('\\vFF00\\x0001\\x0000', '</span>').replace('\\vFF00\\x0001ぁ', '<span style="color: blue">')
			} else {
			previewText.value = ''
			}
		}

		const addColorCodes = () => {
			let haystack = ''
			switch (selectedColor.value) {
				case 'red':
					haystack = '\\vFF00\\x0001\\x0001INSERTTEXT\\vFF00\\x0001\\x0000'
					haystack = haystack.replace('INSERTTEXT', colorCodeText.value)
					break;

				case 'green':
					haystack = '\\vFF00\\x0001あINSERTTEXT\\vFF00\\x0001\\x0000'
					haystack = haystack.replace('INSERTTEXT', colorCodeText.value)
					break;
				
				case 'blue':
					haystack = '\\vFF00\\x0001ぁINSERTTEXT\\vFF00\\x0001\\x0000'
					haystack = haystack.replace('INSERTTEXT', colorCodeText.value)
					break;
			
				default:
					break;
			}
			
			text.value += haystack
			handleChange()
			resetDefault()
		}

		const setColor = (color) => {
			selectedColor.value = color
			showColorText.value = true
		}

		return {
			text,
			formatedText,
			handleChange,
			previewText,
			setColor,
			showColorText,
			colorCodeText,
			addColorCodes
		}

	}
}
</script>

<template>
	<div class="flex flex-row justfiy-between w-full p-5">
		<div class="w-1/2 px-5">
			<p class="text-lg text-white uppercase font-bold mb-2">Input</p>
			<textarea id="input" class="min-h-[200px] placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" @input="handleChange()" v-model="text"></textarea>
			<div class="flex">
				<div @click="setColor('red')" class="h-8 w-8 cursor-pointer rounded-lg bg-red-600 border border-slate-300 mt-3 mr-3"></div>
				<div @click="setColor('green')" class="h-8 w-8 cursor-pointer rounded-lg bg-green-600 border border-slate-300 mt-3 mr-3"></div>
				<div @click="setColor('blue')" class="h-8 w-8 cursor-pointer rounded-lg bg-blue-600 border border-slate-300 mt-3 mr-3"></div>
			</div>
				<form class="flex items-center" v-if="showColorText" @submit.prevent="addColorCodes">
					<input  placeholder="The word you want to color" class="mt-3 placeholder:italic text-white block bg-zinc-800 border border-slate-300 rounded-md p-2  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mr-2" v-model="colorCodeText">
					<button class="mt-3 uppercase font-bold text-white block bg-zinc-800 border border-slate-300 rounded-md p-2  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm">Insert</button>
				</form>
		</div>
		<div class="w-1/2 px-5 flex justfify-center flex-col">
			<p class="text-lg text-white uppercase font-bold mb-4">Preview</p>
			<pre v-if="previewText" class="text-white whitespace-pre w-[39ch] outline-double outline-4 outline-offset-8 rounded outline-sky-500" v-html="previewText"></pre>
		</div>
	</div>
	<div class="p-10">
		<p class="text-lg text-white uppercase font-bold mb-2">Output</p>
		<textarea class="placeholder:italic text-white block bg-zinc-800 w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" v-model="formatedText" disabled></textarea>
	</div>
	
	<div class="fixed bottom-0 py-2 w-full bg-zinc-800 text-slate-500 text-sm text-center">Tool made by <a  class="font-bold text-slate-400" href="https://github.com/corentinmace">Corentin Macé (Kuha)</a> & <a class="font-bold text-slate-400" href="https://github.com/rathgate">RathGate</a></div>
</template>