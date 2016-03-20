export default function fetchComponentData (dispatch, components, params) {

    const needs = components.reduce((prev, current) => (current.needs || [])
            .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
            .concat(prev), [])
    
    if (!needs) return false

    const promises = needs.map((need) => dispatch(need(params)))
    return Promise.all(promises)
}
