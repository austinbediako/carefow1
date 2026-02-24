# MedFlow Engineering Specification Document

## 1. System Overview and Constraints

### 1.1 System Mission
The primary mission of MedFlow is to serve as a **Digital Bed Command and Patient Flow Intelligence Platform** for hospital operations. It aims to replace fragmented, manual coordination methods (whiteboards, phone calls, spreadsheets) with a centralized, data-driven command architecture. The system provides real-time visibility into bed occupancy, streamlines the admission and discharge processes, and ensures accountability through comprehensive audit logging.

### 1.2 Explicit Non-Goals
*   **Clinical Diagnosis:** The system is not an Electronic Health Record (EHR) for clinical documentation or diagnosis.
*   **Billing/Finance:** Financial transactions and billing integration are out of scope for the MVP.
*   **External Referrals:** Managing patient transfers from other hospitals is excluded.
*   **Predictive Analytics (V2):** Advanced AI/ML-based forecasting for bed availability and surge prediction is explicitly reserved for future versions (V2).

### 1.3 Performance Requirements
*   **Real-time Updates:** Dashboard metrics (KPIs) must reflect state changes within **< 2 seconds**.
*   **API Response Time:** 95th percentile response time for API requests must be **< 200ms**.
*   **Concurrent Users:** Support for **500+ concurrent active users** (spanning multiple departments).
*   **Database Throughput:** Handle **100+ write operations per second** during peak shifts.

### 1.4 Availability Requirements
*   **Uptime:** Target **99.9% availability** during business hours (critical hospital operations).
*   **Maintenance Windows:** Scheduled maintenance must occur during off-peak hours (02:00 - 04:00 AM) with prior notification.

### 1.5 Concurrency Assumptions
*   **Race Conditions:** Multiple staff members (e.g., Bed Managers, Ward Nurses) may attempt to modify the status of the same bed simultaneously.
*   **Optimistic Locking:** The system assumes high contention for specific resources (e.g., the last available ICU bed) and must handle conflicts gracefully.

### 1.6 Regulatory Sensitivity Assumptions
*   **HIPAA/GDPR Compliance:** Although this is an operational tool, it handles Patient Identifiable Information (PII) and Protected Health Information (PHI).
*   **Auditability:** Every state change must be traceable to a specific user, timestamp, and action context.

### 1.7 Data Sensitivity Classification
*   **High Sensitivity:** Patient Names, MRNs, Diagnosis Codes.
*   **Medium Sensitivity:** Ward Occupancy Rates, Staff Schedules.
*   **Low Sensitivity:** System Configuration, Static Resource Lists.

### 1.8 Threat Surface Analysis
*   **Internal Threats:** Unauthorized access by staff to wards/departments they do not belong to.
*   **External Threats:** Phishing attacks targeting credentials, network intrusion.
*   **Data Leakage:** Accidental exposure of patient lists via unsecure endpoints or exports.

---

## 2. High Fidelity System Architecture

### 2.1 Component Level Architecture
The system follows a **Modular Monolith** architecture within a monorepo, designed for eventual splitting into microservices if scale dictates.

*   **Frontend (Client):** Next.js 14+ (App Router), React Server Components, Tailwind CSS, Framer Motion.
    *   *Responsibility:* UI rendering, client-side state management (React Query), optimistic updates.
*   **Backend (API):** Node.js, Express, TypeScript.
    *   *Responsibility:* REST API, business logic, authentication/authorization, WebSocket management.
*   **Database:** PostgreSQL 16+.
    *   *Responsibility:* Persistent storage, relational integrity, transactional guarantees.
*   **Infrastructure:** Docker containers orchestrated via Docker Compose (Dev) / Kubernetes (Prod - Future).
*   **Reverse Proxy:** Nginx.
    *   *Responsibility:* SSL termination, load balancing, static asset caching.

### 2.2 API Boundary Definition
*   **REST API:** The primary interface for all CRUD operations (`/api/v1/...`).
*   **WebSockets (Socket.io):** For real-time updates to the dashboard (e.g., `bed.status.changed` events).

### 2.3 Trust Boundaries
*   **External Boundary:** The Nginx reverse proxy sits at the edge, terminating TLS and filtering malicious traffic.
*   **Internal Boundary:** The Backend API enforces strict authentication (JWT) and authorization (RBAC) before processing any request. The Database accepts connections *only* from the Backend container.

