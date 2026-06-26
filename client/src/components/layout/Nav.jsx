import { Link } from "react-router";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import {
  useAuthActions,
  useAuthToken,
} from "../../features/auth/useAuthActions";

const Nav = ({ user }) => {
  const isAuthenticated = useAuthToken();
  const { logout } = useAuthActions();
  return (
    <header
      className={`px-6 py-4 flex justify-between items-center border-b sticky top-0 z-10 ${
        isAuthenticated
          ? "border-gray-200 bg-white"
          : "border-gray-200/60 bg-white/50 backdrop-blur-sm"
      }`}
    >
      <Link to="/" className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-900 rounded-none"></div>
        <h3 className="font-semibold text-lg tracking-tight m-0 text-gray-900">
          short.link
        </h3>
      </Link>

      {isAuthenticated ? (
        <nav className="flex gap-4 items-center">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-600 hidden sm:block"
          >
            Dashboard
          </Link>
          <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>
          {user && (
            <div className="flex items-center gap-3 cursor-pointer group">
              <span className="text-sm font-semibold group-hover:text-gray-600">
                {user.name}
              </span>
              <Avatar initials={user.initials} />
            </div>
          )}
          <Button
            as={Link}
            variant="secondary"
            size="small"
            to="/"
            onClick={logout}
          >
            Logout
          </Button>
        </nav>
      ) : (
        <nav className="flex gap-2 items-center">
          <Button as={Link} variant="ghost" size="small" to="/login">
            Login
          </Button>
          <Button as={Link} variant="primary" size="small" to="/signup">
            Sign Up
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Nav;
