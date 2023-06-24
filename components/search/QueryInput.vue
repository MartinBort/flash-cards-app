<template>
	<div>
		<form @submit.prevent="doSearch">
			<input type="text" v-model="query" />
			<button>Search</button>
		</form>

		<div v-if="suggestedTerm !== ''">
			Suggested search: "{{ suggestedTerm }}"
		</div>

		<div v-if="results">
			<SearchResponseResultCard
				v-for="(result, i) in results"
				:key="JSON.stringify(result.text) + i"
				:resultNumber="i + 1"
				:queryString="query"
				:res="result"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { LingueeResponse, LingueeItem } from '~/types/api/linguee-response';
const props = defineProps({
	lang: {
		type: String,
		required: true,
	},
});

const query = ref('');
const suggestedTerm = ref('');
const { lang } = toRefs(props);

const results = ref<LingueeResponse | null>(null);

const doSearch = () => {
	if (query.value === '') return;
	suggestedTerm.value = '';

	let url = `http://127.0.0.1:9999/api/v2/translations?query=${query.value}&src=${lang.value}&dst=en&guess_direction=false&follow_corrections=always`;

	fetch(url)
		.then((res) => {
			// TODO - error catchy
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			// filter out translations which are not "featured"
			const featuredResponses = data.filter(
				(response: LingueeItem) => response.featured
			);

			results.value = featuredResponses;
		});
};
</script>
