import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/node'
import App from './App'
 
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Functions for tests

function logInToAccount() {
    // renders app and logs into a test account
    render(<App />)
    const usernameInput = screen.getByTestId("username")
    const passwordInput =  screen.getByTestId("password")
    const loginButton = screen.getByTestId("login")

    fireEvent.change(usernameInput, {
        target: {
            value: "Test user 1"
        }
    })
    fireEvent.change(passwordInput, {
        target: {
            value: "password"
        }
    })
    fireEvent.click(loginButton)

}

function createNewNote() {
    const addNote = screen.getByTestId("add-note")
    fireEvent.click(addNote)
    const title = screen.getByTestId("title")
    const content = screen.getByTestId("content")

    fireEvent.change(title, {
        target: {
            value: "To do:"
        }
    })
    fireEvent.change(content, {
        target: {
            value: "Finish testing"
        }
    })
}

// TESTS

test('Initial page render displays the expected key text', () => {
    render(<App />)
    screen.getByText(/keepsake/i)
    screen.getByText(/add note/i)
    screen.getAllByText(/log in/i)
    screen.getByText(/log out/i)
    screen.getByText(/sign up/i)
    screen.getByRole("img", {name: "logo"})
})

test('Entering in the correct username and password logs you in', async () => {

    logInToAccount()
    
    await waitFor(() => {expect(screen.getByText(/welcome, test user 1!/i)).toBeInTheDocument();
  });
});



test('Adding a note should result in the note being added to the board', async () => {
    
    logInToAccount()

    createNewNote()

    const submitButton = screen.getByTestId("submit")
    fireEvent.click(submitButton)

    // checking that the new note has been rendered to the board

    await waitFor(() => {
        expect(screen.getByText(/To do:/i)).toBeInTheDocument();
        expect(screen.getByText(/Finish testing/i)).toBeInTheDocument();})

});


test('Custom label can be added to a note', async () => {

    logInToAccount()

    createNewNote()

    const addLabelButton = screen.getByTestId("add-labels")
    fireEvent.click(addLabelButton)

    const customLabel = screen.getByTestId("custom-label-input")
    fireEvent.change(customLabel, {
        target: {
            value: "Test Label 123"
        }
    })
    fireEvent.keyDown(customLabel, {key: 'Enter', code: 'Enter', charCode: 13})

    await waitFor(() => {
        expect(screen.getByText(/Test Label 123/i)).toBeInTheDocument();})

})