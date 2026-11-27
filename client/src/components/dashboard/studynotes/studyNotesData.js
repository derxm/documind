/**
 * Demonstration data for the Study Notes workspace.
 * Content is realistic educational material — not placeholder text.
 * Each note has structured `sections` for the detail view.
 */

// ---------------------------------------------------------------------------
// Timestamps
// ---------------------------------------------------------------------------
const d = (isoDate) => new Date(isoDate).getTime();

// ---------------------------------------------------------------------------
// Note content — structured sections rendered by NoteContentRenderer
// Block types: heading | paragraph | bullet-list | numbered-list
// ---------------------------------------------------------------------------

const dataStructuresContent = [
  {
    type: 'paragraph',
    text: 'A data structure is a specialised format for organising, managing, and storing data so that it can be accessed and modified efficiently. The choice of data structure directly affects the performance characteristics of algorithms that operate on that data.',
  },
  {
    type: 'heading',
    text: 'Linear Data Structures',
  },
  {
    type: 'bullet-list',
    items: [
      'Array — fixed-size, contiguous memory, O(1) random access, O(n) insertion/deletion.',
      'Linked List — dynamic size, O(1) insertion at head, O(n) search; variants: singly, doubly, circular.',
      'Stack — LIFO order; push/pop both O(1); used in call stacks, expression parsing, undo operations.',
      'Queue — FIFO order; enqueue/dequeue O(1); used in BFS, task scheduling, print spoolers.',
    ],
  },
  {
    type: 'heading',
    text: 'Non-Linear Data Structures',
  },
  {
    type: 'bullet-list',
    items: [
      'Binary Tree — each node has at most two children; supports hierarchical data.',
      'Binary Search Tree (BST) — left child < parent < right child; O(log n) search on balanced trees.',
      'Heap — complete binary tree; max-heap or min-heap; O(log n) insert/delete; used in priority queues.',
      'Graph — nodes (vertices) connected by edges; directed or undirected; weighted or unweighted.',
    ],
  },
  {
    type: 'heading',
    text: 'Hash-Based Structures',
  },
  {
    type: 'bullet-list',
    items: [
      'Hash Table — key-value store with O(1) average-case lookup, insert, delete via hash function.',
      'Collision resolution: chaining (linked lists per bucket) or open addressing (probing).',
      'Load factor should stay below 0.75 to maintain performance; resize by doubling capacity.',
    ],
  },
  {
    type: 'heading',
    text: 'Complexity Cheat Sheet',
  },
  {
    type: 'numbered-list',
    items: [
      'Array access: O(1) | search: O(n) | insert/delete: O(n)',
      'Linked List access: O(n) | insert/delete at head: O(1)',
      'BST (balanced) search/insert/delete: O(log n)',
      'Hash Table average search/insert/delete: O(1)',
      'Heap insert/delete: O(log n) | find min/max: O(1)',
    ],
  },
];

const databaseContent = [
  {
    type: 'paragraph',
    text: 'A relational database organises data into tables (relations) with rows (tuples) and columns (attributes). The relational model, introduced by Edgar Codd in 1970, provides a mathematically rigorous foundation for data management.',
  },
  {
    type: 'heading',
    text: 'Core Concepts',
  },
  {
    type: 'bullet-list',
    items: [
      'Primary Key — uniquely identifies each row in a table; cannot be NULL.',
      'Foreign Key — references the primary key of another table; enforces referential integrity.',
      'Candidate Key — minimal set of attributes that uniquely identifies a row.',
      'Composite Key — primary key composed of two or more columns.',
      'Index — data structure that speeds up queries on specific columns at the cost of write overhead.',
    ],
  },
  {
    type: 'heading',
    text: 'Normalisation',
  },
  {
    type: 'numbered-list',
    items: [
      '1NF — Eliminate repeating groups; each column must hold atomic values.',
      '2NF — Eliminate partial dependencies; every non-key attribute must depend on the whole primary key.',
      '3NF — Eliminate transitive dependencies; non-key attributes must not depend on other non-key attributes.',
      'BCNF — Stricter than 3NF; every determinant must be a candidate key.',
    ],
  },
  {
    type: 'heading',
    text: 'SQL Essentials',
  },
  {
    type: 'bullet-list',
    items: [
      'SELECT with WHERE, GROUP BY, HAVING, ORDER BY, and LIMIT.',
      'JOINs: INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER, CROSS, SELF.',
      'Subqueries: correlated vs. non-correlated; EXISTS vs. IN.',
      'Aggregate functions: COUNT, SUM, AVG, MIN, MAX.',
      'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD.',
    ],
  },
  {
    type: 'heading',
    text: 'Transactions and ACID',
  },
  {
    type: 'bullet-list',
    items: [
      'Atomicity — the entire transaction succeeds or fails as a unit.',
      'Consistency — the database moves from one valid state to another.',
      'Isolation — concurrent transactions behave as if they ran serially.',
      'Durability — committed data survives system failures.',
      'Isolation levels: READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE.',
    ],
  },
];

