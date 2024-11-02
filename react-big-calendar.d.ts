declare module 'react-big-calendar' {
    import { ComponentType } from 'react'

    export const Calendar: ComponentType<any>
    export const momentLocalizer: any

    export interface CalendarProps {
        localizer: any
        events: any[]
        onEventDrop?: (args: any) => void
        onSelectSlot?: (slotInfo: { start: Date; end: Date; slots: Date[] | string[] }) => void
        selectable?: boolean
        resizable?: boolean
        defaultView?: string
        views?: string[]
    }
}

declare module 'react-big-calendar/lib/addons/dragAndDrop' {
    import { ComponentType } from 'react'

    const withDragAndDrop: (calendar: ComponentType<any>) => ComponentType<any>
    export default withDragAndDrop
}