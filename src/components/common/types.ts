export type PlanItem = {
  id: number
  name: string
  price: string
  duration: string
  features: Array<string>
  isRecommended: boolean
  isPopular?: boolean
}

export type PricingType = {
  name: string
  duration: number
  price: string
  features: string[]
  isPopular?: boolean
}
