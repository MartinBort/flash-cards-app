<template>
	<div>
		<button @click="toggleConjugations">
			<span v-if="!viewConjugations">View conjugations</span>
			<span v-else>Hide conjugations</span>
		</button>
		<div v-if="viewConjugations">
			<h2>Conjugations</h2>
			<div v-if="!fetchedConjugations">fetching...</div>
			<div v-else>
				<pre>{{ fetchedConjugations }}</pre>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { userConfigStore } from '~/stores/user-config';
import { storeToRefs } from 'pinia';

const props = defineProps({
	infinitiveVerb: {
		type: String,
		required: true,
	},
});

const fetchedConjugations = ref(null);

const store = userConfigStore();
const { config } = storeToRefs(store);
const lang = config.value.lang;

const viewConjugations = ref(false);

const fetchConjugations = async (): Promise<void> => {
	fetch(`http://localhost:8000/conjugate/${lang}/${props.infinitiveVerb}`)
		.then((data) => data.json())
		.then((data) => {
			fetchedConjugations.value = data;
		});
};

const toggleConjugations = (): void => {
	if (!viewConjugations.value) {
		fetchConjugations();
		viewConjugations.value = true;
	} else {
		viewConjugations.value = false;
	}
};
</script>