const sdlcContent = [
  {
    type: 'paragraph',
    text: 'The Software Development Life Cycle (SDLC) is a structured process for planning, creating, testing, and deploying software systems. It provides a framework that minimises project risk and ensures quality at each stage.',
  },
  {
    type: 'heading',
    text: 'SDLC Phases',
  },
  {
    type: 'numbered-list',
    items: [
      'Requirements — Gather and document functional and non-functional requirements from stakeholders.',
      'System Design — Define architecture, technology stack, data models, and interface specifications.',
      'Implementation — Write code according to design documents; follow coding standards.',
      'Testing — Unit, integration, system, and acceptance testing to verify correctness.',
      'Deployment — Release to production; may involve CI/CD pipelines, blue-green, or canary strategies.',
      'Maintenance — Bug fixes, performance tuning, and iterative feature enhancements.',
    ],
  },
  {
    type: 'heading',
    text: 'Key Methodologies',
  },
  {
    type: 'bullet-list',
    items: [
      'Waterfall — sequential phases; best for well-defined requirements with little change expected.',
      'Agile — iterative sprints (1–4 weeks); delivers working software frequently; embraces changing requirements.',
      'Scrum — Agile framework with defined roles (Product Owner, Scrum Master, Team), ceremonies, and artefacts.',
      'Kanban — continuous flow with WIP limits; visualises work on a board.',
      'Spiral — risk-driven; each cycle addresses the highest-risk items first.',
    ],
  },
  {
    type: 'heading',
    text: 'Design Principles',
  },
  {
    type: 'bullet-list',
    items: [
      'SOLID: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
      'DRY (Don\'t Repeat Yourself) — reduce duplication to a single authoritative representation.',
      'YAGNI (You Aren\'t Gonna Need It) — only implement what is currently required.',
      'KISS (Keep It Simple, Stupid) — prefer simple, clear solutions over clever, complex ones.',
    ],
  },
];

const osProcessesContent = [
  {
    type: 'paragraph',
    text: 'A process is an instance of a program in execution. The operating system manages processes through scheduling, synchronisation, and inter-process communication to maximise CPU utilisation while maintaining isolation and fairness.',
  },
  {
    type: 'heading',
    text: 'Process States',
  },
  {
    type: 'bullet-list',
    items: [
      'New — the process is being created.',
      'Ready — the process is waiting to be assigned to a CPU.',
      'Running — instructions are being executed.',
      'Waiting (Blocked) — the process is waiting for an I/O event or resource.',
      'Terminated — the process has finished execution.',
    ],
  },
  {
    type: 'heading',
    text: 'CPU Scheduling Algorithms',
  },
  {
    type: 'numbered-list',
    items: [
      'First-Come First-Served (FCFS) — simple but can cause the convoy effect.',
      'Shortest Job First (SJF) — optimal average waiting time; requires knowing burst times in advance.',
      'Round Robin — each process gets a fixed time quantum; fair but context-switch overhead.',
      'Priority Scheduling — higher-priority processes run first; risk of starvation for low-priority tasks.',
      'Multilevel Queue — different queues for different process categories (interactive, batch).',
    ],
  },
  {
    type: 'heading',
    text: 'Concurrency and Synchronisation',
  },
  {
    type: 'bullet-list',
    items: [
      'Race condition — outcome depends on the sequence of uncontrolled events; must be avoided.',
      'Mutex — mutual exclusion lock; only one thread holds it at a time.',
      'Semaphore — integer counter used to signal between threads; binary or counting.',
      'Deadlock — four conditions: mutual exclusion, hold and wait, no preemption, circular wait.',
      'Deadlock prevention strategies: resource ordering, lock timeouts, and banker\'s algorithm.',
    ],
  },
];

