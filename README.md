# @omi-io/general-core

[![CI](https://github.com/a-omi-io/general-core/actions/workflows/ci.yml/badge.svg)](https://github.com/a-omi-io/general-core/actions/workflows/ci.yml)
[![Release](https://github.com/a-omi-io/general-core/actions/workflows/release.yml/badge.svg)](https://github.com/a-omi-io/general-core/actions/workflows/release.yml)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Core monorepo for `@omi-io/*` packages, managed with Nx and Yarn 4.
This repository contains shared utilities and release automation for publishing public npm packages.

## Packages

Workspace packages live under `packages/`. See each package directory for its README and usage.

## Requirements

- Node.js `>=20`
- Yarn `>=4.1.0` (via Corepack)

## Install

```bash
corepack enable
yarn install --immutable
```

## Local Development

```bash
yarn lint
yarn test
yarn build
```
