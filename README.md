# cdp-node-journey-test-template

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/)
  - Recommended to use [nvm](https://github.com/nvm-sh/nvm) for managing Node.js versions

## Writing a test suite

- Add your services to `docker-compose.yaml`
- Write some journey tests using [webdriver.io](https://webdriver.io/docs/gettingstarted)
- Configure `wdio.conf.js` to point at the service you want to test.
- Run your tests, by either:
  - Running the [Journey Tests Workflow](https://github.com/DEFRA/cdp-node-journey-test-template/actions/workflows/run-tests.yaml) manually via Github actions
  - Add calls to the [Journey Tests Workflow](https://github.com/DEFRA/cdp-node-journey-test-template/blob/main/.github/workflows/run-tests.yaml) to the service repositories covered by the test suite

### Updating docker-compose.yaml

The base docker-compose.yaml has an example service as well as some supporting infrastructure. These can be removed if not required.
All services built on the platform publish to DEFRA's dockerhub [https://github.com/DEFRA/](https://github.com/DEFRA/), you should use these images for testing as they're the same ones that will be deployed.

Service configuration should be done via environment variables, as it is in the real environments.

### Docker networking considerations

By default, docker compose will use bridged networking, meaning each container gets its own hostname/ip. Services should be configured to talk to each other using these hostnames.

A service can also expose specific ports to the host using the `ports` configuration. Typically, you'd do this for the frontend service you're testing.

You can consider using `host` networking mode, where all services appear on localhost, though this may be harder to develop if you're using Docker Desktop on Macs or Windows.

### How to trigger the test suite when a related service is built

You can use the `run-tests.yaml` workflow from this project as a reusable workflow to be called as a step in another workflow in another project.

The easiest way to do this is to cut and paste the following into `.github/workflows/journey-tests.yaml` in the github repository you want to run the test from:

```yaml
name: Jouney Tests

on:
  workflow_dispatch:
  workflow_run:
    workflows: ['Publish']
    types:
      - completed
jobs:
  test:
    uses: defra/cdp-node-journey-test-template/.github/workflows/run-tests.yaml@main
```

This can be done for any number of services covered by your test suite, allowing for it to be run whenever any of those services publish a new version.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
