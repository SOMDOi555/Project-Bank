<template>
  <v-app>
    <!-- Sidebar Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      permanent
      :width="220"
      color="#1E293B"
      elevation="0"
    >
      <!-- Logo & App Title -->
      <div
        class="sidebar-brand pa-4 pb-3 cursor-pointer"
        @click="router.push('/')"
      >
        <div class="d-flex align-center ga-2 mb-1">
          <div class="brand-icon">
            <img src="/argo-logo.png" alt="Argo Logo" class="brand-logo" />
          </div>
          <div>
            <div class="brand-title">Argo Fiber Control</div>
            <div class="brand-title">Center</div>
          </div>
        </div>
        <!-- <div class="brand-subtitle">ระบบควบคุมและวิเคราะห์กระบวนการผลิต</div> -->
      </div>

      <v-divider class="border-opacity-10 mx-3 mb-2" />

      <!-- Navigation Menu -->
      <v-list density="comfortable" nav class="pa-3">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          :exact="item.to === '/'"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
          class="mb-1 nav-item"
          active-class="nav-item-active"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar flat border="b" color="white" height="60">
      <v-app-bar-nav-icon color="grey-darken-2" @click="drawer = !drawer" />

      <!-- Breadcrumb -->
      <div class="topbar-breadcrumb ml-1">
        <span class="breadcrumb-parent" v-if="currentItem?.parent">
          {{ currentItem.parent }}
          <v-icon size="14" class="mx-1">mdi-chevron-right</v-icon>
        </span>
        <span class="breadcrumb-current">{{
          currentItem?.title || "Agro Fiber Control Center"
        }}</span>
      </div>

      <v-spacer />

      <!-- Thai Date & Time Display -->
      <div class="d-none d-sm-flex align-center ga-2 text-grey-darken-2 mr-3 px-3 py-1">
        <v-icon size="18" color="primary">mdi-clock-outline</v-icon>
        <span class="text-caption font-weight-medium">{{ currentThaiDateTime }}</span>
      </div>

      <!-- Top Bar Actions -->
      <v-btn icon variant="text" color="grey-darken-1" class="mr-1">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn icon variant="text" color="grey-darken-1" class="mr-2">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main style="background-color: #ffffff">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const drawer = ref(true);
const route = useRoute();
const router = useRouter();

// วันที่และเวลาปัจจุบันแบบไทย
const currentThaiDateTime = ref("");
const updateThaiDateTime = () => {
  const now = new Date();
  currentThaiDateTime.value = now.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

let timer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  updateThaiDateTime();
  timer = setInterval(updateThaiDateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const menuItems = [
  {
    title: "หน้าหลัก",
    icon: "mdi-home-circle",
    to: "/",
    parent: null,
  },
  {
    title: "Control Sifter",
    icon: "mdi-excavator",
    to: "/sifter",
    parent: null,
  },
  {
    title: "Predict %MC Forming",
    icon: "mdi-water-thermometer",
    to: "/predict-mc",
    parent: null,
  },
  {
    title: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    to: "/dashboard",
    parent: null,
  },
];

const currentItem = computed(
  () =>
    menuItems.find(
      (item) =>
        route.path === item.to ||
        (item.to !== "/" && route.path.startsWith(item.to)),
    ) || null,
);
</script>

<style scoped>
.sidebar-brand {
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.brand-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-title {
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 11px;
  color: #ffffff;
  margin-top: 2px;
  margin-left: 40px;
}

.nav-item {
  color: #94a3b8 !important;
  font-weight: 500;
  font-size: 13px;
  transition: all 0.15s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07) !important;
  color: #e2e8f0 !important;
}

.nav-item-active {
  background: #c1c1c1 !important;
  color: #ffffff !important;
  font-weight: 600;
}

.nav-item-active :deep(.v-icon) {
  color: #ffffff !important;
}

.user-name {
  font-size: 12px;
  font-weight: 600;
  color: #e2e8f0;
  line-height: 1.3;
}

.user-role {
  font-size: 10px;
  color: #64748b;
  line-height: 1.3;
}

.topbar-breadcrumb {
  font-size: 14px;
}

.breadcrumb-parent {
  color: #94a3b8;
}

.breadcrumb-current {
  font-weight: 700;
  color: #1e293b;
  font-size: 15px;
}
</style>
