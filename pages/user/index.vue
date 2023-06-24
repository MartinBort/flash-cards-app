<template>
	<div>
		<h1>guest zone</h1>
		<div>
			<button @click="resetLang">Change language</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { userConfigStore } from '~/stores/user-config';
const store = userConfigStore();

const { selectLanguage } = store;

definePageMeta({
	layout: 'user',
});

const resetLang = () => {
	selectLanguage(null);
	navigateTo(`/`);
};
</script>
