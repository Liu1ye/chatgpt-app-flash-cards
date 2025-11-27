import Image from 'next/image'
import GPTButton from '@/app/components/GptButton'
import { FlashCardIcon } from '@/app/assets/icons'
import { FlashCardData } from '../../types'

const ListItem = (props: { item: FlashCardData; onClick: (qd: FlashCardData) => void }) => {
  const { item, onClick } = props
  return (
    <div className="py-3 px-4 flex items-center justify-between border-b-[1px] border-solid border-border-light cursor-pointer">
      <div className="w-[48px] h-[48px] rounded-[12px] bg-assistive-blue-bg flex-center">
        <FlashCardIcon size={24} />
      </div>
      <div className="flex flex-col gap-x-1 mr-auto pl-[12px]">
        <p className="text-text-primary text-[16px] font-[510]">{item.title}</p>
        <p className="text-text-secondary text-[14px]">{item.createAt}</p>
      </div>
      <GPTButton onClick={() => onClick(item!)} variant="secondary">
        View
      </GPTButton>
    </div>
  )
}

export default ListItem
