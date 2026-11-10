# IT Finance Demo

Technical assignment for IT Finance (JavaScript / Node.js).

**Goal:** Develop a simple client lead processing system using Node.js.

## 📦 Installation

No installation is required. You only need to have **Docker** installed on your local machine.

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/TrotskoStan/itfinance-demo.git
   cd itfinance-demo
   ```

2. Start the project:

   ```bash
   docker-compose up --build
   ```

### What happens when you start the application?

1. The application is built and launched in a Docker container on your local machine.
2. The script output is saved to the `output` directory, for example:

   `./output/log_2025-07-11 15:46:08.csv`

   The log file will appear directly in the project's root directory on the host machine.

## ⚙️ How It Works

1. The `LeadGenerator.ts` class generates 10,000 leads (the number can be configured in `index.ts` using `TOTAL_LEADS`).
2. The number of leads to be processed simultaneously is defined (the `ASYNC_LIMIT` parameter in `index.ts`).
3. The script passes the list of leads and the concurrency limit to `LeadProcessor.ts`.
4. `LeadProcessor.ts` processes the leads while respecting the concurrency limit and writes successfully processed leads to a log file. If processing fails, the error is printed to the console but is not written to the log.
5. For testing, you can change the `TOTAL_LEADS` and `ASYNC_LIMIT` parameters and restart the application using:

   ```bash
   docker-compose up --build
   ```

   Each run creates a new log file on the host machine containing the results.
6. Once processing is complete, a summary line is added at the **beginning** of the log file:

   ```text
   Records: 10000, AsyncLimit: 34, TimeTotal: 9min 53sec
   ```

   This allows you to evaluate performance with different settings. An example log file is available in `./output`.

## ⏱ Performance Requirements

According to the assignment requirements, 10,000 leads must be processed in less than 10 minutes.

Since each lead takes 2 seconds to process, at least 34 concurrent workers are required to meet the time limit (`ASYNC_LIMIT = 34`).

The results of running the processor with these settings can be found directly on GitHub, in the project's root directory under `output`.

## ✅ Assignment Requirements Checklist

| Requirement | Status |
|---|---|
| Node.js ≥ 18, pure JavaScript (ES Modules) | ✅ Completed (Node.js v24, ES Modules) |
| OOP approach (classes, interfaces / abstract classes) | ✅ Completed |
| No server-side frameworks; small npm libraries allowed (e.g. `p-limit`) | ✅ Completed (`p-limit` is used) |
| Docker (Dockerfile + docker-compose.yml), single-command startup | ✅ Completed |
| Code style: ESLint + Prettier | ✅ Completed (both configured) |
| Type safety: JSDoc or TypeScript | ✅ Completed (TypeScript is used) |