### 2.4 Authentication Flow Sequence
1.  **Login:** User submits credentials (POST `/auth/login`).
2.  **Verification:** Backend validates against hashed password (Argon2).
3.  **Token Issuance:** Backend issues an **Access Token** (JWT, short-lived, 15m) and a **Refresh Token** (hashed in DB, long-lived, 7d).
4.  **Cookie Set:** Tokens are sent as **HTTP-Only, Secure, SameSite=Strict cookies**.
5.  **Access:** Client includes cookies in subsequent requests.

### 2.5 Authorization Enforcement Flow
*   **Middleware:** Every protected route passes through `authenticate` (validates JWT) and `authorize` (checks User Role vs. Required Role).
*   **Resource Level:** Controllers verify if the user has access to the specific data entity (e.g., a Nurse can only update beds in their assigned Ward).

### 2.6 Data Flow Diagram Explanation
*   **Write Path:** Client -> Nginx -> API (Validation -> Auth -> Controller -> Service -> DB Transaction).
*   **Read Path:** Client -> Nginx -> API (Auth -> Controller -> Service -> DB Query).
*   **Event Path:** Service (after DB commit) -> Socket.io Manager -> Broadcast to subscribed Clients.

### 2.7 Concurrency Control Model
*   **Database Level:** `SERIALIZABLE` or `REPEATABLE READ` isolation levels for critical transactions (Allocation).
*   **Application Level:** Optimistic concurrency control using `version` fields on critical entities (Bed, AdmissionRequest).

### 2.8 Logging and Observability Architecture
*   **Structured Logging:** JSON-formatted logs via `pino`.
*   **Correlation IDs:** `X-Request-ID` attached to every request and propagated through all logs.
*   **Audit Trail:** dedicated `AuditLog` table for business-critical events.

### 2.9 Horizontal Scaling Model
*   **Stateless API:** The backend is stateless; sessions are token-based. Multiple API instances can run behind a load balancer.
*   **Read Replicas:** Database can be scaled with read replicas for dashboard queries (future optimization).

### 2.10 Failure Handling Model
*   **Graceful Degradation:** If the WebSocket service fails, the frontend falls back to polling (SWR/React Query).
*   **Circuit Breakers:** Implemented for external dependencies (if any).
*   **Retries:** Automatic retries for transient DB connection errors.

---

## 3. Backend Engineering Specification

### 3.1 Folder Structure
```
src/
├── config/             # Environment variables, constants
├── modules/            # Domain modules
│   ├── auth/           # Authentication & Authorization
│   ├── beds/           # Bed management
│   ├── admissions/     # Admission requests
│   ├── discharge/      # Discharge workflow
│   └── users/          # User management
├── shared/             # Shared utilities, types, middleware
│   ├── middleware/     # Auth, Error, Validation, Logging
│   ├── utils/          # Helper functions
│   └── errors/         # Custom error classes
├── prisma/             # Database schema and migrations
└── server.ts           # Entry point
```

### 3.2 Module Breakdown
Each module (e.g., `beds`) contains:
*   `controller.ts`: Handles HTTP requests/responses.
*   `service.ts`: Contains business logic.
*   `repository.ts` (Optional): Data access layer abstraction.
*   `schema.ts`: Zod validation schemas.
*   `routes.ts`: Route definitions.

### 3.3 Controller Design
Controllers must be "thin." They:
1.  Parse input (body, query, params).
2.  Call the Service.
3.  Format the response (DTO).
4.  Handle errors via `next(err)`.

### 3.4 Service Layer Responsibilities
*   **Business Logic:** Enforcing rules (e.g., "Cannot allocate a cleaning bed").
*   **Transactions:** Managing atomic operations.
*   **Event Emitting:** Triggering WebSocket events.

### 3.5 DTO and Validation Schema Design
*   **Input Validation:** STRICT Zod schemas for all inputs. Unknown keys are stripped.
*   **Output DTOs:** Responses are transformed to remove sensitive internal fields (e.g., `passwordHash`).

