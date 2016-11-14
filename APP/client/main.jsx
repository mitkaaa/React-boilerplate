import React from 'react'
import { Router } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from 'common-app'

import route from './route.jsx'
// export default class Main extends React.Component {
//     render () {
//         return (<Provider component={Provider} store={store}>
//              <App>
//                  <Router children={route} history={browserHistory} />
//              </App>
//          </Provider>)
//     }
// }
export default ({ store, browserHistory }) => (
    <Provider store={store}>
         <App>
             <Router children={route} history={browserHistory} />
         </App>
     </Provider>
)// render(
        // <Provider component={Provider} store={store}>
        //     <App>
        //         <Router children={route} history={browserHistory} />
        //     </App>
        // </Provider>
// , document.getElementById('application'))
//
//
// if (module.hot) {
//     module.hot.accept('react-redux', () => {
//         render(<AppContainer>
//             <Provider component={Provider} store={store}>
//                 <App>
//                     <Router children={route} history={browserHistory} />
//                 </App>
//             </Provider>
//         </AppContainer>)
//     })
// }
