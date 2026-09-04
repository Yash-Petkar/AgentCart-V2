# AgentCart

> **Tell us what you want. Let AI find, compare, and help you buy it.**

AgentCart is an AI-native e-commerce platform designed to make online
shopping more conversational, intelligent, and action-oriented.

Instead of forcing users to navigate through filters and product pages
manually, AgentCart allows users to describe their shopping goal in
natural language. The AI assistant can understand product requirements,
search the catalog, compare products, recommend suitable options, and
interact with the shopping workflow.

------------------------------------------------------------------------

## Overview

Traditional e-commerce usually follows:

``` text
Search → Filters → Product Pages → Compare → Cart → Checkout
```

AgentCart aims to provide:

``` text
Natural Language Request
        ↓
      AI Agent
        ↓
Understand User Intent
        ↓
Search / Filter / Recommend
        ↓
Compare Products
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
```

Example:

> “Find the best gaming laptop under ₹70,000 with 16GB RAM and add the
> best one to my cart.”

The goal is for AgentCart to understand the complete request and safely
execute the required shopping actions through verified backend APIs.

------------------------------------------------------------------------

## Key Features

### AI Shopping Assistant

- Natural-language product search
- Product recommendations
- Product comparison
- Conversational shopping
- Context-aware product references
- AI-assisted cart actions
- Multi-step shopping workflows

### E-Commerce

- Product catalog
- Product search
- Product details
- Product comparison
- Shopping cart
- Quantity management
- Checkout
- Order management
- Inventory management

### Customer Account

- Customer registration and login
- Profile management
- Cart persistence
- Address management
- Order history
- Order details
- Order tracking

### Seller Account

- Seller authentication
- Seller dashboard
- Product creation
- Product editing
- Product deletion
- Inventory management
- Seller order management
- Sales information

### Admin

- Protected admin access
- User management
- Platform management
- Administrative monitoring

### Payments

- Razorpay Checkout integration
- Server-side payment verification
- Payment records
- Webhook support
- Payment/order state management

> Production deployments must use real Razorpay verification and webhook
> validation. Test or mock payment logic should never be treated as
> successful production payment processing.

------------------------------------------------------------------------

## AI Agent Architecture

AgentCart separates AI reasoning from sensitive commerce operations.

``` text
                    USER
                      │
                      ▼
              AI Shopping Assistant
                      │
                      ▼
               Intent Extraction
                      │
                      ▼
                 AI Tool Layer
          ┌───────────┼────────────┐
          ▼           ▼            ▼
      Search      Recommend     Compare
          │           │            │
          └───────────┼────────────┘
                      ▼
                Commerce Tools
          ┌───────────┼────────────┐
          ▼           ▼            ▼
        Cart        Orders       Product
       Actions      Actions       Data
          │           │            │
          └───────────┼────────────┘
                      ▼
              Backend Validation
                      │
                      ▼
                  Database
```

The AI should not directly access the database or execute arbitrary SQL.

AI-generated actions must be validated by the backend before they modify
commerce data.

------------------------------------------------------------------------

## Example AI Workflow

User:

``` text
Find the best laptop under ₹70,000 with 16GB RAM
and add the best one to my cart.
```

AgentCart:

``` text
User Request
     ↓
AI understands constraints
     ↓
Search actual catalog
     ↓
Filter:
  • price <= ₹70,000
  • RAM = 16GB
     ↓
Rank matching products
     ↓
Select best product
     ↓
Backend validates product and stock
     ↓
Add product to cart
     ↓
Verify successful API response
     ↓
Return result to user
```

The AI must never claim that an action succeeded when the backend
operation failed.

------------------------------------------------------------------------

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- CSS
- Reusable React components

### Backend

- Node.js
- TypeScript
- Express-style server architecture
- REST APIs

### AI

- Google Gemini / Generative AI
- AI-assisted intent interpretation
- Recommendation and comparison workflows
- Tool-based commerce actions

### Database

The project uses a server-side database layer for:

- Users
- Products
- Cart
- Orders
- Payments
- Addresses
- Inventory
- Seller data

### Payments

- Razorpay

------------------------------------------------------------------------

## Project Structure