### 3.6 Middleware Layering Order
1.  `helmet` (Security Headers)
2.  `cors`
3.  `rateLimit`
4.  `express.json` (Body Parser)
5.  `requestLogger` (Pino)
6.  `authenticate` (JWT) -- *Applied to protected routes*
7.  `authorize` (RBAC) -- *Applied to specific routes*
8.  `errorHandler` (Global Exception Filter)

### 3.7 Transaction Handling Strategy
Use `prisma.$transaction` for all multi-step write operations.
**Example (Bed Allocation):**
```typescript
await prisma.$transaction(async (tx) => {
  // 1. Lock & Check
  const bed = await tx.bed.findUnique({ where: { id }, select: { status: true } });
  if (bed.status !== "AVAILABLE") throw new ConflictError("Bed not available");

  // 2. Update Bed
  await tx.bed.update({ where: { id }, data: { status: "RESERVED" } });

  // 3. Create Allocation
  await tx.allocation.create({ ... });

  // 4. Log Audit
  await tx.auditLog.create({ ... });
});
```

### 3.8 Locking Strategy for Bed Allocation
*   **Pessimistic Locking (Row-level):** Explicitly locking the bed row during allocation is critical to prevent double-booking. Prisma supports this via raw SQL `SELECT FOR UPDATE` or native locking features if available. Given Prisma limitations, we will use **Optimistic Concurrency Control** via a `version` field increment on update.

### 3.9 Audit Logging Implementation Design
*   **Centralized Service:** `AuditService.log(action, actor, target, metadata)`.
*   **Asynchronous:** Logging should not block the main response (unless strict regulatory requirement dictates otherwise).
*   **Immutable:** The `AuditLog` table is append-only.

### 3.10 Error Taxonomy
*   `AppError` (Base Class)
    *   `ValidationError` (400)
    *   `AuthenticationError` (401)
    *   `AuthorizationError` (403)
    *   `NotFoundError` (404)
    *   `ConflictError` (409)
    *   `InternalServerError` (500)

### 3.11 API Response Standardization Format
```json
{
  "success": true,
  "data": { ... }, // OR null
  "meta": { ... } // Pagination, etc.
}
// Error Response
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Bed with ID x not found"
  }
}
```

---

## 4. Frontend Engineering Specification

### 4.1 Application Structure
```
apps/frontend/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Public routes
│   └── (dashboard)/      # Protected routes (Layout with Sidebar)
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn/Tailwind primitives
│   └── domain/           # Business-specific components (BedCard, WardGrid)
├── lib/                  # Utilities
│   ├── api.ts            # Axios/Fetch wrapper
│   └── hooks/            # Custom React hooks
├── stores/               # Client-state (Zustand)
└── types/                # TypeScript definitions
```

### 4.2 State Boundaries
*   **Server State:** React Query (TanStack Query). Used for fetching Wards, Beds, Requests. Handles caching, invalidation, and polling.
*   **UI State:** Zustand or React Context. Used for Sidebar toggle, Modal visibility, Filter settings.
*   **Form State:** React Hook Form + Zod Resolver.

### 4.3 React Query Integration Plan
*   **Hydration:** Prefetch data on the server (RSC) and hydrate the query client.
*   **Invalidation:** Mutations (e.g., `useAllocateBed`) must trigger `queryClient.invalidateQueries(['beds'])` to refresh the view.

### 4.4 Auth State Persistence Design
*   **Session:** Handled via HTTP-Only cookies (secure).
*   **User Profile:** Fetched on app load (`/api/me`) and stored in a Global Context/Zustand store.
*   **Middleware:** Next.js Middleware checks for the presence of the cookie to protect routes.

### 4.5 Route Protection Mechanism
*   **Next.js Middleware:** Intercepts requests. If `token` cookie is missing -> Redirect to `/login`.
*   **RBAC Wrapper:** `<RoleGuard allowedRoles={['ADMIN']}>{children}</RoleGuard>` component to conditionally render UI sections.

### 4.6 Role Aware UI Rendering Logic
*   The Sidebar and Dashboard widgets render based on the user's role found in the User Context.
*   *Example:* Only `BED_MANAGER` sees the "Allocate" button. Others see "Request Bed".

