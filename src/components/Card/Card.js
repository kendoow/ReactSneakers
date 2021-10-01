import React, {useState} from 'react'
import styles from './Card.module.scss'
const Card = ({title,price,imageUrl,onFaivorite,onPlus}) => {
    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
      onPlus({title,price,imageUrl});
      setIsAdded(!isAdded);
    }

    return (
        
        <div className={styles.card}>
        <div className={styles.faivorite} onClick = {onFaivorite}>
          <img src="/img/heart-unliked.svg" alt="unliked" />
        </div>
        <img src={imageUrl} alt="" width={133} height={112} />
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