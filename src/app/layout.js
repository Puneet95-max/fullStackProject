import { Inter } from "next/font/google";
import "./globals.css";
import ProjectDetailsContextProvider from "@/contexts/ProjectDetailsContext";
import StaffDetailsContextProvider from "@/contexts/StaffDetailsContext";
import ProtectedRoute from "@/ProtectedRoutes/ProtectedRoutes";
import UserDetailsContextProvider from "@/contexts/UserDetailsContext";
import RolesAndPermissionContextProvider  from "@/contexts/RolesAndPermissioContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin console",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ProtectedRoute>
        <RolesAndPermissionContextProvider>
          <UserDetailsContextProvider>
            <StaffDetailsContextProvider>
              <ProjectDetailsContextProvider>
                <body className={inter.className}>{children}</body>
              </ProjectDetailsContextProvider>
            </StaffDetailsContextProvider>
          </UserDetailsContextProvider>
        </RolesAndPermissionContextProvider>
      </ProtectedRoute>
    </html>
  );
}
