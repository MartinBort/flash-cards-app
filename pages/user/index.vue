<template>
	<div>
		<h1>guest zone</h1>
		<div>
			<button @click="resetLang">Change language</button>
		</div>
		<div>
			<h2>Lists</h2>
			<div v-if="listsStore.getList.length > 0">
				<div v-for="savedItem in listsStore.getList">
					<h4>{{ savedItem.text }} - {{ savedItem.pos }}</h4>
					{{ savedItem }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { userConfigStore } from '~/stores/user-config';
import { savedListsStore } from '~/stores/saved-lists';

definePageMeta({
	layout: 'user',
});

const configStore = userConfigStore();
const listsStore = savedListsStore();

const { selectLanguage } = configStore;

const resetLang = () => {
	selectLanguage(null);
	navigateTo(`/`);
};
</script>
