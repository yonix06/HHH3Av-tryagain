// import { render, screen, fireEvent, waitFor } from '@testing-library/react'
// import { Api } from '@/core/trpc'
// import DocumentEditorPage from '@/app/(authenticated)/documents/[documentId]/edit/page'
//
// jest.mock('@/core/trpc', () => ({
//   Api: {
//     document: {
//       findUnique: {
//         useQuery: jest.fn(),
//       },
//       update: {
//         useMutation: jest.fn(),
//       },
//     },
//     documentVersion: {
//       create: {
//         useMutation: jest.fn(),
//       },
//     },
//     tag: {
//       findMany: {
//         useQuery: jest.fn(),
//       },
//     },
//   },
// }))
//
// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
//   useParams: jest.fn(),
// }))
//
// jest.mock('@/core/hooks/upload', () => ({
//   useUploadPublic: jest.fn(),
// }))
//
// describe('Document Versioning', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//   })
//
//   test('creates a new version when saving a document', async () => {
//     const mockDocument = {
//       id: 'doc1',
//       name: 'Test Document',
//       description: 'Test Description',
//       documentVersions: [],
//       documentTags: [],
//     }
//
//     Api.document.findUnique.useQuery.mockReturnValue({
//       data: mockDocument,
//       isLoading: false,
//     })
//
//     const mockCreateVersion = jest.fn().mockResolvedValue({ id: 'version1' })
//     Api.documentVersion.create.useMutation.mockReturnValue({
//       mutateAsync: mockCreateVersion,
//     })
//
//     const mockUpdateDocument = jest.fn().mockResolvedValue({ id: 'doc1' })
//     Api.document.update.useMutation.mockReturnValue({
//       mutateAsync: mockUpdateDocument,
//     })
//
//     const mockUpload = jest.fn().mockResolvedValue({ url: 'http://example.com/doc1/v1' })
//     require('@/core/hooks/upload').useUploadPublic.mockReturnValue({
//       mutateAsync: mockUpload,
//     })
//
//     render(<DocumentEditorPage />)
//
//     await waitFor(() => {
//       expect(screen.getByText('Document Editor')).toBeInTheDocument()
//     })
//
//     fireEvent.change(screen.getByPlaceholderText('Document Name'), {
//       target: { value: 'Updated Document Name' },
//     })
//
//     fireEvent.click(screen.getByText('Save'))
//
//     await waitFor(() => {
//       expect(mockCreateVersion).toHaveBeenCalledWith({
//         data: expect.objectContaining({
//           documentId: 'doc1',
//           url: 'http://example.com/doc1/v1',
//           versionNumber: 1,
//         }),
//       })
//     })
//   })
//
//   test('updates an existing version when editing a document', async () => {
//     const mockDocument = {
//       id: 'doc1',
//       name: 'Test Document',
//       description: 'Test Description',
//       documentVersions: [
//         { id: 'version1', versionNumber: 1, url: 'http://example.com/doc1/v1' },
//       ],
//       documentTags: [],
//     }
//
//     Api.document.findUnique.useQuery.mockReturnValue({
//       data: mockDocument,
//       isLoading: false,
//     })
//
//     const mockCreateVersion = jest.fn().mockResolvedValue({ id: 'version2' })
//     Api.documentVersion.create.useMutation.mockReturnValue({
//       mutateAsync: mockCreateVersion,
//     })
//
//     const mockUpdateDocument = jest.fn().mockResolvedValue({ id: 'doc1' })
//     Api.document.update.useMutation.mockReturnValue({
//       mutateAsync: mockUpdateDocument,
//     })
//
//     const mockUpload = jest.fn().mockResolvedValue({ url: 'http://example.com/doc1/v2' })
//     require('@/core/hooks/upload').useUploadPublic.mockReturnValue({
//       mutateAsync: mockUpload,
//     })
//
//     render(<DocumentEditorPage />)
//
//     await waitFor(() => {
//       expect(screen.getByText('Document Editor')).toBeInTheDocument()
//     })
//
//     fireEvent.change(screen.getByPlaceholderText('Document Name'), {
//       target: { value: 'Updated Document Name' },
//     })
//
//     fireEvent.click(screen.getByText('Save'))
//
//     await waitFor(() => {
//       expect(mockCreateVersion).toHaveBeenCalledWith({
//         data: expect.objectContaining({
//           documentId: 'doc1',
//           url: 'http://example.com/doc1/v2',
//           versionNumber: 2,
//         }),
//       })
//     })
//   })
//
//   test('ensures no NULL values exist in the url column', async () => {
//     const mockDocuments = [
//       {
//         id: 'doc1',
//         name: 'Test Document 1',
//         documentVersions: [
//           { id: 'version1', versionNumber: 1, url: 'http://example.com/doc1/v1' },
//         ],
//       },
//       {
//         id: 'doc2',
//         name: 'Test Document 2',
//         documentVersions: [
//           { id: 'version2', versionNumber: 1, url: 'http://example.com/doc2/v1' },
//         ],
//       },
//     ]
//
//     Api.document.findMany.useQuery.mockReturnValue({
//       data: mockDocuments,
//       isLoading: false,
//     })
//
//     render(<DocumentManagementPage />)
//
//     await waitFor(() => {
//       expect(screen.getByText('Document Management')).toBeInTheDocument()
//     })
//
//     const urlLinks = screen.getAllByText('View Document')
//     expect(urlLinks).toHaveLength(2)
//
//     urlLinks.forEach((link) => {
//       expect(link).toHaveAttribute('href')
//       expect(link.getAttribute('href')).not.toBeNull()
//     })
//   })
// })
//
