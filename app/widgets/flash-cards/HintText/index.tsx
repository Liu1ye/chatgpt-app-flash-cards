'use client'

import { useTranslation } from 'react-i18next'

interface HintTextProps {
  show: boolean
}

export const HintText = ({ show }: HintTextProps) => {
  const { t } = useTranslation()
  return (
    <div className="box-border flex gap-2 items-center pb-4 pt-6 px-4 shrink-0">
      <div className="flex-1">
        <p
          className={`${show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-400 text-[14px] leading-[18px] tracking-[-0.3px] text-text-inverted-static text-center font-normal drop-shadow-[0px_1px_2.5px_rgba(0,0,0,0.1)]`}
        >
          {t('card.tip')}
        </p>
      </div>
    </div>
  )
}
