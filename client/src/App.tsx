import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Destinations from "@/pages/Destinations";
import DestinationDetail from "@/pages/DestinationDetail";
import Experiences from "@/pages/Experiences";
import ExperienceDetail from "@/pages/ExperienceDetail";
import Map from "@/pages/Map";
import Reviews from "@/pages/Reviews";
import About from "@/pages/About";
import Profile from "@/pages/Profile";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthPage from "@/pages/auth-page";
import Activation from "./pages/Activation";
import { useLoadUserQuery } from "./redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Loader } from "lucide-react";
import AdminDestinations from "./pages/admin-destinations";
import AdminBookings from "./pages/admin-bookings";

import AdminExperiences from "./pages/admin-experiences";
import AdminHiddengems from "./pages/admin-hiddengems";
import HiddengemDetail from "./pages/HiddengemDetails";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route path="/activation/:activation_token" component={Activation} />
          <Route path="/" component={Home} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/destinations/:id" component={DestinationDetail} />
          <Route path="/experiences" component={Experiences} />
          <Route path="/experiences/:id" component={ExperienceDetail} />
          <Route path="/hiddengem/:id" component={HiddengemDetail} />
          <Route path="/map" component={Map} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin/destinations" component={AdminDestinations} />
          <Route path="/admin/experiences" component={AdminExperiences} />
          <Route path="/admin/hiddengems" component={AdminHiddengems} />
          <Route path="/admin/bookings" component={AdminBookings} />

          
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { isLoading } = useLoadUserQuery({});
  const { user } = useSelector((state: RootState) => state.auth) as any;

  console.log("user", user);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
