<template>
	<div>
		<h1>Pick a language</h1>
		<button @click="selectLang('es')">Spanish</button>
		<button @click="selectLang('fr')">French</button>
		<button @click="selectLang('it')">Italian</button>
		<button @click="selectLang('pt')">Portuguese</button>

		<div>lang is: {{ config.lang }}</div>
	</div>
</template>

<script setup lang="ts">
import { userConfigStore } from '~/stores/user-config';
import { storeToRefs } from 'pinia';

const store = userConfigStore();

const { config } = storeToRefs(store);
const { selectLanguage } = store;

const selectLang = async (lang: string) => {
	selectLanguage(lang);
	await navigateTo(`/lang/${lang}`);
};
</script>
