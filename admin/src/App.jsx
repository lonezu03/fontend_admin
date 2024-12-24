
import './App.css'
import Product from './components/Products.jsx'
import Menu from './components/Menu'
import { Provider } from "react-redux";
import store from "./redux/store.jsx"; 

function App() {

  return (
    <Provider store={store}>
       <div className="flex h-screen gap-[120px]">
      {/* Menu */}
      <div className="w-1/4 bg-gray-100 flex flex-col   ">
        <Menu />
      </div>

      {/* Product */}
      <div className="w-3/4 flex  bg-white">
        <Product />
      </div>
    </div>
    </Provider>
  )
}

export default App
