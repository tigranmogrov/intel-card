<script setup lang="ts">
import { FormValidationError, useMessage, FormInst, FormRules } from "naive-ui";
import { reactive, ref } from "vue";
import { useStore } from "@/store";
import router from "@/router";

import { backendMessageError, rules } from "@/composable/form/form";
import { IUserCreateTypes } from "@/types";

const store = useStore();

const message = useMessage();

const formRef = ref<FormInst | null>(null);

const isDisabled = ref(false);

const modelRef = reactive<IUserCreateTypes>({
  email: "",
  password: "",
});

const formRules = reactive<FormRules>({
  email: [],
  password: [],
});

const updateFormRules = () => {
  for (const key in formRules) {
    formRules[key] = rules()[key];
  }
};

const signUp = async (e: MouseEvent) => {
  e.preventDefault();
  updateFormRules();
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        try {
          isDisabled.value = true;
          message.loading("Connect...", {
            onLeave() {
              store
                .dispatch("login", modelRef)
                .then(() => {
                  router.push({ name: "Home" });
                })
                .catch((errors) => backendMessageError(errors, message))
                .finally(() => (isDisabled.value = false));
            },
          });
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  );
};
</script>

<template>
  <div class="auth">
    <div class="container">
      <n-h2> LOGIN</n-h2>
      <n-form
        @keyup.prevent.enter="signUp"
        ref="formRef"
        :model="modelRef"
        :rules="formRules"
      >
        <n-form-item show-require-mark path="email" label="Email">
          <n-auto-complete v-model:value="modelRef.email" placeholder="Email" />
        </n-form-item>
        <n-form-item show-require-mark path="password" label="Password">
          <n-input
            type="password"
            v-model:value="modelRef.password"
            placeholder="Password"
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <n-button
              :block="true"
              :disabled="isDisabled"
              type="primary"
              @click.prevent="signUp"
            >
              LOGIN
            </n-button>
          </n-col>
        </n-row>
      </n-form>
      <n-row :gutter="[0, 24]">
        <n-col style="text-align: center" :span="24">
          Need an account?
          <n-button
            text
            type="primary"
            @click="$router.push({ name: 'Register' })"
            >SIGN IN
          </n-button>
        </n-col>
      </n-row>
    </div>
  </div>
</template>
