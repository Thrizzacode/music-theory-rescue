import { createRouter, createWebHashHistory } from 'vue-router'

// 延遲載入各頁面元件，提升初始載入效能
const HomeView = () => import('../views/HomeView.vue')
const BookView = () => import('../views/BookView.vue')
const ChapterView = () => import('../views/ChapterView.vue')
const PlayerView = () => import('../views/PlayerView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/book/:bookId',
    name: 'book',
    component: BookView,
    props: true,
  },
  {
    path: '/book/:bookId/:chapterId',
    name: 'chapter',
    component: ChapterView,
    props: true,
  },
  {
    path: '/play/:bookId/:chapterId/:songId',
    name: 'player',
    component: PlayerView,
    props: true,
  },
  // 未知路由導回首頁
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  // 使用 hash 模式以維持靜態檔案伺服器相容性（與原 hash-based routing 行為一致）
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 路由切換時回到頂部
    return { top: 0 }
  },
})

export default router