### 4.7 Component Architecture Pattern
*   **Atomic Design:** Atoms (Button), Molecules (SearchInput), Organisms (BedCard), Templates (DashboardLayout).
*   **Presentational vs. Container:** Separate data fetching (Container) from rendering (Presentational) where possible.

### 4.8 Error Boundary Implementation
*   **Global Error Boundary:** Catch unhandled exceptions and show a "Something went wrong" page.
*   **Query Error Boundaries:** React Query `ErrorBoundary` for failed data fetches, allowing "Retry" within the specific widget.

### 4.9 Loading State Handling Strategy
*   **Skeletons:** Use Skeleton loaders (pulsing gray boxes) that mimic the layout of the content being loaded.
*   **Suspense:** Leverage React Suspense for streaming server components.

### 4.10 Data Synchronization Strategy
*   **Polling:** Dashboard polls every 15-30 seconds.
*   **Optimistic Updates:** UI updates immediately upon user action, then reverts if the server request fails.

---

## 5. Database Engineering Specification

### 5.1 Schema Definitions (Prisma)
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role
  name      String
  departmentId String?
  auditLogs AuditLog[]
}

enum Role {
  ADMIN
  BED_MANAGER
  DOCTOR
  NURSE
  EXECUTIVE
}

model Bed {
  id        String    @id @default(uuid())
  wardId    String
  name      String
  status    BedStatus @default(AVAILABLE)
  type      BedType
  version   Int       @default(0) // For Optimistic Concurrency
  allocations Allocation[]
}

enum BedStatus {
  AVAILABLE
  RESERVED
  OCCUPIED
  CLEANING
  OUT_OF_SERVICE
}

model AdmissionRequest {
  id        String   @id @default(uuid())
  patientId String
  priority  Priority
  status    RequestStatus
}

model Allocation {
  id        String   @id @default(uuid())
  bedId     String
  requestId String
  timestamp DateTime @default(now())
}
```

### 5.2 Index Strategy
*   `User.email`: Unique Index.
*   `Bed.wardId`: Index for fast filtering by ward.
*   `AdmissionRequest.status`: Index for querying pending requests.
*   `AuditLog.timestamp`: Index for time-range queries.

### 5.3 Transaction Boundaries
*   All operations affecting `Bed` status and `Allocation` history must be in a single transaction.

### 5.4 Concurrency Guarantees
*   Use `version` field (Integer) on `Bed`.
*   `UPDATE Bed SET status = 'RESERVED', version = version + 1 WHERE id = :id AND version = :currentVersion`
*   If rows affected == 0, throw `ConcurrentModificationError`.

### 5.5 Migration Workflow
*   **Dev:** `prisma migrate dev` (Automatic migration file generation).
*   **Prod:** `prisma migrate deploy` (Applies pending migrations).

### 5.6 Seed Strategy
*   `prisma/seed.ts` will populate:
    *   Default Roles
    *   Initial Admin User
    *   Standard Wards (ED, ICU, General)
    *   Dummy Beds for development.

---

## 6. Security Architecture Specification

### 6.1 Authentication Design
*   **Primary:** JWT (RS256 or HS256).
*   **Storage:** `httpOnly` Cookies (prevents XSS theft).

### 6.2 Refresh Rotation Mechanism
*   **Refresh Token:** Stored in DB (hashed).
*   **Rotation:** Each time a Refresh Token is used to get a new Access Token, a *new* Refresh Token is issued, and the old one is invalidated (deleted/marked used).
*   **Reuse Detection:** If an old Refresh Token is used, invalidate *all* tokens for that user family (indicates theft).

### 6.3 Password Hashing
*   **Algorithm:** Argon2id.
*   **Parameters:** Minimum 19 MiB memory, 2 iterations, 1 degree of parallelism.

### 6.4 CSRF Mitigation
*   **SameSite=Strict** cookies.
*   **Double Submit Cookie** pattern (optional, if SameSite is insufficient for legacy browser support).

### 6.5 Input Validation Rules
*   **Strict Whitelisting:** Using Zod.
*   **Sanitization:** Escape all HTML characters to prevent XSS.

### 6.6 Rate Limiting Configuration
*   **Login Endpoint:** 5 requests per minute per IP.
*   **General API:** 100 requests per minute per IP.
*   **Redis:** Use Redis to store rate limit counters (or memory for MVP).

### 6.7 CORS Configuration
*   **Allowed Origins:** Strictly limited to the frontend domain (e.g., `https://medflow.internal`).
*   **Methods:** GET, POST, PUT, PATCH, DELETE.

