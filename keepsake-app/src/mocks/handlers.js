import { http, HttpResponse } from 'msw'
 
const allNotes = new Map()
const allUsernames = new Map()
const allLabels = new Map()

export const handlers = [

  http.get('http://localhost:3000/notes', () => {

    return HttpResponse.json([{
    "noteID": 1,
    "userID": 1,
    "title": "Test groceries",
    "content": [
      "apples",
      "eggs",
      "pasta"
    ],
    "category": "shopping list",
    "labels": [
      1
    ],
    "isChecklist": true,
    "id": "0202"
  },
  {
    "userID": 1,
    "title": "Test meeting Notes",
    "content": "Discuss marketing strategy and finalise budget allocations.",
    "category": "work",
    "labels": [
      2,
      3
    ],
    "isChecklist": false,
    "id": "5fef"
  },
  {
    "userID": 2,
    "title": "Test home Repairs",
    "content": [
      "Fix leaky tap",
      "Paint living room",
      "Replace broken tile"
    ],
    "category": "household",
    "labels": [
      4
    ],
    "isChecklist": true,
    "id": "51e4"
  },
  {
    "userID": 2,
    "title": "Test book Recommendations",
    "content": "Check out 'Atomic Habits' and 'Deep Work' for productivity tips.",
    "category": "personal growth",
    "labels": [
      5,
      6
    ],
    "isChecklist": false,
    "id": "bf40"
  },
  {
    "userID": 3,
    "title": "Test weekend Plans",
    "content": [
      "Hiking trip",
      "Try new sushi place",
      "Movie night"
    ],
    "category": "leisure",
    "labels": [
      7
    ],
    "isChecklist": true,
    "id": "b4f8"
  },
  {
    "userID": 3,
    "title": "Test project Ideas",
    "content": "Brainstorm app ideas for personal finance tracking.",
    "category": "work",
    "labels": [
      8
    ],
    "isChecklist": false,
    "id": "8e94"
  }])
  }),


  http.get('http://localhost:3000/usernames', () => {
    return HttpResponse.json([
    {
      "userID": 1,
      "username": "Test user 1",
      "password": "password",
      "id": "feb6"
    },
    {
      "userID": 2,
      "username": "Test user 2",
      "password": "12345",
      "id": "d5c5"
    },
    {
      "userID": 3,
      "username": "Test user 3",
      "password": "abcde",
      "id": "ef3a"
    }
  ])
  }),

  http.get('http://localhost:3000/labels', () => {

    return HttpResponse.json([
    {
      "userIDs": ["d5c5"],
      "noteIDs": ["0202"],
      "labelName": "Shopping",
      "id": "8526"
    },
    {
      "userIDs": ["feb6"],
      "noteIDs": ["0202"],
      "labelName": "Work",
      "id": "89f4"
    },
    {
      "userIDs": ["feb6"],
      "noteIDs": [""],
      "labelName": "Budgeting",
      "id": "bcff"
    },
    {
      "userIDs": ["feb6"],
      "noteIDs": [""],
      "labelName": "Household",
      "id": "70d6"
    },
    {
      "userIDs": ["d5c5"],
      "noteIDs": [""],
      "labelName": "Books",
      "id": "e7c6"
    },
    {
      "userIDs": ["d5c5", "feb6"],
      "noteIDs": [""],
      "labelName": "Productivity",
      "id": "1da0"
    },
    {
      "userIDs": [],
      "noteIDs": [""],
      "labelName": "Leisure",
      "id": "6b14"
    },
    {
      "userIDs": [],
      "noteIDs": [""],
      "labelName": "Finance",
      "id": "8bbe"
    }
  ])
  }),

  http.post('http://localhost:3000/notes', async ({ request }) => {

    const newNote = await request.json()
 
    allNotes.set(newNote.id, newNote)

    return HttpResponse.json(newNote, { status: 201 })
  }),
  
  http.post('http://localhost:3000/usernames', async ({ request }) => {

    const newUsername = await request.json()
 
    allUsernames.set(newUsername.id, newUsername)

    return HttpResponse.json(newUsername, { status: 201 })
  }),

  http.post('http://localhost:3000/labels', async ({ request }) => {

    const newLabel = await request.json()
 
    allLabels.set(newLabel.id, newLabel)

    return HttpResponse.json(newLabel, { status: 201 })
  })
]

