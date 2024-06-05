"use client";
import { useAuth } from "../hooks/auth";
import { Button } from "antd";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Call the logout function from useAuth
    logout();
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
