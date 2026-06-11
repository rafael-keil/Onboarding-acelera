import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Onboarding Acelera',
  description: 'Boa sorte! Você pode editar a config de titulo e e descrição.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" translate="no">
      <body>{children}</body>
    </html>
  )
}
