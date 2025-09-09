import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Robot from "./pages/Robot";
//import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Outreach from "./pages/Outreach";
import Sponsor from "./pages/Sponsor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle redirects from 404.html
const RedirectHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== window.location.href) {
      // Extract the path from the full URL
      const url = new URL(redirect);
      const path = url.pathname || '/';
      navigate(path, { replace: true });
    }
  }, [navigate]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/robot" element={<Robot />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="/sponsor" element={<Sponsor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
