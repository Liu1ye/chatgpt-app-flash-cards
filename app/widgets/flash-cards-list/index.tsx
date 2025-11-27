import ListItem from './FlashCardsListItem'
import mockData from './mock.json'
import FlashCards from '../flash-cards'
import { useState } from 'react'
import { ArrowRightLgIcon, ArrowLeftLgIcon } from '@/app/assets/icons'
import GPTButton from '@/app/components/GptButton'
import { FlashCardData } from '../types'

const FlashCardsList = () => {
  const data = mockData.data

  const [currentFlashCards, setCurrentFlashCards] = useState<null | FlashCardData>(null)

  const handleClickItem = (fd: FlashCardData) => {
    setCurrentFlashCards(fd)
  }

  if (currentFlashCards) {
    return (
      <FlashCards
        isFromList
        flashCardsDataFromList={currentFlashCards}
        onClickBackToList={() => setCurrentFlashCards(null)}
      />
    )
  }

  return (
    <div className="flex flex-col w-full h-[475px] bg-bg-primary">
      <div className="p-[16px_10px_16px_16px]">
        <span className="text-text-primary text-[17px] font-[510]">My FlashCards</span>
        <span className="text-text-secondary text-[14px] font-[510]"> ({data.total})</span>
      </div>
      <div className="flex-1">
        {data.data.map((item: FlashCardData, index) => {
          return <ListItem onClick={handleClickItem} key={index} item={item} />
        })}
      </div>
      <div className="flex items-center justify-between p-[16px_10px_12px_12px] border-t-[1px] border-solid border-border-heavy">
        <div className="text-text-secondary text-[16px]"> 1 / 24 </div>
        <div className="flex gap-x-[]">
          <span className="px-3 py-2 cursor-pointer text-interactive-icon-tertiary-interactive">
            <GPTButton variant="text" icon={<ArrowLeftLgIcon />} />
          </span>
          <span className="px-3 py-2 cursor-pointer">
            <GPTButton variant="text" icon={<ArrowRightLgIcon />} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default FlashCardsList
