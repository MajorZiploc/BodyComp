# Purpose

A website to track body composition.

# Dependencies
- yarn v1.22.5

# Development Dependencies
- just (command runner) v0.10.0

# Development tools
- vscode

# Debugging

## Debug Client

1. in one terminal:
   > cd client. Then run yarn start
2. in another terminal:
   > cd server. Then run yarn start
3. Debug using Client in .vscode

### NOTE:
- Client can be tested independently of server. Set shouldMockData to true in ./client/src/config.ts

## Debug Server

Debug using Server in .vscode

## Demo site
> just demo-client-charts

