import ScrollToTop from '@/components/ScrollToTop'
import type { ChildrenType } from '@/types/component-props'
import { Suspense } from 'react'

const HomeLayout = ({ children }: ChildrenType) => {
  return (
    <>
      <Suspense fallback={<div />}>{children}</Suspense>

      <Suspense fallback={<div />}>
        <ScrollToTop />
      </Suspense>
    </>
  )
}

export default HomeLayout
