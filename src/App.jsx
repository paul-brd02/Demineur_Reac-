import TopBar from './components/TopBar';
import './style/App.css';

function App() {
  return (
    <div className="App">
      <div style={{fontWeight: "bold", fontSize: "30px", marginBottom: "20px"}}>Démineur</div>
      <TopBar />  
    </div>
  );
}

export default App;