const sortingAlgorithmsContent = [
  {
    type: 'paragraph',
    text: 'Sorting algorithms arrange elements in a defined order (typically ascending or descending). Understanding their time/space complexity and stability is essential for selecting the right algorithm for a given context.',
  },
  {
    type: 'heading',
    text: 'Comparison-Based Sorts',
  },
  {
    type: 'bullet-list',
    items: [
      'Bubble Sort — O(n²) time, O(1) space; stable; simple but rarely practical.',
      'Insertion Sort — O(n²) worst case, O(n) best case; O(1) space; stable; efficient for small or nearly sorted arrays.',
      'Selection Sort — O(n²) time, O(1) space; unstable; always n² comparisons regardless of input.',
      'Merge Sort — O(n log n) guaranteed; O(n) extra space; stable; preferred for linked lists and external sort.',
      'Quick Sort — O(n log n) average, O(n²) worst case; O(log n) space (stack); unstable; fastest in practice for arrays.',
      'Heap Sort — O(n log n) guaranteed; O(1) extra space; unstable; cache-unfriendly.',
    ],
  },
  {
    type: 'heading',
    text: 'Non-Comparison Sorts',
  },
  {
    type: 'bullet-list',
    items: [
      'Counting Sort — O(n + k) time and space; stable; only for integer keys in known range k.',
      'Radix Sort — O(d(n + k)) time; stable; processes digits one at a time using a stable sub-sort.',
      'Bucket Sort — O(n + k) average; distributes elements into buckets then sorts each bucket.',
    ],
  },
  {
    type: 'heading',
    text: 'Choosing the Right Algorithm',
  },
  {
    type: 'numbered-list',
    items: [
      'Small arrays (n < 20): Insertion Sort.',
      'General-purpose: Quick Sort with median-of-three pivot.',
      'Stability required: Merge Sort or Tim Sort.',
      'Memory constrained: Heap Sort.',
      'Integer keys in bounded range: Counting Sort or Radix Sort.',
    ],
  },
];

