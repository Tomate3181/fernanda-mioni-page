import { cn } from './cn'

export default function Container({ className, children, size = 'default' }) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', size === 'narrow' ? 'max-w-5xl' : 'max-w-7xl', className)}>
      {children}
    </div>
  )
}
