const Drawer = () => {
    return (
        <div className="drawer">
        <h2 className='mb-30px'>Корзина <img className='removeBtn' src="/img/btn-remove.svg" alt="Remove" /></h2>
        

        <div className="items">
          <div className="cartItem d-flex align-center mb-20">

            <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className="cardItemImg">

            </div>
            <div className="mr-20 flex">
              <p className='mb-5'>Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className='removeBtn' src="/img/btn-remove.svg" alt="Remove" />
          </div>
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li className='d-flex'>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб. </b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
        <button className = 'greenButton'>Оформить заказ <img src="img/arrow.svg" alt="arrow" /></button>
        </div>
      </div>
    )
}
export default Drawer