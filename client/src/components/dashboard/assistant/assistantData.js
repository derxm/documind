/**
 * Demonstration data for the AI Assistant Interface.
 * All conversations, messages, and document references are static samples.
 * No backend, no localStorage — session-only state.
 */

// ---------------------------------------------------------------------------
// Timestamps helpers (relative to "now" so groupings stay sensible)
// ---------------------------------------------------------------------------
const now = Date.now();
const daysAgo = (d, h = 10, m = 0) =>
  now - d * 86_400_000 - h * 3_600_000 - m * 60_000;

// ---------------------------------------------------------------------------
// Demonstration documents (mirrors documentsData.js — no duplication of data
// file, just the fields the assistant needs)
// ---------------------------------------------------------------------------
export const assistantDocuments = [
  {
    id: 'doc-1',
    name: 'Computer Science Notes',
    fileName: 'Computer Science Notes.pdf',
    type: 'PDF',
    size: '3.4 MB',
  },
  {
    id: 'doc-2',
    name: 'Database Management',
    fileName: 'Database Management.docx',
    type: 'DOCX',
    size: '1.8 MB',
  },
  {
    id: 'doc-3',
    name: 'Software Engineering',
    fileName: 'Software Engineering.pdf',
    type: 'PDF',
    size: '4.2 MB',
  },
  {
    id: 'doc-4',
    name: 'Operating Systems',
    fileName: 'Operating Systems.pdf',
    type: 'PDF',
    size: '2.9 MB',
  },
  {
    id: 'doc-5',
    name: 'Introduction to Algorithms',
    fileName: 'Introduction to Algorithms.pdf',
    type: 'PDF',
    size: '5.1 MB',
  },
  {
    id: 'doc-6',
    name: 'Web Development Guide',
    fileName: 'Web Development Guide.docx',
    type: 'DOCX',
    size: '2.3 MB',
  },
];

// ---------------------------------------------------------------------------
// AI response content blocks
// Structured content instead of raw markdown — rendered by AiContentRenderer.
// Each block has a `type`: heading | paragraph | bullet-list | numbered-list | paragraph-bold
// ---------------------------------------------------------------------------

const csNotesSummaryResponse = [
  {
    type: 'paragraph',
    text: 'Here is a summary of the key themes covered in Computer Science Notes:',
  },
  {
    type: 'heading',
    text: 'Core Topics',
  },
  {
    type: 'bullet-list',
    items: [
      'Data structures: arrays, linked lists, stacks, queues, trees, and graphs.',
      'Algorithm complexity analysis using Big-O notation.',
      'Sorting algorithms: bubble, merge, quicksort, and heap sort.',
      'Memory management and pointer arithmetic.',
    ],
  },
  {
    type: 'heading',
    text: 'Key Takeaway',
  },
  {
    type: 'paragraph',
    text: 'The document emphasises that choosing the right data structure is often more impactful on performance than micro-optimising algorithm code.',
  },
  {
    type: 'paragraph',
    text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
  },
];

const csNotesStudyQuestionsResponse = [
  {
    type: 'paragraph',
    text: 'Based on the document content, here are five study questions to test your understanding:',
  },
  {
    type: 'numbered-list',
    items: [
      'What is the time complexity of binary search, and under what conditions does it apply?',
      'Explain the difference between a stack and a queue with a real-world analogy.',
      'When would you choose a hash table over a balanced BST?',
      'Describe how merge sort achieves O(n log n) complexity.',
      'What problem does dynamic programming solve that plain recursion cannot solve efficiently?',
    ],
  },
  {
    type: 'paragraph',
    text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
  },
];

const dbManagementSummaryResponse = [
  {
    type: 'paragraph',
    text: 'Database Management covers relational database theory and practical SQL skills:',
  },
  {
    type: 'heading',
    text: 'Relational Model',
  },
  {
    type: 'bullet-list',
    items: [
      'Tables (relations), rows (tuples), and columns (attributes).',
      'Primary keys, foreign keys, and referential integrity constraints.',
      'Normal forms: 1NF, 2NF, 3NF, and BCNF to reduce data redundancy.',
    ],
  },
  {
    type: 'heading',
    text: 'SQL Essentials',
  },
  {
    type: 'bullet-list',
    items: [
      'SELECT, JOIN, GROUP BY, HAVING, and subqueries.',
      'Transactions: COMMIT, ROLLBACK, and isolation levels.',
      'Indexing strategies for query performance optimisation.',
    ],
  },
  {
    type: 'paragraph',
    text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
  },
];

