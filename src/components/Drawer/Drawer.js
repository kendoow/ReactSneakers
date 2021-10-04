import axios from "axios"
import { useState } from "react"

import Info from "../info"
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({onClose,items = [],onRemove,opened}) => {
    const {cartItems,setCartItems,totalPrice} = useCart()
    const [isComplited, setIsComplited] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [isLodaing, setIsLoading] = useState(false)
    

    const onClickOrder = async () => {
     try {
      setIsLoading(true)
      const {data} = await axios.post('https://615734fe8f7ea60017985154.mockapi.io/Orders',{items : cartItems})
      
      setOrderId(data.id)
      setIsComplited(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://615734fe8f7ea60017985154.mockapi.io/cart/' + item.id)
        await delay(1000);
      }
     } catch (error) {
       alert('Ошибка при создании заказа :(')
     }
     setIsLoading(false)
    }
    return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className= {styles.drawer}>
        <h2 className='mb-30px d-flex justify-between'>Корзина <img className='removeBtn mr-20 cu-p' onClick = {onClose}  src="/img/btn-remove.svg" alt="Remove" />
        </h2>

          {
             items.length > 0 ?
             <div className = 'wrapper-cart'>
               <div className="items">
             {items.map((obj)=> (
                 <div key = {obj.id} className="cartItem d-flex align-center mb-20">
   
                 <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cardItemImg">
     
                 </div>
                 <div className="mr-20 flex">
                   <p className='mb-5'>{obj.title}</p>
                   <b>{obj.price} руб.</b>
                 </div>
                 <img 
                 onClick = {() => onRemove(obj.id)} 
                 className='removeBtn' 
                 src="/img/btn-remove.svg" 
                 alt="Remove" />
               </div>
             ))}
           </div> 
           <div className="cartTotalBlock">
           <ul>
             <li className='d-flex'>
               <span>Итого:</span>
               <div></div>
               <b>{totalPrice} руб. </b>
             </li>
             <li>
               <span>Налог 5%:</span>
               <div></div>
               <b>{Math.round(totalPrice *0.05,1)} руб.</b>
             </li>
           </ul>
         <button disabled = {isLodaing} onClick = {onClickOrder} className = 'greenButton'>Оформить заказ <img src="img/arrow.svg" alt="arrow" /></button>
         </div>
             </div>
          //  рендери список
          
           :
          //  или уведомление о том что корзина пустая
          <Info 
          image = {isComplited ? '/img/sent.jpg' : '/img/empty-cart.jpg'} 
          title = {isComplited ? 'Заказ оформлен' : 'Корзина пустая'} 
          description ={isComplited ? `Ваш заказ номер ${orderId} скоро будет передан курьерской доставке`:  'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}/>
          }       
      </div>
    </div>
    )
}
export default Drawer