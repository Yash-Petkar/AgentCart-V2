# AgentCart

## AI-Native E-Commerce Platform

**AgentCart** is a full-stack, AI-powered e-commerce platform that
combines traditional online shopping with an intelligent AI shopping
agent.

The core idea is simple:

> **Instead of making users search, filter, compare, and manage products
> manually, AgentCart lets users describe what they want in natural
> language and uses AI to assist them through the shopping journey.**

For example:

``` text
"Find me the best gaming laptop under ₹70,000 with 16GB RAM."
```

AgentCart can understand the request, search the product catalog,
recommend suitable products, compare options, and assist with cart and
purchasing actions.

------------------------------------------------------------------------

# 1. Project Vision

Traditional e-commerce usually requires the customer to perform many
separate steps:

``` text
Open Store
   ↓
Search Product
   ↓
Apply Filters
   ↓
Open Multiple Products
   ↓
Compare Specifications
   ↓
Choose Product
   ↓
Add to Cart
   ↓
Checkout
   ↓
Payment
   ↓
Track Order
```

AgentCart introduces an AI-assisted workflow:

``` text
User's Natural Language Request
             ↓
        AI Shopping Agent
             ↓
       Intent Understanding
             ↓
     Product Search / Filtering
             ↓
   Recommendation / Comparison
             ↓
       Shopping Action
             ↓
            Cart
             ↓
          Checkout
             ↓
      Razorpay Payment
             ↓
           Order
             ↓
       Order Tracking
```

The AI is designed to reduce the number of manual steps while keeping
sensitive commerce operations under backend control.

------------------------------------------------------------------------

# 2. Main Objectives

AgentCart is designed around five objectives:

### 1. Intelligent Product Discovery

Allow users to describe their requirements naturally instead of
depending only on traditional filters.

### 2. AI-Powered Decision Support

Help users compare products and understand which product best matches
their requirements.

### 3. Agentic Shopping

Move beyond simple chatbot responses by allowing the AI to interact with
supported commerce functions such as cart operations.

### 4. Complete E-Commerce Workflow

Provide a complete flow from product discovery to cart, checkout,
payment, orders, and tracking.

### 5. Multi-Role Platform

Support separate experiences for:

``` text
Customer
Seller
Admin
```

------------------------------------------------------------------------

# 3. Key Features

## Customer Features

### Authentication

Customers can:

- Register
- Login
- Access their account
- Manage their profile
- Manage addresses
- Access their orders

### Product Discovery

Customers can:

- Browse products
- Search products
- View product details
- Compare products
- View recommendations

### Shopping Cart

Customers can:

- Add products
- Remove products
- Change quantity
- View cart totals
- Proceed to checkout

### Checkout

The checkout flow is designed to:

``` text
Cart
 ↓
Address
 ↓
Order Creation
 ↓
Razorpay Checkout
 ↓
Payment Verification
 ↓
Order Confirmation
```

### Orders

Customers can:

- View order history
- View individual orders
- View order status
- View tracking information

------------------------------------------------------------------------

# 4. AI Shopping Agent

The AI assistant is one of the main components of AgentCart.

It is designed to understand shopping requests written in natural
language.

## Example

User:

``` text
I need a laptop for programming and gaming under ₹80,000.
```

The AI can interpret:

``` text
Category: Laptop
Use case: Programming + Gaming
Maximum budget: ₹80,000
```

It can then use product data to identify suitable products.

------------------------------------------------------------------------

## AI Capabilities

The AgentCart AI architecture is intended to support:

- Natural-language search
- Intent extraction
- Product recommendations
- Product comparison
- Budget constraints
- Use-case matching
- Conversational context
- Cart operations
- Order-related assistance

------------------------------------------------------------------------

# 5. Agentic AI Workflow

A normal chatbot may only answer:

``` text
"Here are three laptops you may like."
```

An agentic shopping system should be capable of performing an action
when the user explicitly requests one.

Example:

