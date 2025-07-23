/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/personnel-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'personnel-table',
      component: () => import('@/views/table/personnel'),
      name: 'PersonnelTable',
      meta: { title: 'Personnel', affix: true }
    }
  ]
}
export default tableRouter
