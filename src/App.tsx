import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./auth/login";
import { Signup } from "./auth/signup";
import "./index.css"
import { MainPage } from "./pages/mainpage/mainpage";
import { Chatbot } from "./pages/mainpage/chatbot";
import { Blog } from "./pages/mainpage/blog";
import { Contact } from "./pages/mainpage/contact";
import { Protectedroute } from "./routes/protectedroute";
import { Publicroute } from "./routes/publicroute";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Sidebarrender } from "./pages/dashboard/sidebar";
import { QueryClientProvider } from "@tanstack/react-query";
import { State } from "./config/tanstackquery";
import { Workspace } from "./pages/dashboard/workspace";
import { useAuth } from "./store/authstore";
import { useEffect } from "react";
import { Error } from "./error/error";
import { Workspacemenu } from "./pages/dashboard/workspacemenu";
import { Profile } from "./pages/dashboard/profile";

function App() {

  const { userid, fetchuser } = useAuth();

  useEffect(() => {
    fetchuser();
  }, [])


  return (
    <QueryClientProvider client={State}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatbot />}>
            <Route index element={<MainPage />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route element={<Protectedroute />} >
            <Route path="/dashboard" element={<Sidebarrender />} >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="workspace" element={<Workspacemenu />} />
              <Route path="workspace/:workspaceid" element={<Workspace />} />
            </Route>
          </Route>
          <Route element={<Publicroute />} >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App
