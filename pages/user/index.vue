<template>
	<div>
		<h1>guest zone</h1>
		<div>
			<button @click="resetLang">Change language</button>
		</div>
		<div>
			<h2>Lists</h2>
			<div v-if="listsStore.getList && listsStore.getList.length > 0">
				<div v-for="(savedItem, index) in listsStore.getList">
					<div class="title-button-group">
						<h4>{{ savedItem.text }} - {{ savedItem.type }}</h4>
						<button @click="removeItem(index)">remove</button>
					</div>
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

const removeItem = (index: number) => {
	listsStore.removeFromList(index);
};
</script>

<style scoped>
.title-button-group {
	display: flex;
	justify-content: space-between;
}
</style>
