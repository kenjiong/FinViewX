import { Link } from "react-router-dom";
import { Navbar, Button, Menu } from "react-daisyui";
import * as usersService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    usersService.logOut();
    setUser(null);
  }

  return (
    <Navbar className="bg-primary text-primary-content">
      <div className="flex-1">
        <Button tag="a" color="ghost" className="normal-case text-xl">
          daisyUI
        </Button>
        <Menu className="menu menu-horizontal px-1">
          <Menu.Item>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/save">Save</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/retire">Retire</Link>
          </Menu.Item>
            <span>Welcome, {user.name}</span>
          <Menu.Item>
            <Link to="/" onClick={handleLogOut}>
              Log Out
            </Link>
          </Menu.Item>
          </Menu>
      </div>
    </Navbar>
  );
}
