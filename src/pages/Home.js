import React from 'react';
import Card from '../components/Card'


const Home = (
  {items,
    searchValue,
    onChangeSearchInput,
    onAddToFaivorite,
    onAddToCart,
    setSearchValue,
    isLoading
  }) => {
    const renderItems = () => {
      const filtredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
      return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
        <Card
          key={index}
          onFaivorite={(obj) => onAddToFaivorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
        />
      ));
    };
    return (
        <div className="content  p-40">
        <div className='d-flex justify-between align-center mb-40'>
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="./img/lupa.svg" alt="Search" />
            {searchValue && 
            <img 
            onClick = {() => setSearchValue('')} 
            className='removeBtn cu-p clear' 
            src="/img/btn-remove.svg" 
            alt="Remove" />}
            <input onChange = {onChangeSearchInput } value = {searchValue} placeholder='Поиск...' type="text" />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {renderItems()} 
        </div>
      </div>
    )
}
export default Home;