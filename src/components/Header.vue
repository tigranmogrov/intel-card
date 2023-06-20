<script setup lang="ts">
import { onMounted, ref, defineEmits, computed } from "vue";
import { MoonOutline, SunnyOutline } from "@vicons/ionicons5";
import { useStore } from "@/store";
import { ThemeMode } from "@/enum/theme-mode/theme-mode.enum";

const store = useStore();

const switchValue = ref<string>(`${ThemeMode.LIGHT}`);
const emit = defineEmits(["themeMode"]);

const toggleTheme = (mode) => {
  window.localStorage.setItem("theme", mode);
  mode === ThemeMode.DARK ? emmitMode(mode) : emmitMode(mode);
  switchValue.value = mode;
};

const emmitMode = (mode) => emit("themeMode", mode);

onMounted(() => {
  const mode: string | null = window.localStorage.getItem("theme");
  if (mode) {
    switchValue.value = mode;
    emmitMode(mode);
  }
});

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = computed(() => store.getters.user);
</script>

<template>
  <header class="header light-green">
    <div class="container">
      <div class="header__inner">
        <n-avatar size="large" src="/favicon.png"></n-avatar>
        <n-h1 v-if="user && isAuthenticated">{{ user.name }}</n-h1>

        <n-space align="center">
          <n-switch
            :style="
              switchValue === ThemeMode.DARK
                ? '--n-icon-color:rgb(118, 124, 130)'
                : null
            "
            :value="switchValue"
            :checked-value="ThemeMode.DARK"
            :unchecked-value="ThemeMode.LIGHT"
            @update:value="toggleTheme"
            size="large"
          >
            <template #checked-icon>
              <n-icon>
                <moon-outline />
              </n-icon>
            </template>
            <template #unchecked-icon>
              <n-icon>
                <sunny-outline />
              </n-icon>
            </template>
          </n-switch>
        </n-space>
      </div>
    </div>
    <n-divider />
  </header>
</template>

<style scoped lang="scss"></style>
