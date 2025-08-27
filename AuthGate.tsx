'use client'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth, signInWithGoogle, signOutUser } from '@/lib/firebase'

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading) return <div className="p-6 text-center">Načítavam…</div>

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4 text-center">
          <h1 className="text-2xl font-bold">Prihlásenie</h1>
          <p className="text-gray-600">Pokračuj cez Google účet, aby si mohol vytvárať zmluvy.</p>
          <button onClick={signInWithGoogle} className="w-full rounded-md bg-black text-white p-2">
            Prihlásiť sa cez Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="p-3 flex justify-end">
        <button onClick={signOutUser} className="text-sm underline">Odhlásiť ({user.email})</button>
      </div>
      {children}
    </div>
  )
}