``` text
AgentCart/
│
├── data/
│
├── public/
│   └── assets/
│
├── server/
│   ├── ai.ts
│   ├── auth.ts
│   ├── db.ts
│   ├── email.ts
│   ├── razorpay.ts
│   └── recommendation.ts
│
├── src/
│   ├── components/
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
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
└── vite.config.ts
```

------------------------------------------------------------------------

## Core Backend Modules

### `server/ai.ts`

Responsible for:

- AI interaction
- User intent processing
- AI shopping workflows
- Tool orchestration
- Conversational context

### `server/auth.ts`

Responsible for:

- Authentication
- Password security
- Session/JWT handling
- Role-based authorization

### `server/db.ts`

Responsible for:

- Database connection
- Data persistence
- Product operations
- Cart operations
- Orders
- Users
- Inventory

### `server/recommendation.ts`

Responsible for:

- Product ranking
- Recommendation logic
- Price constraints
- Ratings
- Use-case matching
- Product suitability

### `server/razorpay.ts`

Responsible for:

- Razorpay order creation
- Payment verification
- Webhook processing
- Payment state management

### `server/email.ts`

Responsible for transactional email functionality where configured.

------------------------------------------------------------------------

## Security Architecture

Security is a core requirement because AgentCart handles authentication,
user data, orders, and payments.

### Authentication

- Passwords must be securely hashed.
- Authentication tokens must be protected.
- Protected APIs require authentication.
- Role-based access control must be enforced server-side.

### Authorization

Roles include:

``` text
CUSTOMER
SELLER
ADMIN
```

A customer must not be able to:

- Modify another user’s cart
- Access another user’s orders
- Access seller APIs
- Access admin APIs
- Modify inventory
- Change order status without authorization

A seller must only be able to manage resources they own.

### Payment Security

Never trust:

``` text
Frontend price
Frontend total
Frontend payment status
Frontend stock
Frontend order status
```

The backend must calculate and validate authoritative commerce data.

Razorpay payment signatures must be verified server-side.

Webhook signatures must also be verified before processing webhook
events.

### Environment Variables

Secrets must never be committed to Git.

Example:

``` env
DATABASE_URL=
GEMINI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
JWT_SECRET=
```

Only non-sensitive placeholders belong in `.env.example`.

------------------------------------------------------------------------

## Installation

### 1. Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd AgentCart
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create:

``` text
.env
```

using `.env.example` as the template.

Example:

``` env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
JWT_SECRET=your_strong_random_secret
```

Do not commit `.env`.

### 4. Start development server

``` bash
npm run dev
```

Then open:

``` text
http://localhost:3000
```

Do not use `http://0.0.0.0:3000` as the browser address. `0.0.0.0` is
normally a server bind address.

------------------------------------------------------------------------

## Build

Create a production build:

``` bash
npm run build
```

Run the production server using the project’s configured start command.

------------------------------------------------------------------------

## Payment Flow

AgentCart’s intended payment flow is:

``` text
Customer
   ↓
Cart
   ↓
Checkout
   ↓
Backend calculates authoritative total
   ↓
Backend creates Razorpay order
   ↓
Razorpay Checkout
   ↓
Customer completes payment
   ↓
Razorpay returns payment information
   ↓
Backend verifies signature
   ↓
Payment marked verified
   ↓
Order confirmed
   ↓
Inventory updated
   ↓
Cart cleared
```

The frontend must not independently decide that a payment succeeded.

------------------------------------------------------------------------

## Database Model

The commerce system is conceptually organized around:

``` text
User
 │
 ├── Cart
 │    └── CartItem
 │
 ├── Orders
 │    └── OrderItem
 │
 └── Addresses

Seller
 │
 └── Products
       │
       └── Inventory

Order
 │
 └── Payment
```

Historical order information should remain immutable where appropriate.
For example, an old order should retain the price paid at the time of
purchase even if the product price changes later.

------------------------------------------------------------------------

## Recommended API Responsibilities

Typical API areas include:

``` text
/auth
/products
/cart
/orders
/checkout
/payments
/ai
/seller
/admin
```

Sensitive operations must be authenticated and authorized server-side.

------------------------------------------------------------------------

## Development Principles

AgentCart follows these principles:

