'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ShgCrPage() {
  const router = useRouter()

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
  const [idNumberManual, setIdNumberManual] = useState('')
  const [nameOnId, setNameOnId] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0]
    if (f) setIdFile(f)
  }

  const handleRegister = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!shgName || !leaderName || !phone) {
      setSubmitMessage('Please fill required fields (SHG Name, Leader Name, Phone)')
      return
    }
    setSubmitMessage('Registration submitted — thank you. (Demo)')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#476EAE_0%,#48B3AF_40%,#A7E399_70%,#F6FF99_100%)] p-4 relative overflow-hidden">
      {/* Animated pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10" />

      {/* Floating Background Blobs (unchanged) */}
      <div
        className="absolute left-[-80px] top-12 w-[420px] h-[420px] bg-no-repeat bg-contain opacity-[0.07] blur-[2px] grayscale animate-[float_6s_ease-in-out_infinite] z-0"
        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><g fill='white'><path d='M32 4c-8 0-14 4-16 12 2 2 2 6 2 6s2 6 14 6 14-6 14-6 0-4 2-6c-2-8-8-12-16-12z'/></g></svg>")` }}
      />
      <div
        className="absolute right-[80px] top-[60px] w-[360px] h-[360px] bg-no-repeat bg-contain opacity-[0.16] blur-[40px] grayscale animate-[float_6s_ease-in-out_infinite] z-[-1]"
        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><g fill='%23C8E6FF' fill-opacity='0.16'><path d='M32 4c-8 0-14 4-16 12 2 2 2 6 2 6s2 6 14 6 14-6 14-6 0-4 2-6c-2-8-8-12-16-12z'/></g></svg>")` }}
      />
      <div
        className="absolute right-[-60px] top-32 w-[420px] h-[420px] bg-no-repeat bg-contain opacity-[0.16] blur-[40px] grayscale animate-[float_7s_ease-in-out_infinite] z-0"
        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><g fill='%2348B3AF'><path d='M32 4c-8 0-14 4-16 12 2 2 2 6 2 6s2 6 14 6 14-6 14-6 0-4 2-6c-2-8-8-12-16-12z'/></g></svg>")` }}
      />
      <div
        className="absolute left-[-100px] bottom-8 w-[300px] h-[300px] bg-no-repeat bg-contain opacity-[0.06] blur-[2px] grayscale animate-[float_5s_ease-in-out_infinite] z-0"
        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><g fill='white'><path d='M50 10l-2 36c0 2-2 4-4 4H20c-2 0-4-2-4-4L14 10h36z'/></g></svg>")` }}
      />
      <div
        className="absolute right-[-140px] bottom-20 w-[300px] h-[300px] bg-no-repeat bg-contain opacity-[0.14] blur-[40px] grayscale animate-[float_8s_ease-in-out_infinite] z-0"
        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><g fill='%2348B3AF'><path d='M32 4c-8 0-14 4-16 12 2 2 2 6 2 6s2 6 14 6 14-6 14-6 0-4 2-6c-2-8-8-12-16-12z'/></g></svg>")` }}
      />

      {/* Main Container: Dynamic width for horizontal layout on registration */}
      <div className="w-full max-w-[1100px] mx-auto bg-white/60 backdrop-blur-xl border border-white/70 rounded-3xl shadow-xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
        {/* Registration form shown by default (login removed) */}
        <form onSubmit={handleRegister} className="h-full flex flex-col">
            {/* Compact Header */}
            <div className="text-center mb-4 pb-3 border-b-2 border-[#31694E]/20">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#31694E] mb-1">SHG REGISTRATION</h2>
              <p className="text-xs md:text-sm text-[#658C58] font-medium">Complete Your Profile Below</p>
            </div>

            {/* Three-Column Grid - Compact & Attractive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
              
              {/* COLUMN 1: Basic Info */}
              <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/40 shadow-md hover:shadow-lg transition-all flex flex-col">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#31694E]/20 flex items-center justify-center mb-2">
                    <span className="text-[#31694E] font-bold text-sm">1</span>
                  </div>
                  <h3 className="text-center text-sm md:text-base font-bold text-[#31694E] tracking-wide uppercase mb-1">Basic Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">SHG Name <span className="text-red-600 ml-1">*</span></Label>
                    <Input 
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all" 
                      value={shgName} 
                      onChange={(e) => setShgName(e.target.value)} 
                      placeholder="Enter SHG Name" 
                    />
                  </div>
                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">Leader Name <span className="text-red-600 ml-1">*</span></Label>
                    <Input 
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all" 
                      value={leaderName} 
                      onChange={(e) => setLeaderName(e.target.value)} 
                      placeholder="Leader Name" 
                    />
                  </div>
                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">Phone Number <span className="text-red-600 ml-1">*</span></Label>
                    <Input 
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="Contact Number" 
                    />
                  </div>

                     <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">Email <span className="text-red-600 ml-1">*</span></Label>
                    <Input 
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all" 
                      value={leaderName} 
                      onChange={(e) => setLeaderName(e.target.value)} 
                      placeholder="Email" 
                    />
                  </div>
                </div>
              </div>

              {/* COLUMN 2: Location Details */}
              <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/40 shadow-md hover:shadow-lg transition-all flex flex-col h-full">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#31694E]/20 flex items-center justify-center mb-2">
                    <span className="text-[#31694E] font-bold text-sm">2</span>
                  </div>
                  <h3 className="text-center text-sm md:text-base font-bold text-[#31694E] tracking-wide uppercase mb-1">Location Details</h3>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">Address <span className="text-red-600 ml-1">*</span></Label>
                    <Input 
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      placeholder="Street Address" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">City/District <span className="text-red-600 ml-1">*</span></Label>
                      <Input 
                        required
                        className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        placeholder="City" 
                      />
                    </div>
                    <div>
                      <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">State <span className="text-red-600 ml-1">*</span></Label>
                      <Input 
                        required
                        className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all" 
                        value={stateName} 
                        onChange={(e) => setStateName(e.target.value)} 
                        placeholder="State" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMN 3: Additional Details */}
              <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/40 shadow-md hover:shadow-lg transition-all flex flex-col h-full">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#31694E]/20 flex items-center justify-center mb-2">
                    <span className="text-[#31694E] font-bold text-sm">3</span>
                  </div>
                  <h3 className="text-center text-sm md:text-base font-bold text-[#31694E] tracking-wide uppercase mb-1">Bank & Details</h3>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">Members <span className="text-red-600 ml-1">*</span></Label>
                    <Input
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all"
                      type="number"
                      value={members as any}
                      onChange={(e) => setMembers(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Count"
                    />
                  </div>

                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">Name on ID <span className="text-red-600 ml-1">*</span></Label>
                    <Input
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all"
                      value={nameOnId}
                      onChange={(e) => setNameOnId(e.target.value)}
                      placeholder="Name as printed on ID"
                    />
                  </div>

                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">Bank Account <span className="text-red-600 ml-1">*</span></Label>
                    <Input
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all"
                      value={bankDetails}
                      onChange={(e) => setBankDetails(e.target.value)}
                      placeholder="Account / IFSC"
                    />
                  </div>

                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">ID Number (manual) <span className="text-red-600 ml-1">*</span></Label>
                    <Input
                      required
                      className="w-full bg-white/80 text-gray-800 border border-gray-300 rounded-lg py-3 px-3 text-sm md:text-sm focus:ring-2 focus:ring-[#31694E] focus:border-[#31694E] transition-all"
                      value={idNumberManual}
                      onChange={(e) => setIdNumberManual(e.target.value)}
                      placeholder="Enter ID Number"
                    />
                  </div>

                  <div>
                    <Label className="text-[#31694E] font-semibold text-xs md:text-sm mb-2 block">Upload ID Proof <span className="text-red-600 ml-1">*</span></Label>
                    <input
                      required
                      type="file"
                      onChange={handleFileChange}
                      className="block w-full text-xs md:text-sm text-gray-800 bg-white/80 border border-gray-300 rounded-lg py-3 px-3 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#31694E]/10 file:text-[#31694E] file:font-semibold hover:file:bg-[#31694E]/20 transition-all"
                    />
                    {idFile && <div className="text-xs text-[#31694E] mt-1.5 bg-white/60 rounded px-2 py-1 truncate">✓ {idFile.name}</div>}
                  </div>
                </div>
              </div>
              
              {/* Buttons row spanning all columns */}
              <div className="col-span-1 md:col-span-3 flex items-center justify-center gap-6 mt-6">
                {submitMessage && (
                  <div className="text-sm text-center text-[#31694E] bg-white/40 border border-[#31694E]/30 rounded-lg px-4 py-2 mb-0 font-medium col-span-3">
                    {submitMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  className="relative overflow-hidden group bg-gradient-to-r from-[#31694E] to-[#658C58] text-white font-bold tracking-wide px-10 py-2.5 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                  <span className="absolute top-0 left-[-150%] w-3/4 h-full bg-white/20 transform -skew-x-12 transition-all duration-700 ease-in-out group-hover:left-[150%]" />
                  <span className="relative z-10">Submit Registration</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="text-[#31694E] bg-white/50 hover:bg-white/70 border-2 border-[#31694E]/40 px-6 py-2.5 rounded-xl font-semibold transition-all"
                  onClick={() => router.push('/')}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </form>
        
      </div>
    </div>
  )
}