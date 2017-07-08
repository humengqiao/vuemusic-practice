import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import SingerDetail from 'components/singer-detail/singer-detail'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
		  path: '/recommend',
		  component: Recommend
    },
    {
		  path: '/singer',
		  component: Singer,
      children:[
        {
          path: ':id',
          component: SingerDetail 
        }
    ]
    },
    {
		  path: '/rank',
		  component: Rank
    },
    {
		  path: '/search',
		  component: Search
    },
    {
		  path: '/',
		  redirect: '/recommend'
    }
  ]
})
