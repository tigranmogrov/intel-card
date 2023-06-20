<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import router from "@/router";

const store = useStore();

const cardGroups = computed(() => store.getters.cardGroups);
</script>

<template>
  <div class="cards">
    <div class="container">
      <n-h3 v-if="!cardGroups.length">You haven't created cards yet</n-h3>
      <div v-else>
        <n-grid x-gap="12" y-gap="12" cols="1 400:2 600:3 800:4 1200:6">
          <n-gi v-for="group in cardGroups" :key="group._id">
            <n-card>
              <template #header>
                There are
                <span>{{ String(group.wordsCount) }}</span>
                words
              </template>
              <n-h3> Group: {{ group.name.toUpperCase() }}</n-h3>

              <n-button
                :block="true"
                @click="
                  router.push({
                    name: 'Cards-item',
                    params: { id: group._id.toLowerCase() },
                  })
                "
              >
                Link Group
              </n-button>
            </n-card>
          </n-gi>
        </n-grid>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
