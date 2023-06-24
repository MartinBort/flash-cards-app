<template>
	<div class="result-container">
		<span v-if="suggestedSearch !== ''">
			Suggested search: "{{ suggestedSearch }}"
		</span>
		<div class="title-button-group">
			<h2>{{ resultNumber }}) {{ searchText }} - {{ type }}</h2>
			<SearchResponseStarResultButton :result="res" />
		</div>
		<SearchResponseViewConjugations
			v-if="type === 'verb'"
			:infinitiveVerb="searchText"
		/>
		<div>
			<h2>
				Translations
				<span v-if="res.translations.length > 0"
					>({{ translationsWithExamplesOnly(res.translations).length }})</span
				>
			</h2>
			<!-- filter translations with no examples -->
			<div
				class="translation-container"
				v-for="translation in translationsWithExamplesOnly(res.translations)"
				:key="JSON.stringify(translation)"
			>
				<pre>{{ translation }}</pre>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Translation } from '~/types/api/linguee-response';

const props = defineProps({
	res: {
		type: Object,
		required: true,
	},
	resultNumber: {
		type: Number,
		required: true,
	},
	queryString: {
		type: String,
		required: true,
	},
});

const type = ref('');
const suggestedSearch = ref('');
const searchText = ref(props.res.text);

onBeforeMount((): void => {
	type.value = extractWordType(props.res.pos);
	suggestedSearch.value = checkForResponseAlternativeText();
});

const extractWordType = (word: string): string => {
	let type = 'Could not get type';

	switch (true) {
		case word.includes('adverb'):
			type = 'adverb';
			break;
		case word.includes('verb'):
			type = 'verb';
			break;
		case word.includes('pronoun'):
			type = 'pronoun';
			break;
		case word.includes('noun'):
			type = 'noun';
			break;
		case word.includes('adjective'):
			type = 'adjective';
			break;
		case word.includes('conjunction'):
			type = 'conjunction';
			break;
		case word.includes('preposition'):
			type = 'preposition';
			break;
	}

	return type;
};

const checkForResponseAlternativeText = (): string => {
	if (searchText.value !== props.queryString.trim()) {
		return searchText.value;
	}
	return '';
};

const translationsWithExamplesOnly = (
	translations: Translation[]
): Translation[] => {
	return translations.filter((translation) => translation.examples.length > 0);
};

const addToList = () => {
	console.log(props.res);
};
</script>

<style scoped>
.result-container,
.translation-container {
	padding: 1rem;
	border: 1px solid rgb(185, 185, 213);
}

.result-container {
	margin: 1rem 0;
}
.result-container:last-of-type() {
	margin-bottom: 0;
}

.title-button-group {
	display: flex;
	justify-content: space-between;
}
</style>
