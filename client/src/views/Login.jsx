import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { SetPageTitle } from '/Utils.jsx'

function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    SetPageTitle({ title: "Login" })
  }, [])

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const checkLoginUser = async () => {
    if (!loginUser.email || !loginUser.password) {
      toast.error("Please fill all fields")
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        loginUser
      )

      if (response.data.success) {
        toast.success(response.data.message || "Login Successful")

        const { token, data } = response.data
        localStorage.setItem("JwtToken", token)
        localStorage.setItem("userData", JSON.stringify(data))

        setLoginUser({ email: "", password: "" })

        setTimeout(() => {
          navigate("/dashboard")
        }, 1200)
      } else {
        toast.error(response.data.message || "Invalid email or password")
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      )
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="mt-10 text-center">
        <h1 className="text-4xl font-bold text-[#0F172A]">Welcome Back</h1>
        <p className="text-sm text-gray-500 mt-1">
          Login to continue your journey
        </p>
      </div>

      <div className="flex flex-col gap-4 w-[90%] md:w-[420px] border border-[#CBD5E1] rounded-xl shadow-xl mx-auto mt-10 p-6 bg-white">

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={loginUser.email}
            onChange={(e) =>
              setLoginUser({ ...loginUser, email: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={loginUser.password}
            onChange={(e) =>
              setLoginUser({ ...loginUser, password: e.target.value })
            }
          />
        </div>

        <Button
          title={loading ? "Logging in..." : "Login"}
          variant="primary"
          size="md"
          disabled={loading}
          onClick={checkLoginUser}
        />

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signUp" className="text-blue-700 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      <Toaster />
    </div>
  )
}

export default Login