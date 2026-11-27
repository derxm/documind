/**
 * Demonstration data for the Quiz Generator workspace.
 * Contains question banks, answer keys, and explanations.
 * No backend, no localStorage — session-only state.
 */

// ---------------------------------------------------------------------------
// Source documents (mirrors documentsData.js fields needed here)
// ---------------------------------------------------------------------------
export const quizSourceDocuments = [
  { id: 'doc-1', name: 'Computer Science Notes' },
  { id: 'doc-2', name: 'Database Management' },
  { id: 'doc-3', name: 'Software Engineering' },
  { id: 'doc-4', name: 'Operating Systems' },
  { id: 'doc-5', name: 'Introduction to Algorithms' },
  { id: 'doc-6', name: 'Web Development Guide' },
  { id: 'general', name: 'General Knowledge' },
];

// ---------------------------------------------------------------------------
// Difficulty config
// ---------------------------------------------------------------------------
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const difficultyStyles = {
  Easy:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/60' },
  Medium: { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200/60' },
  Hard:   { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200/60' },
};

// ---------------------------------------------------------------------------
// Question banks
// Each question: { id, type: 'mc'|'tf', text, options, answer, explanation }
// answer = index into options (mc) or 0=True/1=False (tf)
// ---------------------------------------------------------------------------

export const questionBanks = {

  // ---- Computer Science / Data Structures --------------------------------
  'doc-1': [
    {
      id: 'cs-1', type: 'mc',
      text: 'What is the time complexity of accessing an element in an array by index?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      answer: 2,
      explanation: 'Array elements are stored contiguously in memory. An index maps directly to a memory address, so access is constant time O(1).',
    },
    {
      id: 'cs-2', type: 'tf',
      text: 'A stack follows the First-In, First-Out (FIFO) order.',
      options: ['True', 'False'],
      answer: 1,
      explanation: 'A stack follows LIFO (Last-In, First-Out). FIFO is the property of a queue.',
    },
    {
      id: 'cs-3', type: 'mc',
      text: 'Which data structure uses a hash function to map keys to storage locations?',
      options: ['Binary Search Tree', 'Linked List', 'Hash Table', 'Stack'],
      answer: 2,
      explanation: 'A hash table uses a hash function to compute an index (bucket) where the value is stored, enabling O(1) average-case lookup.',
    },
    {
      id: 'cs-4', type: 'tf',
      text: 'A doubly linked list allows traversal in both directions.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'Each node in a doubly linked list holds pointers to both its next and previous nodes, enabling bidirectional traversal.',
    },
    {
      id: 'cs-5', type: 'mc',
      text: 'What is the worst-case time complexity for searching in a balanced Binary Search Tree?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explanation: 'In a balanced BST the height is O(log n), so each search halves the remaining search space at every step.',
    },
    {
      id: 'cs-6', type: 'mc',
      text: 'Which of the following is NOT a linear data structure?',
      options: ['Array', 'Queue', 'Binary Tree', 'Stack'],
      answer: 2,
      explanation: 'A binary tree is a hierarchical (non-linear) structure where each node can have up to two children.',
    },
    {
      id: 'cs-7', type: 'tf',
      text: 'A queue can be efficiently implemented using two stacks.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'By pushing to one stack and reversing into a second stack on dequeue, a queue with amortised O(1) operations can be simulated.',
    },
    {
      id: 'cs-8', type: 'mc',
      text: 'In a max-heap, the root node always contains:',
      options: ['The smallest value', 'The largest value', 'The median value', 'A random value'],
      answer: 1,
      explanation: 'By the max-heap property, every parent is greater than or equal to its children, so the root holds the maximum element.',
    },
    {
      id: 'cs-9', type: 'tf',
      text: 'Hash collisions can be resolved using chaining or open addressing.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'Chaining stores colliding entries in a linked list per bucket; open addressing finds the next available slot by probing.',
    },
    {
      id: 'cs-10', type: 'mc',
      text: 'What is the space complexity of a singly linked list with n elements?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      answer: 2,
      explanation: 'Each of the n nodes requires a fixed amount of memory, so the total space scales linearly: O(n).',
    },
    {
      id: 'cs-11', type: 'mc',
      text: 'Which traversal visits nodes in Left → Root → Right order?',
      options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
      answer: 1,
      explanation: 'In-order traversal (Left, Root, Right) on a BST produces elements in sorted ascending order.',
    },
    {
      id: 'cs-12', type: 'tf',
      text: 'A circular queue wastes one memory slot to distinguish full from empty states.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'The standard circular-queue implementation reserves one slot so that front==rear unambiguously means empty rather than full.',
    },
    {
      id: 'cs-13', type: 'mc',
      text: 'The load factor of a hash table is defined as:',
      options: [
        'Number of buckets ÷ number of elements',
        'Number of elements ÷ number of buckets',
        'Number of collisions ÷ number of elements',
        'Number of elements × hash function cost',
      ],
      answer: 1,
      explanation: 'Load factor = n / k where n is the number of entries and k is the number of buckets. High load factors increase collision probability.',
    },
    {
      id: 'cs-14', type: 'tf',
      text: 'Graphs can contain cycles, but trees cannot.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'A tree is an acyclic connected graph. By definition trees have no cycles, while general graphs may have them.',
    },
    {
      id: 'cs-15', type: 'mc',
      text: 'Which operation on a stack is used to view the top element without removing it?',
      options: ['pop', 'push', 'peek', 'enqueue'],
      answer: 2,
      explanation: 'peek (or top) returns the top element without modifying the stack. pop returns and removes it.',
    },
    {
      id: 'cs-16', type: 'mc',
      text: 'An adjacency matrix for a graph with V vertices requires how much space?',
      options: ['O(V)', 'O(V + E)', 'O(V²)', 'O(E²)'],
      answer: 2,
      explanation: 'An adjacency matrix is a V×V grid. Even for sparse graphs, it always consumes O(V²) space regardless of edge count.',
    },
    {
      id: 'cs-17', type: 'tf',
      text: 'Insertion into a sorted array runs in O(n) time in the worst case.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'Finding the insertion position is O(log n) with binary search, but shifting elements to make room is O(n).',
    },
    {
      id: 'cs-18', type: 'mc',
      text: 'Which data structure is most suitable for implementing a browser\'s back-button history?',
      options: ['Queue', 'Stack', 'Hash Table', 'Heap'],
      answer: 1,
      explanation: 'Each new page is pushed onto a stack. Pressing back pops the most recent page — a natural LIFO operation.',
    },
    {
      id: 'cs-19', type: 'tf',
      text: 'A B-tree is specifically designed to minimise disk I/O operations.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'B-trees maintain a high branching factor and keep data sorted, minimising the number of disk reads needed during searches.',
    },
    {
      id: 'cs-20', type: 'mc',
      text: 'What is the time complexity of deleting the minimum element from a min-heap?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explanation: 'The minimum is at the root (O(1) access), but after removal the heap property must be restored by sifting down, which is O(log n).',
    },
  ],

  // ---- Database Management -----------------------------------------------
  'doc-2': [
    {
      id: 'db-1', type: 'mc',
      text: 'Which SQL clause is used to filter groups after a GROUP BY?',
      options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'],
      answer: 1,
      explanation: 'WHERE filters individual rows before grouping. HAVING filters aggregated groups after the GROUP BY has been applied.',
    },
    {
      id: 'db-2', type: 'tf',
      text: 'A foreign key must always reference a primary key in another table.',
      options: ['True', 'False'],
      answer: 1,
      explanation: 'A foreign key can reference any column (or set of columns) with a UNIQUE constraint in the referenced table, not necessarily the primary key.',
    },
    {
      id: 'db-3', type: 'mc',
      text: 'Which normal form eliminates partial dependencies?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      answer: 1,
      explanation: '2NF requires 1NF and that every non-prime attribute is fully functionally dependent on the entire primary key — eliminating partial dependencies.',
    },
    {
      id: 'db-4', type: 'tf',
      text: 'The ACID property of Atomicity guarantees that a transaction either completes fully or not at all.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'Atomicity means the transaction is treated as a single unit — all operations succeed or none of them are committed.',
    },
    {
      id: 'db-5', type: 'mc',
      text: 'Which JOIN returns all rows from the left table and matched rows from the right?',
      options: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'CROSS JOIN'],
      answer: 2,
      explanation: 'LEFT (OUTER) JOIN returns every row from the left table with NULLs filling the right-side columns where there is no match.',
    },
    {
      id: 'db-6', type: 'mc',
      text: 'What does the CAP theorem state about distributed databases?',
      options: [
        'You can have Consistency, Availability, and Partition Tolerance simultaneously',
        'You can only guarantee two of Consistency, Availability, and Partition Tolerance',
        'Consistency is always sacrificed in distributed systems',
        'Availability is optional in distributed systems',
      ],
      answer: 1,
      explanation: 'The CAP theorem proves that a distributed system can satisfy at most two of the three properties: Consistency, Availability, and Partition Tolerance.',
    },
    {
      id: 'db-7', type: 'tf',
      text: 'An index always speeds up both read and write operations.',
      options: ['True', 'False'],
      answer: 1,
      explanation: 'Indexes speed up reads but slow down writes (INSERT, UPDATE, DELETE) because the index must be maintained alongside the data.',
    },
    {
      id: 'db-8', type: 'mc',
      text: 'Which isolation level prevents dirty reads but allows non-repeatable reads?',
      options: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'],
      answer: 1,
      explanation: 'READ COMMITTED prevents dirty reads by only allowing reads of committed data, but other transactions can still modify rows between reads in the same transaction.',
    },
    {
      id: 'db-9', type: 'tf',
      text: 'Denormalisation can improve read performance at the cost of data redundancy.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'Denormalisation stores redundant data to reduce the number of joins required for common queries, trading write overhead for read speed.',
    },
    {
      id: 'db-10', type: 'mc',
      text: 'Which SQL command permanently removes a table and all its data?',
      options: ['DELETE', 'TRUNCATE', 'DROP', 'REMOVE'],
      answer: 2,
      explanation: 'DROP TABLE removes the table structure and all data permanently. DELETE removes rows but preserves the table; TRUNCATE removes all rows but preserves the structure.',
    },
    {
      id: 'db-11', type: 'mc',
      text: 'What is a correlated subquery?',
      options: [
        'A subquery that runs only once and its result is reused',
        'A subquery that references a column from the outer query',
        'A subquery inside a JOIN clause',
        'A subquery that returns multiple columns',
      ],
      answer: 1,
      explanation: 'A correlated subquery references one or more columns from the outer query, causing it to execute once per row of the outer query.',
    },
    {
      id: 'db-12', type: 'tf',
      text: 'BCNF is a stricter form of 3NF.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'Every relation in BCNF is also in 3NF, but not vice versa. BCNF requires every determinant to be a candidate key.',
    },
    {
      id: 'db-13', type: 'mc',
      text: 'Which aggregate function returns the number of non-NULL values in a column?',
      options: ['SUM', 'COUNT', 'AVG', 'MAX'],
      answer: 1,
      explanation: 'COUNT(column) returns the number of non-NULL values. COUNT(*) counts all rows including those with NULLs.',
    },
    {
      id: 'db-14', type: 'tf',
      text: 'A view is a virtual table that stores data physically on disk.',
      options: ['True', 'False'],
      answer: 1,
      explanation: 'A standard (non-materialised) view is a named query stored in the database catalog. It does not store data itself; it executes the query each time it is accessed.',
    },
    {
      id: 'db-15', type: 'mc',
      text: 'Which property ensures that committed data survives system crashes?',
      options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
      answer: 3,
      explanation: 'Durability (the D in ACID) guarantees that once a transaction commits, its changes persist even if the system crashes immediately after.',
    },
  ],

  // ---- Software Engineering -----------------------------------------------
  'doc-3': [
    {
      id: 'se-1', type: 'mc',
      text: 'Which SOLID principle states that a class should have only one reason to change?',
      options: ['Open-Closed', 'Single Responsibility', 'Liskov Substitution', 'Interface Segregation'],
      answer: 1,
      explanation: 'The Single Responsibility Principle (SRP) states a class should have one, and only one, reason to change — i.e. one job or responsibility.',
    },
    {
      id: 'se-2', type: 'tf',
      text: 'In Agile development, working software is delivered at the end of every sprint.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'A core Agile principle is to deliver working, potentially shippable software at the end of each iteration (sprint), typically 1–4 weeks.',
    },
    {
      id: 'se-3', type: 'mc',
      text: 'What does TDD stand for?',
      options: ['Type-Driven Development', 'Test-Driven Development', 'Task-Driven Design', 'Trunk-based Deployment'],
      answer: 1,
      explanation: 'TDD (Test-Driven Development) follows a Red-Green-Refactor cycle: write a failing test, write minimum code to pass it, then refactor.',
    },
    {
      id: 'se-4', type: 'tf',
      text: 'The DRY principle stands for "Don\'t Repeat Yourself".',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'DRY (Don\'t Repeat Yourself) states that every piece of knowledge should have a single, authoritative representation in the system.',
    },
    {
      id: 'se-5', type: 'mc',
      text: 'Which Agile ceremony reviews completed work with stakeholders?',
      options: ['Sprint Planning', 'Daily Stand-up', 'Sprint Review', 'Retrospective'],
      answer: 2,
      explanation: 'The Sprint Review (or demo) is held at the end of a sprint for the team to show completed work to stakeholders and gather feedback.',
    },
    {
      id: 'se-6', type: 'mc',
      text: 'The Open-Closed Principle states that software entities should be:',
      options: [
        'Open for modification, closed for extension',
        'Open for extension, closed for modification',
        'Open for testing, closed for deployment',
        'Open source and freely redistributable',
      ],
      answer: 1,
      explanation: 'The OCP means you should be able to add new behaviour (open for extension) without changing existing code (closed for modification).',
    },
    {
      id: 'se-7', type: 'tf',
      text: 'A microservices architecture packages all application functionality into a single deployable unit.',
      options: ['True', 'False'],
      answer: 1,
      explanation: 'That describes a monolithic architecture. Microservices decompose functionality into small, independently deployable services that communicate over a network.',
    },
    {
      id: 'se-8', type: 'mc',
      text: 'Which design pattern ensures only one instance of a class exists?',
      options: ['Factory', 'Observer', 'Singleton', 'Strategy'],
      answer: 2,
      explanation: 'The Singleton pattern restricts instantiation of a class to a single object and provides a global access point to that instance.',
    },
    {
      id: 'se-9', type: 'tf',
      text: 'Code refactoring changes the external behaviour of software.',
      options: ['True', 'False'],
      answer: 1,
      explanation: 'By definition, refactoring improves the internal structure of code without changing its observable external behaviour.',
    },
    {
      id: 'se-10', type: 'mc',
      text: 'What is the purpose of a CI/CD pipeline?',
      options: [
        'To generate documentation automatically',
        'To automate building, testing, and deploying software changes',
        'To manage database migrations',
        'To enforce code style rules',
      ],
      answer: 1,
      explanation: 'CI/CD (Continuous Integration/Continuous Delivery) automates the process of integrating code changes, running tests, and deploying to production environments.',
    },
  ],

  // ---- Operating Systems -------------------------------------------------
  'doc-4': [
    {
      id: 'os-1', type: 'mc',
      text: 'Which CPU scheduling algorithm is known to cause the "convoy effect"?',
      options: ['Round Robin', 'First-Come First-Served', 'Shortest Job First', 'Priority Scheduling'],
      answer: 1,
      explanation: 'FCFS can cause the convoy effect where short processes queue behind a long process, leading to high average waiting times.',
    },
    {
      id: 'os-2', type: 'tf',
      text: 'Deadlock requires all four of these conditions: mutual exclusion, hold-and-wait, no preemption, and circular wait.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'The Coffman conditions state that all four must hold simultaneously for deadlock to occur. Preventing any one of them prevents deadlock.',
    },
    {
      id: 'os-3', type: 'mc',
      text: 'What is the purpose of virtual memory?',
      options: [
        'To increase CPU clock speed',
        'To allow processes to use more memory than physically available',
        'To encrypt data stored on disk',
        'To manage USB device drivers',
      ],
      answer: 1,
      explanation: 'Virtual memory uses disk space as an extension of RAM, allowing processes to address more memory than is physically installed via paging or segmentation.',
    },
    {
      id: 'os-4', type: 'tf',
      text: 'A semaphore with an initial value of 1 behaves like a mutex.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'A binary semaphore (initial value 1) provides mutual exclusion similar to a mutex — only one thread can acquire it at a time.',
    },
    {
      id: 'os-5', type: 'mc',
      text: 'In the context of operating systems, what is thrashing?',
      options: [
        'A CPU overheating condition',
        'Excessive paging that consumes more time than useful work',
        'A memory leak in the kernel',
        'A type of scheduling priority inversion',
      ],
      answer: 1,
      explanation: 'Thrashing occurs when a process spends more time swapping pages in and out than executing useful instructions, severely degrading performance.',
    },
  ],

  // ---- Algorithms --------------------------------------------------------
  'doc-5': [
    {
      id: 'alg-1', type: 'mc',
      text: 'What is the average-case time complexity of Quick Sort?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 1,
      explanation: 'Quick Sort has an average-case of O(n log n) when the pivot divides the array roughly in half each time. The worst case (sorted input with naive pivot) is O(n²).',
    },
    {
      id: 'alg-2', type: 'tf',
      text: 'Merge Sort is a stable sorting algorithm.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'Merge Sort preserves the relative order of equal elements during the merge step, making it stable.',
    },
    {
      id: 'alg-3', type: 'mc',
      text: 'Which algorithmic paradigm does Dijkstra\'s shortest-path algorithm use?',
      options: ['Divide and Conquer', 'Dynamic Programming', 'Greedy', 'Backtracking'],
      answer: 2,
      explanation: 'Dijkstra\'s algorithm makes the locally optimal choice at each step (picking the unvisited node with the smallest known distance), which is the greedy paradigm.',
    },
    {
      id: 'alg-4', type: 'tf',
      text: 'Binary search requires the input array to be sorted.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'Binary search works by repeatedly halving the search range, which is only valid when the array is sorted so that comparisons correctly eliminate half the possibilities.',
    },
    {
      id: 'alg-5', type: 'mc',
      text: 'The time complexity of building a heap from an unsorted array is:',
      options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'],
      answer: 1,
      explanation: 'Using the bottom-up heapify approach (Floyd\'s algorithm), a heap can be built in O(n) time, which is better than inserting elements one at a time (O(n log n)).',
    },
  ],

  // ---- Web Development ---------------------------------------------------
  'doc-6': [
    {
      id: 'web-1', type: 'mc',
      text: 'Which HTTP method is typically used to update a resource partially?',
      options: ['GET', 'PUT', 'POST', 'PATCH'],
      answer: 3,
      explanation: 'PATCH applies a partial update to a resource. PUT replaces the entire resource. POST creates a new resource.',
    },
    {
      id: 'web-2', type: 'tf',
      text: 'CSS Flexbox is primarily designed for two-dimensional layouts.',
      options: ['True', 'False'],
      answer: 1,
      explanation: 'Flexbox is a one-dimensional layout model (either a row or a column). CSS Grid is designed for two-dimensional layouts.',
    },
    {
      id: 'web-3', type: 'mc',
      text: 'What does CORS stand for?',
      options: [
        'Cross-Origin Resource Sharing',
        'Client-Origin Request Security',
        'Cross-Object Routing System',
        'Content-Origin Response Standard',
      ],
      answer: 0,
      explanation: 'CORS (Cross-Origin Resource Sharing) is a browser mechanism that allows or restricts web applications from making requests to a different origin than the one that served the page.',
    },
    {
      id: 'web-4', type: 'tf',
      text: 'A JWT consists of three Base64URL-encoded parts: header, payload, and signature.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'A JSON Web Token has the format: header.payload.signature, each Base64URL encoded and separated by dots.',
    },
    {
      id: 'web-5', type: 'mc',
      text: 'Which Core Web Vital measures visual stability of a page?',
      options: [
        'Largest Contentful Paint (LCP)',
        'First Input Delay (FID)',
        'Cumulative Layout Shift (CLS)',
        'Time to First Byte (TTFB)',
      ],
      answer: 2,
      explanation: 'CLS (Cumulative Layout Shift) measures how much the visible content unexpectedly shifts during the page\'s lifetime. A good score is below 0.1.',
    },
  ],

  // ---- General Knowledge -------------------------------------------------
  'general': [
    {
      id: 'gen-1', type: 'mc',
      text: 'Which of the following is an example of a compiled programming language?',
      options: ['Python', 'JavaScript', 'C++', 'Ruby'],
      answer: 2,
      explanation: 'C++ is compiled directly to machine code before execution. Python, JavaScript, and Ruby are typically interpreted or use a JIT compiler.',
    },
    {
      id: 'gen-2', type: 'tf',
      text: 'IPv6 addresses are 128 bits long.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'IPv6 uses 128-bit addresses (compared to IPv4\'s 32-bit), providing approximately 3.4 × 10³⁸ unique addresses.',
    },
    {
      id: 'gen-3', type: 'mc',
      text: 'What does RAM stand for?',
      options: ['Read-Access Memory', 'Random-Access Memory', 'Rapid-Action Module', 'Remote-Access Memory'],
      answer: 1,
      explanation: 'RAM (Random-Access Memory) is volatile memory that allows data to be read and written in roughly the same time regardless of location.',
    },
    {
      id: 'gen-4', type: 'tf',
      text: 'The OSI model has seven layers.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'The OSI (Open Systems Interconnection) model defines seven networking layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    },
    {
      id: 'gen-5', type: 'mc',
      text: 'Which of the following is NOT an operating system?',
      options: ['Linux', 'macOS', 'Java', 'Windows'],
      answer: 2,
      explanation: 'Java is a programming language and runtime environment. Linux, macOS, and Windows are all operating systems.',
    },
    {
      id: 'gen-6', type: 'mc',
      text: 'What is the purpose of a DNS server?',
      options: [
        'To assign IP addresses dynamically',
        'To translate domain names into IP addresses',
        'To encrypt internet traffic',
        'To filter malicious websites',
      ],
      answer: 1,
      explanation: 'DNS (Domain Name System) translates human-readable domain names (e.g. example.com) into IP addresses that computers use to route traffic.',
    },
    {
      id: 'gen-7', type: 'tf',
      text: 'A bit is the smallest unit of digital information.',
      options: ['True', 'False'],
      answer: 0,
      explanation: 'A bit (binary digit) is the most fundamental unit — it has a value of either 0 or 1. Eight bits make one byte.',
    },
    {
      id: 'gen-8', type: 'mc',
      text: 'Which sorting algorithm is used by most modern languages\' built-in sort functions?',
      options: ['Quick Sort', 'Merge Sort', 'Tim Sort', 'Heap Sort'],
      answer: 2,
      explanation: 'Tim Sort (a hybrid of Merge Sort and Insertion Sort) is used by Python, Java, and other major languages for its excellent real-world performance on partially sorted data.',
    },
    {
      id: 'gen-9', type: 'tf',
      text: 'HTTP is a stateful protocol.',
      options: ['True', 'False'],
      answer: 1,
      explanation: 'HTTP is stateless — each request is independent, with no memory of previous requests. Statefulness is added on top via cookies, sessions, or tokens.',
    },
    {
      id: 'gen-10', type: 'mc',
      text: 'What does CPU stand for?',
      options: ['Core Processing Unit', 'Central Processing Unit', 'Compute Performance Unit', 'Central Program Utility'],
      answer: 1,
      explanation: 'CPU (Central Processing Unit) is the primary component of a computer that executes instructions from programs.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Helper: select questions from a bank for a given quiz configuration
// ---------------------------------------------------------------------------
export function selectQuestions({ sourceId, count, types }) {
  const bank = questionBanks[sourceId] || questionBanks['general'];

  // Filter by requested types
  const filtered = bank.filter((q) => types.includes(q.type === 'mc' ? 'Multiple Choice' : 'True / False'));

  if (filtered.length === 0) return { questions: [], insufficient: true };

  // If bank is smaller than requested count, use all available (no duplicates)
  const available = filtered.length;
  const actualCount = Math.min(count, available);
  const insufficient = available < count;

  // Shuffle deterministically-ish using splice+random
  const pool = [...filtered];
  const selected = [];
  for (let i = 0; i < actualCount; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }

  return { questions: selected, insufficient, requested: count, available };
}

// ---------------------------------------------------------------------------
// Demo quizzes (pre-created, shown in the library on first load)
// ---------------------------------------------------------------------------
let _demoSeq = 0;
const demoTs = (daysAgo) => Date.now() - daysAgo * 86_400_000;

export const initialQuizzes = [
  {
    id: 'quiz-demo-1',
    title: 'Data Structures Fundamentals',
    sourceId: 'doc-1',
    sourceName: 'Computer Science Notes',
    questionCount: 10,
    difficulty: 'Medium',
    types: ['Multiple Choice', 'True / False'],
    bestScore: 90,
    attempts: 2,
    status: 'completed',
    createdAt: demoTs(5),
  },
  {
    id: 'quiz-demo-2',
    title: 'Database Management Basics',
    sourceId: 'doc-2',
    sourceName: 'Database Management',
    questionCount: 15,
    difficulty: 'Easy',
    types: ['Multiple Choice', 'True / False'],
    bestScore: 80,
    attempts: 1,
    status: 'completed',
    createdAt: demoTs(4),
  },
  {
    id: 'quiz-demo-3',
    title: 'Software Engineering Principles',
    sourceId: 'doc-3',
    sourceName: 'Software Engineering',
    questionCount: 10,
    difficulty: 'Hard',
    types: ['Multiple Choice', 'True / False'],
    bestScore: 70,
    attempts: 1,
    status: 'completed',
    createdAt: demoTs(3),
  },
  {
    id: 'quiz-demo-4',
    title: 'Operating Systems Revision',
    sourceId: 'doc-4',
    sourceName: 'Operating Systems',
    questionCount: 5,
    difficulty: 'Medium',
    types: ['Multiple Choice', 'True / False'],
    bestScore: null,
    attempts: 0,
    status: 'not-attempted',
    createdAt: demoTs(2),
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function scoreLabel(pct) {
  if (pct >= 90) return { label: 'Excellent', color: 'text-emerald-600' };
  if (pct >= 75) return { label: 'Good',      color: 'text-blue-600' };
  if (pct >= 60) return { label: 'Fair',       color: 'text-amber-600' };
  return               { label: 'Needs Work', color: 'text-red-600' };
}
