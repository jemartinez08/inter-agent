import { createRouter, createWebHistory } from "vue-router";

import AdminPanel from "../views/AdminPanel.vue";
import ResumeAnalyzer from "../views/ResumeAnalyzer.vue";
import NotFoundView from "../views/NotFound.vue";
import InterviewAnalyzer from "../views/InterviewAnalyzer.vue";

const routes = [
  {
    path: "/",
    name: "admin-panel",
    component: AdminPanel,
  },
  {
    path: "/resume-analyzer",
    name: "resume-analyzer",
    component: ResumeAnalyzer,
  },
  {
    path: "/interview-analyzer",
    name: "interview-analyzer",
    component: InterviewAnalyzer,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
