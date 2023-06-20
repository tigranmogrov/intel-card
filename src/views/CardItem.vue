<script setup lang="ts">
import {
  computed,
  ComputedRef,
  ref,
  reactive,
  onMounted,
  onUnmounted,
} from "vue";
import {
  FormInst,
  FormValidationError,
  useMessage,
  FormRules,
  NCarousel,
} from "naive-ui";

import { CreateOutline } from "@vicons/ionicons5";
import router from "@/router";
import { useStore } from "@/store";
import { rules } from "@/composable/form/form";

const store = useStore();
const routeName: ComputedRef = computed(
  () => router.currentRoute.value.params.id
);
onUnmounted(() => store.commit("SET_WORDS", []));
onMounted(() => store.dispatch("getCardWords", routeName.value));
const words = computed(() => store.getters.cardWordsDefault);

const message = useMessage();
const showModalRef = ref(false);
const isDisabled = ref(false);
const isVisible = ref({});
const isHiddenAlert = ref(true);
const formRef = ref<FormInst | null>(null);
const carousel = ref<NCarousel | null>(null);
const currentIndexSlide = ref(0);

const modelRef = reactive({
  originalTitle: "",
  translateTitle: "",
  description: "",
});
const formRules = reactive<FormRules>({
  originalTitle: [],
  translateTitle: [],
});

const updateFormRules = () => {
  for (const key in formRules) {
    formRules[key] = rules()["inputVal"];
  }
};

const showTranslateWords = (id) => {
  words.value.forEach((el) => (isVisible.value[el] = false));
  isVisible.value[id] = !isVisible.value[id];
};
const changeIndex = (currentIndex: number) => {
  currentIndexSlide.value = currentIndex;
};

const isLearnedWord = () => {
  store.dispatch("updateCardWords", {
    groupName: routeName.value,
    word: words.value[currentIndexSlide.value].title,
  });
  store.dispatch("updateCardGroupsLearnedCount", routeName.value);
  store.dispatch("getCardWords", routeName.value);
};

const nextSlide = () => carousel.value.next();

const create = async (e: MouseEvent) => {
  e.preventDefault();
  updateFormRules();
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        try {
          isDisabled.value = true;
          await store
            .dispatch("createWord", {
              wordValue: modelRef,
              groupName: routeName.value,
            })
            .catch((error) => {
              message.error(`${error}`);
            });
        } catch (error: any) {
          console.log(error.code);
        } finally {
          isDisabled.value = false;
          modelRef.originalTitle = "";
          modelRef.translateTitle = "";
          modelRef.description = "";
        }
      }
    }
  );
};

const hiddenAlert = () => {
  setTimeout(() => {
    isHiddenAlert.value = false;
  }, 3000);
};
hiddenAlert();
</script>

<template>
  <div class="card-item">
    <div class="container">
      <n-button icon-placement="right" @click="showModalRef = true">
        Add New
        <template #icon>
          <n-icon>
            <CreateOutline />
          </n-icon>
        </template>
      </n-button>
      <n-modal
        preset="card"
        :style="{ maxWidth: '500px', width: '96%' }"
        v-model:show="showModalRef"
      >
        <template #header>Create new words</template>
        <n-card
          :content-style="{ padding: '0' }"
          :bordered="false"
          role="dialog"
          aria-modal="true"
        >
          <n-form
            @keyup.prevent.enter="create"
            ref="formRef"
            :model="modelRef"
            :rules="formRules"
          >
            <n-form-item show-require-mark path="originalTitle" label="Word">
              <n-input
                v-model:value="modelRef.originalTitle"
                type="text"
                placeholder="Write word"
              />
            </n-form-item>
            <n-form-item
              show-require-mark
              path="translateTitle"
              label="Translate word"
            >
              <n-input
                v-model:value="modelRef.translateTitle"
                type="text"
                placeholder="Write translate word"
              />
            </n-form-item>
            <n-form-item label="Use case">
              <n-input
                v-model:value="modelRef.description"
                type="text"
                placeholder="Write use case"
              />
            </n-form-item>
            <n-row :gutter="[0, 24]">
              <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                  <n-button
                    :disabled="isDisabled"
                    @click="create"
                    :block="true"
                    type="primary"
                    >Create
                  </n-button>
                </div>
              </n-col>
            </n-row>
          </n-form>
        </n-card>
      </n-modal>
      <div class="card-item__carousel-wrap">
        <n-h3 v-if="!words.length">You haven't created cards yet</n-h3>
        <div v-else class="card-item__carousel">
          <n-carousel
            ref="carousel"
            :show-dots="false"
            style="height: 240px"
            :effect="'fade'"
            @update:current-index="changeIndex"
          >
            <n-carousel-item
              @click="showTranslateWords(word._id)"
              v-for="word in words"
              :key="word._id"
            >
              <n-card
                :bordered="true"
                :segmented="{
                  content: true,
                }"
              >
                <template #header>
                  <n-h3 style="margin: 0">{{ word["title"] }}</n-h3>
                </template>

                <n-h3 v-if="isVisible[word._id]" style="margin: 0">
                  {{ word["translated"] }}
                </n-h3>

                <template
                  v-if="isVisible[word._id] && word['description']"
                  #action
                >
                  <n-h3 style="margin: 0">{{ word["description"] }}</n-h3>
                </template>
              </n-card>
            </n-carousel-item>
          </n-carousel>

          <n-grid class="card-item__carousel-btn-wrap" x-gap="12" :cols="2">
            <n-gi>
              <n-button :block="true" @click="isLearnedWord"
                >Word is learned
              </n-button>
            </n-gi>
            <n-gi v-if="words.length > 1">
              <n-button :block="true" @click="nextSlide">Next word</n-button>
            </n-gi>
          </n-grid>
          <n-alert
            style="margin-top: 10px"
            v-if="isHiddenAlert"
            closable
            type="info"
          >
            Click on the card to see the translation
          </n-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-item__carousel-wrap {
  margin-top: 40px;
}

.card-item__carousel {
  width: 98%;
  max-width: 500px;
  min-height: 240px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;

  .n-card {
    height: 100%;
  }
}

.card-item__carousel-btn-wrap {
  margin-top: 20px;
}
</style>