``` text
User:
Find the best gaming laptop under ₹70,000
and add the best one to my cart.
```

Expected workflow:

``` text
             User Request
                   ↓
            AI Agent
                   ↓
          Extract Requirements
                   ↓
       Search Product Catalog
                   ↓
         Filter Candidates
                   ↓
        Rank Suitable Products
                   ↓
           Select Product
                   ↓
       Backend Validates Product
                   ↓
          Add to Cart API
                   ↓
       Backend Confirms Action
                   ↓
          AI Reports Result
```

The important security principle is:

> **The AI should request actions through controlled backend tools/APIs
> rather than directly modifying the database.**

The backend remains authoritative for prices, inventory, permissions,
orders, and payments.

------------------------------------------------------------------------

# 6. Seller Platform

AgentCart also provides a dedicated seller experience.

Seller functionality includes:

- Seller authentication
- Seller dashboard
- Product creation
- Product editing
- Product deletion
- Inventory management
- Seller order management
- Seller-oriented AI tools

------------------------------------------------------------------------

# 7. Seller AI

The project contains several seller-oriented AI components.

``` text
AiInventoryAdvisor
AiListingCopilot
AiListingOptimizerModal
AiMarketIntelligence
AiReviewIntelligence
```

These features are intended to help sellers make better decisions using
AI.

### AI Inventory Advisor

Can assist sellers in understanding inventory-related information and
identifying products that may require attention.

### AI Listing Copilot

Can assist with product listing creation and improvement.

### AI Listing Optimizer

Can help improve listing information such as:

- Product title
- Description
- Search relevance
- Product presentation

### AI Market Intelligence

Can provide AI-assisted insights about product and market information
available to the platform.

### AI Review Intelligence

Can help analyze review information and identify useful customer
feedback patterns.

------------------------------------------------------------------------

# 8. Admin Platform

The admin interface is intended for platform-level management.

The admin role is separate from customers and sellers.

Conceptually:

``` text
                 AgentCart
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    Customer      Seller      Admin
        │           │           │
     Shopping    Store       Platform
     & Orders    Management  Management
```

Admin operations must always be protected by server-side role-based
authorization.

------------------------------------------------------------------------

# 9. Technology Stack

## Frontend

``` text
React
TypeScript
Vite
CSS
```

React is used to build the interactive user interface.

TypeScript provides static typing and improves maintainability.

Vite provides the development and production build environment.

------------------------------------------------------------------------

## Backend

``` text
Node.js
TypeScript
Express-style REST API architecture
```

The backend is responsible for:

- Authentication
- Authorization
- Product operations
- Cart operations
- Orders
- Payments
- AI integration
- Seller operations
- Admin operations
- Database operations

------------------------------------------------------------------------

## AI

The AI layer uses generative AI capabilities for:

- Intent understanding
- Recommendations
- Product comparison
- Conversational shopping
- Agent/tool orchestration

The project includes:

``` text
server/ai.ts
server/recommendation.ts
server/sellerAi.ts
```

------------------------------------------------------------------------

## Database

The database layer manages application data such as:

``` text
Users
Products
Cart
Cart Items
Orders
Order Items
Payments
Addresses
Inventory
Seller information
```

The database is accessed through the backend rather than directly from
the frontend.

------------------------------------------------------------------------

## Payments

AgentCart integrates with:

``` text
Razorpay
```

The intended payment architecture is:

``` text
Frontend
   ↓
Backend
   ↓
Razorpay Order
   ↓
Razorpay Checkout
   ↓
Payment Response
   ↓
Backend Signature Verification
   ↓
Database
```

Payment success must be determined by verified backend information, not
by a frontend-only flag.

------------------------------------------------------------------------

# 10. Project Architecture

High-level architecture:

