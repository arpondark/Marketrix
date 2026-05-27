# Marketrix — Monolithic Spring Boot Architecture Spec

**Date:** 2026-05-27  
**Status:** Approved  
**Stack:** Spring Boot 4.0.6 / Java 17 / PostgreSQL + pgvector / Next.js 16 frontend

---

## 1. Overview

Marketrix is an AI-powered marketplace connecting founders to affordable market research and analysts to monetization channels. This spec defines the full backend implementation as a **monolithic Spring Boot application** with 9 internal service modules communicating via Spring events.

### Design Principles

- Single deployable JAR — no microservice infrastructure overhead
- Package-per-service separation — each module owns its controller/service/repository/entity
- Internal communication via `ApplicationEventPublisher` — decoupled without HTTP
- Async AI pipeline — non-blocking LLM calls via `@Async`
- pgvector for semantic search — no external vector DB needed

---

## 2. Package Structure

```
com.example.marketrix/
├── config/                  # Spring configuration (Security, Async, WebSocket, Cache, CORS)
├── security/                # JWT provider, auth filter, SecurityConfig
├── common/                  # Shared: BaseEntity, ApiResponse, exceptions, PagedResponse
├── auth/                    # Auth Service
├── intake/                  # Startup Intake Service
├── ai/                      # AI Orchestrator Service
├── recommendation/          # Recommendation Service
├── marketplace/             # Marketplace Service
├── report/                  # Report Service
├── messaging/               # Messaging Service
├── feedback/                # Feedback Service
├── admin/                   # Admin Service
└── MarketrixApplication.java
```

Each service package follows:
```
<service>/
├── controller/    # REST endpoints
├── service/       # Business logic
├── repository/    # Spring Data JPA interfaces
├── entity/        # JPA entities
├── dto/           # Request/Response objects
├── event/         # Domain events (published/consumed)
└── enums/         # Service-specific enums
```

---

## 3. Service Specifications

### 3.1 Auth Service

**Package:** `com.example.marketrix.auth`

| Component | Detail |
|-----------|--------|
| Controller | `AuthController` — `/api/auth/**` |
| Endpoints | `POST /register`, `POST /login`, `POST /refresh`, `POST /logout` |
| Service | `AuthService` — registration, credential validation, token issuance |
| Entities | `User` (id UUID, email, passwordHash, role, status, fullName, bio, expertiseTags, avatarUrl, createdAt, updatedAt), `RefreshToken` (id, userId, token, expiresAt) |
| Enums | `Role` {FOUNDER, ANALYST, ADMIN}, `UserStatus` {PENDING, ACTIVE, SUSPENDED} |
| DTOs | `RegisterRequest`, `LoginRequest`, `AuthResponse` (accessToken, refreshToken, userDto) |
| Security | BCrypt (strength 12), JWT access token (15 min), refresh token (7 days, stored in DB) |
| Library | JJWT 0.12.x for token generation/validation |

### 3.2 Startup Intake Service

**Package:** `com.example.marketrix.intake`

| Component | Detail |
|-----------|--------|
| Controller | `IntakeController` — `/api/startups/**` |
| Endpoints | `POST /brief`, `GET /{id}`, `GET /my-briefs` |
| Service | `IntakeService` — validate, persist, publish `BriefSubmittedEvent` |
| Entity | `StartupRequirement` (id, founderId, name, industry, stage, geography, budget, goals JSONB, problems JSONB, competitors JSONB, metadata JSONB, status, createdAt) |
| Enums | `BriefStatus` {SUBMITTED, PROCESSING, COMPLETE, FAILED} |
| DTOs | `BriefSubmitRequest`, `BriefResponse` |
| Access | Founders only; can only view own briefs |
| Event | Publishes `BriefSubmittedEvent(requirementId)` on successful submission |

### 3.3 AI Orchestrator Service

**Package:** `com.example.marketrix.ai`

| Component | Detail |
|-----------|--------|
| Controller | None — internal only |
| Trigger | `@EventListener` on `BriefSubmittedEvent`, runs `@Async` |
| Sub-services | `BriefParserService`, `SegmentGeneratorService`, `EmbeddingService`, `PositioningService` |
| LLM Client | `ClaudeApiClient` — POST to `https://api.anthropic.com/v1/messages` via `RestClient` |
| Embedding Client | `OpenAiEmbeddingClient` — POST to OpenAI embeddings endpoint |
| Pipeline | parse → mapFeatures → generateSegments → generateEmbedding → publish `SegmentsGeneratedEvent` |
| Prompts | Loaded from `src/main/resources/prompts/*.txt` |
| Retry | `@Retryable(maxAttempts=3, backoff=@Backoff(delay=2000))` on LLM calls |
| Error | On final failure → set `BriefStatus.FAILED`, log with full context |
| Entities | `AudienceSegment` (id, requirementId, name, tagline, demographics JSONB, psychographics JSONB, behavioralSignals JSONB, preferredChannels JSONB, viabilityScore, rationale), `BriefEmbedding` (id, requirementId, embedding vector(1536)) |

