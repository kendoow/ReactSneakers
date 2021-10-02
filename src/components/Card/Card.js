import React, {useState} from 'react'
import styles from './Card.module.scss'
const Card = ({id,title,price,imageUrl,onFaivorite,onPlus,favorited = false}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [isFaivorite, setIsFaivorite] = useState(favorited);

    const onClickPlus = () => {
      onPlus({title,price,imageUrl});
      setIsAdded(!isAdded);
    }
    const onClickFaivorite = () =>{
      onFaivorite({id,title,price,imageUrl});
      setIsFaivorite(!isFaivorite);
    }

    return (
        
        <div className={styles.card}>
        <div className={styles.faivorite}>
          <img  onClick = {onClickFaivorite} src={isFaivorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked" />
        </div>
        <img src={imageUrl} alt="Sneaker" width={133} height={112} />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>       
            <img className = 'plus' onClick ={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-unchecked.svg"} alt="plus-icon" />       
        </div>
      </div>
    )
}

export default Card;