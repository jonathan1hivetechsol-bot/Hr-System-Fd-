import avatar1 from '@/assets/images/avatars/img-1.jpg'
import avatar2 from '@/assets/images/avatars/img-2.jpg'
import sass1 from '@/assets/images/hero/saas1.jpg'
import sass2 from '@/assets/images/hero/saas2.jpg'
import sass3 from '@/assets/images/hero/saas3.jpg'
import type { PlanItem, PricingType } from './types'

export type Testimonials = {
  name: string
  position: string
  description: string
  image: string
}

export type FeatureType = {
  avatar: string
  title: string
  description: string
  variant: string
  containerClass: string
}

export type AuthSwiperType = {
  title: string
  description: string
  image: string
}

type AccordionData = {
  title: string
  description: string
}

type FooterLink = {
  [title: string]: {
    links: string[]
  }
}

const testimonials: Testimonials[] = [
  {
    name: 'John Stark',
    position: 'Engineering Director',
    description:
      'Have been working with CSS for over ten years and Bootstrap just makes my life easier. It is still CSS and you use flex, grid, etc. but just quicker to write and maintain.',
    image: avatar1,
  },
  {
    name: 'Cersei Lannister',
    position: 'Senior Project Manager',
    description:
      'I was bad at front-end until I discovered with Bootstrap CSS. I have learnt a lot more about design and CSS itself after I started working with Bootstrap. Creating web pages is 5x faster now.',
    image: avatar2,
  },
  {
    name: 'John Stark',
    position: 'Engineering Director',
    description:
      'Have been working with CSS for over ten years and Bootstrap just makes my life easier. It is still CSS and you use flex, grid, etc. but just quicker to write and maintain.',
    image: avatar1,
  },
  {
    name: 'Cersei Lannister',
    position: 'Senior Project Manager',
    description:
      'I was bad at front-end until I discovered with Bootstrap CSS. I have learnt a lot more about design and CSS itself after I started working with Bootstrap. Creating web pages is 5x faster now.',
    image: avatar2,
  },
]

const feedbackTestimonials: Testimonials[] = [
  {
    name: 'John Stark',
    position: 'Engineering Director',
    description:
      'It is one of the very convenient to use project manager ever! I have tried many project management apps for my daily tasks, but this one is far better than others. Simply loved it!',
    image: avatar1,
  },
  {
    name: 'Cersei Lannister',
    position: 'Senior Project Manager',
    description:
      'This app is a truly blessing for all professionals! A day to day project management was never easy for me. But with prompt, I can manage more than 100 projects easily.',
    image: avatar2,
  },
]

const FAQContent: AccordionData[] = [
  {
    title: ' Can I use this template for my client?',
    description:
      ' Yup, the marketplace license allows you to use this theme in any end products. For more information on licenses, please refere license terms on marketplace. ',
  },
  {
    title: ' Can this theme work with WordPress?',
    description: " No. This is a HTML template. It won't directly with WordPress, though you can convert this into WordPress compatible theme. ",
  },
  {
    title: ' How do I get help with the theme?',
    description: ' Use our dedicated support email (support@coderthemes.com) to send your issues or feedback. We are here to help anytime. ',
  },
  {
    title: ' Will you regularly give updates of Prompt ?',
    description: ' Yes, We will update the Prompt regularly. All the future updates would be available without any cost. ',
  },
]

const plans: PlanItem[] = [
  {
    id: 1,
    name: 'Starter',
    price: '49',
    duration: '/ month',
    features: ['Up to 600 minutes usage time', 'Use for personal only', 'Add up to 10 attendees', 'Technical support via email'],
    isRecommended: false,
  },
  {
    id: 2,
    name: 'Professional',
    price: '99',
    duration: '/ month',
    features: [
      'Up to 6000 minutes usage time',
      'Use for personal or a commercial client',
      'Add up to 100 attendees',
      'Up to 5 teams',
      'Technical support via email',
    ],
    isPopular: true,
    isRecommended: true,
  },
  {
    id: 3,
    name: 'Enterprise',
    price: '599',
    duration: '/ month',
    features: [
      'Unlimited usage time',
      'Use for personal or a commercial client',
      'Add Unlimited attendees',
      '24x7 Technical support via phone',
      'Technical support via email',
    ],
    isRecommended: false,
  },
]

const pricingCards: PricingType[] = [
  {
    name: 'Starter',
    duration: 500,
    price: '49',
    features: ['Up to 600 minutes usage time', 'Use for personal only', 'Add up to 10 attendees', 'Technical support via email', 'Up to 5 teams'],
  },
  {
    name: 'Professional',
    duration: 700,
    price: '99',
    features: [
      'Up to 6000 minutes usage time',
      'Use for personal or a commercial',
      'Add up to 100 attendees',
      'Up to 5 teams',
      'Technical support via email',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    duration: 900,
    price: '599',
    features: [
      'Unlimited usage time',
      'Use for personal or a commercial',
      'Add Unlimited attendees',
      '24x7 Technical support via phone',
      'Technical support via email',
    ],
  },
]

const footerLinks: FooterLink = {
  Platform: {
    links: ['Demo', 'Pricing', 'Integrations', 'Status'],
  },
  'Knowledge Base': {
    links: ['Blog', 'Help Center', 'Sales Tools catalog', 'API'],
  },
  Company: {
    links: ['About us', 'Career', 'Contact Us'],
  },
  Legal: {
    links: ['Usage Policy', 'Privacy Policy', 'Terms of Service', 'Trust'],
  },
}

const features: FeatureType[] = [
  {
    avatar: 'fe:users',
    title: 'Improve Employee Experience',
    description: 'Before we dive into why companies must invest in employee experience (EX), it’s important to understand what this concept entails.',
    variant: 'primary',
    containerClass: 'd-flex border-bottom pb-4',
  },
  {
    avatar: 'fe:user-plus',
    title: 'Hiring & Onboarding',
    description: 'Post your job, interview candidates and make offers, all on Prompt. Start hiring today.',
    variant: 'success',
    containerClass: 'd-flex border-bottom py-4',
  },
  {
    avatar: 'fe:bar-chart',
    title: 'People Data & Analytics',
    description: 'Finding committed employees is one of public and private organizations’ top priorities.',
    variant: 'orange',
    containerClass: 'd-flex pt-4',
  },
]

const authSwiperSlides: AuthSwiperType[] = [
  {
    title: 'Manage your saas business with ease',
    description: 'Make your saas application stand out with high-quality landing page designed and developed by professional.',
    image: sass1,
  },
  {
    title: 'The best way to showcase your mobile app',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
    image: sass2,
  },
  {
    title: 'Smart Solution that convert Lead to Customer',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
    image: sass3,
  },
]

export { authSwiperSlides, FAQContent, features, feedbackTestimonials, footerLinks, plans, pricingCards, testimonials }
