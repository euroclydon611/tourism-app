import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuIcon, Bell, User, Key, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth) as any;

  const [logout, { data, isSuccess, isLoading, error }] = useLogoutMutation();

  const logOutHandler = async (e: any) => {
    e.preventDefault();
    try {
      await logout({});
    } catch (error) {
      toast.error("Logout failed. Please try again later.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      try {
        toast.success(data?.message, { duration: 5000 });
        navigate("/employee");
      } catch (error) {
        console.log(error);
      }
    }
  }, [isSuccess, error]);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-4 py-3 lg:px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-4 text-gray-500 lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Link
              to={"/employee-portal"}
              className="w-[40px] h-[10px] flex items-center mr-4"
            >
              <img src="/images/jodi-logo-no-bg.png" alt="log" />
            </Link>
            <span className="text-primary-600 text-2xl font-bold">
              StaffPortal
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 p-1"
              >
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  <span>{user?.name?.[0] || "?"}</span>
                </div>
                <span className="hidden md:inline-block text-sm font-medium">
                  {user ? `${user.name} ` : user?.username}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <Link to="/employee-portal/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/employee-portal/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Key className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/employee-portal/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={logOutHandler}
                disabled={isLoading}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
