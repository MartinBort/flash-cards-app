<template>
	<div>
		<header>
			<div>
				<nuxt-link to="/user">settings</nuxt-link>
				<span>language: {{ config.lang }}</span>
			</div>
		</header>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { userConfigStore } from '~/stores/user-config';
import { storeToRefs } from 'pinia';

const store = userConfigStore();
const { config } = storeToRefs(store);
</script>
