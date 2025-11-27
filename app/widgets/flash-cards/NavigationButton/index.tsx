'use client'

import { ArrowIcon } from '@/app/assets/icons'

interface NavigationButtonProps {
  direction: 'prev' | 'next'
  disabled?: boolean
  onClick: () => void
}

export const NavigationButton = ({
  direction,
  disabled = false,
  onClick,
}: NavigationButtonProps) => {
  const isPrev = direction === 'prev'
  const ariaLabel = isPrev ? 'Previous card' : 'Next card'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-bg-primary border border-border-default rounded-full p-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-interactive-bg-secondary-hover transition-colors"
      aria-label={ariaLabel}
    >
      <div className={isPrev ? 'transform scale-x-[-1]' : ''}>
        <ArrowIcon className="w-[24px] h-[24px] text-text-primary" />
      </div>
    </button>
  )
}
