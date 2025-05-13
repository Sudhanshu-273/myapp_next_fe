'use client'

import { useRouter } from 'next/navigation'

export function useCustomRouter() {
  const router = useRouter()

  return {
    back: () => router.back(),
    forward: () => window.history.forward(),  // no built-in forward() in next/router
    reload: () => router.refresh(),
    push: (href) => router.push(href),
    replace: (href) => router.replace(href),
  }
}
