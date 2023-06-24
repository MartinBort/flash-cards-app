<template>
	<div>
		<header>
			<div>
				<nuxt-link :to="`/`">back</nuxt-link>
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