const dbKeyPointsResponse = [
  {
    type: 'paragraph',
    text: 'The five most important concepts from Database Management:',
  },
  {
    type: 'numbered-list',
    items: [
      'Normalisation reduces redundancy and prevents update anomalies.',
      'ACID properties (Atomicity, Consistency, Isolation, Durability) guarantee reliable transactions.',
      'Query optimisation relies heavily on proper index selection.',
      'The CAP theorem defines trade-offs in distributed database systems.',
      'Stored procedures and triggers shift business logic closer to the data layer.',
    ],
  },
  {
    type: 'paragraph',
    text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
  },
];

const algorithmsSummaryResponse = [
  {
    type: 'paragraph',
    text: 'Introduction to Algorithms is a comprehensive reference covering foundational algorithm design techniques:',
  },
  {
    type: 'heading',
    text: 'Design Paradigms',
  },
  {
    type: 'bullet-list',
    items: [
      'Divide and conquer: break a problem into smaller subproblems.',
      'Greedy algorithms: make locally optimal choices at each step.',
      'Dynamic programming: store solutions to overlapping subproblems.',
      'Backtracking: explore all possibilities and prune dead ends.',
    ],
  },
  {
    type: 'heading',
    text: 'Graph Algorithms',
  },
  {
    type: 'bullet-list',
    items: [
      "Breadth-first and depth-first search.",
      "Dijkstra's shortest-path algorithm.",
      "Minimum spanning trees via Kruskal's and Prim's.",
    ],
  },
  {
    type: 'paragraph',
    text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
  },
];

