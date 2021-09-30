import Card from "./components/Card"
import Drawer from "./components/Drawer"
import Header from "./components/Header"

const App = () => {
  return (
    <div className="wrapper clear">
      <div style={{ display: 'none' }} className="overlay">
        <Drawer />
      </div>
      <Header />
      <div className="content p-40">
        <div className='d-flex justify-between align-center mb-40'>
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="./img/lupa.svg" alt="Search" />
            <input placeholder='Поиск...' type="text" />
          </div>
        </div>
        <div className="d-flex">
          <Card />
        </div>
      </div>
    </div>
  )
}
export default App