### 3.4 Recommendation Service

**Package:** `com.example.marketrix.recommendation`

| Component | Detail |
|-----------|--------|
| Controller | `RecommendationController` — `/api/recommendations/{requirementId}` |
| Endpoints | `GET /{requirementId}` |
| Trigger | `@EventListener` on `SegmentsGeneratedEvent` → generates recommendations |
| Service | `RecommendationService` — vector search + scoring + persistence |
| Scoring | `score = 0.5 * cosineSim + 0.3 * tagOverlap + 0.2 * reputation` |
| Vector Query | Native SQL: `SELECT id, 1 - (embedding <=> :query) AS sim FROM strategist_embeddings ORDER BY sim DESC LIMIT 10` |
| Entity | `Recommendation` (id, requirementId, type, targetId, score, explanation, createdAt) |
| Enums | `RecommendationType` {CHANNEL, STRATEGIST, REPORT, POSITIONING} |
| Notification | Publishes `RecommendationsReadyEvent` → WebSocket push |

### 3.5 Marketplace Service

**Package:** `com.example.marketrix.marketplace`

| Component | Detail |
|-----------|--------|
| Controller | `MarketplaceController` — `/api/marketplace/**` |
| Endpoints | `GET /services`, `POST /services`, `GET /services/{id}`, `GET /gigs`, `POST /gigs`, `POST /gigs/{id}/apply` |
| Service | `MarketplaceService` — CRUD listings, gig management, proposal handling |
| Entities | `ServiceListing` (id, analystId, title, description, price, category, tags JSONB, status), `Gig` (id, founderId, title, description, budget, requirements JSONB, status), `Proposal` (id, gigId, analystId, coverLetter, proposedPrice, status) |
| Enums | `ListingStatus` {DRAFT, ACTIVE, PAUSED}, `GigStatus` {OPEN, IN_PROGRESS, COMPLETED, CANCELLED}, `ProposalStatus` {PENDING, ACCEPTED, REJECTED} |
| Filtering | JPA Specifications for category, price range, tags |
| Access | Analysts create services/proposals; Founders create gigs/accept proposals |

### 3.6 Report Service

**Package:** `com.example.marketrix.report`

| Component | Detail |
|-----------|--------|
| Controller | `ReportController` — `/api/reports/**` |
| Endpoints | `GET /` (catalog), `GET /{id}`, `POST /` (publish), `POST /{id}/purchase`, `GET /{id}/download` |
| Service | `ReportService` — catalog CRUD, purchase flow, signed URL generation |
| File Storage | `FileStorageService` — S3-compatible (AWS SDK v2); upload on publish, signed URL on download (24h expiry) |
| Entities | `Report` (id, analystId, title, description, price, tier, category, tags JSONB, fileKey, previewText, purchaseCount, status, createdAt), `ReportPurchase` (id, reportId, founderId, transactionId, purchasedAt) |
| Enums | `ReportTier` {PREMIUM, STANDARD, ACCESSIBLE}, `ReportStatus` {PENDING_REVIEW, PUBLISHED, REJECTED} |
| Purchase Flow | Verify Stripe payment → create `ReportPurchase` → return signed download URL |
| Access | Browse: all; Download: purchasers only; Publish: analysts |

### 3.7 Messaging Service

**Package:** `com.example.marketrix.messaging`

| Component | Detail |
|-----------|--------|
| Controller | `MessagingController` — `/api/messages/**` (REST) |
| WebSocket | `WebSocketConfig` + STOMP over SockJS at `/ws`; topics: `/topic/conversation.{id}`, `/topic/notifications.{userId}` |
| Endpoints | `GET /conversations`, `GET /conversations/{id}`, `POST /conversations/{id}/send` |
| Service | `MessagingService` — persist message, broadcast via `SimpMessagingTemplate` |
| Entities | `Conversation` (id, type, createdAt), `ConversationParticipant` (conversationId, userId), `Message` (id, conversationId, senderId, content, readAt, createdAt) |
| Enums | `ConversationType` {DIRECT, GIG_DISCUSSION} |
| Real-time | On send → save to DB → `messagingTemplate.convertAndSend("/topic/conversation." + id, messageDto)` |

