# Next.js Benchmarking Test

This is an implementation of the [TechEmpower Benchmarks](https://github.com/TechEmpower/FrameworkBenchmarks) test suite for Next.js.

## Test source files and URLs

| Test | Source Code | URL |
| --- | --- | --- |
| [JSON Serialization][] | [`app/json/route.ts`][] | http://localhost:3000/json |
| [Single Database Query][] | [`app/db/route.ts`][] | http://localhost:3000/db |
| [Multiple Database Queries][] | [`app/queries/route.ts`][] | http://localhost:3000/queries?queries= |

[JSON Serialization]: https://github.com/TechEmpower/FrameworkBenchmarks/wiki/Project-Information-Framework-Tests-Overview#json-serialization
[Single Database Query]: https://github.com/TechEmpower/FrameworkBenchmarks/wiki/Project-Information-Framework-Tests-Overview#single-database-query
[Multiple Database Queries]: https://github.com/TechEmpower/FrameworkBenchmarks/wiki/Project-Information-Framework-Tests-Overview#multiple-database-queries

[`app/json/route.ts`]: ./app/json/route.ts
[`app/db/route.ts`]: ./app/db/route.ts
[`app/queries/route.ts`]: ./app/queries/route.ts
