import { Link, useLocation, useSearchParams } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Loader2,
  Settings,
  LogOut,
  MapPin,
  Sparkles,
  BookDashedIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

export default function Sidebar({ className }: { className?: string }) {
  const location = useLocation();

  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth) as any;

  const [
    logout,
    { data: logoutData, isSuccess, isLoading: loggingOut, error },
  ] = useLogoutMutation();

  const imgUrl = user?.avatar;

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
        toast.success(logoutData?.message, { duration: 5000 });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  }, [isSuccess, error]);

  const navItems = [
    {
      path: "/admin/destinations",
      label: "Destination",
      icon: <MapPin className="w-5 h-5 mr-2" />,
    },
    {
      path: "/admin/experiences",
      label: "Experiences",
      icon: <Sparkles className="w-5 h-5 mr-2" />,
    },
    {
      path: "/admin/hiddengems",
      label: "Hidden Gems",
      icon: <Sparkles className="w-5 h-5 mr-2" />,
    },
    {
      path: "/admin/bookings",
      label: "Bookings",
      icon: <BookDashedIcon className="w-5 h-5 mr-2" />,
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <aside
      className={cn(
        "sidebar w-64 bg-white border-r border-gray-200 flex-shrink-0",
        className
      )}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col items-center">
            {false ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-gray-500">Loading profile...</p>
              </div>
            ) : user ? (
              <>
                {imgUrl ? (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md flex-shrink-0">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/${imgUrl}`}
                      alt="Employee Photo"
                      className="w-full h-full rounded-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full avatar-placeholder mb-2">
                    <span className="text-xl">{user.name[0]}</span>
                  </div>
                )}

                <h3 className="font-medium text-center">{user.name}</h3>
              </>
            ) : (
              <p className="text-sm text-gray-500">Profile not available</p>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item: any) => {
              // Skip items that should be conditionally shown
              if (item.show === false) return null;

              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <a
                      className={cn(
                        "flex items-center px-4 py-2 text-sm font-medium",
                        location.pathname === item.path
                          ? "text-primary-600 bg-primary-50"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center"
            onClick={logOutHandler}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
