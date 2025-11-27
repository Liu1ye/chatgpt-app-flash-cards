'use client'

import { useWidgetProps } from '@/app/hooks'
import FlashCards from './flash-cards'
import FlashCardsList from './flash-cards-list'

const WIDGETS: Record<string, React.ComponentType> = {
  'flash-cards': FlashCards,
  'flash-cards-list': FlashCardsList,
}

const DEFAULT_WIDGET = 'flash-cards'

const WidgetSelector = () => {
  const widgetProps = useWidgetProps<{ type?: string }>()

  const widgetType = widgetProps?.type || DEFAULT_WIDGET

  const WidgetComponent = WIDGETS[widgetType]

  if (!WidgetComponent) {
    return <></>
  }

  return <WidgetComponent />
}

export default WidgetSelector
