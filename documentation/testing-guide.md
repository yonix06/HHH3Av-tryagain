# Testing Guide

## 1. Project Structure

This project is a NextJS application using React with TypeScript. The main components of the project structure are:

- `/src/app`: Contains the main application code
  - `/(authenticated)`: Pages for authenticated users
  - `/(non-authenticated)`: Public pages
- `/src/core`: Core functionality and utilities
- `/src/designSystem`: Reusable UI components
- `/__tests__`: Directory for test files

## 2. Steps to Run Tests

1. Ensure you have all dependencies installed:
   ```
   pnpm install
   ```

2. Run the test suite:
   ```
   pnpm test
   ```

3. For running specific tests:
   ```
   pnpm test -- -t "test name"
   ```

## 3. Writing Tests

- Create test files in the `__tests__` folder within the relevant feature directory.
- Name your test files with the `.test.tsx` or `.test.ts` extension.
- Use Jest and React Testing Library for writing tests.

Example test file structure:
```
/src/app/(authenticated)/documents/__tests__/document-versioning.test.tsx
```

## 4. Testing API Calls

We use tRPC for API calls. Here's how to test them:

1. Mock the API calls using Jest:

```typescript
jest.mock('@/core/trpc', () => ({
  Api: {
    document: {
      create: {
        useMutation: jest.fn(),
      },
      findUnique: {
        useQuery: jest.fn(),
      },
      // ... other API methods
    },
  },
}))
```

2. Set up mock implementations in your tests:

```typescript
const mockCreateDocument = jest.fn().mockResolvedValue({ id: 'doc1' })
Api.document.create.useMutation.mockReturnValue({ mutateAsync: mockCreateDocument })
```

3. Test the component that uses the API:

```typescript
render(<YourComponent />)
fireEvent.click(screen.getByText('Create Document'))
await waitFor(() => {
  expect(mockCreateDocument).toHaveBeenCalled()
})
```

## 5. Common Troubleshooting Tips

- If tests are failing due to API errors, check your API setup and ensure all environment variables are correctly set.
- For "Jest encountered an unexpected token" errors, verify that your babel configuration is correct and all necessary plugins are installed.
- If you're getting timeout errors, consider increasing the timeout limit in your test files or Jest configuration.

## 6. VS Code Extensions

To enhance your testing experience, install the following recommended VS Code extensions:

1. Jest Runner: Allows you to run and debug Jest tests from within VS Code.
2. ESLint: Helps maintain code quality and consistency.
3. Prettier: Ensures consistent code formatting.
4. TypeScript Hero: Helps manage imports and provides additional TypeScript tooling.

To install these extensions, open VS Code, go to the Extensions view (Ctrl+Shift+X), and search for each extension by name.

## 7. Best Practices

- Write tests for both success and failure scenarios.
- Use meaningful test descriptions that explain the expected behavior.
- Keep tests isolated and avoid dependencies between tests.
- Use setup and teardown functions (`beforeEach`, `afterEach`) to maintain a clean test environment.
- Mock external dependencies and API calls to ensure consistent test results.

Remember to keep your tests up to date as you make changes to your application code.
