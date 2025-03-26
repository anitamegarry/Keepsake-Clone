import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/node'
import App from './App'
 
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// TESTS

test('Initial page render displays the expected key text', () => {
    render(<App />)
    screen.getByText(/keepsake/i)
    screen.getByText(/add note/i)
    screen.getAllByText(/log in/i)
    screen.getByText(/sign up/i)
    screen.getByRole("img", {name: "logo"})
})


test('Entering in the correct username and password logs you in', async () => {
    // renders app and logs into a test account
    render(<App />)

    const usernameInput = screen.getAllByPlaceholderText("Username")[0]
    const passwordInput =  screen.getAllByPlaceholderText("Password")[0]
    const loginButton = screen.getByRole("button", {name: "Log In"})

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

    
    await waitFor(() => {expect(screen.getByText(/welcome, test user 1!/i)).toBeInTheDocument();
  });
});



test('Adding a note should result in the note being added to the board', async () => {
    
    // renders app and logs into a test account
    render(<App />)

    const usernameInput = screen.getAllByPlaceholderText("Username")[0]
    const passwordInput =  screen.getAllByPlaceholderText("Password")[0]
    const loginButton = screen.getByRole("button", {name: "Log In"})

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

    // adding a new note

    const addNoteButton = screen.getByRole("button", {name: "Add Note"})
    fireEvent.click(addNoteButton)

    const title = screen.getByPlaceholderText("Title")
    const content = screen.getByPlaceholderText("Take a note...")

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

    const submitButton = screen.getByRole("button", {name: "Submit"})
    fireEvent.click(submitButton)

    // checking that the new note has been rendered to the board

    await waitFor(() => {
        expect(screen.getByText(/To do:/i)).toBeInTheDocument();
        expect(screen.getByText(/Finish testing/i)).toBeInTheDocument();})

});


test('Custom label can be added to a note', async () => {

    // renders app and logs into a test account
    render(<App />)

    const usernameInput = screen.getAllByPlaceholderText("Username")[0]
    const passwordInput =  screen.getAllByPlaceholderText("Password")[0]
    const loginButton = screen.getByRole("button", {name: "Log In"})

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

    // adding note

    const addNoteButton = screen.getByRole("button", {name: "Add Note"})
    fireEvent.click(addNoteButton)

    const title = screen.getByPlaceholderText("Title")
    const content = screen.getByPlaceholderText("Take a note...")

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

    // adding new custom label

    const addLabelButton = screen.getByRole("button", {name: "Add labels"})
    fireEvent.click(addLabelButton)

    const customLabel = screen.getByLabelText("Custom label:")
    fireEvent.change(customLabel, {
        target: {
            value: "Test Label 123"
        }
    })
    fireEvent.keyDown(customLabel, {key: 'Enter', code: 'Enter', charCode: 13})

    await waitFor(() => {
        expect(screen.getByText(/Test Label 123/i)).toBeInTheDocument();})

})