import React,{useState,useEffect} from "react"
import axios from 'axios'

import Drawer from "./components/Drawer/Drawer"
import Header from "./components/Header"
import { Route } from "react-router"  
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import AppContext  from "./context"
import Orders from "./pages/Orders"


const App = () => {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [faivorites, setFaivorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  
  useEffect(() =>{
    async function fetchData () {
   try {
    const[itemsResponse,cartResponse,favoritesResponse] = await Promise.all(
      [axios.get('https://615734fe8f7ea60017985154.mockapi.io/items'),
      axios.get('https://615734fe8f7ea60017985154.mockapi.io/cart'),
      axios.get('https://615734fe8f7ea60017985154.mockapi.io/Faivorites')]);


    setIsLoading(false)

    setCartItems(cartResponse.data)
    setFaivorites(favoritesResponse.data)
    setItems(itemsResponse.data)
    }
     catch (error) {
     alert ('Ошибка при запросе данных :(')
   }
  }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
      try {
        const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
        if(findItem){ 
          setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id))); 
          await axios.delete(`https://615734fe8f7ea60017985154.mockapi.io/cart/${findItem.id}`)
        } else {
          setCartItems((prev) => [...prev,obj]);
          const {data} = await axios.post('https://615734fe8f7ea60017985154.mockapi.io/cart',obj);
          setCartItems((prev) => prev.map(item => {
            if(item.parentId === data.parentId){
              return {
                ...item,
                id:data.id
              }
            }
            return item;
          }));
        }
      }
        catch (error) {
        alert ('Не поулчилось добавить в корзину!')
      }
    
  };

  const onRemoveItem = async(id) => {
    try {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
      await axios.delete(`https://615734fe8f7ea60017985154.mockapi.io/cart/${id}`)     
    } catch (error) {
      alert('Не удалось удалить пару кроссовок!')
    }  
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };    
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    
    <AppContext.Provider value = {{cartItems,faivorites,items,isItemAdded,onAddToFaivorite,setCartOpened,setCartItems,onAddToCart}}>
      <div className="wrapper clear">
      <Drawer items = {cartItems} onRemove = {onRemoveItem} onClose = {() => setCartOpened(false)} opened = {cartOpened}/>

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

        <Route path = '/orders' exact >
          <Orders />
        </Route>
    </div>
    </AppContext.Provider>
  )
}
export default App