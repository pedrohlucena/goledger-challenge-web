# `goledger-challenge-web`

An IMDb-inspired web application for cataloguing TV shows, built on top of a GoLedger blockchain REST API. Users can browse, search, and manage TV shows, seasons, episodes, and personal watchlists.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript (strict) |
| Auth | JWT sessions via `jose` |
| Runtime | Node.js 24 |

## Getting Started

### Prerequisites

- Node.js **24.x** (see `.nvmrc`)
- npm

### Installation

```bash
git clone https://github.com/<your-username>/goledger-challenge-web.git
cd goledger-challenge-web
npm install
```

### Environment Variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `BACKEND_API_URL` | GoLedger blockchain REST API base URL |
| `BACKEND_LOGIN_USERNAME` | Basic Auth username for the API |
| `BACKEND_LOGIN_PASSWORD` | Basic Auth password for the API |
| `SESSION_SECRET` | Secret key used to sign JWT session tokens |

### Running

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── (client)/
│   │   ├── (auth)/login/          # Login page
│   │   ├── (private)/watchlist/   # Watchlist (auth-guarded)
│   │   ├── (public)/
│   │   │   ├── (home)/            # Home — hero banner + carousels
│   │   │   ├── search/            # TV show search results
│   │   │   └── tvshow/[key]/      # TV show detail — seasons, episodes
│   │   ├── globals.css
│   │   └── layout.tsx
│   └── api/bff/                   # BFF proxy routes (hides API credentials)
│       ├── invoke/updateAsset/
│       └── query/{readAsset,search}/
├── bff/                           # BFF service layer (server-side API calls)
├── components/                    # Shared components (navbar, search, watchlist count)
├── common/assets/svgs/            # SVG assets
├── lib/session.ts                 # JWT session management
├── types/                         # Domain types (asset, tvShow, season, episode, watchlist)
└── utils/env.ts                   # Environment variable access
```

## Architecture

```
Browser → Next.js App Router → BFF API Routes → GoLedger Blockchain API
                                    ↑
                              Basic Auth hidden
                              from the client
```

- **Route Groups**: `(public)` for open pages, `(private)` for auth-guarded pages, `(auth)` for login.
- **BFF Pattern**: API credentials never reach the browser. Client-side code calls `/api/bff/*` routes, which forward requests to the GoLedger API with Basic Auth.
- **JWT Sessions**: Login produces a JWT token stored in an HTTP-only cookie; `(private)` layout enforces authentication.

## Features

- **Home Page** — Hero banner with a featured show and horizontally-scrollable carousels.
- **TV Show Detail** — Show metadata, star rating, season tabs, and episode list.
- **Search** — Full-text search across TV shows.
- **Watchlist** — Add/remove shows from a personal watchlist (requires login).
- **Login** — Credential-based authentication with JWT session management.

# GoLedger Challenge Description

In this challenge you will create a web interface to a blockchain application. In this application you must implement a imdb-like interface, to catalogue TV Shows, with series, seasons, episodes and watchlist registration.

# Requirements

- Your application should be able to add/remove/edit and show all tv shows, seasons, episodes and watchlists;
- Use **React** or **Next.js** (all UI libraries are allowed);

## Instructions

- Fork the repository [https://github.com/goledgerdev/goledger-challenge-web](https://github.com/goledgerdev/goledger-challenge-web)
    - Fork it, do **NOT** clone it, since you will need to send us your forked repository
    - If you **cannot** fork it, create a private repository and give access to `andremacedopv` and `lucas-campelo`.
- Create an web application using React. You will implement the basic operations provided by the API, which are `Create`, `Update`, `Delete` and `Search`.
- Improve your application with a beautiful UI.

## Server

The data are obtained using a rest server at this address: `http://ec2-50-19-36-138.compute-1.amazonaws.com`

Also, a Swagger with the endpoints specifications for the operations is provided at this address: `http://ec2-50-19-36-138.compute-1.amazonaws.com/api-docs/index.html`.

Note: The API is protected with Basic Auth. The credentials were sent to you by email.

Tip: execute each operation in the Swagger for information on payload format and endpoint addresses. See examples below.

### Get Schema
Execute a `getSchema` operation to get information on which asset types are available. Don't forget to authenticate with the credentials provided.

```bash
curl -X POST "http://ec2-50-19-36-138.compute-1.amazonaws.com/api/query/getSchema" -H "accept: */*" -H "Content-Type: application/json"
```

Execute a getSchema with a payload to get more details on a particula asset.

```bash
curl -X POST "http://ec2-50-19-36-138.compute-1.amazonaws.com/api/query/getSchema" -H "accept: */*" -H "Content-Type: application/json" -d "{\"assetType\":\"tvShows\"}"
```
Tip: the same can be done with transactions, using the `getTx` endpoint.

### Search
Perform a search query on a particular asset type.
```bash
curl -X POST "http://ec2-50-19-36-138.compute-1.amazonaws.com/api/query/search" -H "accept: */*" -H "Content-Type: application/json" -d "{\"query\":{\"selector\":{\"@assetType\":\"seasons\"}}}"
```
Tip: to read a specific asset, you can use the `readAsset` endpoint.

## Complete the challenge

To complete the challenge, you must send us the link to your forked repository with the code of your application. Please, provide instructions to execute the code.