### 6.8 Secure Headers (Helmet)
*   `Content-Security-Policy`: Restrict scripts to self.
*   `X-Frame-Options`: DENY (prevent clickjacking).
*   `Strict-Transport-Security`: Max-age=1 year; includeSubDomains.

---

## 7. DevOps and Infrastructure Specification

### 7.1 Docker Architecture
*   `app-frontend`: Node.js container (Next.js).
*   `app-backend`: Node.js container (Express).
*   `db-postgres`: PostgreSQL 16 container.
*   `proxy-nginx`: Nginx container.

### 7.2 Network Segmentation
*   **Public Network:** Nginx (Ports 80/443).
*   **Private Network (Bridge):** Frontend, Backend.
*   **Data Network (Isolated):** Database (only accessible by Backend).

### 7.3 Environment Variable Strategy
*   **.env.example:** Committed to repo (safe defaults).
*   **.env.local:** Not committed (secrets).
*   **Production:** Inject variables via Docker Swarm Secrets or Kubernetes Secrets.

### 7.4 CI Pipeline Stages
1.  **Lint:** Eslint + Prettier check.
2.  **Type Check:** `tsc --noEmit`.
3.  **Test:** Run Unit and Integration tests.
4.  **Build:** Build Docker images.

---

## 8. Testing Engineering Plan

### 8.1 Unit Testing Coverage Map
*   **Services:** 100% coverage of business logic (e.g., bed allocation rules).
*   **Utils:** 100% coverage of helper functions.
*   **Components:** Snapshot tests for complex UI components.

### 8.2 Integration Test Scenarios
*   **Auth:** Login -> Get Token -> Access Protected Route.
*   **Flow:** Create Request -> Allocate Bed -> Verify Bed Status -> Verify Audit Log.

### 8.3 Security Testing Checklist
*   Attempt SQL Injection on login.
*   Attempt XSS on patient name input.
*   Attempt to access Admin route as Nurse.

---

## 9. Engineering Task Breakdown

### Epic 1: Foundation
*   [ ] **Task 1.1:** Initialize Monorepo (Next.js + Express).
*   [ ] **Task 1.2:** Setup Docker Compose + Nginx.
*   [ ] **Task 1.3:** Configure ESLint, Prettier, Husky.

### Epic 2: Authentication
*   [ ] **Task 2.1:** Implement User Model & Migration.
*   [ ] **Task 2.2:** Implement Login API (Argon2 + JWT).
*   [ ] **Task 2.3:** Implement Refresh Token Rotation.
*   [ ] **Task 2.4:** Build Login UI.

### Epic 3: Bed Management (Core)
*   [ ] **Task 3.1:** Implement Bed/Ward Models & Seeds.
*   [ ] **Task 3.2:** Build Bed Management API (CRUD).
*   [ ] **Task 3.3:** Build Ward View UI (Grid).

### Epic 4: Admission Flow
*   [ ] **Task 4.1:** Implement Admission Request Model.
*   [ ] **Task 4.2:** Build Request Queue UI.
*   [ ] **Task 4.3:** Implement Allocation Transaction (Backend).
*   [ ] **Task 4.4:** Build Allocation Modal (Frontend).

---

## 10. Risk Register

### 10.1 Technical Risks
*   **Risk:** WebSocket scaling issues with high concurrency.
    *   *Mitigation:* Use Redis Adapter for Socket.io to allow scaling across multiple instances.
*   **Risk:** Complex state synchronization between Bed Manager and Ward View.
    *   *Mitigation:* Use React Query invalidation strategies aggressively.

### 10.2 Operational Risks
*   **Risk:** User resistance to digital workflow.
    *   *Mitigation:* UX must be faster than the manual process (clean, keyboard-friendly).
*   **Risk:** Network outage in hospital.
    *   *Mitigation:* PWA capabilities (offline mode) - *Future Scope*.

### 10.3 Concurrency Risks
*   **Risk:** Double booking beds.
    *   *Mitigation:* Database transactions + Optimistic Locking (Versioning).
