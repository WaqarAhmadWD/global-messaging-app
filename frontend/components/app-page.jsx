'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { MessageSquare, Github, Google } from 'lucide-react'

export function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      router.push('/chat')
    } else {
      alert('Please enter both email and password')
    }
  }

  return (
    (<div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 shadow-lg border-gray-700">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">Log in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
          </div>
          <Button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white">
            Log in
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-200 hover:bg-gray-700">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-200 hover:bg-gray-700">
              <Google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-400">
          <p>Don't have an account? <a href="#" className="text-green-500 hover:underline">Sign up</a></p>
        </CardFooter>
      </Card>
    </div>)
  );
}