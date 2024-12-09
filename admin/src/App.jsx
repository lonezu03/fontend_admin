
import './App.css'
import Product from './components/Products.jsx'
import Menu from './components/Menu'
import { Provider } from "react-redux";
import store from "./redux/store.jsx"; 

function App() {

  return (
    <Provider store={store}>
      <div>
        <Menu />
        <Product />
      </div>
    </Provider>
  )
}

export default App
