import Blog from './blog.jsx'
// import MapsId from './maps-id.jsx'

const childRoutes = [
    {
        path: ':id',
        // component: MapsId
    }
]

export default {
    path: '/blog',
    component: Blog,
    childRoutes
}
