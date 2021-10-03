import React,{useState,useEffect} from "react"
import axios from 'axios'

import Drawer from "./components/Drawer"
import Header from "./components/Header"
import { Route } from "react-router"  
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import AppContext  from "./context"


const App = () => {
  document.body.style.overflow = ''

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [faivorites, setFaivorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  
  useEffect(() =>{
    async function fetchData () {
    const itemsResponse = await axios.get('https://615734fe8f7ea60017985154.mockapi.io/items');  
    const cartResponse = await axios.get('https://615734fe8f7ea60017985154.mockapi.io/cart')
    const favoritesResponse = await axios.get('https://615734fe8f7ea60017985154.mockapi.io/Faivorites')

    setIsLoading(false)

    setCartItems(cartResponse.data)
    setFaivorites(favoritesResponse.data)
    setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const onAddToCart = (obj) => {
      if(cartItems.find((item) => Number(item.id) === Number(obj.id))){ 
        axios.delete(`https://615734fe8f7ea60017985154.mockapi.io/cart/${obj.id}`)
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));  
      } else {
        axios.post('https://615734fe8f7ea60017985154.mockapi.io/cart',obj);
        setCartItems((prev) => [...prev,obj]);
      }
    
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://615734fe8f7ea60017985154.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));  
  }
  
  const onAddToFaivorite = async (obj) => {
    try {
      if(faivorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
        axios.delete(`https://615734fe8f7ea60017985154.mockapi.io/Faivorites/${obj.id}`);
        setFaivorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }
      else{
        const {data} = await axios.post('https://615734fe8f7ea60017985154.mockapi.io/Faivorites',obj)
        setFaivorites((prev) => [...prev, data]);
      }
    } catch(error) {
      alert('Не удалось добавить в желаемое')
    }
  }
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };    
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    
    <AppContext.Provider value = {{cartItems,faivorites,items,isItemAdded,onAddToFaivorite,setCartOpened,setCartItems}}>
      <div className="wrapper clear">
        {cartOpened ? <Drawer items = {cartItems} onRemove = {onRemoveItem} onClose = {() => setCartOpened(false)}/> : null}

          <Header onClickCart = {() => setCartOpened(true)} />
        

        <Route path = '/' exact >
          <Home 
          items = {items} 
          searchValue = {searchValue}
          setSearchValue = {setSearchValue}
          onChangeSearchInput = {onChangeSearchInput}
          onAddToFaivorite = {onAddToFaivorite}
          onAddToCart = {onAddToCart} 
          cartItems = {cartItems}
          isLoading = {isLoading}
          />
        </Route>

        <Route path = '/favorites' exact >
          <Favorites />
        </Route>
    </div>
    </AppContext.Provider>
  )
}
export default App