``` text
                        ┌──────────────────┐
                        │      User        │
                        └────────┬─────────┘
                                 │
                                 ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │                      │
                    │ Home                 │
                    │ Products             │
                    │ Product Details      │
                    │ Cart                 │
                    │ Checkout             │
                    │ Orders               │
                    │ Account              │
                    │ Seller               │
                    │ Admin                │
                    │ AI Assistant         │
                    └──────────┬───────────┘
                               │
                         REST API / HTTP
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node/TS Backend     │
                    │                      │
                    │ Auth                 │
                    │ Products             │
                    │ Cart                 │
                    │ Orders               │
                    │ Payments             │
                    │ AI                   │
                    │ Seller               │
                    │ Admin                │
                    │ Tracking             │
                    │ Email                │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └──────────┐
                 ▼                             ▼
        ┌────────────────┐            ┌────────────────┐
        │   Database     │            │ External APIs  │
        │                │            │                │
        │ Users          │            │ Gemini/AI      │
        │ Products       │            │ Razorpay       │
        │ Cart           │            │ Email          │
        │ Orders         │            └────────────────┘
        │ Payments       │
        │ Inventory      │
        └────────────────┘
```

------------------------------------------------------------------------

# 11. Repository Structure

``` text
agentcart/
│
├── data/
│   └── Application data / local data resources
│
├── dist/
│   └── Production build output
│
├── public/
│   ├── assets/
│   └── images/
│
├── scripts/
│   └── seed.ts
│
├── server/
│   ├── ai.ts
│   ├── auth.ts
│   ├── catalogData.ts
│   ├── db.ts
│   ├── email.ts
│   ├── moreCatalogData.ts
│   ├── razorpay.ts
│   ├── recommendation.ts
│   ├── sellerAi.ts
│   └── tracking.ts
│
├── src/
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── seller/
│   │   │   ├── AiInventoryAdvisor.tsx
│   │   │   ├── AiListingCopilot.tsx
│   │   │   ├── AiListingOptimizerModal.tsx
│   │   │   ├── AiMarketIntelligence.tsx
│   │   │   └── AiReviewIntelligence.tsx
│   │   │
│   │   ├── AIAssistantDrawer.tsx
│   │   ├── CompareModal.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── RazorpayModal.tsx
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   ├── pages/
│   │   ├── AccountPage.tsx
│   │   ├── AdminPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ProductsPage.tsx
│   │   └── SellerPage.tsx
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── .env.example
├── .gitignore
├── bun.lock
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── README.md
├── server.ts
├── tsconfig.json
└── vite.config.ts
```

------------------------------------------------------------------------

# 12. Important Backend Modules

## `server.ts`

The main server entry point.

Responsible for connecting major backend services and exposing
application API routes.

------------------------------------------------------------------------

## `server/auth.ts`

Responsible for authentication and authorization functionality.

Typical responsibilities:

``` text
Registration
Login
Password hashing
Authentication tokens
Role verification
```

------------------------------------------------------------------------

## `server/db.ts`

The database access layer.

It provides the backend with operations for:

``` text
Users
Products
Cart
Orders
Addresses
Inventory
Payments
```

------------------------------------------------------------------------

## `server/ai.ts`

The main AI integration layer.

It handles AI requests and the logic required to connect
natural-language shopping requests with supported application
functionality.

------------------------------------------------------------------------

## `server/recommendation.ts`

Responsible for product recommendation and ranking logic.

Possible inputs include:

``` text
Category
Maximum price
Minimum rating
Use case
Product requirements
```

------------------------------------------------------------------------

## `server/sellerAi.ts`

Contains seller-specific AI functionality.

It separates seller intelligence from the customer shopping assistant.

------------------------------------------------------------------------

## `server/razorpay.ts`

Contains Razorpay-specific payment functionality.

Sensitive payment credentials belong in environment variables and must
never be committed to GitHub.

------------------------------------------------------------------------

## `server/tracking.ts`

Handles order tracking-related functionality.

If tracking is simulated rather than connected to a real logistics
provider, it should be presented clearly as demo/prototype tracking.

------------------------------------------------------------------------

# 13. Frontend Architecture

The frontend is organized into reusable components and pages.

## Components

Reusable components include:

