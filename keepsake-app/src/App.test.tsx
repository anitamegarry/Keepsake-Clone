import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/node'
import App from './App'
 
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Entering in the correct username and password logs you in', async () => {

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
    
    await waitFor(() => {expect(screen.getByText(/welcome, test user 1!/i)).toBeInTheDocument();
  });
});



test('Adding a note should result in the note being added to the board', async () => {
    render(<App />)

    // logging into account
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

    // adding a note to the account 

    const addNote = screen.getByTestId("add-note")
    fireEvent.click(addNote)
    const title = screen.getByTestId("title")
    const content = screen.getByTestId("content")
    const submitButton = screen.getByTestId("submit")
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
    fireEvent.click(submitButton)

    // checking that the note has rendered to the board (not implemented functionality yet)
    // to be continued...

    await waitFor(() => {
        expect(screen.getByText(/To do:/i)).toBeInTheDocument();
        expect(screen.getByText(/Finish testing:/i)).toBeInTheDocument();})


});