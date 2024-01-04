# Setting Up a Journey Test Suite

## Introduction

This documentation provides a brief guide on setting up a journey test suite using re-usable GitHub workflows, Docker Compose and Webdriver.io~~, with a focus on configuring services to use Docker's internal networking and integrating with Selenium Grid for browser testing~~.

## Prerequisites
 - Docker and Docker Compose installed on your system.
 - A NodeJS Development environment.
 - One or more CDP Platform microservices you want to test.

### Step 1: Update Docker Compose Config

 1. **Enable/Disable Supporting Services:** The example `compose.yml` comes with various databases and supporting infrastructure pre-configured. Add/remove these as required.
 2. **Add Your Services to Compose File:** Add more entries to the compose.yml the services you want to test. You can any microservice that has been built on the CDP platform that at least one build.

### Step 2: Configure Your Service

 1. **Per service config:** Setup services in `compose.yml` via environment variables.
 2. **Connect services:** By default, the compose file will use docker's bridged network meaning each service has its own IP and hostname. A container's hostname will match the name of the service and is only resolvable inside the network. Alternatively you can use `host` networking mode to expose all the services on `localhost`. Note, this will not work when using Docker Desktop.

```yaml
frontend-service:
  image: defradigital/frontend-service:latest
  environment:
    - PORT=3000
    - BACKEND_URL=http://backend-service:8081/

backend-service:
  image: defradigital/backend-service:latest
  environment:
    - PORT=3001
```

### Step 3: Configure Webdriver

The project has two webdriver.io config files, `wdio.local.conf.js` and `wdio.remote.conf.js`.
 - `wdio.local.conf.js` Runs the tests in a non-headless browser locally, useful for debugging the tests.
 - `wdio.remote.conf.js` Runs the via the selenium grid container headless.

In both cases update `baseUrl: 'http://service-name:3000',` to point to the frontend service you want to test.

### Step 4: Write some tests

TODO:

### Step 5: Run the tests when a service is updated.

TODO:

###Final Notes

**Self Contained:** Avoid using services outside the test suite, ideally the test should fail because something is broken, not because an external service is unavailable.

**Host Network:** Using host mode docker networking may be simpler to setup (everything appears on localhost), but does not work on osx/windows.

**Private Images:** If your service is not in a public docker registery you'll need to figure our how to run it yourself!


