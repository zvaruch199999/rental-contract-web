'use client'
import { useState } from 'react'
- import { db } from '@/lib/firebase'
+ import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import jsPDF from 'jspdf'

export default function ContractForm() {
  const [form, setForm] = useState({
    type: 'sublease',
    landlordName: '',
    landlordAddress: '',
    tenantName: '',
    tenantAddress: '',
    propertyAddress: '',
    rentPrice: '',
    startDate: '',
    endDate: '',
  })
  const [saving, setSaving] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      // 1) Ulož do Firestore
      const docRef = await addDoc(collection(db, 'contracts'), {
        ...form,
        rentPrice: Number(form.rentPrice || 0),
        createdAt: serverTimestamp(),
      })

      // 2) Vygeneruj jednoduché PDF na klientovi (náhľad)
      const pdf = new jsPDF()
      const lines = [
        form.type === 'sublease' ? 'Zmluva o podnájme' : 'Zmluva o nájme',
        '',
        `Prenajímateľ: ${form.landlordName}`,
        `Adresa prenajímateľa: ${form.landlordAddress}`,
        '',
        `Podnájomca/Nájomca: ${form.tenantName}`,
        `Adresa: ${form.tenantAddress}`,
        '',
        `Byt: ${form.propertyAddress}`,
        `Mesačné (${form.type === 'sublease' ? 'pod' : ''}nájomné): ${form.rentPrice} EUR`,
        `Trvanie: ${form.startDate} – ${form.endDate}`,
        '',
        `ID zmluvy: ${docRef.id}`,
      ]
      let y = 10
      lines.forEach((t) => {
        pdf.text(t, 10, y)
        y += 8
      })
      pdf.save(`${form.type}-contract-${docRef.id}.pdf`)
      alert('Zmluva uložená do Firestore a PDF vygenerované.')
    } catch (e) {
      console.error(e)
      alert('Ups, niečo sa pokazilo. Pozri konzolu.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded-md p-2">
        <option value="sublease">Podnájom</option>
        <option value="lease">Nájom</option>
      </select>
      <input className="w-full border rounded-md p-2" name="landlordName" placeholder="Meno prenajímateľa (hlavný nájomca)" value={form.landlordName} onChange={handleChange} required />
      <input className="w-full border rounded-md p-2" name="landlordAddress" placeholder="Adresa prenajímateľa" value={form.landlordAddress} onChange={handleChange} required />
      <input className="w-full border rounded-md p-2" name="tenantName" placeholder="Meno podnájomcu / nájomcu" value={form.tenantName} onChange={handleChange} required />
      <input className="w-full border rounded-md p-2" name="tenantAddress" placeholder="Adresa podnájomcu / nájomcu" value={form.tenantAddress} onChange={handleChange} required />
      <input className="w-full border rounded-md p-2" name="propertyAddress" placeholder="Adresa bytu" value={form.propertyAddress} onChange={handleChange} required />
      <input className="w-full border rounded-md p-2" name="rentPrice" placeholder="Mesačné (pod)nájomné (€)" value={form.rentPrice} onChange={handleChange} inputMode="decimal" required />
      <input className="w-full border rounded-md p-2" type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
      <input className="w-full border rounded-md p-2" type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
      <button disabled={saving} className="w-full rounded-md bg-black text-white p-2">{saving ? 'Ukladám…' : 'Uložiť a stiahnuť PDF'}</button>
    </form>
  )
}
