import Geturl from "./component/Geturl";
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<Geturl/>}/>
 </Routes>
 </BrowserRouter>
  );
}

export default App;
