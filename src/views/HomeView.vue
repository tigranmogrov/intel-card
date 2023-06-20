<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import { useStore } from "@/store";
import { toPercent } from "@/utils";

const store = useStore();
const showModalRef = ref(false);
onMounted(() => store.dispatch("getCardGroups"));
const cardGroups = computed(() => store.getters.cardGroups);
const cardGroupWords = computed(() => store.getters.cardWordsCompleted);
onUnmounted(() => store.commit("SET_WORDS", []));
const getIdGroup = (id) => {
  store.dispatch("getCardWords", id).then(() => {
    if (cardGroupWords.value.length) {
      showModalRef.value = true;
    }
  });
};
</script>

<template>
  <div class="about">
    <div class="container">
      <n-h2 v-if="!cardGroups.length">You don't have groups!</n-h2>
      <n-grid x-gap="12" y-gap="12" cols="1 400:2 600:3 800:4 1200:6">
        <template v-for="group in cardGroups" :key="group._id">
          <n-gi>
            <n-card>
              <template #header>
                <n-h3 style="margin: 0">
                  Group: {{ group.name.toUpperCase() }}
                </n-h3>
              </template>

              <n-grid x-gap="12" :cols="1">
                <n-gi>
                  <n-text>
                    Only
                    <span style="font-size: 24px; padding: 0 10px">
                      {{ group.wordsCount }}
                    </span>
                    words
                  </n-text>
                </n-gi>
                <n-gi>
                  <n-text>
                    Learned
                    <span style="font-size: 24px; padding: 0 10px"
                      >{{ group.wordsLearnedCount }}
                    </span>
                  </n-text>
                </n-gi>
              </n-grid>

              <template #footer>
                <n-progress
                  type="circle"
                  :gap-offset-degree="180"
                  :percentage="
                    group.wordsCount === 0
                      ? 0
                      : toPercent(group.wordsLearnedCount, group.wordsCount)
                  "
                />
                <div style="margin-top: 10px">
                  <n-button @click="getIdGroup(group._id)">Open words</n-button>
                </div>
              </template>
            </n-card>
          </n-gi>
        </template>
      </n-grid>
      <n-modal
        preset="card"
        :style="{ maxWidth: '700px', width: '96%' }"
        v-model:show="showModalRef"
      >
        <n-table :bordered="true" :single-line="false">
          <thead style="width: 100%">
            <tr>
              <th>Original text</th>
              <th>Translated text</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="groupWord in cardGroupWords" :key="groupWord._id">
              <td>{{ groupWord.title }}</td>
              <td>{{ groupWord.translated }}</td>
              <td>{{ groupWord.description }}</td>
            </tr>
          </tbody>
        </n-table>
      </n-modal>
    </div>
  </div>
</template>

<style lang="scss">
.about {
  @media screen and (max-width: 767px) {
    .n-card-header {
      padding: 10px;
    }

    .n-card__content,
    .n-card__footer {
      padding: 0 10px 10px;
    }
    .n-progress.n-progress--circle,
    .n-progress.n-progress--dashboard {
      width: 75px;
    }
    .n-progress.n-progress--circle .n-progress-text,
    .n-progress.n-progress--dashboard .n-progress-text {
      font-size: 18px;
    }
  }

  .n-card {
    text-align: center;
  }
}
</style>
