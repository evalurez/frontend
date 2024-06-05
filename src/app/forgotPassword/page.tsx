"use client";
import { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";

const ForgotPasswordForm = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const onFinish = async (values: { email: string }) => {
    try {
      // Add your logic to send password reset link
      setStatus("success");
      message.success("Password reset link sent successfully!");
    } catch (error) {
      // Handle errors here
      setStatus("error");
      setErrors(["An error occurred. Please try again."]);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
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
          <div className="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </div>
          <div
            className={`mb-4 ${
              status === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status && <p>{status}</p>}
          </div>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input autoFocus />
            </Form.Item>
            {errors.length > 0 && (
              <div className="text-red-500 mt-2">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Email Password Reset Link
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
