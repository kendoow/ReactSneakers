import React,{useState,useEffect} from "react"
import Card from "./components/Card/"
import Drawer from "./components/Drawer"
import Header from "./components/Header"



const App = () => {
 

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])

  const [cartOpened, setCartOpened] = useState(false)
  
  
  useEffect(() =>{
    fetch('https://615734fe8f7ea60017985154.mockapi.io/items')
    .then((res) =>{return res.json()})
    .then((json) =>{
      setItems(json)
    })
  }, [])

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  };


  return (
    <div className="wrapper clear">
        {cartOpened ? <Drawer items = {cartItems} onClose = {() => setCartOpened(false)}/> : null}
        <Header onClickCart = {() => setCartOpened(true)} />
      <div className="content  p-40">
        <div className='d-flex justify-between align-center mb-40'>
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="./img/lupa.svg" alt="Search" />
            <input placeholder='Поиск...' type="text" />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card 
            title = {item.title} 
            price = {item.price} 
            imageUrl = {item.imageUrl}
            onPlus = {(obj) => onAddToCart(obj)}      
            />
          ))} 
        </div>
      </div>
    </div>
  )
}
export default App