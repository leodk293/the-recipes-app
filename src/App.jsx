import './App.css'
import Food from './components/Food'
import Detals from './components/Detals';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element = {<Food/>}/>
          <Route path='/details/:id' element = {<Detals/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
