"use client";
import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "../hooks/auth";

const { Text } = Typography;

interface RegisterpageProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [form] = Form.useForm();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const onFinish = async (values: any) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirm_password,
        setErrors: () => {},
      });
    } catch (error) {
      console.error(error);
    }
  };

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
          Register on our website
        </h2>
        <Form
          form={form}
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          {/* Error messages */}
          {errors &&
            Object.keys(errors).map((key) => (
              <Text key={key} type="danger">
                {errors[key].join(", ")}
              </Text>
            ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Register
            </Button>
          </Form.Item>
        </Form>
        <div
          className="text-center text-gray-500 mt-4"
          style={{ fontSize: "18px" }}
        >
          - OR -
        </div>
        <Link
          className="block text-center text-blue-500 hover:underline "
          href="/login"
          style={{ fontSize: "18px" }}
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
