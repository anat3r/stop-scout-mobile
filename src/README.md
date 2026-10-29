# Stop Scout architecture

The `app/` directory contains Expo Router screens, and `components/` contains reusable UI.
Business rules will live in `src/domain/`, application orchestration in `src/use-cases/`,
platform and data adapters in `src/infrastructure/`, shared state in `src/store/`,
and dependency wiring in `src/di/`.

Domain code must not import React Native, Expo, SQLite, or UI modules. Use cases depend
on domain contracts; infrastructure implements those contracts; the DI container connects
the implementations to use cases for the presentation layer.