``` text
Navbar
Footer
ProductCard
CompareModal
AIAssistantDrawer
RazorpayModal
```

------------------------------------------------------------------------

## Pages

### HomePage

Main storefront and product discovery experience.

### ProductsPage

Product catalog and search experience.

### ProductDetailPage

Detailed information about a selected product.

### CartPage

Shopping cart management.

### CheckoutPage

Checkout and payment workflow.

### OrdersPage

Customer order history and order details.

### AccountPage

Customer account management.

### AuthPage

Registration and login.

### SellerPage

Seller dashboard and seller tools.

### AdminPage

Administrative management interface.

------------------------------------------------------------------------

# 14. Data Flow

## Product Search

``` text
User
 ↓
Products Page
 ↓
API
 ↓
Backend
 ↓
Database / Catalog
 ↓
Products
 ↓
Frontend
```

------------------------------------------------------------------------

## AI Search

``` text
User Message
 ↓
AI Assistant
 ↓
AI API
 ↓
Intent / Tool Processing
 ↓
Product Search
 ↓
Recommendation Engine
 ↓
Result
 ↓
AI Response
```

------------------------------------------------------------------------

## Add to Cart

``` text
User / AI Agent
       ↓
Cart API
       ↓
Authentication
       ↓
Product Validation
       ↓
Stock Validation
       ↓
Database
       ↓
Updated Cart
```

------------------------------------------------------------------------

## Checkout

``` text
Cart
 ↓
Backend Calculates Total
 ↓
Create Order
 ↓
Create Razorpay Order
 ↓
Razorpay Checkout
 ↓
Payment
 ↓
Server Verification
 ↓
Order Confirmation
 ↓
Inventory Update
 ↓
Cart Update
```

------------------------------------------------------------------------

# 15. Security Design

Security is especially important because AgentCart processes:

- User accounts
- Passwords
- Addresses
- Orders
- Inventory
- Payments

## Core security principles

### Never trust frontend values

The backend should not trust the client for:

``` text
Price
Total amount
Payment status
Stock
User ID
Seller ID
Order ownership
Role
```

These must be validated server-side.

------------------------------------------------------------------------

## Role-Based Authorization

The platform uses three primary roles:

``` text
CUSTOMER
SELLER
ADMIN
```

Example:

``` text
Customer
  ├── Own cart
  ├── Own orders
  └── Own account

Seller
  ├── Own products
  ├── Own inventory
  └── Authorized seller operations

Admin
  └── Platform-level administrative operations
```

A role should never be enforced only by hiding a frontend button. The
backend must enforce authorization.

------------------------------------------------------------------------

# 16. Environment Variables

Sensitive credentials should be stored in `.env`.

Example:

``` env
DATABASE_URL=
GEMINI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
JWT_SECRET=
```

Never commit the real `.env` file.

The repository should contain only:

``` text
.env.example
```

with placeholder values.

------------------------------------------------------------------------

# 17. Installation

## Requirements

Install:

- Node.js
- npm

Depending on the project environment, Bun may also be supported.

------------------------------------------------------------------------

## Clone

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd agentcart
```

------------------------------------------------------------------------

## Install dependencies

``` bash
npm install
```

------------------------------------------------------------------------

## Configure environment

Copy the example environment file:

``` bash
cp .env.example .env
```

On Windows PowerShell:

``` powershell
Copy-Item .env.example .env
```

Then add your actual development credentials to `.env`.

------------------------------------------------------------------------

# 18. Run the Project

Start the development server:

``` bash
npm run dev
```

The application should normally be opened at:

``` text
http://localhost:3000
```

If the terminal displays:

``` text
http://0.0.0.0:3000
```

use:

``` text
http://localhost:3000
```

in the browser.

`0.0.0.0` is commonly used as a server listening/bind address and is not
the preferred browser URL.

------------------------------------------------------------------------

# 19. Production Build

Create a production build:

``` bash
npm run build
```

The build should complete without TypeScript or bundling errors.

Before deployment, test the production build rather than relying only on
development mode.

------------------------------------------------------------------------

# 20. Payment Architecture

The intended secure payment lifecycle is:

``` text
Customer
   ↓
