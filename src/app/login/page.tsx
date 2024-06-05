"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "../hooks/auth";

type FieldType = {
  email: string;
  password: string;
  remember?: boolean;
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    import("next/router").then((NextRouter) => {
      setRouter(NextRouter.default);
    });
  }, []);

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      await login({
        email: values.email,
        password: values.password,
        remember: values.remember,
        setErrors: () => {},
        setStatus: () => {},
      });
      router.push("/dashboard");
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (!router) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div
        style={{
          backgroundColor: "#fff",
          padding: 40,
          borderRadius: 8,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: 500,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <h2
          className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900"
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontSize: 24,
          }}
        >
          Login to your account
        </h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ fontSize: 16 }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              style={{ fontSize: 16 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              style={{ fontSize: 16 }}
            />
          </Form.Item>
          <div className="flex items-center justify-between mt-4">
            <Form.Item name="remember">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Link href="/forgot-password">Forgot password?</Link>
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
