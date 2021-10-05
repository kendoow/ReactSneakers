import { useContext } from "react";
import AppContext from "../context";
import Card from "../components/Card";
import EmptyPage from "./EmptyPage";

const Favorites = () => {
  const {faivorites,onAddToFaivorite,onAddToCart} = useContext(AppContext);

    return (
      faivorites.length > 0 ?
        <div className="content  p-40">
        <div className='d-flex justify-between align-center mb-40'>
          <h1>Мои Закладки</h1>         
        </div>

        <div className="d-flex flex-wrap">
        {faivorites.map((item,index) => (
            <Card 
            key = {index} 
            favorited = {true}
            onFaivorite = {onAddToFaivorite}
            onPlus={(obj) => onAddToCart(obj)}
            {...item}
            />
          ))} 
        </div>
      </div>
      :
      <EmptyPage
        image = './img/sad.png'
        title = 'Закладок нет :('
        description = 'Вы ничего не добавили в закладки'
        />
    );
}
export default Favorites;