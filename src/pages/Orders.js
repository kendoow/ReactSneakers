import axios from 'axios';
import React,{useEffect,useState} from 'react'
import Card from "../components/Card";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
    (async () => {
        try {
        const {data} = await axios.get('https://615734fe8f7ea60017985154.mockapi.io/Orders')
        setOrders(data.reduce((prev,obj) => [...prev,...obj.items],[]))
        setIsLoading(false)
        } catch (error) {
            alert('Ошибка при запросе заказов')
            console.log(error)
        }
    })();
},[])

    return (
        <div className="content  p-40">
        <div className='d-flex justify-between align-center mb-40'>
          <h1>Мои Заказы</h1>         
        </div>

        <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item,index) => (
            <Card 
          key={index}
          loading={isLoading}
          {...item}
            />
          ))} 
        </div>
      </div>
    );
}
export default Orders;