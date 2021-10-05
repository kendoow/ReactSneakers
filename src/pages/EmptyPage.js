import { Link } from "react-router-dom";

const EmptyPage = ({image,title,description}) => {
    return (
        <div className="emptyWrapper">
    <img width ={70} height = {70} src={image} alt="" />
    <h3 className = 'emptyTitle'>{title}</h3>
    <p className = 'emptyDescr'>{description}</p>
    <Link to ='/' className = 'greenButton'>Вернуться назад<img src="img/arrow.svg" alt="arrow" />
    </Link>
    
    </div>
    )

}
export default EmptyPage;