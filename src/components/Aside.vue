<script setup lang="ts">
import { ref, h, Component, computed, ComputedRef } from "vue";
import { RouterLink, useRoute } from "vue-router";
import router from "@/router";
import { NIcon, useMessage } from "naive-ui";
import {
  CreateOutline,
  ExitOutline,
  HomeOutline,
  AlbumsOutline,
} from "@vicons/ionicons5";
import { useStore } from "@/store";

const route = useRoute();

const message = useMessage();

const store = useStore();

const collapsed = ref(true);

const isDisabled = ref(false);

const routeName: ComputedRef = computed(() => route.name);

const logout = () => {
  isDisabled.value = true;

  message.loading("Connect...", {
    onLeave() {
      store
        .dispatch("logout")
        .then(() =>
          router.push({ name: "Login", query: { message: "logout" } })
        );
    },
    onAfterLeave() {
      isDisabled.value = false;
    },
  });
};

const handleUpdateExpandedKeys = (key: string) => {
  collapsed.value = true;
  if (key === "Logout") {
    logout();
  }
};

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};
const menuOptions: ComputedRef = computed(() => [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Home",
          },
        },
        { default: () => "Home" }
      ),
    key: "Home",
    icon: renderIcon(HomeOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Create",
          },
        },
        { default: () => "Create card" }
      ),
    key: "Create",
    icon: renderIcon(CreateOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Cards",
          },
        },
        { default: () => "Cards" }
      ),
    key: "Cards",
    icon: renderIcon(AlbumsOutline),
  },
  {
    label: "Sign out",
    key: "Logout",
    disabled: isDisabled.value,
    icon: renderIcon(ExitOutline),
  },
]);
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="54"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
    class="aside"
  >
    <n-menu
      :default-value="routeName"
      :watch-props="['defaultValue']"
      @update:value="handleUpdateExpandedKeys"
      :collapsed-icon-size="26"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<style lang="scss">
.n-layout-sider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
}
.n-menu-item .n-menu-item-content.n-menu-item-content--disabled a,
.n-menu-item .n-menu-item-content.n-menu-item-content--disabled a:before {
  pointer-events: none !important;
  cursor: no-drop !important;
}
</style>
