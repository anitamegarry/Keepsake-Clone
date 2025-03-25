import { render, screen, fireEvent } from '@testing-library/react'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/node'
import App from './App'
 
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('Entering an empty username returns an error message', () => {
    render(<App />)


})

test('Entering in the correct username and password logs you in', () => {
    render(<App />)
    
})