# Frontend Live Code Challenge - Tasks Breakdown

## Phase 1: Environment Setup & Prerequisites

### 1.2 Project Initialization

ipt and Tailwind CSS

### 2.1 State Management Setup

### 2.2 API & Data Fetching

### 2.3 WAGMI Wallet Integration

- [ ] Install wagmi and viem packages
  - `npm install wagmi viem @tanstack/react-query`
- [ ] Install wallet connector packages
  - `npm install @wagmi/core @wagmi/connectors`
- [ ] Set up wagmi config with providers
- [ ] Create WagmiProvider wrapper component
- [ ] Implement basic wallet connect button
- [ ] Test wallet connection with MetaMask/other wallet
- [ ] Handle wallet connection states (connecting, connected, disconnected)
- [ ] Display connected wallet address

---

## Phase 3: Component Architecture Preparation

### 3.1 Base Component Structure

- [ ] Create reusable UI components folder structure
  - `/components/ui` - base components
  - `/components/features` - feature-specific components
  - `/lib` - utilities and helpers
  - `/hooks` - custom React hooks
- [ ] Set up component naming conventions
- [ ] Create example components to verify structure

### 3.2 Common UI Patterns

- [ ] Create Loading component/skeleton
- [ ] Create Error component with retry functionality
- [ ] Create Empty state component
- [ ] Create Card/Container components
- [ ] Practice building responsive lists/grids with Tailwind

### 3.3 Data Rendering Patterns

- [ ] Practice safe rendering of external data
- [ ] Implement image loading with fallbacks
- [ ] Handle null/undefined values gracefully
- [ ] Sanitize and validate external strings
- [ ] Format numbers and currencies properly

---

## Phase 4: API Integration Patterns

### 4.1 HTTP Request Handling

- [ ] Create generic fetch wrapper with error handling
- [ ] Implement request interceptors if needed
- [ ] Set up response type definitions
- [ ] Handle different HTTP status codes
- [ ] Implement timeout handling

### 4.2 RPC Endpoint Interaction

- [ ] Research RPC call patterns (JSON-RPC, etc.)
- [ ] Create RPC client utility
- [ ] Handle RPC-specific error formats
- [ ] Test RPC calls with mock endpoint
- [ ] Implement proper typing for RPC requests/responses

### 4.3 State Management for API Data

- [ ] Implement loading states (idle, loading, success, error)
- [ ] Cache API responses appropriately
- [ ] Handle refetch/refresh logic
- [ ] Implement optimistic updates if needed
- [ ] Handle stale data scenarios

---

## Phase 5: Practice & Familiarity

### 5.1 Tailwind Proficiency

- [ ] Practice building common layouts quickly
- [ ] Master responsive utility classes
- [ ] Learn common spacing/sizing patterns
- [ ] Practice hover/focus states
- [ ] Review Tailwind docs for quick reference

### 5.2 TypeScript Patterns

- [ ] Define interfaces for API responses
- [ ] Create type-safe component props
- [ ] Use proper typing for hooks
- [ ] Handle async/await typing
- [ ] Practice with generics for reusable components

### 5.3 Performance Considerations

- [ ] Understand React Server Components vs Client Components
- [ ] Know when to use 'use client' directive
- [ ] Practice code splitting patterns
- [ ] Implement proper memoization (useMemo, useCallback)
- [ ] Consider image optimization (next/image)

---

## Phase 6: Challenge Day Preparation

### 6.1 Pre-Challenge Checklist

- [ ] Start fresh Next.js project or have template ready
- [ ] Verify all dependencies are installed
- [ ] Test wallet connection works
- [ ] Have documentation tabs ready (Next.js, Tailwind, wagmi, chosen state library)
- [ ] Clear browser cache and test environment
- [ ] Ensure stable internet connection

### 6.2 Quick Reference Setup

- [ ] Bookmark Tailwind CSS docs
- [ ] Bookmark Next.js App Router docs
- [ ] Bookmark wagmi documentation
- [ ] Bookmark chosen state management docs
- [ ] Have TypeScript utility types reference ready
- [ ] Prepare code snippets for common patterns

### 6.3 Mental Preparation

- [ ] Review this task list
- [ ] Practice explaining technical decisions aloud
- [ ] Prepare questions about the challenge scope
- [ ] Plan time allocation strategy (basic → polish → edge cases)
- [ ] Review "unhappy path" handling patterns

---

## Phase 7: During the Interview

### 7.1 Initial Setup (0-10 min)

- [ ] Listen carefully to requirements
- [ ] Ask clarifying questions about scope
- [ ] Review design screenshot thoroughly
- [ ] Note API endpoint and structure
- [ ] Plan component hierarchy
- [ ] Start with simplest working version

### 7.2 Core Implementation (10-40 min)

- [ ] Implement basic data fetching
- [ ] Render data in simple format
- [ ] Add loading state
- [ ] Add error handling
- [ ] Match design screenshot styling
- [ ] Implement responsive layout
- [ ] Add wallet connection if not already done

### 7.3 Polish & Edge Cases (40-60 min)

- [ ] Handle empty states
- [ ] Improve error messages
- [ ] Add loading skeletons
- [ ] Refine styling details
- [ ] Test edge cases
- [ ] Add accessibility attributes
- [ ] Optimize performance if time allows

### 7.4 Discussion Phase (60-75 min)

- [ ] Explain architectural decisions
- [ ] Discuss potential improvements
- [ ] Address interviewer questions about:
  - System upgrades for new use-cases
  - Specific error handling scenarios
  - Performance optimization strategies
  - Alternative approaches considered
- [ ] Demonstrate understanding of trade-offs

---

## Key Talking Points to Prepare

### State Management Choice

- **Why did you choose this solution?**
- What are the trade-offs vs alternatives?
- When would you choose differently?

### Error Handling Strategy

- How do you differentiate error types?
- What information do you show to users?
- How do you handle retry logic?
- How would you log errors for debugging?

### Performance Optimization

- Server vs Client components strategy
- When to use React.memo/useMemo/useCallback
- Image optimization approaches
- Bundle size considerations
- Data fetching strategies (SSR, SSG, ISR, CSR)

### Scalability Considerations

- How would you handle pagination?
- How would you implement infinite scroll?
- How would you cache data across routes?
- How would you handle real-time updates?

### Security & Safety

- How do you sanitize external data?
- How do you handle XSS risks?
- How do you manage API keys/secrets?
- How do you validate user input?

---

## Common Pitfalls to Avoid

- [ ] Don't over-engineer the initial solution
- [ ] Don't forget to handle loading states
- [ ] Don't ignore TypeScript errors
- [ ] Don't hardcode values that should be dynamic
- [ ] Don't forget responsive design
- [ ] Don't skip error boundaries
- [ ] Don't forget to explain your thinking aloud
- [ ] Don't panic if you don't finish everything

---

## Success Criteria

✅ **Functional**: Data fetches and displays correctly
✅ **Styled**: Matches design screenshot reasonably well
✅ **Robust**: Handles loading, error, and empty states
✅ **Clean**: Code is readable and well-organized
✅ **Explained**: Can articulate decisions and trade-offs
✅ **Professional**: Uses best practices and proper patterns

---

## Notes Section

_Use this space to track changes to architecture or requirements:_
