import { authapi } from "@/api/authapi";
import type { createauth } from "@/types/auth";
import { create } from "zustand";

export const useAuth = create<createauth>((set) => ({
  username: null,
  useremail: null,
  userid: null,
  profileurl: null,
  session: null,
  bio : null,
  town : null,
  phone : null,
  
  loadingFetchUser: false,
  loadingLogin: false,
  sessionReady: false,
  loadingDiagramxlogin: false,
  loadingDiagramxsignup: false,

  diagramxlogin: async (useremail: string, userpassword: string) => {
    try {
      set({ loadingDiagramxlogin: true })
      const result = await authapi.diagramxlogin(useremail, userpassword);
      if (result.success) {
        localStorage.setItem("isLoggedIn", "true");
        return result.message;
      }
    }
    catch (err: unknown) {
      throw err;
    }
    finally {
      set({ loadingDiagramxlogin: false });
    }
  },
  diagramxsignup: async (username: string, useremail: string, userpassword: string) => {
    try {
      set({ loadingDiagramxsignup: true });
      const result = await authapi.diagramxsignup(username, useremail, userpassword);
      if (result.success) {
        return result.message
      }
    }
    catch (err: unknown) {
      throw err;
    }
    finally {
      set({ loadingDiagramxsignup: false })
    }
  },
  googlelogin: async (username: string, useremail: string, userid: string, profileurl: string) => {
    try {
      set({ loadingLogin: true });
      const result = await authapi.googlelogin(username, useremail, userid, profileurl);

      set({
        username,
        useremail,
        userid,
        profileurl,
        
        session: null,
        sessionReady: true,
      });

      return result;
    } catch (err: unknown) {
      throw err;
    } finally {
      set({ loadingLogin: false });
    }
  },
  fetchuser: async () => {
    try {
      set({ loadingFetchUser: true });
      const result = await authapi.fetchuser();
      if (result.success) {
        set({
          username: result.username,
          useremail: result.useremail,
          userid: result.userid,
          profileurl: result.profileurl,
          bio : result.bio,
          phone : result.phone,
          town : result.town,
          session: null,
        });
      } else {
        set({ session: result.message || "Session Expired. Please log in again!" });
      }
    } catch (err: unknown) {
      throw err;
    } finally {
      set({ loadingFetchUser: false, sessionReady: true });
    }
  },
  userlogout: async () => {
    try {
      const result = await authapi.logout();
      set({
        username: null,
        useremail: null,
        userid: null,
        profileurl: null,
        bio: null,
        phone: null,
        town: null,
        session: null,
        sessionReady: true,
      });
      return result;
    } catch (err: unknown) {
      throw err;
    }
  }
}));
