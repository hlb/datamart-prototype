# 台灣中文語料資料市集系統 (Taiwan Chinese Text Datamart)

A comprehensive datamart system for Chinese text data, designed to integrate and distribute high-quality Chinese language content from various Taiwanese content providers for AI training purposes.

## Features

- **Dataset Management**

  - Browse and search datasets by category
  - Detailed dataset information and statistics
  - Dataset usage request system

- **Content Provider Integration**

  - News media content
  - Academic journals and magazines
  - Book publisher content
  - Educational materials

- **User Management**

  - User authentication system
  - Role-based access control
  - Dataset access request tracking

- **Data Statistics**
  - Article count tracking
  - Word count statistics
  - Time range information
  - Usage analytics

## Tech Stack

### Frontend

- React 18
- Vite
- TailwindCSS
- Shadcn/UI Components
- Lucide Icons

### Development Tools

- Prettier for code formatting
- React DevTools for debugging

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- yarn

### Installation

1. Clone the repository

```bash
git clone [repository-url]
cd datamart-prototype
```

2. Install dependencies

```bash
yarn install
```

3. Start the development server

```bash
yarn dev
```

### Available Scripts

- `yarn run dev` - Start development server
- `yarn run build` - Build for production
- `yarn run format` - Format code with Prettier

## Documentation

Detailed documentation can be found in the `docs` directory:

- [Product Requirements Document](docs/product-requirement-document.md)
- [Architecture Overview](docs/architecture.md)

## Project Structure

```
datamart-prototype/
├── docs/                   # Documentation
├── src/                    # Source code
├── public/                 # Static assets
├── index.html             # Entry HTML file
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project dependencies and scripts
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