### 3.8 Feedback Service

**Package:** `com.example.marketrix.feedback`

| Component | Detail |
|-----------|--------|
| Controller | `FeedbackController` — `/api/feedback/**` |
| Endpoints | `POST /`, `PATCH /segments/{id}/rate`, `GET /analyst/{id}/ratings` |
| Service | `FeedbackService` — ingest signals, compute reputation |
| Entity | `Feedback` (id, userId, targetType, targetId, signalType, rating, comment, createdAt) |
| Enums | `TargetType` {SEGMENT, REPORT, ANALYST, RECOMMENDATION}, `SignalType` {THUMBS_UP, THUMBS_DOWN, STAR_RATING, PURCHASE, HIRE, IGNORED} |
| Reputation | `reputation = 0.6 * recentAvg(90d) + 0.4 * olderAvg` |
| Batch | `@Scheduled(cron = "0 0 2 * * *")` nightly recalculation |
| Event | Publishes `FeedbackReceivedEvent` for recommendation re-ranking |

### 3.9 Admin Service

**Package:** `com.example.marketrix.admin`

| Component | Detail |
|-----------|--------|
| Controller | `AdminController` — `/api/admin/**` |
| Endpoints | `GET /users`, `PATCH /users/{id}/approve`, `PATCH /users/{id}/suspend`, `GET /reports/pending`, `PATCH /reports/{id}/approve`, `GET /stats` |
| Service | `AdminService` — approval workflows, moderation, analytics aggregation |
| DTOs | `PlatformStatsResponse` (totalUsers, totalReports, totalTransactions, revenue, activeGigs, avgRating) |
| Access | `@PreAuthorize("hasRole('ADMIN')")` on all endpoints |
| Tables | No new tables — aggregates across existing schema |

---

## 4. Database Schema

**Engine:** PostgreSQL 15 + pgvector extension

| Table | Key Columns | Notes |
|-------|-------------|-------|
| `users` | id (UUID PK), email (unique), password_hash, role, status, full_name, bio, expertise_tags (text[]), avatar_url, created_at, updated_at | Central user table |
| `refresh_tokens` | id, user_id (FK→users), token (unique), expires_at | JWT refresh tokens |
| `startup_requirements` | id, founder_id (FK→users), name, industry, stage, geography, budget, goals (jsonb), problems (jsonb), competitors (jsonb), metadata (jsonb), status, created_at | Founder briefs |
| `audience_segments` | id, requirement_id (FK→startup_requirements), name, tagline, demographics (jsonb), psychographics (jsonb), behavioral_signals (jsonb), preferred_channels (jsonb), viability_score (float), rationale (text) | AI-generated segments |
| `brief_embeddings` | id, requirement_id (FK→startup_requirements), embedding (vector(1536)) | pgvector |
| `strategist_embeddings` | id, user_id (FK→users), embedding (vector(1536)) | pgvector |
| `recommendations` | id, requirement_id (FK), type, target_id (UUID), score (float), explanation (text), created_at | AI recommendations |
| `service_listings` | id, analyst_id (FK→users), title, description, price (decimal), category, tags (jsonb), status, created_at | Expert services |
| `gigs` | id, founder_id (FK→users), title, description, budget (decimal), requirements (jsonb), status, created_at | Founder gig posts |
| `proposals` | id, gig_id (FK→gigs), analyst_id (FK→users), cover_letter, proposed_price (decimal), status, created_at | Gig applications |
| `reports` | id, analyst_id (FK→users), title, description, price (decimal), tier, category, tags (jsonb), file_key, preview_text, purchase_count (int), status, created_at | Report catalog |
| `report_purchases` | id, report_id (FK→reports), founder_id (FK→users), transaction_id (FK), purchased_at | Purchase records |
| `transactions` | id, user_id (FK→users), type, amount (decimal), currency, stripe_payment_id, status, created_at | Payment records |
| `conversations` | id, type, created_at | Chat conversations |
| `conversation_participants` | conversation_id (FK), user_id (FK) | M:N join |
| `messages` | id, conversation_id (FK), sender_id (FK→users), content (text), read_at, created_at | Chat messages |
| `feedback` | id, user_id (FK→users), target_type, target_id (UUID), signal_type, rating (int), comment, created_at | All feedback signals |

---

## 5. Cross-Cutting Concerns

