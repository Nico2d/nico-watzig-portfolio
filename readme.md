# Portfolio Project with Next.js and Notion

This project is a personal portfolio website built using Next.js and deployed on Vercel. It integrates with Notion to fetch data and convert it into projects displayed on the website.

## Features

-   **Static Site Generation (SSG):** Uses Next.js to pre-render pages for optimal performance.

-   **Notion Integration:** Fetches content from a Notion database.

-   **Responsive Design:** Works seamlessly on desktop and mobile devices.

-   **Deployment on Vercel:** Simplified deployment process with automatic updates on code changes.

## Tech Stack

-   **Frontend:** Next.js (React)

-   **Backend:** Notion API for fetching data

-   **Hosting:** Vercel

## Installation

To run the project locally, follow these steps:

Install dependencies:

```
pnpm install
```

Set up environment variables:
Create a `.env.local` file in the root directory and add your Notion API key and database ID:

```
NOTION_API_KEY=your-notion-api-key
NOTION_DATABASE_ID=your-database-id
```

Run the development server:

```
pnpm dev
```

Open http://localhost:3000 in your browser to view the site.

## Deployment

To deploy the project to Vercel:

1. Push your code to a Git repository (e.g., GitHub).

2. Connect the repository to Vercel.

3. Add the environment variables (NOTION_API_KEY and NOTION_DATABASE_ID) in the Vercel dashboard.

4. Vercel will automatically build and deploy the project.

## Usage

Add Projects in Notion:
Create a database in Notion to store your projects.

Add entries with details such as title, description, and links.

Sync with Website:
The website fetches data from Notion and updates automatically on build.

Customize Portfolio:
Modify components or styles in the project to fit your personal branding.

## Scripts

```
pnpm dev: Start the development server.

pnpm build: Build the project for production.

pnpm start: Start the production server.
```

## License

This project is open source and available under the MIT License.
