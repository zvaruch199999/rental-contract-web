import AuthGate from '@/components/AuthGate'
import ContractForm from '@/components/ContractForm'

export default function Page() {
  return (
    <AuthGate>
      <main className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6 space-y-4">
          <h1 className="text-2xl font-bold">Generovanie zmluvy</h1>
          <p className="text-sm text-gray-600">Prototyp – prihlásenie cez Google, uloženie do Firestore, PDF sa stiahne na zariadenie.</p>
          <ContractForm />
        </div>
      </main>
    </AuthGate>
  )
}
