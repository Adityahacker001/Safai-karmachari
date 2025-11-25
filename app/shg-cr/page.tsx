'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ShgCrPage() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginUserId, setLoginUserId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Registration fields
  const [shgName, setShgName] = useState('')
  const [leaderName, setLeaderName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [stateName, setStateName] = useState('')
  const [members, setMembers] = useState<number | ''>('')
  const [bankDetails, setBankDetails] = useState('')
  const [idFile, setIdFile] = useState<File | null>(null)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault()
    setLoginError('')
    // Demo verification: accept any non-empty credentials
    if (!loginUserId || !loginPassword) {
      setLoginError('Please enter User ID and Password')
      return
    }
    // Here you would call an API to verify credentials. For now accept any non-empty.
    setLoggedIn(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0]
    if (f) setIdFile(f)
  }

  const handleRegister = (e?: React.FormEvent) => {
    e?.preventDefault()
    // basic validation
    if (!shgName || !leaderName || !phone) {
      setSubmitMessage('Please fill required fields (SHG Name, Leader Name, Phone)')
      return
    }
    // Normally submit to API here. We'll just show a success message.
    setSubmitMessage('Registration submitted — thank you. (Demo)')
    // Optionally navigate or reset form
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8">
        {!loggedIn ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">SHG Login</h2>
            <div>
              <Label>User ID</Label>
              <Input value={loginUserId} onChange={(e) => setLoginUserId(e.target.value)} placeholder="Enter User ID" />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter Password" />
            </div>
            {loginError && <div className="text-sm text-red-600">{loginError}</div>}
            <div>
              <Button
                type="submit"
                className="relative overflow-hidden group bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 hover:from-yellow-500 hover:to-blue-700 text-white font-bold px-8 py-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/40 border-2 border-white/30"
              >
                <span className="absolute top-0 left-[-150%] w-3/4 h-full bg-white/30 transform -skew-x-20 transition-all duration-700 ease-in-out group-hover:left-[150%]" />
                <span className="relative z-10">Login</span>
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">SHG Registration</h2>

            <div>
              <Label>SHG Name</Label>
              <Input value={shgName} onChange={(e) => setShgName(e.target.value)} placeholder="Enter SHG Name" />
            </div>

            <div>
              <Label>Leader Name</Label>
              <Input value={leaderName} onChange={(e) => setLeaderName(e.target.value)} placeholder="Leader Name" />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
            </div>

            <div>
              <Label>Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>District / City</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="District or City" />
              </div>
              <div>
                <Label>State</Label>
                <Input value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder="State" />
              </div>
            </div>

            <div>
              <Label>Number of Members</Label>
              <Input type="number" value={members as any} onChange={(e) => setMembers(e.target.value ? Number(e.target.value) : '')} placeholder="Number of Members" />
            </div>

            <div>
              <Label>Bank Account Details</Label>
              <Input value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} placeholder="Bank Account / IFSC" />
            </div>

            <div>
              <Label>Upload ID Proof</Label>
              <input type="file" onChange={handleFileChange} className="mt-2" />
              {idFile && <div className="text-sm text-gray-700 mt-2">Selected: {idFile.name}</div>}
            </div>

            {submitMessage && <div className="text-sm text-green-700">{submitMessage}</div>}

            <div className="flex items-center space-x-3">
              <Button
                type="submit"
                className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-600/50 border-2 border-white/20"
              >
                <span className="absolute top-0 left-[-150%] w-3/4 h-full bg-white/20 transform -skew-x-20 transition-all duration-700 ease-in-out group-hover:left-[150%]" />
                <span className="relative z-10">Submit</span>
              </Button>

              <Button type="button" variant="ghost" onClick={() => setLoggedIn(false)}>
                Back to Login
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
