<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormInst, FormValidationError, useMessage, FormRules } from "naive-ui";
import { useStore } from "@/store";
import { rules } from "@/composable/form/form";

const store = useStore();

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const isDisabled = ref(false);
const modelRef = reactive({
  title: "",
});

const formRules = reactive<FormRules>({
  title: [],
});

const updateFormRules = () => {
  for (const key in formRules) {
    formRules[key] = rules()["inputVal"];
  }
};
const create = async (e: MouseEvent) => {
  e.preventDefault();
  updateFormRules();
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        try {
          isDisabled.value = true;
          await store.dispatch("createCardGroup", modelRef).catch((error) => {
            message.error(`${error}`);
          });
        } catch (error: any) {
          message.error(`${error.code}`);
        } finally {
          modelRef.title = "";
          isDisabled.value = false;
        }
      }
    }
  );
};
</script>

<template>
  <div class="create">
    <div class="container">
      <n-form
        @keyup.prevent.enter="create"
        ref="formRef"
        :model="modelRef"
        :rules="formRules"
      >
        <n-form-item show-require-mark path="inputVal" label="Group name">
          <n-input
            type="text"
            v-model:value="modelRef.title"
            placeholder="Write group name"
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div>
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
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
