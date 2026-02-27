# Express API for GCP CI/CD Demo

This project is a simple Express.js application designed to demonstrate a CI/CD pipeline using Google Cloud Build and deployment to Google Cloud Run.

## Features

- A simple Express.js server.
- Two API endpoints:
  - `GET /`: Returns a welcome message.
  - `GET /api/data`: Returns a sample JSON object with a message and a timestamp.
- Unit tests using Jest and Supertest.
- Dockerfile for containerizing the application.
- `cloudbuild.yaml` for configuring Google Cloud Build.
- `.gcloudignore` to exclude unnecessary files from deployment.

## Prerequisites

- Node.js and npm installed.
- Google Cloud SDK (`gcloud`) installed and configured.
- A Google Cloud Project with billing enabled.
- APIs enabled in your GCP project:
  - Cloud Build API
  - Cloud Run API
  - Artifact Registry API (or Container Registry API)

## Project Structure

```
/hello-express
|-- __tests__/
|   |-- index.test.js  # Unit tests for the API
|-- Dockerfile         # Defines the Docker image
|-- cloudbuild.yaml    # Configuration for Google Cloud Build
|-- index.js           # Main Express application file
|-- package.json       # Project metadata and dependencies
|-- package-lock.json  # Exact versions of dependencies
|-- .gcloudignore      # Specifies files to ignore for gcloud commands
|-- README.md          # This file
```

## Local Development

1.  **Clone the repository (if applicable):**

    ```bash
    # git clone <repository-url>
    # cd hello-express-gcp
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the application:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:8080`.

4.  **Run tests:**
    ```bash
    npm test
    ```

## Deployment to Google Cloud

1.  **Ensure Placeholders in `cloudbuild.yaml` are Updated:**
    Before proceeding, make sure you have replaced `[PROJECT_ID]`, `[SERVICE_NAME]`, and `[REGION]` in `cloudbuild.yaml` with your actual Google Cloud Project ID, desired service name (e.g., `hello-express-service`), and GCP region (e.g., `asia-south1`). If you plan to use Artifact Registry, ensure the image paths and `[REPOSITORY_NAME]` are also correctly configured.

2.  **Ensure your Google Cloud Project is set locally (for manual submission):**
    ```bash
    gcloud config set project <YOUR_PROJECT_ID>
    ```

There are two main ways to deploy using Cloud Build:

### Option A: Manual Build Submission

This method is useful for direct testing of your `cloudbuild.yaml` configuration.

1.  **Submit the build to Cloud Build:**
    From the root directory of your project, run:

    ```bash
    gcloud builds submit --config cloudbuild.yaml .
    ```

    This command uploads your code, then Cloud Build executes the steps in `cloudbuild.yaml` (tests, Docker build, push to registry, deploy to Cloud Run).

2.  **Access your deployed service:**
    After successful deployment, Cloud Build provides the service URL. You can also find it in the Google Cloud Console under Cloud Run.

### Option B: Automated CI/CD with GitHub and Cloud Build Triggers

This is the recommended approach for continuous integration and deployment. Cloud Build will automatically build and deploy your application whenever changes are pushed to your connected GitHub repository.

1.  **Push your code to a GitHub repository:**
    Ensure your project, including `cloudbuild.yaml`, `Dockerfile`, and all source code, is pushed to a GitHub repository.

2.  **Set up a Cloud Build Trigger in GCP:**

    - Navigate to **Cloud Build > Triggers** in the Google Cloud Console.
    - Click **"Create trigger"**.
    - **Name** your trigger (e.g., `deploy-on-push-main`).
    - **Event:** Select **"Push to a branch"**.
    - **Source > Repository:** Click **"Connect new repository"**. Follow the prompts to authenticate and select your GitHub account and the repository for this project.
    - **Source > Branch:** Specify the branch that should trigger builds (e.g., `^main$` for the main branch).
    - **Configuration > Type:** Select **"Cloud Build configuration file (yaml or json)"**.
    - **Configuration > Location:** Select **"Repository"** and ensure the **"Cloud Build configuration file location"** is set to `/cloudbuild.yaml` (or just `cloudbuild.yaml`).
    - Click **"Create"**.

3.  **Test the Trigger:**
    Push a commit to the branch you configured (e.g., `main`) in your GitHub repository.

    ```bash
    git add .
    git commit -m "Test Cloud Build trigger"
    git push origin main
    ```

    Go to **Cloud Build > History** in the GCP Console. You should see a new build automatically started.

4.  **Access your deployed service:**
    Once the triggered build completes successfully, your application will be deployed or updated on Cloud Run. You can find the service URL in the build logs or in the Cloud Run section of the console.

## Best Practices Demonstrated

- **Clear Project Structure:** Organized files and directories.
- **Dependency Management:** `package.json` for Node.js dependencies.
- **Containerization:** `Dockerfile` for creating a consistent runtime environment.
- **Automated Testing:** Unit tests run as part of the CI pipeline.
- **CI/CD:** `cloudbuild.yaml` defines an automated build, test, and deploy process.
- **Infrastructure as Code (IaC) principles:** `cloudbuild.yaml` defines the deployment process declaratively.
- **Ignoring unnecessary files:** `.gcloudignore` to optimize uploads.
- **Environment Variables:** `process.env.PORT` for flexible port configuration, essential for Cloud Run.

This setup provides a solid foundation for a CI/CD project on GCP that you can use for your demonstration.

this is chnages for check trigger.

This change is done to trigger a build in gcp cloud build - 21 Feb 2026, 10 53 AM - Bala Ragala
