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
        content: 'Initial draft of the project proposal. This version outlines the basic project goals, timeline, and resource requirements.',
        createdAt: new Date('2024-03-01T10:00:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Revised project proposal with updated budget estimates and refined scope based on initial feedback.',
        createdAt: new Date('2024-03-05T14:30:00Z'),
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
        content: 'First version of meeting minutes. Includes attendees, main discussion points, and initial action items.',
        createdAt: new Date('2024-03-05T14:30:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Updated meeting minutes with detailed action items, assigned responsibilities, and deadlines.',
        createdAt: new Date('2024-03-06T09:15:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 3,
        content: 'Final version of meeting minutes with additional notes on follow-up tasks and next meeting agenda items.',
        createdAt: new Date('2024-03-07T11:00:00Z'),
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
        content: 'Initial roadmap draft outlining key features and rough timeline for the next 12 months.',
        createdAt: new Date('2024-02-15T11:00:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Revised roadmap after stakeholder feedback, including adjusted priorities and more detailed milestone descriptions.',
        createdAt: new Date('2024-02-20T16:45:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 3,
        content: 'Final approved roadmap with comprehensive feature list, development phases, and resource allocation plans.',
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
        content: 'Draft financial report for Q1 including preliminary revenue figures, expense breakdown, and profit margins.',
        createdAt: new Date('2024-04-05T09:00:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Updated Q1 financial report with revised figures and additional analysis on key performance indicators.',
        createdAt: new Date('2024-04-10T14:30:00Z'),
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
        content: 'Initial campaign strategy outlining target audience, key messages, and proposed marketing channels.',
        createdAt: new Date('2024-03-20T11:30:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Revised campaign plan with detailed budget allocation, timeline, and expected ROI for each marketing activity.',
        createdAt: new Date('2024-03-25T14:45:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 3,
        content: 'Final approved marketing campaign plan including creative briefs, media buying strategy, and success metrics.',
        createdAt: new Date('2024-03-28T10:00:00Z'),
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
        content: 'Draft of updated employee handbook with revised company policies and new sections on remote work guidelines.',
        createdAt: new Date('2024-02-10T13:00:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Revised employee handbook incorporating feedback from department heads and legal review.',
        createdAt: new Date('2024-02-20T11:30:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 3,
        content: 'Final version of employee handbook with updated code of conduct, benefits information, and company culture section.',
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
        content: 'Initial draft of product launch slides covering key features, target market, and go-to-market strategy.',
        createdAt: new Date('2024-04-10T10:15:00Z'),
      },
      {
        id: uuidv4(),
        versionNumber: 2,
        content: 'Updated presentation with refined messaging, competitive analysis, and pricing strategy slides.',
        createdAt: new Date('2024-04-15T14:00:00Z'),
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
