import Maps from './maps.jsx'
// import MapsId from './maps-id.jsx'

const childRoutes = [
    {
        path: ':id',
        // component: MapsId
    }
]

export default {
    path: '/maps',
    component: Maps,
    childRoutes
}