// ---------------------------------------------------------------------------
// Demonstration conversations
// ---------------------------------------------------------------------------
export const initialConversations = [
  // --- Today ---
  {
    id: 'conv-1',
    title: 'CS Notes Summary',
    documentId: 'doc-1',
    createdAt: daysAgo(0, 2, 15),
    updatedAt: daysAgo(0, 1, 50),
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        text: 'Summarise my document.',
        timestamp: daysAgo(0, 2, 15),
      },
      {
        id: 'msg-1-2',
        role: 'ai',
        content: csNotesSummaryResponse,
        timestamp: daysAgo(0, 2, 14),
      },
      {
        id: 'msg-1-3',
        role: 'user',
        text: 'Generate study questions from this document.',
        timestamp: daysAgo(0, 1, 55),
      },
      {
        id: 'msg-1-4',
        role: 'ai',
        content: csNotesStudyQuestionsResponse,
        timestamp: daysAgo(0, 1, 50),
      },
    ],
  },

  // --- Today ---
  {
    id: 'conv-2',
    title: 'Database Key Points',
    documentId: 'doc-2',
    createdAt: daysAgo(0, 5, 0),
    updatedAt: daysAgo(0, 4, 30),
    messages: [
      {
        id: 'msg-2-1',
        role: 'user',
        text: 'Extract the key points from this document.',
        timestamp: daysAgo(0, 5, 0),
      },
      {
        id: 'msg-2-2',
        role: 'ai',
        content: dbKeyPointsResponse,
        timestamp: daysAgo(0, 4, 59),
      },
      {
        id: 'msg-2-3',
        role: 'user',
        text: 'Can you explain what ACID properties mean in simple terms?',
        timestamp: daysAgo(0, 4, 45),
      },
      {
        id: 'msg-2-4',
        role: 'ai',
        content: [
          {
            type: 'paragraph',
            text: 'ACID stands for four guarantees that keep your data safe during a transaction:',
          },
          {
            type: 'numbered-list',
            items: [
              'Atomicity — the entire transaction either succeeds completely or fails completely. No partial updates.',
              'Consistency — the database moves from one valid state to another. No rules are broken.',
              'Isolation — concurrent transactions do not interfere with each other, as if they ran one at a time.',
              'Durability — once committed, your data survives crashes, power cuts, and restarts.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Think of it like a bank transfer: either both the debit and the credit happen, or neither does.',
          },
          {
            type: 'paragraph',
            text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
          },
        ],
        timestamp: daysAgo(0, 4, 44),
      },
    ],
  },

  // --- Yesterday ---
  {
    id: 'conv-3',
    title: 'Algorithms Deep Dive',
    documentId: 'doc-5',
    createdAt: daysAgo(1, 9, 0),
    updatedAt: daysAgo(1, 8, 20),
    messages: [
      {
        id: 'msg-3-1',
        role: 'user',
        text: 'Summarise my document.',
        timestamp: daysAgo(1, 9, 0),
      },
      {
        id: 'msg-3-2',
        role: 'ai',
        content: algorithmsSummaryResponse,
        timestamp: daysAgo(1, 8, 59),
      },
      {
        id: 'msg-3-3',
        role: 'user',
        text: 'Explain dynamic programming in simple terms.',
        timestamp: daysAgo(1, 8, 25),
      },
      {
        id: 'msg-3-4',
        role: 'ai',
        content: [
          {
            type: 'paragraph',
            text: 'Dynamic programming (DP) is a technique for solving problems by breaking them into overlapping subproblems and storing each result so it is never recalculated.',
          },
          {
            type: 'heading',
            text: 'Simple Analogy',
          },
          {
            type: 'paragraph',
            text: 'Imagine calculating Fibonacci numbers. Without DP, fib(10) recalculates fib(5) dozens of times. With DP, you calculate fib(5) once, store it, and look it up instantly every other time.',
          },
          {
            type: 'heading',
            text: 'Two Approaches',
          },
          {
            type: 'bullet-list',
            items: [
              'Top-down (memoisation): Recursive solution + a cache to store results.',
              'Bottom-up (tabulation): Iterative solution that fills a table from the smallest subproblem up.',
            ],
          },
          {
            type: 'paragraph',
            text: 'DP is ideal when a problem has optimal substructure and overlapping subproblems — classic examples include the knapsack problem, longest common subsequence, and shortest paths.',
          },
          {
            type: 'paragraph',
            text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
          },
        ],
        timestamp: daysAgo(1, 8, 20),
      },
    ],
  },

  // --- Previous 7 Days ---
  {
    id: 'conv-4',
    title: 'DB Management Summary',
    documentId: 'doc-2',
    createdAt: daysAgo(3, 14, 0),
    updatedAt: daysAgo(3, 13, 30),
    messages: [
      {
        id: 'msg-4-1',
        role: 'user',
        text: 'Summarise my document.',
        timestamp: daysAgo(3, 14, 0),
      },
      {
        id: 'msg-4-2',
        role: 'ai',
        content: dbManagementSummaryResponse,
        timestamp: daysAgo(3, 13, 59),
      },
    ],
  },

  // --- Previous 7 Days ---
  {
    id: 'conv-5',
    title: 'Software Engineering Overview',
    documentId: 'doc-3',
    createdAt: daysAgo(5, 11, 0),
    updatedAt: daysAgo(5, 10, 10),
    messages: [
      {
        id: 'msg-5-1',
        role: 'user',
        text: 'Summarise my document.',
        timestamp: daysAgo(5, 11, 0),
      },
      {
        id: 'msg-5-2',
        role: 'ai',
        content: [
          {
            type: 'paragraph',
            text: 'Software Engineering covers the systematic design, development, and maintenance of large-scale software systems.',
          },
          {
            type: 'heading',
            text: 'Development Lifecycle',
          },
          {
            type: 'bullet-list',
            items: [
              'Requirements analysis and specification.',
              'Architecture and system design.',
              'Implementation and unit testing.',
              'Integration, verification, and deployment.',
              'Maintenance and iterative improvement.',
            ],
          },
          {
            type: 'heading',
            text: 'Key Methodologies',
          },
          {
            type: 'bullet-list',
            items: [
              'Agile and Scrum for iterative delivery.',
              'Test-driven development (TDD).',
              'Continuous integration and continuous delivery (CI/CD).',
              'Design patterns: MVC, Observer, Factory, Singleton.',
            ],
          },
          {
            type: 'paragraph',
            text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
          },
        ],
        timestamp: daysAgo(5, 10, 59),
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Suggested prompts shown on the welcome / empty state screen
// ---------------------------------------------------------------------------
export const suggestedPrompts = [
  {
    id: 'sp-1',
    label: 'Summarise my document.',
    icon: 'sparkles',
  },
  {
    id: 'sp-2',
    label: 'Explain this topic in simple terms.',
    icon: 'lightbulb',
  },
  {
    id: 'sp-3',
    label: 'Generate study questions.',
    icon: 'graduation',
  },
  {
    id: 'sp-4',
    label: 'Extract the key points.',
    icon: 'list',
  },
];

// ---------------------------------------------------------------------------
// Simulated AI response generator
// Returns a structured content array appropriate for the user's message.
// ---------------------------------------------------------------------------
export function generateDemoResponse(userText, documentId) {
  const lower = userText.toLowerCase();
  const doc = assistantDocuments.find((d) => d.id === documentId);
  const docName = doc ? doc.name : 'your document';

  if (lower.includes('summarise') || lower.includes('summarize') || lower.includes('summary')) {
    return [
      {
        type: 'paragraph',
        text: `Here is a high-level summary of "${docName}":`,
      },
      {
        type: 'heading',
        text: 'Overview',
      },
      {
        type: 'paragraph',
        text: `"${docName}" covers the foundational concepts, methodologies, and practical techniques relevant to its subject domain. The document is structured to build understanding progressively, from core definitions through to applied examples.`,
      },
      {
        type: 'heading',
        text: 'Main Themes',
      },
      {
        type: 'bullet-list',
        items: [
          'Core theoretical principles and definitions.',
          'Practical application techniques with worked examples.',
          'Common challenges and recommended approaches to address them.',
          'Further reading and reference material.',
        ],
      },
      {
        type: 'paragraph',
        text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
      },
    ];
  }

  if (lower.includes('study question') || lower.includes('quiz') || lower.includes('test me')) {
    return [
      {
        type: 'paragraph',
        text: `Here are five study questions based on "${docName}":`,
      },
      {
        type: 'numbered-list',
        items: [
          'What is the primary purpose of the core concept introduced in Chapter 1?',
          'How does the document distinguish between the two main methodologies it covers?',
          'Give an example of how the techniques described could be applied in a real-world scenario.',
          'What are the trade-offs associated with the approach recommended in the document?',
          'How would you explain the main argument of this document to someone with no background in the subject?',
        ],
      },
      {
        type: 'paragraph',
        text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
      },
    ];
  }

  if (lower.includes('key point') || lower.includes('extract') || lower.includes('important')) {
    return [
      {
        type: 'paragraph',
        text: `The five most important points from "${docName}":`,
      },
      {
        type: 'numbered-list',
        items: [
          'The document establishes clear definitions for its central concepts early on.',
          'It presents a structured methodology that can be applied step-by-step.',
          'Real-world examples are used to illustrate abstract ideas.',
          'Common pitfalls and how to avoid them are explicitly addressed.',
          'The conclusion synthesises the material and points toward further study.',
        ],
      },
      {
        type: 'paragraph',
        text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
      },
    ];
  }

  if (lower.includes('simple') || lower.includes('explain') || lower.includes('what is') || lower.includes('what are')) {
    return [
      {
        type: 'paragraph',
        text: `Here is a plain-language explanation based on "${docName}":`,
      },
      {
        type: 'paragraph',
        text: 'The core idea can be understood through a simple analogy: think of the subject as a building. The foundational concepts are the foundations — without them, nothing else stands. The methodologies are the structural framework, and the practical techniques are the interior fit-out that makes the building usable.',
      },
      {
        type: 'heading',
        text: 'Why It Matters',
      },
      {
        type: 'paragraph',
        text: 'Understanding these principles gives you a mental model for solving problems in this domain efficiently, rather than relying on trial and error.',
      },
      {
        type: 'paragraph',
        text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
      },
    ];
  }

  // Generic fallback
  return [
    {
      type: 'paragraph',
      text: `You asked: "${userText}"`,
    },
    {
      type: 'paragraph',
      text: `I have reviewed "${docName}" and can confirm that the document contains relevant content related to your query. Here is what I found:`,
    },
    {
      type: 'bullet-list',
      items: [
        'The document addresses this topic across multiple sections.',
        'Key definitions are provided in the introductory chapters.',
        'Practical examples illustrate the concept in context.',
        'The document recommends further reading for deeper understanding.',
      ],
    },
    {
      type: 'paragraph',
      text: '⚠️ This is a simulated response. Real AI document analysis will be available once the OpenAI integration is connected.',
    },
  ];
}
