<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "@/store";
import { darkTheme } from "naive-ui";

import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import { ThemeMode } from "@/enum/theme-mode/theme-mode.enum";

const store = useStore();
const theme = ref<typeof darkTheme | null>(null);
const isLoading = ref(false);
const getThemeParam = (mode: string) => {
  if (mode === ThemeMode.DARK) {
    theme.value = darkTheme;
  } else {
    theme.value = null;
  }
};
const isAuthenticated = computed(() => store.getters.isAuthenticated);
onMounted(() => {
  store.dispatch("getCardGroups");
  store.dispatch("getDbInfo").then(() => {
    setTimeout(() => (isLoading.value = true), 620);
  });
});
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-space vertical>
        <n-layout has-sider v-show="isLoading">
          <Aside v-if="isAuthenticated" />
          <n-layout-content
            :style="isAuthenticated ? '  padding-left: 54px;' : null"
          >
            <Header @themeMode="getThemeParam" />
            <div class="content">
              <router-view />
            </div>
          </n-layout-content>
        </n-layout>
      </n-space>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss">
.n-layout {
  height: 100vh;
}

.container {
  position: relative;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
}

.content {
  padding-top: 80px;
  padding-bottom: 40px;
  @media screen and (max-width: 767px) {
    padding-top: 40px;
  }
}
</style>
