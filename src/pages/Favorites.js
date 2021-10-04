import { useContext } from "react";
import AppContext from "../context";
import Card from "../components/Card";

const Favorites = () => {
  const {faivorites,onAddToFaivorite} = useContext(AppContext);

    return (
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
            {...item}
            />
          ))} 
        </div>
      </div>
    );
}
export default Favorites;