import KeyForm from '@/components/KeyForm'
import LinkvertiseRedirect from '@/components/LinkvertiseRedirect'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Roblox Key System</h1>
      <LinkvertiseRedirect />
      <KeyForm />
    </main>
  )
}

