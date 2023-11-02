import { Link } from "react-router-dom";
import { Navbar, Button, Menu, Dropdown } from "react-daisyui";
import * as usersService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    usersService.logOut();
    setUser(null);
  }

  return (
    <Navbar className="bg-primary flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 font-inter font-extralight">
      <div className="flex items-center">
        <Link to="/">
        <Button tag="a" color="ghost" className="normal-case text-xl">
          FinViewX
        </Button>
        </Link>
        <Menu className="menu-horizontal px-1">
          <Menu.Item>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/save">Save</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/retire">Retire</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="flex justify-center items-center">
        <Dropdown end>
        <Button tag="label" tabIndex={0} color="ghost" className="avatar" shape="circle">
            <div className="w-10 rounded-full">
              <img src="https://raw.githubusercontent.com/1l0/identicon/master/example/identicons/seq1_black.png" />
            </div>
          </Button>
          <Dropdown.Menu className="mt-3 z-[1] w-52 menu-sm">
            <p className="normal-case text-xl">{user.name}</p>
            <small>User Tier: {(user.tier?.charAt(0).toUpperCase() + user.tier?.slice(1))}</small>
            <hr />
            <Dropdown.Item><Link to="/" onClick={handleLogOut}>
              Log Out
            </Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
}
