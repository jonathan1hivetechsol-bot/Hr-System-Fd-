export type PlanItem = {
  id: number
  name: string
  price: string
  duration: string
  features: Array<string>
  isRecommended: boolean
  isPopular?: boolean
}

export type PostType = {
  image: string
  tag: { variant?: string; value: string }
  title: string
  description?: string
  postedBy?: {
    avatar: string
    name: string
  }
  postedOn?: {
    date: string
    time: string
  }
  overlay?: string
  groupAvatars?: string[]
}
