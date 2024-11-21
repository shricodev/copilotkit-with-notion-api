export type TErrResponse = {
  success: false
  error: Error
}

export type TRow = {
  id: string
  properties: {
    name: { id: string; title: { text: { content: string } }[] }
    meet_link: { id: string; url: string }
    dueDate?: {
      id: string
      type: 'date'
      date?: { start: string; end: string }
    }
  }
}

export type TRowDetails = {
  id: string
  name: string
  meet_link: string
  dueDate: {
    start: string
    end: string
  }
}
