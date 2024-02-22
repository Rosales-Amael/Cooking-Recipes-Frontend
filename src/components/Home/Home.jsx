import { Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Home.scss';
import AddRecipeForm from '../AddRecipeForm/AddRecipeForm';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import Profil from '../Profil/Profil';

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Routes>
        <Route path="/creer-une-recette" element={<AddRecipeForm />} />
        <Route path="/connexion" element={<LoginForm />} />
        <Route path="/cree-mon-compte" element={<RegisterForm />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
}

export default Home;