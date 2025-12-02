import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './utils/Toast/ToastProvider';
import Home from './page/home';
import ComingSoon from './page/comingSoon/ComingSoon';
import ResultSearch from './page/search';

function App() {
  return (
    <Router>
      <ToastProvider>
        <Routes>
          {/* <Route path='/'element={<ComingSoon/>}/> */}
          <Route path='/' element={<Home />} />
          <Route path='/resultSearch' element={<ResultSearch />} />
        </Routes>
      </ToastProvider>

    </Router>
  )
}

export default App