Checkout
   ↓
Backend calculates amount
   ↓
Backend creates Razorpay order
   ↓
Razorpay Checkout
   ↓
Customer pays
   ↓
Razorpay returns payment information
   ↓
Backend verifies signature
   ↓
Payment confirmed
   ↓
Order confirmed
   ↓
Inventory updated
```

### Important

Never implement:

``` text
Frontend says "payment successful"
        ↓
Backend trusts it
```

Instead:

``` text
Frontend payment result
        ↓
Backend verification
        ↓
Authoritative payment state
```

Webhook requests should also be signature-verified before they are
processed.

------------------------------------------------------------------------

# 21. Inventory Integrity

Inventory is a backend responsibility.

A safe purchase workflow should ensure that two customers cannot
successfully purchase the same final unit simultaneously.

Conceptually:

``` text
Check Stock
    ↓
Reserve / Decrement Atomically
    ↓
Create/Confirm Order
```

Inventory updates should be protected against race conditions.

Cancellation should only restore stock when stock was actually
reserved/decremented for that order.

------------------------------------------------------------------------

# 22. AI Safety and Reliability

The AI must not be treated as an authority over financial or database
state.

Correct:

``` text
AI
 ↓
Request Action
 ↓
Backend Validation
 ↓
Database / External API
 ↓
Verified Result
 ↓
AI Response
```

Incorrect:

``` text
AI
 ↓
"Payment successful"
```

without backend verification.

Similarly, the AI must not claim:

``` text
"Product added to cart"
```

unless the cart API actually succeeded.

------------------------------------------------------------------------

# 23. Testing Checklist

## Customer

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Product browsing
- [ ] Search
- [ ] AI assistant
- [ ] Recommendations
- [ ] Product comparison
- [ ] Add to cart
- [ ] Update quantity
- [ ] Remove from cart
- [ ] Address management
- [ ] Checkout
- [ ] Razorpay test payment
- [ ] Payment verification
- [ ] Order creation
- [ ] Order history
- [ ] Order tracking

------------------------------------------------------------------------

## AI Agent

Test:

``` text
Find a laptop under ₹70,000.
```

``` text
Compare these two products.
```

``` text
Which one is better for programming?
```

``` text
Add the best one to my cart.
```

``` text
Show my cart.
```

``` text
Remove the laptop from my cart.
```

The AI must distinguish between:

``` text
Recommendation
```

and:

``` text
Action
```

------------------------------------------------------------------------

## Seller

- [ ] Seller login
- [ ] Seller dashboard
- [ ] Add product
- [ ] Edit product
- [ ] Delete product
- [ ] Update inventory
- [ ] View seller orders
- [ ] Seller AI tools
- [ ] Ownership authorization

------------------------------------------------------------------------

## Admin

- [ ] Admin login
- [ ] Admin dashboard
- [ ] User management
- [ ] Administrative APIs
- [ ] Authorization checks

------------------------------------------------------------------------

# 24. Security Testing

Test that:

``` text
Customer A
```

cannot access:

``` text
Customer B's orders
Customer B's account
Customer B's cart
```

Test that:

``` text
Seller A
```

cannot modify:

``` text
Seller B's products
Seller B's inventory
Seller B's orders
```

Test that:

``` text
Customer
```

cannot access:

``` text
Seller APIs
Admin APIs
```

Test that payment signatures cannot be forged.

Test that secrets are not visible in:

``` text
GitHub
Frontend JavaScript
Network responses
Logs
README
```

------------------------------------------------------------------------

# 25. GitHub Safety

Before pushing AgentCart to GitHub, run:

``` bash
git status
```

Check that `.env` is not listed as a file to commit.

Search the repository for:

``` text
API_KEY
SECRET
PASSWORD
TOKEN
RAZORPAY_KEY_SECRET
DATABASE_URL
GEMINI_API_KEY
JWT_SECRET
```

Only placeholders should exist in public documentation or
`.env.example`.

------------------------------------------------------------------------

# 26. Deployment Architecture

Production architecture:

``` text
                   Internet
                       │
                       ▼
                HTTPS / Domain
                       │
                       ▼
              ┌─────────────────┐
              │ AgentCart       │
              │ Frontend        │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Backend API     │
              └──────┬─────┬────┘
                     │     │
          ┌──────────┘     └───────────┐
          ▼                            ▼
   ┌─────────────┐              ┌─────────────┐
   │ Database    │              │ External    │
   │             │              │ Services    │
   └─────────────┘              │ AI/Razorpay │
                                └─────────────┘
