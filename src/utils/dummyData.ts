import { v4 as uuidv4 } from 'uuid';

export const dummyDocuments = [
  {
    id: uuidv4(),
    name: 'Project Proposal',
    description: 'A comprehensive proposal for the new project',
    status: 'DRAFT',
    tags: ['proposal', 'project'],
    versions: [
      {
        id: uuidv4(),
        versionNumber: 1,
        content: 'Initial draft of the project proposal',
        createdAt: new Date('2024-03-01T10:00:00Z'),
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Meeting Minutes',
    description: 'Minutes from the weekly team meeting',
    status: 'PUBLISHED',
    tags: ['meeting', 'team'],
    versions: [
      {
        id: uuidv4(),
        versionNumber: 1,
        content: 'First version of meeting minutes',
        createdAt: new Date('2024-03-05T14:30:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Updated meeting minutes with action items',
        createdAt: new Date('2024-03-06T09:15:00Z'),
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Product Roadmap',
    description: 'Roadmap for product development over the next 12 months',
    status: 'PUBLISHED',
    tags: ['product', 'roadmap', 'planning'],
    versions: [
      {
        id: uuidv4(),
        versionNumber: 1,
        content: 'Initial roadmap draft',
        createdAt: new Date('2024-02-15T11:00:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Revised roadmap after stakeholder feedback',
        createdAt: new Date('2024-02-20T16:45:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 3,
        content: 'Final approved roadmap',
        createdAt: new Date('2024-02-25T13:30:00Z'),
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Financial Report Q1',
    description: 'Quarterly financial report for Q1 2024',
    status: 'IN_REVIEW',
    tags: ['finance', 'quarterly'],
    versions: [
      {
        id: uuidv4(),
        versionNumber: 1,
        content: 'Draft financial report for Q1',
        createdAt: new Date('2024-04-05T09:00:00Z'),
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Marketing Campaign Plan',
    description: 'Detailed plan for upcoming marketing campaign',
    status: 'APPROVED',
    tags: ['marketing', 'campaign'],
    versions: [
      {
        id: uuidv4(),
        versionNumber: 1,
        content: 'Initial campaign strategy',
        createdAt: new Date('2024-03-20T11:30:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Revised campaign plan with budget allocation',
        createdAt: new Date('2024-03-25T14:45:00Z'),
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Employee Handbook',
    description: 'Updated company policies and procedures',
    status: 'PUBLISHED',
    tags: ['HR', 'policy'],
    versions: [
      {
        id: uuidv4(),
        versionNumber: 1,
        content: 'Draft of updated employee handbook',
        createdAt: new Date('2024-02-10T13:00:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Final version of employee handbook',
        createdAt: new Date('2024-02-28T16:30:00Z'),
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Product Launch Presentation',
    description: 'Slides for upcoming product launch event',
    status: 'DRAFT',
    tags: ['product', 'presentation'],
    versions: [
      {
        id: uuidv4(),
        versionNumber: 1,
        content: 'Initial draft of product launch slides',
        createdAt: new Date('2024-04-10T10:15:00Z'),
      },
    ],
  },
];

export const dummyValidations = [
  {
    id: uuidv4(),
    documentId: uuidv4(),
    status: 'PENDING',
    createdAt: new Date('2024-03-10T09:00:00Z'),
    updatedAt: new Date('2024-03-10T09:00:00Z'),
    comment: 'Awaiting review by the legal team',
  },
  {
    id: uuidv4(),
    documentId: uuidv4(),
    status: 'APPROVED',
    createdAt: new Date('2024-03-08T14:30:00Z'),
    updatedAt: new Date('2024-03-09T10:15:00Z'),
    comment: 'Approved with minor revisions',
  },
  {
    id: uuidv4(),
    documentId: uuidv4(),
    status: 'REJECTED',
    createdAt: new Date('2024-03-05T11:45:00Z'),
    updatedAt: new Date('2024-03-07T16:20:00Z'),
    comment: 'Rejected due to incomplete information',
  },
  {
    id: uuidv4(),
    documentId: uuidv4(),
    status: 'PENDING',
    createdAt: new Date('2024-03-12T13:20:00Z'),
    updatedAt: new Date('2024-03-12T13:20:00Z'),
    comment: 'Requires additional stakeholder input',
  },
  {
    id: uuidv4(),
    documentId: uuidv4(),
    status: 'APPROVED',
    createdAt: new Date('2024-03-11T10:00:00Z'),
    updatedAt: new Date('2024-03-11T15:45:00Z'),
    comment: 'Approved without changes',
  },
];

export const dummyTags = [
  {
    id: uuidv4(),
    name: 'Urgent',
    color: '#FF4136',
  },
  {
    id: uuidv4(),
    name: 'Important',
    color: '#FF851B',
  },
  {
    id: uuidv4(),
    name: 'Low Priority',
    color: '#2ECC40',
  },
  {
    id: uuidv4(),
    name: 'In Progress',
    color: '#0074D9',
  },
  {
    id: uuidv4(),
    name: 'Completed',
    color: '#B10DC9',
  },
];