| Concern | Implementation |
|---------|---------------|
| **Authentication** | Spring Security 6 + JWT filter chain; stateless sessions |
| **Authorization** | `@PreAuthorize` annotations with role-based access |
| **Async** | `@EnableAsync` + `ThreadPoolTaskExecutor` (core=4, max=8, queue=100) |
| **Events** | `ApplicationEventPublisher` for inter-service communication |
| **Scheduling** | `@EnableScheduling` for nightly batch jobs |
| **Migrations** | Flyway — `V1__init_schema.sql`, `V2__add_pgvector.sql` |
| **Exception Handling** | `@RestControllerAdvice` → `{status, message, errors[], timestamp}` |
| **Pagination** | Spring Data `Pageable` on all list endpoints |
| **Caching** | Caffeine in-memory; `@Cacheable` on report catalog, analyst profiles |
| **Rate Limiting** | Custom filter: 100 req/min general, 10 req/min AI endpoints |
| **CORS** | `WebMvcConfigurer` allowing frontend origin |
| **API Docs** | SpringDoc OpenAPI → Swagger UI at `/swagger-ui.html` |
| **Health** | Actuator `/actuator/health` with DB + custom AI health indicators |
| **Logging** | SLF4J + Logback; JSON format in prod; MDC request tracing |
| **File Upload** | `MultipartFile`; max 50MB; PDF/DOCX validation |

---

## 6. Dependencies (pom.xml)

| Artifact | Purpose |
|----------|---------|
| `spring-boot-starter-data-jpa` | JPA + Hibernate |
| `spring-boot-starter-security` | Auth framework |
| `spring-boot-starter-validation` | Bean validation |
| `spring-boot-starter-websocket` | Real-time messaging |
| `spring-boot-starter-actuator` | Health & metrics |
| `spring-boot-starter-cache` | Caching |
| `flyway-core` + `flyway-database-postgresql` | Migrations |
| `postgresql` | JDBC driver |
| `com.pgvector:pgvector` (0.1.6) | pgvector Java types |
| `io.jsonwebtoken:jjwt-api/impl/jackson` (0.12.6) | JWT |
| `org.springdoc:springdoc-openapi-starter-webmvc-ui` (2.6.0) | API docs |
| `spring-retry` + `spring-boot-starter-aop` | LLM retry logic |
| `com.github.ben-manes.caffeine:caffeine` | Cache provider |
| `software.amazon.awssdk:s3` | File storage |
| `com.stripe:stripe-java` (26.x) | Payments |
| `org.projectlombok:lombok` | Boilerplate reduction |

---

## 7. Configuration Files

| File | Purpose |
|------|---------|
| `application.yml` | Base config: server, datasource, JPA, flyway, logging defaults |
| `application-dev.yml` | Local PostgreSQL, debug logging, permissive CORS |
| `application-prod.yml` | Production DB, strict CORS, info logging, actuator security |
| `prompts/brief-extraction.txt` | Claude system prompt for structured extraction |
| `prompts/segment-generation.txt` | Claude system prompt for audience segmentation |
| `prompts/positioning-analysis.txt` | Claude system prompt for competitive analysis |
| `db/migration/V1__init_schema.sql` | Full schema creation |
| `db/migration/V2__add_pgvector.sql` | pgvector extension + embedding tables |

---

## 8. Event Flow Summary

```
BriefSubmittedEvent (Intake → AI Orchestrator)
    ↓
SegmentsGeneratedEvent (AI Orchestrator → Recommendation Service)
    ↓
RecommendationsReadyEvent (Recommendation → WebSocket push to frontend)

FeedbackReceivedEvent (Feedback → Recommendation Service for re-ranking)
```

---

## 9. Security Model

| Layer | Mechanism |
|-------|-----------|
| Transport | HTTPS (TLS termination at load balancer/proxy) |
| Authentication | JWT Bearer token in Authorization header |
| Authorization | Role-based: FOUNDER, ANALYST, ADMIN |
| Password | BCrypt strength 12 |
| Token | Access 15min / Refresh 7 days |
| Data | Row-level filtering (founders see own data only) |
| API Keys | Anthropic + OpenAI keys in env vars, never in code |
| Payments | Stripe webhook signature verification |
| Files | Signed URLs with 24h expiry |

---

## 10. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| AI response time | < 30 seconds for full pipeline |
| API response time | < 200ms for CRUD endpoints |
| Concurrent users | 100+ (MVP) |
| File size limit | 50MB per upload |
| Uptime | 99% (single instance acceptable for MVP) |
| Data retention | Indefinite for user content; 90 days for logs |
