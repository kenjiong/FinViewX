import { Link } from "react-router-dom";
import * as usersService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    usersService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      &nbsp; | &nbsp;
      <Link to="/save">Save</Link>
      &nbsp; | &nbsp;
      <Link to="/retire">Retire</Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
