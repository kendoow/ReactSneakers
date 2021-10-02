import React,{useState,useEffect} from "react"
import axios from 'axios'

import Drawer from "./components/Drawer"
import Header from "./components/Header"
import { Route } from "react-router"
import { Link } from "react-router-dom"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"



const App = () => {
 

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [faivorites, setFaivorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  
  
  useEffect(() =>{
    axios.get('https://615734fe8f7ea60017985154.mockapi.io/items').then(res => {
      setItems(res.data)
    })
    axios.get('https://615734fe8f7ea60017985154.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    })
    axios.get('https://615734fe8f7ea60017985154.mockapi.io/Faivorites').then(res => {
      setFaivorites(res.data)
    })
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://615734fe8f7ea60017985154.mockapi.io/cart',obj)
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://615734fe8f7ea60017985154.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }
  
  const onAddToFaivorite = async (obj) => {
    try {
      if(faivorites.find((favObj) => favObj.id === obj.id)){
        axios.delete(`https://615734fe8f7ea60017985154.mockapi.io/Faivorites/${obj.id}`)
      }
      else{
        const {data} = await axios.post('https://615734fe8f7ea60017985154.mockapi.io/Faivorites',obj)
        setFaivorites((prev) => [...prev, data]);
      }
    } catch(error) {
      alert('Не удалось добавить в желаемое')
    }
  }
  
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  return (
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
          />
        </Route>
        <Route path = '/favorites' exact >
          <Favorites 
          items = {faivorites} 
          onAddToFaivorite = {onAddToFaivorite}/>
        </Route>
    </div>
  )
}
export default App