1.  **Backend is authoritative**
2.  **AI is an interface, not the database**
3.  **Never trust client-controlled prices**
4.  **Never trust client-controlled payment success**
5.  **Validate every AI-generated action**
6.  **Use role-based authorization**
7.  **Prevent users from accessing other users’ data**
8.  **Keep payment processing idempotent**
9.  **Keep secrets outside source control**
10. **Test end-to-end before deployment**

------------------------------------------------------------------------

## Testing Checklist

### Customer

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Login again
- [ ] Browse products
- [ ] Normal search
- [ ] AI search
- [ ] Compare products
- [ ] Add to cart
- [ ] Update quantity
- [ ] Remove from cart
- [ ] Checkout
- [ ] Complete Razorpay test payment
- [ ] Verify payment
- [ ] View order
- [ ] View order history
- [ ] Manage address

### AI Agent

- [ ] Natural-language search
- [ ] Product recommendation
- [ ] Product comparison
- [ ] Conversation context
- [ ] “Add the best one”
- [ ] “Remove it”
- [ ] “Show my cart”
- [ ] “Change quantity to 2”
- [ ] Multi-step shopping request
- [ ] Nonexistent product handling
- [ ] Out-of-stock handling
- [ ] AI failure handling

### Seller

- [ ] Seller login
- [ ] Add product
- [ ] Edit product
- [ ] Delete product
- [ ] Update inventory
- [ ] View orders
- [ ] View sales

### Security

- [ ] Customer cannot access another customer’s data
- [ ] Customer cannot access seller APIs
- [ ] Customer cannot access admin APIs
- [ ] Seller cannot modify another seller’s product
- [ ] Payment signature cannot be forged
- [ ] Webhook signature is verified
- [ ] Prices cannot be manipulated from frontend
- [ ] Stock cannot be manipulated from frontend
- [ ] Secrets are not exposed
- [ ] No production localhost dependency

------------------------------------------------------------------------

## Production Readiness

Before deployment, verify:

``` text
Frontend
   ↓ HTTPS
Production Backend
   ↓
Production Database

Backend
   ├── AI Provider
   ├── Razorpay
   └── Email Provider
```

Production checks:

- [ ] Production environment variables configured
- [ ] Database configured
- [ ] HTTPS enabled
- [ ] CORS restricted to trusted frontend origins
- [ ] Authentication tested
- [ ] Authorization tested
- [ ] Razorpay Test/Live configuration verified
- [ ] Payment signatures verified server-side
- [ ] Webhooks configured
- [ ] No hardcoded secrets
- [ ] No `localhost` production API
- [ ] Error handling enabled
- [ ] Logging configured
- [ ] Build succeeds
- [ ] End-to-end testing completed

------------------------------------------------------------------------

## Project Status

AgentCart is an evolving AI-commerce prototype focused on demonstrating
how generative AI and agentic workflows can improve product discovery
and purchasing.

Before calling a deployment production-ready, all payment,
authentication, authorization, inventory, and AI action workflows must
pass end-to-end testing.

------------------------------------------------------------------------

## Future Roadmap

### AI

- [ ] More robust tool-calling agent
- [ ] Persistent shopping context
- [ ] Personalized recommendations
- [ ] Budget optimization
- [ ] Preference learning
- [ ] Natural-language checkout assistance

### Commerce

- [ ] Coupons
- [ ] Multiple payment methods
- [ ] Real shipping integrations
- [ ] Returns and refunds
- [ ] Seller analytics
- [ ] Advanced inventory management

### Platform

- [ ] Automated testing
- [ ] CI/CD
- [ ] Monitoring
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile-first optimization

------------------------------------------------------------------------

## Contributing

1.  Fork the repository.
2.  Create a feature branch.
3.  Make your changes.
4.  Run the build and relevant tests.
5.  Verify security-sensitive changes.
6.  Create a pull request.

Do not commit:

``` text
.env
API keys
payment secrets
database passwords
private credentials
```

------------------------------------------------------------------------

## License

Add the project’s intended license here before public release.

------------------------------------------------------------------------

## Author

**Yash**

AgentCart is developed as an AI-native commerce project exploring the
integration of generative AI, agentic workflows, full-stack development,
and digital payments.

------------------------------------------------------------------------

## Tagline

> **AgentCart — From “I want this” to a smarter way to buy it.**
