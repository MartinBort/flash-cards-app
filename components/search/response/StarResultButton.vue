<template>
	<div>
		<button @click="addToList">Add to list</button>
	</div>
</template>

<script setup lang="ts">
import { savedListsStore } from '~/stores/saved-lists';
import { SavedItem } from '~/types/SavedItem';
import { Translation } from '~/types/SavedItem';

const store = savedListsStore();

const props = defineProps({
	result: {
		type: Object,
		required: true,
	},
});

const addToList = () => {
	// console.log(props.result);
	const item = mapToSavedItem(props.result);
	store.doSaveToList(item);

	// TODO - create a list type object that contains data including lang
	//      - list must be bound to a lang?
	// TODO - open side panel with lists?
};

const mapToSavedItem = (item: any): SavedItem => {
	const translations = item.translations.map((translation: Translation) => {
		return {
			featured: translation.featured,
			text: translation.text,
			examples: [...translation.examples],
		};
	});

	return {
		lang: 'pt',
		text: item.text,
		type: item.pos,
		translations: translations,
	} as SavedItem;
};
</script>
