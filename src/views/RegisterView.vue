<script setup lang="ts">
import { FormInst, FormValidationError, useMessage, FormRules } from "naive-ui";
import { ref, reactive } from "vue";

import { useStore } from "@/store";

import router from "@/router";

import { rules } from "@/composable/form/form";
import { IUserCreateTypes } from "@/types";

const store = useStore();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const isDisabled = ref(false);

const modelRef = reactive<IUserCreateTypes>({
  name: "",
  email: "",
  password: "",
});

const formRules = reactive<FormRules>({
  name: [],
  email: [],
  password: [],
});

const updateFormRules = () => {
  for (const key in formRules) {
    formRules[key] = rules()[key];
  }
};

const register = async (e: MouseEvent) => {
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
                .dispatch("createUser", modelRef)
                .then(() => {
                  router.push({ name: "Home" });
                })
                .finally(() => (isDisabled.value = false));
            },
          });
        } catch (error: any) {
          console.log(error.code);
        }
      }
    }
  );
};
</script>

<template>
  <div class="auth">
    <div class="container">
      <n-h2>Registration</n-h2>
      <n-form
        @keyup.prevent.enter="register"
        ref="formRef"
        :model="modelRef"
        :rules="formRules"
      >
        <n-form-item show-require-mark path="name" label="Name">
          <n-input
            type="text"
            v-model:value="modelRef.name"
            placeholder="Name"
          />
        </n-form-item>

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
              @click.prevent="register"
            >
              REGISTER
            </n-button>
          </n-col>
        </n-row>
      </n-form>

      <n-row :gutter="[0, 24]">
        <n-col style="text-align: center" :span="24">
          Need an account?
          <n-button text type="primary" @click="$router.push({ name: 'Login' })"
            >SIGN UP
          </n-button>
        </n-col>
      </n-row>
    </div>
  </div>
</template>
