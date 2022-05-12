import '../App.css';
import logo from './logo.png';

function Header() {
  return (
    <div className="Header">
            <a href='/'><img id= "logo"className='mx-auto d-block' src={logo}/></a>
            <h2 className='text-center'>Automated Essay Grading</h2>
    </div>
  );
}

export default Header;