```

Production configuration must not depend on:

``` text
localhost
127.0.0.1
local database
local-only API endpoints
```

------------------------------------------------------------------------

# 27. Production Readiness Checklist

Before public deployment:

- [ ] Build passes
- [ ] TypeScript errors fixed
- [ ] Environment variables configured
- [ ] `.env` excluded from Git
- [ ] Authentication tested
- [ ] Authorization tested
- [ ] Customer isolation tested
- [ ] Seller ownership tested
- [ ] Admin authorization tested
- [ ] AI actions verified by backend
- [ ] Payment signature verification tested
- [ ] Razorpay webhook verification tested
- [ ] Refund workflow tested
- [ ] Inventory race conditions reviewed
- [ ] API rate limiting configured
- [ ] CORS restricted
- [ ] Production HTTPS enabled
- [ ] Error handling reviewed
- [ ] Logging reviewed
- [ ] Mobile UI tested
- [ ] Final end-to-end test completed

------------------------------------------------------------------------

# 28. Project Development Status

AgentCart is an AI-commerce project/prototype focused on combining:

``` text
Generative AI
+
Agentic Workflows
+
E-Commerce
+
Recommendation Systems
+
Digital Payments
+
Multi-Role Management
```

The project should be considered **submission-ready only after the
complete payment, authorization, inventory, AI-action, and deployment
workflows have been tested end-to-end**.

A successful frontend build alone does not prove that the complete
application is production-ready.

------------------------------------------------------------------------

# 29. Future Improvements

## AI

- Persistent user preferences
- More advanced recommendation ranking
- Better conversational context
- Multi-product purchasing
- Personalized shopping profiles
- Budget optimization
- AI-assisted checkout
- Voice shopping

## Seller

- Demand forecasting
- Automated pricing suggestions
- Advanced sales analytics
- Inventory prediction
- Automated listing generation

## Commerce

- Coupons
- Offers
- Multiple payment methods
- Real shipping provider integration
- Returns management
- Automated refunds
- Reviews and ratings
- Wishlist

## Platform

- Automated tests
- CI/CD
- Monitoring
- Analytics
- Performance optimization
- Accessibility improvements
- Mobile-first improvements

------------------------------------------------------------------------

# 30. Why AgentCart?

The central idea behind AgentCart is to change e-commerce from:

``` text
"Search for products yourself."
```

toward:

``` text
"Tell the system what you need,
and let an AI agent assist you through the process."
```

AgentCart combines an AI interface with conventional backend-controlled
commerce infrastructure.

The AI provides intelligence.

The backend provides authority.

The database provides persistence.

Razorpay provides payment processing.

Together they form the AgentCart platform.

------------------------------------------------------------------------

# 31. Author

**Yash**

AgentCart is developed as a project exploring AI-native commerce,
agentic AI, full-stack engineering, recommendation systems, and digital
payment integration.

------------------------------------------------------------------------

# 32. License

Add the appropriate open-source license before publishing the repository
publicly.

For example:

``` text
MIT License
```

if the project is intended to use the MIT license.

------------------------------------------------------------------------

# AgentCart

### AI-Native E-Commerce

> **Tell us what you want. Let AI find, compare, and help you buy it.**
