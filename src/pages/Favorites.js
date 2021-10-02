import Card from "../components/Card";
const Favorites = ({items, onAddToFaivorite}) => {
    return (
        <div className="content  p-40">
        <div className='d-flex justify-between align-center mb-40'>
          <h1>Мои закладки</h1>         
        </div>

        <div className="d-flex flex-wrap">
        {items.map((item,index) => (
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