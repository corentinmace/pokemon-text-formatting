<script>
import { ref, onMounted } from 'vue'
import FormatComposable from './composables/formatComposable' 
import ColorsComposable from './composables/colorsComposable'

export default {
	setup() {

		const text = ref('');
		const formatedText = ref('');
		const previewText = ref('');
		const colorCodeText = ref('');
		const showColorText = ref(false);
		const selectedColor = ref('');
		const checkToFlow = ref(false);
		const selectPreset = ref('39,2');
		const charsSettings = ref('');
		const linesSettings = ref('');
		
		const selectedGen = ref(4);
		const fifthGenColors = ref([
			{
				'name': 'red',
				'code': 'G5red'
			},
			{
				'name': 'blue',
				'code': 'G5blue'
			},
			{
				'name': 'yellow',
				'code': 'G5yellow'
			},
			{
				'name': 'green',
				'code': 'G5green'
			},
			{
				'name': 'orange',
				'code': 'G5orange'
			},
			{
				'name': 'pink',
				'code': 'G5pink'
			}
		]);

		const fourthGenColors = ref([
			{
				'name': 'red',
				'code': 'G4red'
			},
			{
				'name': 'green',
				'code': 'G4green'
			},
			{
				'name': 'blue',
				'code': 'G4blue'
			},
		]);

		const defineLinesAndChar = () => {
			let values = selectPreset.value.split(',');
			charsSettings.value = values[0];
			linesSettings.value = values[1];
		}

		const { format, rawOutput } = FormatComposable();
		const { addColorCodes } = ColorsComposable();

		const resetDefault = () => {
			colorCodeText.value = '';
			selectedColor.value = '';
			showColorText.value = false;
		}

		const handleInsert = () => {
			text.value += addColorCodes(colorCodeText.value, selectedColor.value, selectedGen.value);
			handleChange();
			resetDefault();
		}

		const handleSelect = () => {
			defineLinesAndChar();
		}
	
		const handleChange = () => {
			let formatValue = format(text.value, checkToFlow.value, JSON.parse(charsSettings.value), JSON.parse(linesSettings.value));
			previewText.value = formatValue.HTML_formatted;
			formatedText.value = formatValue.DSPRE_formatted;
			rawOutput(text.value);
		}

		const setColor = (color) => {
			selectedColor.value = color;
			showColorText.value = true;
		}

		onMounted(() => {
			defineLinesAndChar();
		})


		return {
			text,
			formatedText,
			previewText,
			showColorText,
			colorCodeText,
			selectedColor,
			checkToFlow,
			selectPreset,
			charsSettings,
			linesSettings,
			selectedGen,
			fourthGenColors,
			fifthGenColors,
			resetDefault,
			setColor,
			addColorCodes,
			handleChange,
			handleSelect,
			handleInsert,
		}

	}
}
</script>

<template>
	<span class="hidden bg-G4red bg-G4green bg-G4blue bg-G5red bg-G5blue bg-G5green bg-G5yellow bg-G5orange bg-G5pink">Let's not show this, but it's required here, don't ask.</span>
	<div class="fixed top-0 py-2 w-full bg-zinc-800 text-slate-500 text-sm text-center"><span @click="selectedGen = 4" class="font-bold text-slate-400 cursor-pointer" :class="selectedGen == 4 ? 'font-bold' : 'font-normal'">4th Generation</span> - <span @click="selectedGen = 5" class="text-slate-400 cursor-pointer" :class="selectedGen == 5 ? 'font-bold' : 'font-normal'">5th Generation</span></div>
	<div class="flex flex-row justfiy-between w-full p-5 mt-12">
		<div class="w-1/2 px-5">
			<p class="text-lg text-white uppercase font-bold mb-2">Input</p>
			<textarea id="input" class="min-h-[200px] placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" @input="handleChange()" v-model="text"></textarea>
			<div class="flex items-center justify-between h-8 mt-3 mx-2">
				<div class="flex" v-if="selectedGen == 4">
						<div v-for="color in fourthGenColors" @click="setColor(color.name)" class="h-6 w-6 cursor-pointer rounded-lg border border-slate-300 mr-3" :class="'bg-'+ color.code"></div>
				</div>
				<div class="flex" v-if="selectedGen == 5">
						<div v-for="color in fifthGenColors" @click="setColor(color.name)" class="h-6 w-6 cursor-pointer rounded-lg border border-slate-300 mr-3" :class="'bg-'+ color.code"></div>
				</div>
				<div class="flex items-center">
					<label for="select-setter" class=" text-sm font-medium text-gray-900 text-gray-300 tracking-wide">Preset</label>
					<select @change="handleSelect" v-model="selectPreset" id="select-setter" class="ml-2 mr-3 h-6 pl-2 text-white bg-gray-100 rounded border-gray-300 focus:ring-sky-500 focus:ring-sky-600 ring-offset-sky-800 focus:ring-2 bg-gray-700 border-gray-600">
						<option value="39,2" selected>Overworld</option>
						<option value="38,3">PokeDex</option>
					</select>

					<label title="This is the interval between a \n and a \r (or \f) " for="line-setter" class=" text-sm font-medium text-gray-900 text-gray-300 tracking-wide">Lines</label>
					<input v-model="linesSettings" id="line-setter" type="number" class="ml-2 mr-3 w-12 h-4 py-3 pl-2 text-white bg-gray-100 rounded border-gray-300 focus:ring-sky-500 focus:ring-sky-600 ring-offset-sky-800 focus:ring-2 bg-gray-700 border-gray-600">

					<label title="This is the number of characters needed to break a line" for="char-setter" class=" text-sm font-medium text-gray-900 text-gray-300 tracking-wide">Characters</label>
					<input v-model="charsSettings" id="char-setter" type="number" class="ml-2 mr-3 w-12 h-4 pl-2 py-3 text-white bg-gray-100 rounded border-gray-300 focus:ring-sky-500 focus:ring-sky-600 ring-offset-sky-800 focus:ring-2 bg-gray-700 border-gray-600">

					<label for="link-checkbox" v-if="selectedGen != 5" class=" text-sm font-medium text-gray-900 text-gray-300 tracking-wide">Transform <span class="font-bold text-white">\r</span> to  <span class="font-bold text-white">\f</span></label>
					<label for="link-checkbox" v-else class=" text-sm font-medium text-gray-900 text-gray-300 tracking-wide">Transform <span class="font-bold text-white">\c</span> to  <span class="font-bold text-white">\r</span></label>
					<input id="link-checkbox" type="checkbox" v-model="checkToFlow" class="ml-2 w-4 h-4 text-sky-600 bg-gray-100 rounded border-gray-300 focus:ring-sky-500 focus:ring-sky-600 ring-offset-sky-800 focus:ring-2 bg-gray-700 border-gray-600">
				</div>
			</div>
				<form class="flex items-center" v-if="showColorText" @submit.prevent="handleInsert">
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
	
	<div class="fixed bottom-0 py-2 w-full bg-zinc-800 text-slate-500 text-sm text-center">Tool made by <a  class="font-bold text-slate-400" href="https://github.com/corentinmace">Corentin Macé (Kuha)</a> & <a class="font-bold text-slate-400" href="https://github.com/rathgate">RathGate</a> - <a  class="font-bold text-slate-400" href="https://github.com/corentinmace/pokemon-text-formatting/issues">Report a bug, ask for a feature here</a></div>
</template>