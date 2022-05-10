import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import InvoicesList from './components/InvoicesList'
import InvoiceShow from './components/InvoiceShow'

function App() {
  return (
    <div className="px-5">
      <Router>
        <Switch>
          <Route path="/invoice/:id" component={InvoiceShow} />
          <Route exact path={['/', '/invoice']} component={InvoicesList} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
