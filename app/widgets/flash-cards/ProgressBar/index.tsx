'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CircleIcon } from '@/app/assets/icons'
import { cn } from '@/app/lib/cn'
import { useIsMobile } from '@/app/hooks'

interface ProgressBarProps {
  current: number
  total: number
  progress: number
  onReset: () => void
}

export const ProgressBar = ({ current, total, progress, onReset }: ProgressBarProps) => {
  const { t } = useTranslation()
  const { isMobile } = useIsMobile()

  return (
    <div className="box-border flex gap-2 items-center p-4 shrink-0">
      <div className="flex-1 flex gap-4 items-center justify-center">
        {/* Refresh button */}
        <div className="flex gap-2 items-center">
          <button
            onClick={onReset}
            className="bg-interactive-bg-secondary-default rounded-lg px-3 py-2 w-10 flex items-center justify-center hover:bg-interactive-bg-secondary-hover transition-colors"
            aria-label="Reset deck"
          >
            <CircleIcon className="text-icon-inverted-static" />
          </button>
        </div>

        {/* Progress bar */}
        <div
          className={cn(
            'bg-utility-scrollbar rounded-[999px] w-[180px] max-w-[480px] h-[6px] overflow-hidden',
            {
              hidden: isMobile,
              block: !isMobile,
            }
          )}
        >
          <motion.div
            className="bg-icon-inverted-static h-full rounded-[999px]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Card counter */}
        <div className="flex gap-2 items-center pr-[10px]">
          <p className="text-[12px] leading-[16px] tracking-[-0.1px] text-text-inverted-static text-center font-semibold drop-shadow-[0px_1px_2.5px_rgba(0,0,0,0.1)]">
            {current} / {total} cards
          </p>
        </div>
      </div>
    </div>
  )
}
