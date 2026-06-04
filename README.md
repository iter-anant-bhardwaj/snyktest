# Snyk Vulnerable Training Project

This is a simple Node.js project containing highly vulnerable dependencies designed specifically for training on using **Snyk** to scan and identify security issues.

## Project Structure

- [package.json](file:///D:/Capgemini%20DevSecOps/snyktest/package.json): Lists the vulnerable dependencies.
- [index.js](file:///D:/Capgemini%20DevSecOps/snyktest/index.js): A simple Express application demonstrating how these vulnerabilities can be exploited (Prototype Pollution and Remote Code Execution).

## Vulnerable Dependencies Included

1. **`express@4.16.0`**: Multiple vulnerabilities, including prototype pollution and open redirect risks.
2. **`lodash@4.17.4`**: Vulnerable to Prototype Pollution via methods like `_.merge`.
3. **`minimist@1.2.0`**: Vulnerable to Prototype Pollution via argument parsing.
4. **`node-serialize@0.0.4`**: Vulnerable to Remote Code Execution (RCE) via untrusted deserialization.

---

## Instructions

### 1. Install Dependencies
Run the following command to download and install the vulnerable libraries:
```bash
npm install
```

### 2. Scan with Snyk
Once dependencies are installed, you can test the project using the Snyk CLI.

#### Test Open Source Dependencies (SCA)
To find vulnerabilities in the dependencies listed in `package.json`:
```bash
snyk test
```

#### Test Source Code (SAST)
To find vulnerabilities/security issues in your code (`index.js`):
```bash
snyk code test
```

### 3. Running the App (Optional)
If you want to run the application to test exploit payloads:
```bash
npm start
```
The server will run on `http://localhost:3000`.

- **Prototype Pollution endpoint**: `POST http://localhost:3000/merge` with JSON payload.
- **RCE endpoint**: `POST http://localhost:3000/unserialize` with serialized payload (e.g., `{"rce":"_$$ND_FUNC$$_function (){console.log('Hacked');}()"}`).

---

## CI/CD Integration (GitHub Actions)

This repository includes a GitHub Actions workflow that automatically scans for security vulnerabilities on every push or pull request to the `main` or `master` branches.

### Setup Instructions

To make this workflow function correctly, you must supply your Snyk API Token to GitHub:

1. **Get your Snyk Token**:
   - Log in to your [Snyk account](https://app.snyk.io/).
   - Click on your profile in the bottom-left corner and go to **Account settings**.
   - Copy your **API token**.

2. **Add the Secret to GitHub**:
   - Go to your GitHub repository.
   - Navigate to **Settings** > **Secrets and variables** > **Actions**.
   - Click **New repository secret**.
   - Set the name to `SNYK_TOKEN` and paste your Snyk API token in the value field.
   - Click **Add secret**.

### Workflow Behavior
The workflow runs two checks:
- **Snyk Open Source (SCA)**: Scans external package dependencies (like `express`, `lodash`) for known vulnerabilities.
- **Snyk Code (SAST)**: Scans source code (`index.js`) for coding vulnerabilities.

> [!NOTE]
> Since this project contains intentional vulnerabilities for training purposes, the GitHub Actions runs are expected to fail by design when vulnerabilities are found, effectively simulating a security quality gate.