const webDevContent = [
  {
    type: 'paragraph',
    text: 'Modern web development encompasses both client-side (frontend) and server-side (backend) technologies, united by HTTP as the communication protocol. The discipline has evolved from static HTML pages to complex, interactive single-page applications.',
  },
  {
    type: 'heading',
    text: 'Frontend Essentials',
  },
  {
    type: 'bullet-list',
    items: [
      'HTML5 — semantic elements (header, nav, main, article, section, footer) improve accessibility and SEO.',
      'CSS3 — Flexbox and Grid for layout; custom properties (variables); transitions and animations.',
      'JavaScript (ES2022+) — modules, async/await, destructuring, optional chaining, nullish coalescing.',
      'React — component-based UI; virtual DOM; hooks (useState, useEffect, useContext, useMemo, useCallback).',
      'TypeScript — static typing catches errors at compile time; interfaces and generics improve maintainability.',
    ],
  },
  {
    type: 'heading',
    text: 'Backend Concepts',
  },
  {
    type: 'bullet-list',
    items: [
      'REST — stateless HTTP architecture; resources identified by URIs; standard verbs (GET, POST, PUT, DELETE, PATCH).',
      'GraphQL — query language for APIs; client requests exactly the data it needs; reduces over- and under-fetching.',
      'Node.js + Express — JavaScript on the server; non-blocking I/O; suitable for real-time and I/O-intensive apps.',
      'Authentication — JWT for stateless token auth; OAuth 2.0 for delegated authorisation; refresh token rotation.',
    ],
  },
  {
    type: 'heading',
    text: 'Performance and Deployment',
  },
  {
    type: 'numbered-list',
    items: [
      'Code splitting and lazy loading reduce initial bundle size.',
      'Image optimisation: WebP/AVIF formats, responsive srcset, lazy loading.',
      'Caching strategies: CDN edge caching, Cache-Control headers, service workers.',
      'CI/CD pipelines automate testing and deployment on every commit.',
      'Core Web Vitals: LCP < 2.5 s, FID < 100 ms, CLS < 0.1.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Demo notes
// ---------------------------------------------------------------------------
export const initialNotes = [
  {
    id: 'note-1',
    title: 'Introduction to Data Structures',
    category: 'Computer Science',
    source: 'Computer Science Notes',
    keyPoints: 8,
    preview:
      'A data structure is a specialised format for organising, managing, and storing data so that it can be accessed and modified efficiently.',
    sections: dataStructuresContent,
    isFavorite: true,
    updatedAt: d('2026-11-22'),
    createdAt: d('2026-11-22'),
  },
  {
    id: 'note-2',
    title: 'Relational Database Concepts',
    category: 'Database Management',
    source: 'Database Management',
    keyPoints: 12,
    preview:
      'A relational database organises data into tables with rows and columns. The relational model provides a mathematically rigorous foundation for data management.',
    sections: databaseContent,
    isFavorite: false,
    updatedAt: d('2026-11-21'),
    createdAt: d('2026-11-21'),
  },
  {
    id: 'note-3',
    title: 'Software Development Life Cycle',
    category: 'Software Engineering',
    source: 'Software Engineering',
    keyPoints: 10,
    preview:
      'The SDLC is a structured process for planning, creating, testing, and deploying software systems. It minimises project risk and ensures quality at each stage.',
    sections: sdlcContent,
    isFavorite: false,
    updatedAt: d('2026-11-20'),
    createdAt: d('2026-11-20'),
  },
  {
    id: 'note-4',
    title: 'Operating System Processes',
    category: 'Operating Systems',
    source: 'Operating Systems',
    keyPoints: 7,
    preview:
      'A process is an instance of a program in execution. The OS manages processes through scheduling, synchronisation, and inter-process communication.',
    sections: osProcessesContent,
    isFavorite: true,
    updatedAt: d('2026-11-19'),
    createdAt: d('2026-11-19'),
  },
  {
    id: 'note-5',
    title: 'Sorting Algorithms Explained',
    category: 'Computer Science',
    source: 'Introduction to Algorithms',
    keyPoints: 9,
    preview:
      'Sorting algorithms arrange elements in a defined order. Understanding their time/space complexity and stability is essential for selecting the right algorithm.',
    sections: sortingAlgorithmsContent,
    isFavorite: false,
    updatedAt: d('2026-11-18'),
    createdAt: d('2026-11-18'),
  },
  {
    id: 'note-6',
    title: 'Modern Web Development',
    category: 'Web Development',
    source: 'Web Development Guide',
    keyPoints: 6,
    preview:
      'Modern web development encompasses frontend and backend technologies united by HTTP. The discipline has evolved from static HTML to complex single-page applications.',
    sections: webDevContent,
    isFavorite: false,
    updatedAt: d('2026-11-17'),
    createdAt: d('2026-11-17'),
  },
];

// ---------------------------------------------------------------------------
// Category colour map — used by both NoteCard and NoteDetailView
// ---------------------------------------------------------------------------
export const categoryColors = {
  'Computer Science': {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200/60',
    dot: 'bg-violet-500',
  },
  'Database Management': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200/60',
    dot: 'bg-blue-500',
  },
  'Software Engineering': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200/60',
    dot: 'bg-emerald-500',
  },
  'Operating Systems': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200/60',
    dot: 'bg-amber-500',
  },
  'Web Development': {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200/60',
    dot: 'bg-rose-500',
  },
};

export const DEFAULT_CATEGORY_COLOR = {
  bg: 'bg-background-subtle',
  text: 'text-text-secondary',
  border: 'border-border',
  dot: 'bg-text-muted',
};

// ---------------------------------------------------------------------------
// Available categories for the editor dropdown
// ---------------------------------------------------------------------------
export const availableCategories = [
  'Computer Science',
  'Database Management',
  'Software Engineering',
  'Operating Systems',
  'Web Development',
  'Mathematics',
  'Statistics',
  'General',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Serialise a note's structured sections into plain text for clipboard copy.
 */
export function noteToPlainText(note) {
  const lines = [`${note.title}\n${'─'.repeat(note.title.length)}\n`];
  for (const block of note.sections || []) {
    switch (block.type) {
      case 'heading':
        lines.push(`\n${block.text}\n`);
        break;
      case 'paragraph':
        lines.push(`${block.text}\n`);
        break;
      case 'bullet-list':
        block.items.forEach((item) => lines.push(`  • ${item}`));
        lines.push('');
        break;
      case 'numbered-list':
        block.items.forEach((item, i) => lines.push(`  ${i + 1}. ${item}`));
        lines.push('');
        break;
      default:
        break;
    }
  }
  return lines.join('\n');
}
