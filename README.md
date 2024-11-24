# CopilotKit with Notion API 💬

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Twitter: shricodev](https://img.shields.io/twitter/follow/shricodev.svg?style=social)

Welcome to **Notion AI Database Management with CopilotKit**—a powerful
application that integrates AI for real-time querying and manipulation of a
Notion database. With the ability to view, edit, and manage rows in your Notion
tables via an intuitive interface, this project uses **CopilotKit** for AI
integration and Notion API for database management.

## ✨ Features

- **AI-Powered Context Awareness**: Using CopilotKit to provide AI with full
  context of your Notion database.

- **Read & Write Capabilities**: AI can query the Notion database and update
  table rows with new data.

- **Real-Time Data Updates**: Seamless updates to the application state as
  changes are made to the Notion database.

## 🛠️ Getting Started

### Prerequisites

- **Node.js** and **npm**
- **Notion** database
- **OpenAI** API key

### Setup

1. **Clone the repository**:

> 💬 If you are using HTTPS protocol instead of SSH, change the git clone
> command accordingly.

```bash
git clone git@github.com:shricodev/copilotkit-with-notion-api.git
cd copilotkit-with-notion-api
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**: Rename `.env.example` to `.env` and add the
   required credentials:

```plaintext
NOTION_SECRET_API_KEY=
NOTION_DB_ID=
OPENAI_API_KEY=

# Optional
COPILOTKIT_PUBLIC_KEY=
```

4. **Start the development server**:

```bash
npm run dev
```

The application should be live at: [localhost:3000](https://localhost:3000) 🥂

## 📈 Usage

- **View Data**: The AI can now query your Notion database and answer questions
  based on your table data.

- **Modify Data**: Use the AI to update row data in the Notion database.

- **Real-Time Updates**: See the changes reflected in the UI instantly as the
  data is updated in Notion.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the
repository and submit a pull request.

## 🛡️ License

This project is licensed under the MIT License. See the [ LICENSE ](LICENSE)
file for more details.

## 🎉 Acknowledgments

Special thanks to [CopilotKit](https://www.copilotkit.ai/) for making AI
integration simple and [Notion](https://notion.so) for providing an incredible
API to manage databases.
