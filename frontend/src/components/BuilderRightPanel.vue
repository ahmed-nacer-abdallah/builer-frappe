<template>
	<div
		:style="{
			width: `${store.builderLayout.rightPanelWidth}px`,
		}">
		<PanelResizer
			:width="store.builderLayout.rightPanelWidth"
			side="left"
			@resize="(width) => (store.builderLayout.rightPanelWidth = width)"
			:min-width="220"
			:max-width="400" />
		<div class="flex w-full border-gray-200 p-[2px] text-sm dark:border-zinc-800">
			<button
				v-for="tab of ['Properties', 'Data', 'Settings']"
				:key="tab"
				class="mx-3 flex-1 p-2"
				@click="store.rightPanelActiveTab = tab as RightSidebarTabOption"
				:class="{
					'border-b-[1px] border-gray-900 dark:border-zinc-500 dark:text-zinc-300':
						store.rightPanelActiveTab === tab,
					'text-gray-700 dark:text-zinc-600': store.rightPanelActiveTab !== tab,
				}">
				{{ tab }}
			</button>
		</div>
		<BlockProperties
			v-if="blockController.isBLockSelected()"
			v-show="store.rightPanelActiveTab === 'Properties'"
			class="p-4" />
		<PageData
			class="p-4"
			v-show="store.rightPanelActiveTab === 'Data'"
			:key="store.selectedPage"
			v-if="store.selectedPage && store.getActivePage()" />
		<PageSettings
			class="p-4"
			v-show="store.rightPanelActiveTab === 'Settings'"
			:key="store.selectedPage"
			v-if="store.selectedPage && store.getActivePage()" />
	</div>
</template>
<script setup lang="ts">
import useStore from "@/store";
import blockController from "@/utils/blockController";
import BlockProperties from "./BlockProperties.vue";
import PageData from "./PageData.vue";
import PageSettings from "./PageSettings.vue";
import PanelResizer from "./PanelResizer.vue";
const store = useStore();
</script>
