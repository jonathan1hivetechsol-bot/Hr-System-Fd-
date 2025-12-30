import Aos from 'aos'
import { Suspense, useEffect, type ReactNode } from 'react'

const DefaultLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  useEffect(() => {
    Aos.init()
  }, [])

  return <Suspense>{children}</Suspense>
}

export default DefaultLayout
