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
