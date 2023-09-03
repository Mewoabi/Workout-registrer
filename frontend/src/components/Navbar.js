import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  }

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to='/'>
          <h1>Workout Lab</h1>
        </Link>
        <nav>
          {!user && <div>
            <Link to='/login'>login</Link>
            <Link to='/signup'>signup</Link>
          </div>}
          {user && <div>
            <span>{user.email}</span>
            <button onClick={handleClick} className="logout">logout</button>
          </div>}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;