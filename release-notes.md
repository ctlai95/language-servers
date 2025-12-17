:robot: I have created a release *beep* *boop*
---


<details><summary>chat-client: 0.1.45</summary>

## [0.1.45](https://github.com/ctlai95/language-servers/compare/chat-client/v0.1.44...chat-client/v0.1.45) (2025-12-17)


### Features

* add client side ide diagnostics to telemetry event ([#1768](https://github.com/ctlai95/language-servers/issues/1768)) ([d08fc6c](https://github.com/ctlai95/language-servers/commit/d08fc6cccb9238cef9c2ba485e116c0516839537))
* add conversation compaction ([#1895](https://github.com/ctlai95/language-servers/issues/1895)) ([8bb7144](https://github.com/ctlai95/language-servers/commit/8bb7144e45cfce6cc9337fd49de7edbee61105b8))
* add model description to dropdown ([#2374](https://github.com/ctlai95/language-servers/issues/2374)) ([ed8c6dd](https://github.com/ctlai95/language-servers/commit/ed8c6dda1312f728e9ee7472f7ca447196ad9d84))
* add support for getSupplementalContext LSP API ([#2212](https://github.com/ctlai95/language-servers/issues/2212)) ([2ddcae7](https://github.com/ctlai95/language-servers/commit/2ddcae7a4fac6b89cbc9784911959743ea0a6d11))
* Adding ATX-FES apis support for transformation ([#2521](https://github.com/ctlai95/language-servers/issues/2521)) ([56ee489](https://github.com/ctlai95/language-servers/commit/56ee4891a2e19b259c129fd531f8b06f763c1b57))
* **amazonq:** add two more tips for the did you know section ([#2063](https://github.com/ctlai95/language-servers/issues/2063)) ([9949c6d](https://github.com/ctlai95/language-servers/commit/9949c6dd81c56b5ea82563310da2eaee4d00a059))
* **amazonq:** added mcp admin level configuration with GetProfile ([#2000](https://github.com/ctlai95/language-servers/issues/2000)) ([fd6e9a8](https://github.com/ctlai95/language-servers/commit/fd6e9a829c6229c276de5340dffce52b426a864d))
* **amazonq:** adding MCP registry for governance for Amazon Q ([#2512](https://github.com/ctlai95/language-servers/issues/2512)) ([e8d4bf5](https://github.com/ctlai95/language-servers/commit/e8d4bf588e9b7bc13102b33ee03bd357f9698811))
* **amazonq:** default to diff-based scans ([#2195](https://github.com/ctlai95/language-servers/issues/2195)) ([da4c3db](https://github.com/ctlai95/language-servers/commit/da4c3db5329bd50cfe249bf8c1d59afa9bcb0157))
* **amazonq:** enable show logs feature ([#1947](https://github.com/ctlai95/language-servers/issues/1947)) ([86ea83d](https://github.com/ctlai95/language-servers/commit/86ea83dd53b447f6decccf16559b76f4989ea712))
* **amazonq:** enable sonnet 4 for fra region ([#2069](https://github.com/ctlai95/language-servers/issues/2069)) ([3a4b8df](https://github.com/ctlai95/language-servers/commit/3a4b8df981b2c3b0532360a11472169fffec7924))
* **amazonq:** migrating / agents to q agentic chat ([#1799](https://github.com/ctlai95/language-servers/issues/1799)) ([559b2ba](https://github.com/ctlai95/language-servers/commit/559b2baec7da7b8fffb697990e3b249ffffcb85c))
* **amazonq:** read and validate the images as context ([#1716](https://github.com/ctlai95/language-servers/issues/1716)) ([7a5d41f](https://github.com/ctlai95/language-servers/commit/7a5d41f3cff7309d04d952fbb5dc063fb8658a06))
* **amazonq:** read tool ui revamp ([c65428b](https://github.com/ctlai95/language-servers/commit/c65428bab2cf5e47badf1e3a9453babcf881e60c))
* **amazonq:** read tool ui revamp ([#2113](https://github.com/ctlai95/language-servers/issues/2113)) ([#2121](https://github.com/ctlai95/language-servers/issues/2121)) ([93cf229](https://github.com/ctlai95/language-servers/commit/93cf229149ba60491f9f5763793db4a9f570b611))
* **amazonq:** redirect /review, rename CodeReview tool, emit metrics, modify prompts ([#1964](https://github.com/ctlai95/language-servers/issues/1964)) ([ad8e2db](https://github.com/ctlai95/language-servers/commit/ad8e2db77e34f369fef9af71cdda2d3522f555c6))
* **amazonq:** revert auto-approve ([#2002](https://github.com/ctlai95/language-servers/issues/2002)) ([c8181f7](https://github.com/ctlai95/language-servers/commit/c8181f7a1de224dfcc7a77cd0bfc905fa1018372))
* Auto fetch models from listAvailableModels API ([#2171](https://github.com/ctlai95/language-servers/issues/2171)) ([8600c52](https://github.com/ctlai95/language-servers/commit/8600c524877abb459e9338399352446c0dcff6f0))
* **chat-client:** add auto-approve (trust mode) for built-in tools ([#1949](https://github.com/ctlai95/language-servers/issues/1949)) ([f17b631](https://github.com/ctlai95/language-servers/commit/f17b631d9e06371a11ef8e9cb1413762fb51a143))
* **chat-client:** add built-in tool permission and enable auto-approve ([#1890](https://github.com/ctlai95/language-servers/issues/1890)) ([03b59c8](https://github.com/ctlai95/language-servers/commit/03b59c8fba58db0f6b6c387cf5d53227c3f54673))
* **chat-client:** add shortcut for stop/reject/run commands ([#1932](https://github.com/ctlai95/language-servers/issues/1932)) ([087f338](https://github.com/ctlai95/language-servers/commit/087f3387ba736e92d014274e195f7ef76e377f1e))
* **chat-client:** add stringOverrides to createChat config ([#1847](https://github.com/ctlai95/language-servers/issues/1847)) ([89f85ff](https://github.com/ctlai95/language-servers/commit/89f85ff6c676eb30d2cb6bc3368676b0d0913bac))
* **chat-client:** handle keyboard shortcut for run/reject/stop shell commands and tooltips ([#1885](https://github.com/ctlai95/language-servers/issues/1885)) ([f8e9461](https://github.com/ctlai95/language-servers/commit/f8e94615b5ce8a3f4bf8837627fa4816a09cbef2))
* Implement dynamic model selection based on extension capabilities and improve error handling ([#1737](https://github.com/ctlai95/language-servers/issues/1737)) ([97db5d8](https://github.com/ctlai95/language-servers/commit/97db5d8dd0a2c8214d37429375ec57aa68a462ee))
* memory bank support ([#2314](https://github.com/ctlai95/language-servers/issues/2314)) ([0e215fc](https://github.com/ctlai95/language-servers/commit/0e215fc0e475b4c40a8237492371716982d4d532))
* send pinned context button immediately with pending state  ([#2353](https://github.com/ctlai95/language-servers/issues/2353)) ([bee5cad](https://github.com/ctlai95/language-servers/commit/bee5cadeaf8840a8af08acfe8b58442aac7ad567))
* support http transport without authorization for MCP ([97e806c](https://github.com/ctlai95/language-servers/commit/97e806ce7ea5e5be1fd60c4a4d9a54cf76c8f8cb))
* support listAvailableModels server request ([#1808](https://github.com/ctlai95/language-servers/issues/1808)) ([9f1ddb3](https://github.com/ctlai95/language-servers/commit/9f1ddb327778dba6da49337b79c5fef19023b52d))
* use dynamic token limits from listAvailableModels API ([#2539](https://github.com/ctlai95/language-servers/issues/2539)) ([f87ac9f](https://github.com/ctlai95/language-servers/commit/f87ac9fce32d235649f81957b71d424264aae9c8))


### Bug Fixes

* Add persistent pair programming mode setting with database storage and UI synchronization([#1757](https://github.com/ctlai95/language-servers/issues/1757)) ([ba683cc](https://github.com/ctlai95/language-servers/commit/ba683cc6dc120863350025a4a082ecf3a95b5905))
* **amazonq:** add slight delay to print chat string after card ([#1800](https://github.com/ctlai95/language-servers/issues/1800)) ([c7d08ab](https://github.com/ctlai95/language-servers/commit/c7d08abd7cac95b5aad83fe93157a815522338ac))
* **amazonq:** allow taking .jpg file as image context, add image cont& ([#1814](https://github.com/ctlai95/language-servers/issues/1814)) ([4d36fa4](https://github.com/ctlai95/language-servers/commit/4d36fa4a0a04692dba720bc0288c6cee7f45a1fc))
* **amazonq:** change the icon for error and reduce the count ([#1789](https://github.com/ctlai95/language-servers/issues/1789)) ([758d31c](https://github.com/ctlai95/language-servers/commit/758d31c186b163712312fdffb04ee692cfe11de8))
* **amazonq:** change the icon for error and reduce the count ([#1789](https://github.com/ctlai95/language-servers/issues/1789)) ([758d31c](https://github.com/ctlai95/language-servers/commit/758d31c186b163712312fdffb04ee692cfe11de8))
* **amazonq:** change to use promptStickyCard to show image verification notification ([#1904](https://github.com/ctlai95/language-servers/issues/1904)) ([caaefef](https://github.com/ctlai95/language-servers/commit/caaefef2c9b2af66840ec2f7ccabe9bf937c2983))
* **amazonq:** disable typewriter animation ([#2160](https://github.com/ctlai95/language-servers/issues/2160)) ([db45d01](https://github.com/ctlai95/language-servers/commit/db45d01adba10e8a04d868e1062f899df4f5b7e4))
* **amazonq:** fix for mcp server unnecessary refresh from file watchers ([#1933](https://github.com/ctlai95/language-servers/issues/1933)) ([208909b](https://github.com/ctlai95/language-servers/commit/208909b55ecda40ff8d412b2b3be890eccee70bc))
* **amazonq:** Fix mock fs clean; Node version upgrade ([#2324](https://github.com/ctlai95/language-servers/issues/2324)) ([1d9afd4](https://github.com/ctlai95/language-servers/commit/1d9afd410e19624223e300ca06ea7d08a112cc82))
* **amazonq:** fix the issue that invalid image notification always show ([#2007](https://github.com/ctlai95/language-servers/issues/2007)) ([ceed762](https://github.com/ctlai95/language-servers/commit/ceed762ace5f94cb0e0a7978eb6c4894bc11ce42))
* **amazonq:** fix the order of publishing the chat stop ack message ([#1761](https://github.com/ctlai95/language-servers/issues/1761)) ([20c2263](https://github.com/ctlai95/language-servers/commit/20c22638a34d557fc755e33aed798abc1ce3a6d9))
* **amazonq:** fix to add disable/enable feature back to mcp servers ([#2052](https://github.com/ctlai95/language-servers/issues/2052)) ([c03e017](https://github.com/ctlai95/language-servers/commit/c03e017b9ccbbbb9c80a3c3afd5da38a50bd6cff))
* **amazonq:** improve cross theme support ([#2036](https://github.com/ctlai95/language-servers/issues/2036)) ([002a255](https://github.com/ctlai95/language-servers/commit/002a255c28ea07ca6623dbd074101cbc6082ceb8))
* **amazonq:** improve welcome screen and enable tips ([#2035](https://github.com/ctlai95/language-servers/issues/2035)) ([ac00b94](https://github.com/ctlai95/language-servers/commit/ac00b94df45c2bba0666423c937757fad4db95cc))
* **amazonq:** mcp tool panel blocks amazon q chat interface when using right-click context menu ([#2442](https://github.com/ctlai95/language-servers/issues/2442)) ([11900ca](https://github.com/ctlai95/language-servers/commit/11900ca371adee2611698427dbec7c9323ef8e01))
* **amazonq:** refactor the welcome screen to make it look better ([#2027](https://github.com/ctlai95/language-servers/issues/2027)) ([1f7c608](https://github.com/ctlai95/language-servers/commit/1f7c608ba2f89c8b0675e62451e27d2dc547613c))
* **amazonq:** revert commit f17b631d9e06371a11ef8e9cb1413762fb51a143 ([#1965](https://github.com/ctlai95/language-servers/issues/1965)) ([8c2cab6](https://github.com/ctlai95/language-servers/commit/8c2cab6995922c96030b5bbdf3cbbdef7eadd7c2))
* **amazonq:** update mcp and persona config to agent config ([#1897](https://github.com/ctlai95/language-servers/issues/1897)) ([530977f](https://github.com/ctlai95/language-servers/commit/530977f8c73c7946a0205f02014248d71b4b1fe0))
* **amazonq:** updated stopping message to a better string for new chat ([#1765](https://github.com/ctlai95/language-servers/issues/1765)) ([814bff8](https://github.com/ctlai95/language-servers/commit/814bff848b970ec0192e36b8764c9cb08508f6ce))
* **amazonq:** use config to render the overlay ([#1851](https://github.com/ctlai95/language-servers/issues/1851)) ([f5c2038](https://github.com/ctlai95/language-servers/commit/f5c2038c090f9bb66b3cbd7e31f4d26c37943aeb))
* change model unavailable message ([#1711](https://github.com/ctlai95/language-servers/issues/1711)) ([d4e1298](https://github.com/ctlai95/language-servers/commit/d4e1298a5e00b2c3466ba1378aaaa28b89d75fb9))
* **chat-client:** revert for add built-in tool permission and enable auto-approve ([#1890](https://github.com/ctlai95/language-servers/issues/1890)) ([#1900](https://github.com/ctlai95/language-servers/issues/1900)) ([34b41b8](https://github.com/ctlai95/language-servers/commit/34b41b8f87c21d2ee6b98643339dbdfa71efcb77))
* **chat-client:** revert for amazon q keyboard shortcuts feature ([#1901](https://github.com/ctlai95/language-servers/issues/1901)) ([522f8de](https://github.com/ctlai95/language-servers/commit/522f8de6dba8dfa9b4363934cd7fcea905add1ce))
* cve and bump language server runtime version to 0.3.10 ([#2544](https://github.com/ctlai95/language-servers/issues/2544)) ([d06e09f](https://github.com/ctlai95/language-servers/commit/d06e09f1c7c2ce017d0a5b4394cc8d17454e2862))
* enable test flag for amazon q ui testing ([#2046](https://github.com/ctlai95/language-servers/issues/2046)) ([f18ea96](https://github.com/ctlai95/language-servers/commit/f18ea96c1e5cd9b93974a047d7f2bb1aba0d9436))
* fix for button text and remove profilearn caching ([#2137](https://github.com/ctlai95/language-servers/issues/2137)) ([2a4171a](https://github.com/ctlai95/language-servers/commit/2a4171a74c15c23c23c481060496162bcc9e6284))
* fix for mcp servers refresh ([#2550](https://github.com/ctlai95/language-servers/issues/2550)) ([cd75394](https://github.com/ctlai95/language-servers/commit/cd753948c3b3b9b07b626fc41391bd91b55a0d39))
* image context drag and drop fix on windows ([#1837](https://github.com/ctlai95/language-servers/issues/1837)) ([14df236](https://github.com/ctlai95/language-servers/commit/14df23633138d9b84875fba79a3eaf2d18dca8ce))
* imagecontext image name bug, mutliple images in pinned context ([#1834](https://github.com/ctlai95/language-servers/issues/1834)) ([27d60ab](https://github.com/ctlai95/language-servers/commit/27d60ab5f5249635a9e73be1ee96ecb820133f9a))
* intermediate file card does not have border ([#1734](https://github.com/ctlai95/language-servers/issues/1734)) ([24e0497](https://github.com/ctlai95/language-servers/commit/24e049705ce4ab982700839d012afb35786d8e4f))
* migration from /agents ux ([#2248](https://github.com/ctlai95/language-servers/issues/2248)) ([debeb41](https://github.com/ctlai95/language-servers/commit/debeb414fd0d4d873af2f36cde0ebbeab16d16a4))
* optimize memory bank token usage and add new tab support ([#2366](https://github.com/ctlai95/language-servers/issues/2366)) ([3057d56](https://github.com/ctlai95/language-servers/commit/3057d56e4a3047d1715d6e3560e9f934d1de469c))
* remove disclaimer message ([#1884](https://github.com/ctlai95/language-servers/issues/1884)) ([0845eed](https://github.com/ctlai95/language-servers/commit/0845eeda8d73ed1df3b8801e79dad1ddd7016781))
* replace cancel with stop ([#1935](https://github.com/ctlai95/language-servers/issues/1935)) ([2f51923](https://github.com/ctlai95/language-servers/commit/2f51923f9d3497469c70162235482b569e2d796e))
* replace thinking with working and replace stop with cancel ([#1922](https://github.com/ctlai95/language-servers/issues/1922)) ([371e731](https://github.com/ctlai95/language-servers/commit/371e731545f7572d3356d061cd8b94db35e4c333))
* use document change events for auto trigger classifier input ([#1912](https://github.com/ctlai95/language-servers/issues/1912)) ([2204da6](https://github.com/ctlai95/language-servers/commit/2204da6193f2030ee546f61c969b1a664d8025e3))
* Use file context override in the inline completion params for Jupyter Notebook ([#2114](https://github.com/ctlai95/language-servers/issues/2114)) ([91c8398](https://github.com/ctlai95/language-servers/commit/91c839857f8aa4d79098189f9fb620b361c51289))
* use new language server runtime ([#2023](https://github.com/ctlai95/language-servers/issues/2023)) ([83ea1e4](https://github.com/ctlai95/language-servers/commit/83ea1e42fe52990696eb9b878fa11e2c5331bec5))
* validate Create Prompt & Create Rule prompts input onChange ([#1854](https://github.com/ctlai95/language-servers/issues/1854)) ([ee215c4](https://github.com/ctlai95/language-servers/commit/ee215c4bc652a54556d31e64f86ed5179d174b4b))
</details>

<details><summary>lsp-antlr4: 0.1.23</summary>

## [0.1.23](https://github.com/ctlai95/language-servers/compare/lsp-antlr4/v0.1.22...lsp-antlr4/v0.1.23) (2025-12-17)


### Features

* add client side ide diagnostics to telemetry event ([#1768](https://github.com/ctlai95/language-servers/issues/1768)) ([d08fc6c](https://github.com/ctlai95/language-servers/commit/d08fc6cccb9238cef9c2ba485e116c0516839537))
* add support for getSupplementalContext LSP API ([#2212](https://github.com/ctlai95/language-servers/issues/2212)) ([2ddcae7](https://github.com/ctlai95/language-servers/commit/2ddcae7a4fac6b89cbc9784911959743ea0a6d11))
* Adding ATX-FES apis support for transformation ([#2521](https://github.com/ctlai95/language-servers/issues/2521)) ([56ee489](https://github.com/ctlai95/language-servers/commit/56ee4891a2e19b259c129fd531f8b06f763c1b57))
* **amazonq:** adding MCP registry for governance for Amazon Q ([#2512](https://github.com/ctlai95/language-servers/issues/2512)) ([e8d4bf5](https://github.com/ctlai95/language-servers/commit/e8d4bf588e9b7bc13102b33ee03bd357f9698811))


### Bug Fixes

* cve and bump language server runtime version to 0.3.10 ([#2544](https://github.com/ctlai95/language-servers/issues/2544)) ([d06e09f](https://github.com/ctlai95/language-servers/commit/d06e09f1c7c2ce017d0a5b4394cc8d17454e2862))
* use document change events for auto trigger classifier input ([#1912](https://github.com/ctlai95/language-servers/issues/1912)) ([2204da6](https://github.com/ctlai95/language-servers/commit/2204da6193f2030ee546f61c969b1a664d8025e3))
* Use file context override in the inline completion params for Jupyter Notebook ([#2114](https://github.com/ctlai95/language-servers/issues/2114)) ([91c8398](https://github.com/ctlai95/language-servers/commit/91c839857f8aa4d79098189f9fb620b361c51289))
* use new language server runtime ([#2023](https://github.com/ctlai95/language-servers/issues/2023)) ([83ea1e4](https://github.com/ctlai95/language-servers/commit/83ea1e42fe52990696eb9b878fa11e2c5331bec5))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aws/lsp-core bumped from ^0.0.18 to ^0.0.19
</details>

<details><summary>lsp-codewhisperer: 0.0.98</summary>

## [0.0.98](https://github.com/ctlai95/language-servers/compare/lsp-codewhisperer/v0.0.97...lsp-codewhisperer/v0.0.98) (2025-12-17)


### Features

* ab test setup for new repomap strategy ([#2474](https://github.com/ctlai95/language-servers/issues/2474)) ([d28867f](https://github.com/ctlai95/language-servers/commit/d28867f2a5e06693b83d0cfd0286f017cdc5e5b3))
* add active user tracking with state persistence ([#1892](https://github.com/ctlai95/language-servers/issues/1892)) ([a5587c5](https://github.com/ctlai95/language-servers/commit/a5587c59e4a07074ad8afba930c6596dc28c693b))
* add alphabetical sorting for MCP registry servers and URL validation ([#2555](https://github.com/ctlai95/language-servers/issues/2555)) ([d936673](https://github.com/ctlai95/language-servers/commit/d936673e570301b9abc4e587ef0d7cc92e1d470b))
* add basic OAuth client for remote MCP ([#2136](https://github.com/ctlai95/language-servers/issues/2136)) ([2fb896e](https://github.com/ctlai95/language-servers/commit/2fb896e094de0bc5a1b4881067e7dcceb3826015))
* add client side ide diagnostics to telemetry event ([#1768](https://github.com/ctlai95/language-servers/issues/1768)) ([d08fc6c](https://github.com/ctlai95/language-servers/commit/d08fc6cccb9238cef9c2ba485e116c0516839537))
* add conversation compaction ([#1895](https://github.com/ctlai95/language-servers/issues/1895)) ([8bb7144](https://github.com/ctlai95/language-servers/commit/8bb7144e45cfce6cc9337fd49de7edbee61105b8))
* add custom_transformation folder support to artifact.zip ([#2201](https://github.com/ctlai95/language-servers/issues/2201)) ([1222905](https://github.com/ctlai95/language-servers/commit/12229059421b773d3e99d28809fdff4abf242b26))
* add logic to merge with previous suggestions for EDITS ([#1791](https://github.com/ctlai95/language-servers/issues/1791)) ([072d13b](https://github.com/ctlai95/language-servers/commit/072d13b08168f256ea3695bea03cf37b27d91f81))
* add model description to dropdown ([#2374](https://github.com/ctlai95/language-servers/issues/2374)) ([ed8c6dd](https://github.com/ctlai95/language-servers/commit/ed8c6dda1312f728e9ee7472f7ca447196ad9d84))
* add support for getSupplementalContext LSP API ([#2212](https://github.com/ctlai95/language-servers/issues/2212)) ([2ddcae7](https://github.com/ctlai95/language-servers/commit/2ddcae7a4fac6b89cbc9784911959743ea0a6d11))
* add support for SMUS Q CodeEditor client to send MD IDE origin ([#2032](https://github.com/ctlai95/language-servers/issues/2032)) ([a8725b4](https://github.com/ctlai95/language-servers/commit/a8725b4b7dcb7718864620721aa3633151e8877b))
* added file watchers to listen to mcp and persona config ([#1714](https://github.com/ctlai95/language-servers/issues/1714)) ([4c5a7f8](https://github.com/ctlai95/language-servers/commit/4c5a7f893bad37bea1946d37d06f57197c3ef04b))
* Adding ATX-FES apis support for transformation ([#2521](https://github.com/ctlai95/language-servers/issues/2521)) ([56ee489](https://github.com/ctlai95/language-servers/commit/56ee4891a2e19b259c129fd531f8b06f763c1b57))
* adding current working directory to the stdio transport for mcp& ([#1691](https://github.com/ctlai95/language-servers/issues/1691)) ([02c4d64](https://github.com/ctlai95/language-servers/commit/02c4d645a8c2778deab7af9f5377c26e99d01f20))
* adding extra context as a workspace config for inline chat ([#1942](https://github.com/ctlai95/language-servers/issues/1942)) ([1b402bb](https://github.com/ctlai95/language-servers/commit/1b402bb8b083c5505a4e13ecf7e097a43388d10b))
* adding inline chat telemetry ([#2001](https://github.com/ctlai95/language-servers/issues/2001)) ([8b1c9c7](https://github.com/ctlai95/language-servers/commit/8b1c9c7c3859cdfbbd0abb059066a5c6fe2ffaf2))
* adding new regions ([#2532](https://github.com/ctlai95/language-servers/issues/2532)) ([29f08a6](https://github.com/ctlai95/language-servers/commit/29f08a60e9919026c4e1a2b2502148d5c738554b))
* adding streakLength back for UserTriggerDecisionEvent ([#1841](https://github.com/ctlai95/language-servers/issues/1841)) ([7052132](https://github.com/ctlai95/language-servers/commit/7052132a5198944ef05ddbf857d622ba518e71da))
* adding streakLength back to UTDE telemetry ([#1902](https://github.com/ctlai95/language-servers/issues/1902)) ([152f1c5](https://github.com/ctlai95/language-servers/commit/152f1c5f23698f8c574120bcf4f2214e4540e7e6))
* **amazonq:** add a/b testing info into agenticChat toolkit metrics ([#1898](https://github.com/ctlai95/language-servers/issues/1898)) ([6ab9b2c](https://github.com/ctlai95/language-servers/commit/6ab9b2cef0125846c2f20fd8554f591808b59cd0))
* **amazonq:** add new model error handling code ([#1972](https://github.com/ctlai95/language-servers/issues/1972)) ([905f0fc](https://github.com/ctlai95/language-servers/commit/905f0fcbb274926d22bcf30600ad4bd419ac8ee4))
* **amazonq:** add transformation preferences functionality to input gen ([#1792](https://github.com/ctlai95/language-servers/issues/1792)) ([095f737](https://github.com/ctlai95/language-servers/commit/095f737b86e6234b2568c6d4deafbbb90967bdbc))
* **amazonq:** add user requirement to zipfile for code review tool ([#2430](https://github.com/ctlai95/language-servers/issues/2430)) ([2c33b38](https://github.com/ctlai95/language-servers/commit/2c33b384a0e406bcd8d3888a911d5482ce1f38ef))
* **amazonq:** added full system information to the logs ([#1875](https://github.com/ctlai95/language-servers/issues/1875)) ([7795c6b](https://github.com/ctlai95/language-servers/commit/7795c6b43274211731aa9bb295b41ec89db41a6d))
* **amazonq:** added mcp admin level configuration with GetProfile ([#2000](https://github.com/ctlai95/language-servers/issues/2000)) ([fd6e9a8](https://github.com/ctlai95/language-servers/commit/fd6e9a829c6229c276de5340dffce52b426a864d))
* **amazonq:** adding classification based retry strategy for chat ([#2234](https://github.com/ctlai95/language-servers/issues/2234)) ([#2409](https://github.com/ctlai95/language-servers/issues/2409)) ([15d1b1f](https://github.com/ctlai95/language-servers/commit/15d1b1f5947a1b83dab65c9d3fef901ab8a033c9))
* **amazonq:** adding MCP registry for governance for Amazon Q ([#2512](https://github.com/ctlai95/language-servers/issues/2512)) ([e8d4bf5](https://github.com/ctlai95/language-servers/commit/e8d4bf588e9b7bc13102b33ee03bd357f9698811))
* **amazonq:** Adding QCodeReview tool to amazonQ ([#1882](https://github.com/ctlai95/language-servers/issues/1882)) ([07e343b](https://github.com/ctlai95/language-servers/commit/07e343b9fcef319bdbec80c48388e44b4b19269a))
* **amazonq:** allow opt-out for workspace context server ([#1867](https://github.com/ctlai95/language-servers/issues/1867)) ([72b6d76](https://github.com/ctlai95/language-servers/commit/72b6d76c5ed8e240aad6be80f65eab3497caaacf))
* **amazonq:** bundle dependency events from workspace context server ([#1712](https://github.com/ctlai95/language-servers/issues/1712)) ([587da41](https://github.com/ctlai95/language-servers/commit/587da4152ed1273117fc549f49d0b81eef7d98a9))
* **amazonq:** default to diff-based scans ([#2195](https://github.com/ctlai95/language-servers/issues/2195)) ([da4c3db](https://github.com/ctlai95/language-servers/commit/da4c3db5329bd50cfe249bf8c1d59afa9bcb0157))
* **amazonq:** emit metric for each issue ([#2179](https://github.com/ctlai95/language-servers/issues/2179)) ([5a3f481](https://github.com/ctlai95/language-servers/commit/5a3f481ebe8c6033e3833abcd81799d26c2aa03e))
* **amazonq:** enable compaction, minor UI changes ([#1979](https://github.com/ctlai95/language-servers/issues/1979)) ([2b56ca8](https://github.com/ctlai95/language-servers/commit/2b56ca87f442a06b554043fee86edd79f96c638d))
* **amazonq:** enable show logs feature ([#1947](https://github.com/ctlai95/language-servers/issues/1947)) ([86ea83d](https://github.com/ctlai95/language-servers/commit/86ea83dd53b447f6decccf16559b76f4989ea712))
* **amazonq:** enable sonnet 4 for fra region ([#2069](https://github.com/ctlai95/language-servers/issues/2069)) ([3a4b8df](https://github.com/ctlai95/language-servers/commit/3a4b8df981b2c3b0532360a11472169fffec7924))
* **amazonq:** enhance workspaceContext classpath generation ([#1955](https://github.com/ctlai95/language-servers/issues/1955)) ([f7ed20b](https://github.com/ctlai95/language-servers/commit/f7ed20bc4010996c508f6ea8ca87950e117e43c1))
* **amazonq:** env var change for JupyterLab conversation history on refresh support ([#2395](https://github.com/ctlai95/language-servers/issues/2395)) ([a908195](https://github.com/ctlai95/language-servers/commit/a9081954bcaf20b7d0fbe0af11e61b8f82c7e82f))
* **amazonq:** implement displayFindings tool ([#2029](https://github.com/ctlai95/language-servers/issues/2029)) ([da11663](https://github.com/ctlai95/language-servers/commit/da1166340f3d13e1d7fd83b260359661443230ea))
* **amazonq:** migrating / agents to q agentic chat ([#1799](https://github.com/ctlai95/language-servers/issues/1799)) ([559b2ba](https://github.com/ctlai95/language-servers/commit/559b2baec7da7b8fffb697990e3b249ffffcb85c))
* **amazonq:** read and validate the images as context ([#1716](https://github.com/ctlai95/language-servers/issues/1716)) ([7a5d41f](https://github.com/ctlai95/language-servers/commit/7a5d41f3cff7309d04d952fbb5dc063fb8658a06))
* **amazonq:** read tool ui revamp ([c65428b](https://github.com/ctlai95/language-servers/commit/c65428bab2cf5e47badf1e3a9453babcf881e60c))
* **amazonq:** read tool ui revamp ([#2113](https://github.com/ctlai95/language-servers/issues/2113)) ([#2121](https://github.com/ctlai95/language-servers/issues/2121)) ([93cf229](https://github.com/ctlai95/language-servers/commit/93cf229149ba60491f9f5763793db4a9f570b611))
* **amazonq:** redirect /review, rename CodeReview tool, emit metrics, modify prompts ([#1964](https://github.com/ctlai95/language-servers/issues/1964)) ([ad8e2db](https://github.com/ctlai95/language-servers/commit/ad8e2db77e34f369fef9af71cdda2d3522f555c6))
* **amazonq:** revert auto-approve ([#2002](https://github.com/ctlai95/language-servers/issues/2002)) ([c8181f7](https://github.com/ctlai95/language-servers/commit/c8181f7a1de224dfcc7a77cd0bfc905fa1018372))
* **amazonq:** semantic search tool integration ([#2283](https://github.com/ctlai95/language-servers/issues/2283)) ([8eb3c34](https://github.com/ctlai95/language-servers/commit/8eb3c340534f3c66fd9082a83b31e84a4d9348bb))
* **amazonq:** show kiro pricing information for Amazon Q builderId paid tier users ([#2556](https://github.com/ctlai95/language-servers/issues/2556)) ([5896298](https://github.com/ctlai95/language-servers/commit/58962981604d1d0d5363b23c0e52df119bcc824e))
* **amazonq:** support for wildcard permissions from agent config ([#2249](https://github.com/ctlai95/language-servers/issues/2249)) ([2f6e86b](https://github.com/ctlai95/language-servers/commit/2f6e86b0a676674744b962b0e335543c6c39e9e1))
* **amazonq:** support JupyterLab conversation history on refresh ([#2325](https://github.com/ctlai95/language-servers/issues/2325)) ([0980351](https://github.com/ctlai95/language-servers/commit/09803514d1ce31ca77a532161e071e1d037e3fb1))
* **amazonq:** update workspace context server A/B testing filter ([#1830](https://github.com/ctlai95/language-servers/issues/1830)) ([faeeee3](https://github.com/ctlai95/language-servers/commit/faeeee3da7a8712f3501055ba8d485528185cdb6))
* Auto fetch models from listAvailableModels API ([#2171](https://github.com/ctlai95/language-servers/issues/2171)) ([8600c52](https://github.com/ctlai95/language-servers/commit/8600c524877abb459e9338399352446c0dcff6f0))
* **chat-client:** add auto-approve (trust mode) for built-in tools ([#1949](https://github.com/ctlai95/language-servers/issues/1949)) ([f17b631](https://github.com/ctlai95/language-servers/commit/f17b631d9e06371a11ef8e9cb1413762fb51a143))
* **chat-client:** add built-in tool permission and enable auto-approve ([#1890](https://github.com/ctlai95/language-servers/issues/1890)) ([03b59c8](https://github.com/ctlai95/language-servers/commit/03b59c8fba58db0f6b6c387cf5d53227c3f54673))
* **chat-client:** add shortcut for stop/reject/run commands ([#1932](https://github.com/ctlai95/language-servers/issues/1932)) ([087f338](https://github.com/ctlai95/language-servers/commit/087f3387ba736e92d014274e195f7ef76e377f1e))
* **chat-client:** handle keyboard shortcut for run/reject/stop shell commands and tooltips ([#1885](https://github.com/ctlai95/language-servers/issues/1885)) ([f8e9461](https://github.com/ctlai95/language-servers/commit/f8e94615b5ce8a3f4bf8837627fa4816a09cbef2))
* differentiate implicit and explicit reject for inline completion ([#2475](https://github.com/ctlai95/language-servers/issues/2475)) ([4b68eea](https://github.com/ctlai95/language-servers/commit/4b68eea03374db79b8ad728aa048b623de8efa91))
* disable pkce flow during plugin load ([#2153](https://github.com/ctlai95/language-servers/issues/2153)) ([71b3595](https://github.com/ctlai95/language-servers/commit/71b35952333e7581921644ce40fabbc1e6d3c02f))
* enable iam auth for agentic chat ([#1736](https://github.com/ctlai95/language-servers/issues/1736)) ([16b287b](https://github.com/ctlai95/language-servers/commit/16b287b9edb3cb3a99b2b3f74c61df216641c5a6))
* enable webforms to blazor transformation via validation bypass ([#1929](https://github.com/ctlai95/language-servers/issues/1929)) ([528f820](https://github.com/ctlai95/language-servers/commit/528f8206b101e8f0c785b7fc0aceb87d6ef3de7b))
* enhance profile fetching logs to diagnose developerProfiles errors ([#1969](https://github.com/ctlai95/language-servers/issues/1969)) ([eb688c2](https://github.com/ctlai95/language-servers/commit/eb688c272df1251cd5c14ada7894bcaf625b6453))
* feature to add iam inline suggestion support in codeWhispererservice ([#2223](https://github.com/ctlai95/language-servers/issues/2223)) ([8e19f19](https://github.com/ctlai95/language-servers/commit/8e19f19a71e63a1196f4cb67ded8360c8da8129e))
* **flags:** change flag name to enablewebformtransform([#1804](https://github.com/ctlai95/language-servers/issues/1804)) ([3b6c3be](https://github.com/ctlai95/language-servers/commit/3b6c3be7630248cd00c19c16637f016d799ef8d1))
* Implement dynamic model selection based on extension capabilities and improve error handling ([#1737](https://github.com/ctlai95/language-servers/issues/1737)) ([97db5d8](https://github.com/ctlai95/language-servers/commit/97db5d8dd0a2c8214d37429375ec57aa68a462ee))
* improve code review tool reliability and error handling ([#2033](https://github.com/ctlai95/language-servers/issues/2033)) ([124244e](https://github.com/ctlai95/language-servers/commit/124244ee7d97adf71a52c4fde7ddb908dbc0bd08))
* make origin a configurable parameter and pass it to downstream calls ([#1773](https://github.com/ctlai95/language-servers/issues/1773)) ([a1c33d1](https://github.com/ctlai95/language-servers/commit/a1c33d1d7e2bbea693a6d8a9885491c1815f7f62))
* memory bank support ([#2314](https://github.com/ctlai95/language-servers/issues/2314)) ([0e215fc](https://github.com/ctlai95/language-servers/commit/0e215fc0e475b4c40a8237492371716982d4d532))
* model selection for code review tool ([#2196](https://github.com/ctlai95/language-servers/issues/2196)) ([34bc9bd](https://github.com/ctlai95/language-servers/commit/34bc9bd1d3433bbb1d903eb0f212b10709ea8412))
* nep auto trigger ([#2424](https://github.com/ctlai95/language-servers/issues/2424)) ([2292bd7](https://github.com/ctlai95/language-servers/commit/2292bd75fded0848208de9401d15d3399a9c297b))
* passing partialResultToken to onInlineCompletionHandler result for EDITS ([#1840](https://github.com/ctlai95/language-servers/issues/1840)) ([270d5a3](https://github.com/ctlai95/language-servers/commit/270d5a3c5adba6b49d938f310ac89ae9b7fbc401))
* passing suggestionTypes and pluginVersion/lspVersion to STE ([#2180](https://github.com/ctlai95/language-servers/issues/2180)) ([66742ad](https://github.com/ctlai95/language-servers/commit/66742adfc44f33efbd8dd33b803000e08241e5ce))
* remove project type validation from LSP layer ([#2103](https://github.com/ctlai95/language-servers/issues/2103)) ([d397161](https://github.com/ctlai95/language-servers/commit/d397161cc3448c63016e27f5ac2a1917cdaae1cb))
* send pinned context button immediately with pending state  ([#2353](https://github.com/ctlai95/language-servers/issues/2353)) ([bee5cad](https://github.com/ctlai95/language-servers/commit/bee5cadeaf8840a8af08acfe8b58442aac7ad567))
* support http transport without authorization for MCP ([97e806c](https://github.com/ctlai95/language-servers/commit/97e806ce7ea5e5be1fd60c4a4d9a54cf76c8f8cb))
* support listAvailableModels server request ([#1808](https://github.com/ctlai95/language-servers/issues/1808)) ([9f1ddb3](https://github.com/ctlai95/language-servers/commit/9f1ddb327778dba6da49337b79c5fef19023b52d))
* support sending requests with the 'external_idp' type ([#2247](https://github.com/ctlai95/language-servers/issues/2247)) ([4d3b938](https://github.com/ctlai95/language-servers/commit/4d3b938b7e961def0db2a51fba57e8fe73ea0a01))
* surface file operation errors in tooltip ([#1713](https://github.com/ctlai95/language-servers/issues/1713)) ([8d80e06](https://github.com/ctlai95/language-servers/commit/8d80e06a18e89c1ae33430676ba461b2d7acd314))
* update MCP manager and utilities ([#2158](https://github.com/ctlai95/language-servers/issues/2158)) ([b99df82](https://github.com/ctlai95/language-servers/commit/b99df82826d0ba1a1d52df578cb80674c90505b9))
* Update SMAI clients to return SM_AI_STUDIO_IDE origin ([#2558](https://github.com/ctlai95/language-servers/issues/2558)) ([dc1d216](https://github.com/ctlai95/language-servers/commit/dc1d21652d48c2ebeb6ddebc6b6ab351d688017c))
* update UserTriggerDecisionEventStreakLengthInteger min value ([#1878](https://github.com/ctlai95/language-servers/issues/1878)) ([e06f180](https://github.com/ctlai95/language-servers/commit/e06f18017864ea33e316059a708cb87aa6d8c562))
* use dynamic token limits from listAvailableModels API ([#2539](https://github.com/ctlai95/language-servers/issues/2539)) ([f87ac9f](https://github.com/ctlai95/language-servers/commit/f87ac9fce32d235649f81957b71d424264aae9c8))
* web search ([09c4769](https://github.com/ctlai95/language-servers/commit/09c47695c48df967e0a22e93290cc69f95b32ac3))


### Bug Fixes

* add bash command parsing for telemetry metrics ([#2039](https://github.com/ctlai95/language-servers/issues/2039)) ([01d8112](https://github.com/ctlai95/language-servers/commit/01d811225281a2e32f9cd6dab1b575aad8c0b4d6))
* add fsReplace tool to batch edits ([#1533](https://github.com/ctlai95/language-servers/issues/1533)) ([4125134](https://github.com/ctlai95/language-servers/commit/4125134f6e7eee8276d6146a507834b3309c2ec5))
* add in-loop compaction ([#2387](https://github.com/ctlai95/language-servers/issues/2387)) ([35f0795](https://github.com/ctlai95/language-servers/commit/35f0795fa5d09f3610e6a29cb72d49f32cc5534e))
* add missing tools from the list ([#1756](https://github.com/ctlai95/language-servers/issues/1756)) ([4b965d2](https://github.com/ctlai95/language-servers/commit/4b965d279716bb17be3c9402610835d33887adf6))
* Add persistent pair programming mode setting with database storage and UI synchronization([#1757](https://github.com/ctlai95/language-servers/issues/1757)) ([ba683cc](https://github.com/ctlai95/language-servers/commit/ba683cc6dc120863350025a4a082ecf3a95b5905))
* add proper encoding support for shell output ([#1903](https://github.com/ctlai95/language-servers/issues/1903)) ([44a6d62](https://github.com/ctlai95/language-servers/commit/44a6d629af7702662a02f384a6a542c0d72ccc39))
* add venv in the common gitignore patterns ([#2445](https://github.com/ctlai95/language-servers/issues/2445)) ([d030288](https://github.com/ctlai95/language-servers/commit/d030288a2508356db337dfa34ee64c8be1deb8e9))
* add workspace folder to the relativePath ([#1764](https://github.com/ctlai95/language-servers/issues/1764)) ([48a7769](https://github.com/ctlai95/language-servers/commit/48a77697b26590e599a13e731f2cc5c62a893eae))
* adding acceptedCharacterCount to UserTriggerDecisionEvent ([#2014](https://github.com/ctlai95/language-servers/issues/2014)) ([3f94486](https://github.com/ctlai95/language-servers/commit/3f944865483a6913138335fe61eee70ae71d7c03))
* adding agenticcoding field to amazonqaddMessage metric([#1849](https://github.com/ctlai95/language-servers/issues/1849)) ([d677c52](https://github.com/ctlai95/language-servers/commit/d677c52c6139859bc0f2dd8e7ffe6a85b87db3f6))
* adding files on VSC windows properly triggers reindexing ([#1820](https://github.com/ctlai95/language-servers/issues/1820)) ([0c2d8eb](https://github.com/ctlai95/language-servers/commit/0c2d8eb7dd875dfe86d1b2d094ec53a2a1221b97))
* adding files on windows properly triggers reindexing ([#1743](https://github.com/ctlai95/language-servers/issues/1743)) ([a9d4c39](https://github.com/ctlai95/language-servers/commit/a9d4c39afac6112294c9f486a834153a89656966))
* adding files on windows properly triggers reindexing ([#1755](https://github.com/ctlai95/language-servers/issues/1755)) ([d0abaad](https://github.com/ctlai95/language-servers/commit/d0abaade0e302b7d932254a95f47fa50906963d8))
* adding streakTracker to track streakLength across Completions and Edits ([#2147](https://github.com/ctlai95/language-servers/issues/2147)) ([a6c64f2](https://github.com/ctlai95/language-servers/commit/a6c64f2995a17697e3d71d30a1f411f5cf0db279))
* addonly EDITS should be handled as COMPLETIONS ([#2133](https://github.com/ctlai95/language-servers/issues/2133)) ([4f5a9da](https://github.com/ctlai95/language-servers/commit/4f5a9dacf3bfd68aeb40920fb800adf001ed43d5))
* adjust bash command categories ([#2030](https://github.com/ctlai95/language-servers/issues/2030)) ([25ed99f](https://github.com/ctlai95/language-servers/commit/25ed99fcf0eeaa86b0a5e040e90d69becf625c71))
* adjust cross file context config ([#2011](https://github.com/ctlai95/language-servers/issues/2011)) ([f7ade37](https://github.com/ctlai95/language-servers/commit/f7ade3767e714d5178f24fd9cc90349c5f417979))
* adjust overall limit per request to 570K characters ([#1771](https://github.com/ctlai95/language-servers/issues/1771)) ([07cf383](https://github.com/ctlai95/language-servers/commit/07cf38325847b586190aed6864ffb86782af743a))
* adjust vs code auto trigger coefficients ([#1806](https://github.com/ctlai95/language-servers/issues/1806)) ([25b1d1a](https://github.com/ctlai95/language-servers/commit/25b1d1a1930f7d0cb922d3a085cbaac2a09340b9))
* align auto trigger classifier with documentChangeEvent ([#1914](https://github.com/ctlai95/language-servers/issues/1914)) ([f308e17](https://github.com/ctlai95/language-servers/commit/f308e17912df0b8f03f4e655cc34f2f875f4e65c))
* **amazonq:** add distinctive identifier for cloud trail ([#2059](https://github.com/ctlai95/language-servers/issues/2059)) ([18bbc2c](https://github.com/ctlai95/language-servers/commit/18bbc2c54f5cc72e2624020fc17214c448926b0e))
* **amazonq:** add fallback classpath generation ([#2077](https://github.com/ctlai95/language-servers/issues/2077)) ([3a6ef14](https://github.com/ctlai95/language-servers/commit/3a6ef14e78fa2e75b837bba6524751d65038f416))
* **amazonq:** add files created by fsWrite tool to @Files list ([#1784](https://github.com/ctlai95/language-servers/issues/1784)) ([cfeb3be](https://github.com/ctlai95/language-servers/commit/cfeb3be43e425fae89d795cacad62031cc1ee029))
* **amazonq:** add ignore pattern for file events from workspace context server ([#1703](https://github.com/ctlai95/language-servers/issues/1703)) ([7a0dd88](https://github.com/ctlai95/language-servers/commit/7a0dd88a2f5251af8018084c55406cd8b9eaf51a))
* **amazonq:** add image context to chat history ([#1859](https://github.com/ctlai95/language-servers/issues/1859)) ([788920b](https://github.com/ctlai95/language-servers/commit/788920bdd2de0448fd335734b62ac80aba9cff82))
* **amazonq:** add IntelliSense autotriggerType ([#2199](https://github.com/ctlai95/language-servers/issues/2199)) ([013aa59](https://github.com/ctlai95/language-servers/commit/013aa5913c242451a91ed36b0dcf961a3f8ec697))
* **amazonq:** add jitter for websocket client re-connections ([#1752](https://github.com/ctlai95/language-servers/issues/1752)) ([0542858](https://github.com/ctlai95/language-servers/commit/0542858891ec982bd22369ed42318ff93537f600))
* **amazonq:** add server side control for WCS features ([#2128](https://github.com/ctlai95/language-servers/issues/2128)) ([5e4435d](https://github.com/ctlai95/language-servers/commit/5e4435dfaea7bf8c00e6a27b9bb0d40f699d4e01))
* **amazonq:** additional checks for binary and credential files ([#1866](https://github.com/ctlai95/language-servers/issues/1866)) ([76656c9](https://github.com/ctlai95/language-servers/commit/76656c9b2bb5080f64f581bb3b39cd55a3015bdf))
* **amazonq:** allow taking .jpg file as image context, add image cont& ([#1814](https://github.com/ctlai95/language-servers/issues/1814)) ([4d36fa4](https://github.com/ctlai95/language-servers/commit/4d36fa4a0a04692dba720bc0288c6cee7f45a1fc))
* **amazonq:** avoid workspace context server missing historical dependency events ([#1946](https://github.com/ctlai95/language-servers/issues/1946)) ([3362956](https://github.com/ctlai95/language-servers/commit/3362956ded75d77296fa98abb172bd87d66e5d5e))
* **amazonq:** catch mcp initialization errors ([#1873](https://github.com/ctlai95/language-servers/issues/1873)) ([afdd6a4](https://github.com/ctlai95/language-servers/commit/afdd6a4bd1db7c3990a7a279ebbbfbe0640e27c3))
* **amazonq:** change the customer UI message to out of the workspace ([#1822](https://github.com/ctlai95/language-servers/issues/1822)) ([624def5](https://github.com/ctlai95/language-servers/commit/624def51e4d9e21ee8d045ffe528455b69cdfecb))
* **amazonq:** change the icon for error and reduce the count ([#1789](https://github.com/ctlai95/language-servers/issues/1789)) ([758d31c](https://github.com/ctlai95/language-servers/commit/758d31c186b163712312fdffb04ee692cfe11de8))
* **amazonq:** change the icon for error and reduce the count ([#1789](https://github.com/ctlai95/language-servers/issues/1789)) ([758d31c](https://github.com/ctlai95/language-servers/commit/758d31c186b163712312fdffb04ee692cfe11de8))
* **amazonq:** change the image filter used in open file dialog ([#1838](https://github.com/ctlai95/language-servers/issues/1838)) ([d9da4cb](https://github.com/ctlai95/language-servers/commit/d9da4cbb7b1995ef43aaba1b7e67d26fd61a3c57))
* **amazonq:** continueous edits trigger returns earlier as first session is already closed ([#1907](https://github.com/ctlai95/language-servers/issues/1907)) ([a2dc5a8](https://github.com/ctlai95/language-servers/commit/a2dc5a87e488e523c12270b98749c1f835b55e87))
* **amazonq:** dedupe openTabs supplemental contexts ([#2172](https://github.com/ctlai95/language-servers/issues/2172)) ([aa87ae2](https://github.com/ctlai95/language-servers/commit/aa87ae2bd95edc1f38bf90f56093c5bf5ff18c53))
* **amazonq:** don't let flare send discard for the still valid suggestion in JB ([#2145](https://github.com/ctlai95/language-servers/issues/2145)) ([0767e07](https://github.com/ctlai95/language-servers/commit/0767e074c91682a91d2fe7a6b2a7369c4dea280c))
* **amazonq:** emit failed status for amazonq_invokeLLM ([#2071](https://github.com/ctlai95/language-servers/issues/2071)) ([ee52a41](https://github.com/ctlai95/language-servers/commit/ee52a41bc869b275fff708d7955b59f43b93bbd4))
* **amazonq:** escaping user input to mitigate xss issue ([#2360](https://github.com/ctlai95/language-servers/issues/2360)) ([45b86be](https://github.com/ctlai95/language-servers/commit/45b86bef1a93cf9ced6fbf0c222cf5410de04c81))
* **amazonq:** fix fallout of [#2051](https://github.com/ctlai95/language-servers/issues/2051) ([#2057](https://github.com/ctlai95/language-servers/issues/2057)) ([565066b](https://github.com/ctlai95/language-servers/commit/565066bb61adda60333c9646db958d4208bcc8af))
* **amazonq:** fix for delete mcp for mcp config, disable and create corresponding agent file ([#2298](https://github.com/ctlai95/language-servers/issues/2298)) ([8641860](https://github.com/ctlai95/language-servers/commit/8641860295c4e089d09154fa5411c305f2f4ecce))
* **amazonq:** fix for legacy mcp permission consistentcy and config update ([#2300](https://github.com/ctlai95/language-servers/issues/2300)) ([c8aa7bd](https://github.com/ctlai95/language-servers/commit/c8aa7bd3e9d39ed327972bbc950ad72e8e401581))
* **amazonq:** fix for mcp permissions read/write inconsistencies ([#2296](https://github.com/ctlai95/language-servers/issues/2296)) ([c7a9a8e](https://github.com/ctlai95/language-servers/commit/c7a9a8e1ba5c1a284d661e683dd46133860a1d3d))
* **amazonq:** fix for mcp server permissions ([#2026](https://github.com/ctlai95/language-servers/issues/2026)) ([89ae720](https://github.com/ctlai95/language-servers/commit/89ae720dc036a90338d192aca801a858e8fa19f8))
* **amazonq:** fix for mcp server permissions to prefer workspace agent config files ([#2038](https://github.com/ctlai95/language-servers/issues/2038)) ([d2ac614](https://github.com/ctlai95/language-servers/commit/d2ac614f0f16faa8bf689ac9c8bff09d64fc3a3b))
* **amazonq:** fix for mcp server unnecessary refresh from file watchers ([#1933](https://github.com/ctlai95/language-servers/issues/1933)) ([208909b](https://github.com/ctlai95/language-servers/commit/208909b55ecda40ff8d412b2b3be890eccee70bc))
* **amazonq:** fix for mcp servers operations to edit server config only ([#2165](https://github.com/ctlai95/language-servers/issues/2165)) ([d28df09](https://github.com/ctlai95/language-servers/commit/d28df09ae41871430cd53064eac1f3050c95ea84))
* **amazonq:** fix processing empty unsupported workspace file ([#2017](https://github.com/ctlai95/language-servers/issues/2017)) ([9e4d0af](https://github.com/ctlai95/language-servers/commit/9e4d0af244b5edba73771b6cb4290d922ef83c43))
* **amazonq:** fix regression of mcp config in agent config ([#2101](https://github.com/ctlai95/language-servers/issues/2101)) ([e4e8bbb](https://github.com/ctlai95/language-servers/commit/e4e8bbb89e4b597926582bead2b14ffc43f2a7f8))
* **amazonq:** fix the order of publishing the chat stop ack message ([#1761](https://github.com/ctlai95/language-servers/issues/1761)) ([20c2263](https://github.com/ctlai95/language-servers/commit/20c22638a34d557fc755e33aed798abc1ce3a6d9))
* **amazonq:** fix to add disable/enable feature back to mcp servers ([#2052](https://github.com/ctlai95/language-servers/issues/2052)) ([c03e017](https://github.com/ctlai95/language-servers/commit/c03e017b9ccbbbb9c80a3c3afd5da38a50bd6cff))
* **amazonq:** fix to add filewatcher for mcp config files ([#2295](https://github.com/ctlai95/language-servers/issues/2295)) ([fcee77c](https://github.com/ctlai95/language-servers/commit/fcee77c1b06e69f9096d8e98a0cfcc42d7fddb01))
* **amazonq:** fix to add grep to read only commands ([#1787](https://github.com/ctlai95/language-servers/issues/1787)) ([6762b27](https://github.com/ctlai95/language-servers/commit/6762b275e9b21de268a7c89e5dc0f37e3295ee60))
* **amazonq:** fix to add mcp server tool error handling and status for card ([#2176](https://github.com/ctlai95/language-servers/issues/2176)) ([23f5ec3](https://github.com/ctlai95/language-servers/commit/23f5ec343cb4e0de32926204dbcf99e51af829f9))
* **amazonq:** fix to add opt-out header to streaming client ([#2365](https://github.com/ctlai95/language-servers/issues/2365)) ([692e77b](https://github.com/ctlai95/language-servers/commit/692e77bc99770ac7d676928e95e3dc43bb91e7f0))
* **amazonq:** fix to add upper limit validation for tool description ([#1760](https://github.com/ctlai95/language-servers/issues/1760)) ([2d18a3b](https://github.com/ctlai95/language-servers/commit/2d18a3ba69d22b26dea5170656d79b9eacc202b1))
* **amazonq:** fix to correct the client for getProfile request ([#2211](https://github.com/ctlai95/language-servers/issues/2211)) ([8bde8c9](https://github.com/ctlai95/language-servers/commit/8bde8c97e1e3bcd67d9816a3385c50c7765c3b2f))
* **amazonq:** fix to emit event for same region profile switch ([#2320](https://github.com/ctlai95/language-servers/issues/2320)) ([aa1a482](https://github.com/ctlai95/language-servers/commit/aa1a4827871a1cfa9fcd76f7ba420107a5d44b01))
* **amazonq:** fix to include explanation field in mcp tools schema but remove it for tool execution ([#1759](https://github.com/ctlai95/language-servers/issues/1759)) ([b66c772](https://github.com/ctlai95/language-servers/commit/b66c77218d3cc5476cec32922dc22fccd9ca1861))
* **amazonq:** fix to normlize workspace paths in windows ([#2306](https://github.com/ctlai95/language-servers/issues/2306)) ([fab073c](https://github.com/ctlai95/language-servers/commit/fab073c855109b15005bfd880894471c35652ffc))
* **amazonq:** fix to update MCP servers list when last server is removed from agent config ([#2206](https://github.com/ctlai95/language-servers/issues/2206)) ([512502a](https://github.com/ctlai95/language-servers/commit/512502af947dcfed9288be2f67fc58affd4445fe))
* **amazonq:** fix typo in image context list ([#1836](https://github.com/ctlai95/language-servers/issues/1836)) ([179b553](https://github.com/ctlai95/language-servers/commit/179b553a1444201e696fd52e7705dc0c05154eab))
* **amazonq:** handle case where multiple rules are provided with the same name ([#2118](https://github.com/ctlai95/language-servers/issues/2118)) ([0e23e2d](https://github.com/ctlai95/language-servers/commit/0e23e2d29b8cad14403d372b9bbb08ca8ffa7ac7))
* **amazonq:** handle IAM credentials expiration field to be aws sdk versions compatible and add refresh logic to codewhisperer IAM client ([#2349](https://github.com/ctlai95/language-servers/issues/2349)) ([5eb3768](https://github.com/ctlai95/language-servers/commit/5eb3768bf020d61d0ade767d62e13839048146e4))
* **amazonq:** handle large results ([#2497](https://github.com/ctlai95/language-servers/issues/2497)) ([b3efa7c](https://github.com/ctlai95/language-servers/commit/b3efa7cff0b23608dd0cca796c9c95a672c9321a))
* **amazonq:** Handle throttling errors gracefully and give correct error message([#1733](https://github.com/ctlai95/language-servers/issues/1733)) ([232e7ea](https://github.com/ctlai95/language-servers/commit/232e7eac9556af3ab5e8cc86185b0c90b144cdd7))
* **amazonq:** handle undefined paths gracefully and retry ([#1825](https://github.com/ctlai95/language-servers/issues/1825)) ([c52b017](https://github.com/ctlai95/language-servers/commit/c52b017eef0666433cbb0b6d8086254dc1af5fee))
* **amazonq:** improve messaging for code review ([#2303](https://github.com/ctlai95/language-servers/issues/2303)) ([60bc68d](https://github.com/ctlai95/language-servers/commit/60bc68d1d4d2ce8a0373be6ce7551e961fc2cdb8))
* **amazonq:** include tsx and jsx files in workspace context server ([#1790](https://github.com/ctlai95/language-servers/issues/1790)) ([79691ef](https://github.com/ctlai95/language-servers/commit/79691ef607d9bc98032fe2e59a5031601a4dba9a))
* **amazonq:** init mcp servers in batch of 5 ([#1758](https://github.com/ctlai95/language-servers/issues/1758)) ([43018a6](https://github.com/ctlai95/language-servers/commit/43018a6bb9d782a5e46d2d60f5a07fffd73cc613))
* **amazonq:** init mcp servers in parallel ([#1754](https://github.com/ctlai95/language-servers/issues/1754)) ([92527c6](https://github.com/ctlai95/language-servers/commit/92527c6b0cee41634c3bce74173f1c2ced08a985))
* **amazonq:** itemid was accidentally removed by [#1689](https://github.com/ctlai95/language-servers/issues/1689) ([#1698](https://github.com/ctlai95/language-servers/issues/1698)) ([33524c0](https://github.com/ctlai95/language-servers/commit/33524c092af8088705a3cbae09c6249ad5940ce6))
* **amazonq:** leverage lcs to find the chars added and removed ([#2092](https://github.com/ctlai95/language-servers/issues/2092)) ([40379a8](https://github.com/ctlai95/language-servers/commit/40379a887f8d42cc184239ca3175b4e673cc5286))
* **amazonq:** make display findings tool run more often ([#2067](https://github.com/ctlai95/language-servers/issues/2067)) ([479ccd0](https://github.com/ctlai95/language-servers/commit/479ccd0a1b8b7e98684275c66274d284599c5933))
* **amazonq:** make JSTSDependencyHandler process scoped packages correctly ([#1910](https://github.com/ctlai95/language-servers/issues/1910)) ([3034494](https://github.com/ctlai95/language-servers/commit/303449454254987047649c49b7a377d45ad284b6))
* **amazonq:** make workspace context server upload dependency chunks sequentially ([#1769](https://github.com/ctlai95/language-servers/issues/1769)) ([c8329e6](https://github.com/ctlai95/language-servers/commit/c8329e6b90be2c24d72a4525b8903384746de2ab))
* **amazonq:** nep auto trigger should use file uri but filename is used ([#1753](https://github.com/ctlai95/language-servers/issues/1753)) ([d010c66](https://github.com/ctlai95/language-servers/commit/d010c6610e457fab1a5982e1c677f699150fefe0))
* **amazonq:** persist mcp configs in agent json on start-up ([#2112](https://github.com/ctlai95/language-servers/issues/2112)) ([817cfe2](https://github.com/ctlai95/language-servers/commit/817cfe2656cb1deec6111c699c4ba46b4ba53e00))
* **amazonq:** prevent base64 encoding error by passing undefined instead of empty object ([#2492](https://github.com/ctlai95/language-servers/issues/2492)) ([30e28b7](https://github.com/ctlai95/language-servers/commit/30e28b75499b1a55da904697fd446a30c6a87665))
* **amazonq:** prevent WCS matching workspaceFolder with only prefix ([#1782](https://github.com/ctlai95/language-servers/issues/1782)) ([988d952](https://github.com/ctlai95/language-servers/commit/988d952485b0f026200a19d17cacd323cd9e359e))
* **amazonq:** profile is not set after re-auth ([#1690](https://github.com/ctlai95/language-servers/issues/1690)) ([2a445ee](https://github.com/ctlai95/language-servers/commit/2a445eef4cc2a70471fd1fc49e6ca4e301051442))
* **amazonq:** reduce number of findings to 30 as a quick fix ([#2318](https://github.com/ctlai95/language-servers/issues/2318)) ([b31cf67](https://github.com/ctlai95/language-servers/commit/b31cf67ddc68a2ca2e0a4ebd9ee94d0545afc656))
* **amazonq:** remove the deep copy logic in updateRequestInputWithToolResults ([#1870](https://github.com/ctlai95/language-servers/issues/1870)) ([f209a15](https://github.com/ctlai95/language-servers/commit/f209a15785106af43fd97bfa99b393a13d9a9bab))
* **amazonq:** remove the stack trace check from service unavailable exceptions ([#1810](https://github.com/ctlai95/language-servers/issues/1810)) ([a5677f0](https://github.com/ctlai95/language-servers/commit/a5677f03d54aa8e42a71e71c524700c23825ed35))
* **amazonq:** remove the unnecessary new line after the chat shell command output ([#1750](https://github.com/ctlai95/language-servers/issues/1750)) ([c9f8989](https://github.com/ctlai95/language-servers/commit/c9f8989c7e66e2f594e8c56ad55ce586fb9f6b34))
* **amazonq:** removed explanation field for mcp servers ([#1717](https://github.com/ctlai95/language-servers/issues/1717)) ([cfc6831](https://github.com/ctlai95/language-servers/commit/cfc683111307dc25c619177e0267860c096fcfe1))
* **amazonq:** removing a bracket from full review message ([#2317](https://github.com/ctlai95/language-servers/issues/2317)) ([6d321ac](https://github.com/ctlai95/language-servers/commit/6d321ac6f318c27b01f9f97eee45a62798a60cf5))
* **amazonq:** replacing image's large binary in log ([#1905](https://github.com/ctlai95/language-servers/issues/1905)) ([a06ed62](https://github.com/ctlai95/language-servers/commit/a06ed626e118c5f846e494630ef0577ce1ace628))
* **amazonq:** return empty if nep auto trigger is not triggered ([#1766](https://github.com/ctlai95/language-servers/issues/1766)) ([e5c1708](https://github.com/ctlai95/language-servers/commit/e5c17085d43747e8fc852f47182a458ca6e81abb))
* **amazonq:** revert commit f17b631d9e06371a11ef8e9cb1413762fb51a143 ([#1965](https://github.com/ctlai95/language-servers/issues/1965)) ([8c2cab6](https://github.com/ctlai95/language-servers/commit/8c2cab6995922c96030b5bbdf3cbbdef7eadd7c2))
* **amazonq:** save one unnecessary listWorkspaceMetadata call ([#1742](https://github.com/ctlai95/language-servers/issues/1742)) ([a9eb908](https://github.com/ctlai95/language-servers/commit/a9eb908b183a85257958c511e47faf2bc29410df))
* **amazonq:** send full finding details to plugin, partial to agent ([#2356](https://github.com/ctlai95/language-servers/issues/2356)) ([961e6ca](https://github.com/ctlai95/language-servers/commit/961e6ca11b122481685f9f65b3da14c6a2497cc4))
* **amazonq:** send pinned context and rules as message pair ([#1762](https://github.com/ctlai95/language-servers/issues/1762)) ([322add6](https://github.com/ctlai95/language-servers/commit/322add6f8b3b6edd5b3e4b37fc783a1079f15596))
* **amazonq:** serialize S3 uploads for file events from workspace context server ([#1700](https://github.com/ctlai95/language-servers/issues/1700)) ([1884c57](https://github.com/ctlai95/language-servers/commit/1884c5793d46227d871e8cf25c940f7a87795f04))
* **amazonq:** shouldn't exit inline  flow before we're sure there is no Edit/Completion trigger ([#1819](https://github.com/ctlai95/language-servers/issues/1819)) ([dc8d89b](https://github.com/ctlai95/language-servers/commit/dc8d89b39ee230aba6cfb032f81bda3476a5cc84))
* **amazonq:** show active file in Context dropdown ([#1815](https://github.com/ctlai95/language-servers/issues/1815)) ([fe1156c](https://github.com/ctlai95/language-servers/commit/fe1156cdd6becbda4b7218cbb06f615a5d919def))
* **amazonq:** skips continuous monitoring when WCS sees workspace as idle ([#2066](https://github.com/ctlai95/language-servers/issues/2066)) ([9cb959d](https://github.com/ctlai95/language-servers/commit/9cb959d4cc450d0907f8bf5265ba01d2aa68bcd0))
* **amazonq:** status message update for mcp tool permission accpetance ([#2178](https://github.com/ctlai95/language-servers/issues/2178)) ([4893344](https://github.com/ctlai95/language-servers/commit/489334466fa084774d6e4737569468d654dc6359))
* **amazonq:** stop continuous monitor when WCS sees ServiceQuotaExceeded ([#1957](https://github.com/ctlai95/language-servers/issues/1957)) ([81e19b9](https://github.com/ctlai95/language-servers/commit/81e19b97017edddf486ac92fa6a8dc5fb184e008))
* **amazonq:** support mcp config files for backwards compatbility ([#2292](https://github.com/ctlai95/language-servers/issues/2292)) ([41c99af](https://github.com/ctlai95/language-servers/commit/41c99af02b3f415e39898f11c3c21ac530f9c406))
* **amazonq:** update mcp and persona config to agent config ([#1897](https://github.com/ctlai95/language-servers/issues/1897)) ([530977f](https://github.com/ctlai95/language-servers/commit/530977f8c73c7946a0205f02014248d71b4b1fe0))
* **amazonq:** update to the agent config format to bring parity with Q CLI ([#2202](https://github.com/ctlai95/language-servers/issues/2202)) ([698d06c](https://github.com/ctlai95/language-servers/commit/698d06c643897da6ca37a49e6544b150b72678a3))
* **amazonq:** wrong path in the logs for the function ([#1978](https://github.com/ctlai95/language-servers/issues/1978)) ([ed8b4f6](https://github.com/ctlai95/language-servers/commit/ed8b4f6755accb624e7dc8c645ecd5cd9370a0f2))
* ATX Transform Fix Retrieve Job Erroring on Profile changes ([#2538](https://github.com/ctlai95/language-servers/issues/2538)) ([870d540](https://github.com/ctlai95/language-servers/commit/870d5400dd5eb77f32e5592089525dacc001cb81))
* auto trigger should only respect previous decisions in the past 2mins ([#2189](https://github.com/ctlai95/language-servers/issues/2189)) ([852b21b](https://github.com/ctlai95/language-servers/commit/852b21b66f793102c52e35c2baec07a772e5134a))
* bearer client will not pick up telemetry optout and its always optout ([#2484](https://github.com/ctlai95/language-servers/issues/2484)) ([ec6771f](https://github.com/ctlai95/language-servers/commit/ec6771fc5dc162f9c65df4e979dcfc3ae4838f06))
* bug for credential refresh in StreamingClientServiceIAM ([#1944](https://github.com/ctlai95/language-servers/issues/1944)) ([a69ec0c](https://github.com/ctlai95/language-servers/commit/a69ec0c63423187c96bdd2b03d14da8a723c192e))
* **chat-client:** revert for add built-in tool permission and enable auto-approve ([#1890](https://github.com/ctlai95/language-servers/issues/1890)) ([#1900](https://github.com/ctlai95/language-servers/issues/1900)) ([34b41b8](https://github.com/ctlai95/language-servers/commit/34b41b8f87c21d2ee6b98643339dbdfa71efcb77))
* **chat-client:** revert for amazon q keyboard shortcuts feature ([#1901](https://github.com/ctlai95/language-servers/issues/1901)) ([522f8de](https://github.com/ctlai95/language-servers/commit/522f8de6dba8dfa9b4363934cd7fcea905add1ce))
* classifier last token sometimes fail to capture the right values ([#2434](https://github.com/ctlai95/language-servers/issues/2434)) ([7420d59](https://github.com/ctlai95/language-servers/commit/7420d591a0fcf5da834f0165696aa50b99fd4d3a))
* compact UI is not updated correctly when multiple nudges are displayed ([#2192](https://github.com/ctlai95/language-servers/issues/2192)) ([ef7d793](https://github.com/ctlai95/language-servers/commit/ef7d7931954f5083e4a5c358e67c6dc652fa1a40))
* connect chat history to workspace file ([#1767](https://github.com/ctlai95/language-servers/issues/1767)) ([4575727](https://github.com/ctlai95/language-servers/commit/4575727911a4efb21a3f24a3d400c7844451c243))
* correct the implementation of gathering open tabs in cross file context ([#2040](https://github.com/ctlai95/language-servers/issues/2040)) ([b7b7a2b](https://github.com/ctlai95/language-servers/commit/b7b7a2bd2020f50069ce89f6505cc2a36b1f3fa7))
* creating a new sesion for Edits trigger with next token ([#2094](https://github.com/ctlai95/language-servers/issues/2094)) ([1da8730](https://github.com/ctlai95/language-servers/commit/1da8730b6ed6ad53b6561368bf722e56d59596a4))
* cve and bump language server runtime version to 0.3.10 ([#2544](https://github.com/ctlai95/language-servers/issues/2544)) ([d06e09f](https://github.com/ctlai95/language-servers/commit/d06e09f1c7c2ce017d0a5b4394cc8d17454e2862))
* diff reports no lines added or removed ([#1549](https://github.com/ctlai95/language-servers/issues/1549)) ([562f13e](https://github.com/ctlai95/language-servers/commit/562f13e0223a8a01fefc9ca449aad02da9734709))
* Disable Concurrent inline completion handler ([#1880](https://github.com/ctlai95/language-servers/issues/1880)) ([61eeb8c](https://github.com/ctlai95/language-servers/commit/61eeb8c93b5454c5a99ebb79b5593007d08007e5))
* do not auto trigger when there is immediate right context for VSC/JB ([#1802](https://github.com/ctlai95/language-servers/issues/1802)) ([fdb29d4](https://github.com/ctlai95/language-servers/commit/fdb29d472c5a0bc7e0a89f5611245248c380cfe8))
* editor state does not use the same language id as file context ([#1924](https://github.com/ctlai95/language-servers/issues/1924)) ([c10866d](https://github.com/ctlai95/language-servers/commit/c10866d70070173aba63be1c78945a4da6129018))
* emit acceptedLineCount metric and AgenticCodeAccepted interaction type ([#2167](https://github.com/ctlai95/language-servers/issues/2167)) ([c53f672](https://github.com/ctlai95/language-servers/commit/c53f672b6173ebda530917ccb4e0c2f26f5c8f79))
* emit error code on failed user messages ([#2322](https://github.com/ctlai95/language-servers/issues/2322)) ([a949ac0](https://github.com/ctlai95/language-servers/commit/a949ac0a9d7a4dbce5fb7c8480952cee0a674b55))
* emit errorMessage in addMessage ([#2197](https://github.com/ctlai95/language-servers/issues/2197)) ([58f2064](https://github.com/ctlai95/language-servers/commit/58f20649d345f159080006120e23cde559826df1))
* emit latency as an int for creating visualizations ([#1763](https://github.com/ctlai95/language-servers/issues/1763)) ([34bf564](https://github.com/ctlai95/language-servers/commit/34bf5644444bf66dc5d6b87fc70bd3561d48728a))
* emit metric for tool error ([#1954](https://github.com/ctlai95/language-servers/issues/1954)) ([c3bbcea](https://github.com/ctlai95/language-servers/commit/c3bbceabcea3d7aea2e414abc632c3a744b0e02b))
* empty userTriggerDecision not being sent for NEP code path ([#2140](https://github.com/ctlai95/language-servers/issues/2140)) ([b8e5268](https://github.com/ctlai95/language-servers/commit/b8e52682ac2b2337e1d0a32759e8beccde889cee))
* enable repomap for all users ([#1967](https://github.com/ctlai95/language-servers/issues/1967)) ([6954085](https://github.com/ctlai95/language-servers/commit/69540851e54b65729b2affbe3ae7d98629bdb5f4))
* enforce MAX_TOOL_NAME_LENGTH check in createNamespacedToolName ([#2447](https://github.com/ctlai95/language-servers/issues/2447)) ([6663f87](https://github.com/ctlai95/language-servers/commit/6663f87e68c9645af6ffb004eaf725e5102fe5ab))
* filetype filtering and consolidation of other filtering logic during artifact generation ([#2233](https://github.com/ctlai95/language-servers/issues/2233)) ([a3e66f2](https://github.com/ctlai95/language-servers/commit/a3e66f2d414060adde90cc7312f07c6359ae3246))
* fix blocking regex calls being made before indexing ([#1916](https://github.com/ctlai95/language-servers/issues/1916)) ([3c0592f](https://github.com/ctlai95/language-servers/commit/3c0592fec53922b0493f51b7e88313971cb54e93))
* fix calculation for num-lines contributed by the LLM ([#2191](https://github.com/ctlai95/language-servers/issues/2191)) ([fd71e6c](https://github.com/ctlai95/language-servers/commit/fd71e6cf3fc843242936564061061418edf83f56))
* fix for button text and remove profilearn caching ([#2137](https://github.com/ctlai95/language-servers/issues/2137)) ([2a4171a](https://github.com/ctlai95/language-servers/commit/2a4171a74c15c23c23c481060496162bcc9e6284))
* fix for mcp delete to remove it from mcp config file ([#1956](https://github.com/ctlai95/language-servers/issues/1956)) ([ad71312](https://github.com/ctlai95/language-servers/commit/ad713122fcb9da90c17301f1312de13ba1d28d01))
* fix for mcp registry error handling ([#2561](https://github.com/ctlai95/language-servers/issues/2561)) ([f5f8b36](https://github.com/ctlai95/language-servers/commit/f5f8b36aa6a6b4ca6228ba3c1110d0532cda65bd))
* fix for mcp servers refresh ([#2550](https://github.com/ctlai95/language-servers/issues/2550)) ([cd75394](https://github.com/ctlai95/language-servers/commit/cd753948c3b3b9b07b626fc41391bd91b55a0d39))
* fix for mcp tool resgistration on smus ([#2524](https://github.com/ctlai95/language-servers/issues/2524)) ([8584723](https://github.com/ctlai95/language-servers/commit/8584723839447dda878474e17a3b21a315ffc759))
* fix for permission update for servers ([#2517](https://github.com/ctlai95/language-servers/issues/2517)) ([ef86b5c](https://github.com/ctlai95/language-servers/commit/ef86b5ce474993265f9ffa8cb184e96eb1d0daee))
* fix null value for codewhisperer percentage ([#2523](https://github.com/ctlai95/language-servers/issues/2523)) ([e898ab4](https://github.com/ctlai95/language-servers/commit/e898ab4a84e7976f6478a434b5ba7694e6ddcb38))
* fix pkce windows url path ([#2173](https://github.com/ctlai95/language-servers/issues/2173)) ([d7b184c](https://github.com/ctlai95/language-servers/commit/d7b184cb12979877722fa0293e9aebec91ff2c18))
* fix to add disk caching for mcp admin state ([#2139](https://github.com/ctlai95/language-servers/issues/2139)) ([f947e1a](https://github.com/ctlai95/language-servers/commit/f947e1a9da4431d6089b22825f992010c30a470b))
* fix to remove config from agent file for failed initialization ([#1948](https://github.com/ctlai95/language-servers/issues/1948)) ([45645c2](https://github.com/ctlai95/language-servers/commit/45645c2cd7c241c54ddfebced6f377f38e077957))
* fix to turn on and off MCP servers incase of error based on last state ([#2143](https://github.com/ctlai95/language-servers/issues/2143)) ([04588df](https://github.com/ctlai95/language-servers/commit/04588dfc33f0d85dbd488814a474b5e354398df0))
* Forward slash shown in rules list in multi-root workspaces on windows ([#1855](https://github.com/ctlai95/language-servers/issues/1855)) ([061caa6](https://github.com/ctlai95/language-servers/commit/061caa6450946e20cd1630b92f9b6dada8058edd))
* fsReplace still available when agentic mode off ([#1731](https://github.com/ctlai95/language-servers/issues/1731)) ([7904ea1](https://github.com/ctlai95/language-servers/commit/7904ea18849bb5b9aa6c0e1eb4c6491f3d1598f4))
* ide mapping for VS/Eclipse for send telemetry API ([#1724](https://github.com/ctlai95/language-servers/issues/1724)) ([84373c5](https://github.com/ctlai95/language-servers/commit/84373c537087492445dbf1d3c9d7b86254603ceb))
* imagecontext image name bug, mutliple images in pinned context ([#1834](https://github.com/ctlai95/language-servers/issues/1834)) ([27d60ab](https://github.com/ctlai95/language-servers/commit/27d60ab5f5249635a9e73be1ee96ecb820133f9a))
* improve history management ([#2312](https://github.com/ctlai95/language-servers/issues/2312)) ([#2357](https://github.com/ctlai95/language-servers/issues/2357)) ([e7aa2a6](https://github.com/ctlai95/language-servers/commit/e7aa2a6545bcb1a8238abfde69a05432be0b6615))
* include toolSpec count for history trimming ([#1778](https://github.com/ctlai95/language-servers/issues/1778)) ([8a5322a](https://github.com/ctlai95/language-servers/commit/8a5322a1f2e2452d5535d5cfcacd6c2bfd595b0e))
* incorrect error reference in previous fix ([9fddc8e](https://github.com/ctlai95/language-servers/commit/9fddc8e11f583dbf089f93979e1602d8c8795a16))
* inline latency telemetry should account for preprocess time ([#2323](https://github.com/ctlai95/language-servers/issues/2323)) ([68c6d14](https://github.com/ctlai95/language-servers/commit/68c6d1465a3325612052740496cc1e6e50f56b9a))
* inline UTD empty cases dont differentiate Edit and Completion ([#2287](https://github.com/ctlai95/language-servers/issues/2287)) ([84e2c8c](https://github.com/ctlai95/language-servers/commit/84e2c8c12f5d828192a302fa11483063d33b059c))
* inline UTD telemetry empty cases dont differentiate Edit and Completion ([#2288](https://github.com/ctlai95/language-servers/issues/2288)) ([d207b6e](https://github.com/ctlai95/language-servers/commit/d207b6e9dfded650c6f65c675ee45c52f8222571))
* inline, nep telemetry not sent and throw sessionId not found ([#2419](https://github.com/ctlai95/language-servers/issues/2419)) ([c96106d](https://github.com/ctlai95/language-servers/commit/c96106d18c9e9d846765665ce2ee50304af4ff7f))
* make file collection for indexing non blocking ([#1701](https://github.com/ctlai95/language-servers/issues/1701)) ([036efde](https://github.com/ctlai95/language-servers/commit/036efdead9c68c4ee6e6590ee2e877ace4cabce6))
* Make the classifier of auto trigger output the same score as the IDE auto trigger classifier ([#1930](https://github.com/ctlai95/language-servers/issues/1930)) ([be3231f](https://github.com/ctlai95/language-servers/commit/be3231f27d545daf137df149e5f9fd23042c82a9))
* McpManager not initialized error ([#2479](https://github.com/ctlai95/language-servers/issues/2479)) ([7e2707b](https://github.com/ctlai95/language-servers/commit/7e2707b8c2b4467aae1fe1c77bb419043e193ddc))
* move ignore walk from app/package.json to server/package.json ([#1748](https://github.com/ctlai95/language-servers/issues/1748)) ([6f88dad](https://github.com/ctlai95/language-servers/commit/6f88dad8423aeccc7668e644d33323037fc7a90c))
* move network commands out of ro category ([#1985](https://github.com/ctlai95/language-servers/issues/1985)) ([3cc9fd9](https://github.com/ctlai95/language-servers/commit/3cc9fd91ae2f78ee28e224d5390ba78509de3615))
* multiple fixes on auth flow edge cases ([#2155](https://github.com/ctlai95/language-servers/issues/2155)) ([472220a](https://github.com/ctlai95/language-servers/commit/472220a745cff4fe91a2cabae4ae059a164ceddd))
* optimize memory bank token usage and add new tab support ([#2366](https://github.com/ctlai95/language-servers/issues/2366)) ([3057d56](https://github.com/ctlai95/language-servers/commit/3057d56e4a3047d1715d6e3560e9f934d1de469c))
* outdated history when trimming happens, add missing metric for compaction ([#2047](https://github.com/ctlai95/language-servers/issues/2047)) ([8390f66](https://github.com/ctlai95/language-servers/commit/8390f6686c804dfbeff91018635df21e9dd89236))
* patch [#2133](https://github.com/ctlai95/language-servers/issues/2133) and handle more variants of FIM suggestions ([#2407](https://github.com/ctlai95/language-servers/issues/2407)) ([f3086d7](https://github.com/ctlai95/language-servers/commit/f3086d71808bd49336e0df9ba30f5be5fda837c3))
* pinned `@Code` symbols do not persist between IDE sessions ([#1887](https://github.com/ctlai95/language-servers/issues/1887)) ([b5c715f](https://github.com/ctlai95/language-servers/commit/b5c715ff5ee303c2d48ffb9c1c6c98a9d985e2f1))
* potential xss issue reported in `mynah-ui` ([#2209](https://github.com/ctlai95/language-servers/issues/2209)) ([cf585cd](https://github.com/ctlai95/language-servers/commit/cf585cd400dab6274f8220139ae94287c0d96824))
* preserve registry server config when updating permissions ([#2515](https://github.com/ctlai95/language-servers/issues/2515)) ([49ca3bb](https://github.com/ctlai95/language-servers/commit/49ca3bbb6dbf9eac4b281aa80cd5ff30b94b3a7e))
* prevent MCP server process duplicates with lightweight tracking ([#2562](https://github.com/ctlai95/language-servers/issues/2562)) ([4ba6eb2](https://github.com/ctlai95/language-servers/commit/4ba6eb27400fe352660128f406e837df34acc247))
* private package mapping during artifact generation ([#2348](https://github.com/ctlai95/language-servers/issues/2348)) ([d56bfa1](https://github.com/ctlai95/language-servers/commit/d56bfa191954fac8068e2bf390c2d0b88ef8b168))
* proper path handling for additional context ([#2129](https://github.com/ctlai95/language-servers/issues/2129)) ([971eaa5](https://github.com/ctlai95/language-servers/commit/971eaa505d948e9d2090c85f9b965f554ea7f2c8))
* put compaction feature behind a feature flag ([#1945](https://github.com/ctlai95/language-servers/issues/1945)) ([51f4161](https://github.com/ctlai95/language-servers/commit/51f4161571679408d6b11b61d70d8027097a6ef6))
* put streakLength under feature flag ([#1796](https://github.com/ctlai95/language-servers/issues/1796)) ([dc4a8fd](https://github.com/ctlai95/language-servers/commit/dc4a8fdd6e94fafe9b1dbe6cb1419c55a285df70))
* quick fix for repeated logging from squashed commit ([#2291](https://github.com/ctlai95/language-servers/issues/2291)) ([36f3eed](https://github.com/ctlai95/language-servers/commit/36f3eedd1cad3fca4fc48792ba40b6470f733bfa))
* reduce auto trigger frequency for VSC ([#2168](https://github.com/ctlai95/language-servers/issues/2168)) ([00e11ff](https://github.com/ctlai95/language-servers/commit/00e11ff48eafaa0baec48177fa4aa6d60048af2f))
* remove edit cache logic ([#2079](https://github.com/ctlai95/language-servers/issues/2079)) ([9bc5b9c](https://github.com/ctlai95/language-servers/commit/9bc5b9c1d77e5fee6f518f7f5016d3a0043a5a77))
* remove hardcoded EDITS predictionTypes for trigger on acceptance ([#1937](https://github.com/ctlai95/language-servers/issues/1937)) ([8ef7986](https://github.com/ctlai95/language-servers/commit/8ef7986424dc4ced8e7414c1378dfca872150fb4))
* remove hardcoding of builtIn and builtInWrite tools ([#1774](https://github.com/ctlai95/language-servers/issues/1774)) ([fc8cc10](https://github.com/ctlai95/language-servers/commit/fc8cc106617249c81a5c48601418b5f31451865c))
* remove malicious characters from MCP tool description ([#1977](https://github.com/ctlai95/language-servers/issues/1977)) ([64d4e3e](https://github.com/ctlai95/language-servers/commit/64d4e3ebade706b01d256682cafe8d4ff8b85f41))
* remove malicious characters from prompt input ([#2009](https://github.com/ctlai95/language-servers/issues/2009)) ([bf8a1e6](https://github.com/ctlai95/language-servers/commit/bf8a1e6136801532132f2bf82def4ca5bf49c82f))
* remove redundent thinking... for file operations ([#1839](https://github.com/ctlai95/language-servers/issues/1839)) ([0078602](https://github.com/ctlai95/language-servers/commit/00786023c9c257c9bb8066c36715864b32b4e069))
* replace cancel with stop ([#1935](https://github.com/ctlai95/language-servers/issues/1935)) ([2f51923](https://github.com/ctlai95/language-servers/commit/2f51923f9d3497469c70162235482b569e2d796e))
* replace thinking with working and replace stop with cancel ([#1922](https://github.com/ctlai95/language-servers/issues/1922)) ([371e731](https://github.com/ctlai95/language-servers/commit/371e731545f7572d3356d061cd8b94db35e4c333))
* resolve broken error handling in setPaidTierMode ([#2500](https://github.com/ctlai95/language-servers/issues/2500)) ([8ccb067](https://github.com/ctlai95/language-servers/commit/8ccb06768c4a386b0a4699d8b2e299f0aad110b1))
* resolve process crash when managing BID subscription ([#2501](https://github.com/ctlai95/language-servers/issues/2501)) ([5d6590a](https://github.com/ctlai95/language-servers/commit/5d6590a1d8c7aeb80b75036eb0e1b3802afe5c08))
* sanitize request input ([#2025](https://github.com/ctlai95/language-servers/issues/2025)) ([7c0efd7](https://github.com/ctlai95/language-servers/commit/7c0efd73d5e9a0e3f42d143a10c16782f6e35db8))
* separate executeBash toolspec for mac and windows ([#1727](https://github.com/ctlai95/language-servers/issues/1727)) ([33e0e4b](https://github.com/ctlai95/language-servers/commit/33e0e4b2347e858ccb0c82c333aeaa8938b24c22))
* sessionManager misused because there are 2 types of manager now ([#2090](https://github.com/ctlai95/language-servers/issues/2090)) ([8db059a](https://github.com/ctlai95/language-servers/commit/8db059ab83d94fd7c3ba3eb265044add31c80aea))
* setting shouldDisplayMessage to false for /agents ([#1811](https://github.com/ctlai95/language-servers/issues/1811)) ([4a72cf7](https://github.com/ctlai95/language-servers/commit/4a72cf7bbc9081f65c4e88c3ab42441a21ec6e03))
* should always trigger EDIT suggestion if triggering via acceptance ([#1826](https://github.com/ctlai95/language-servers/issues/1826)) ([6c9e522](https://github.com/ctlai95/language-servers/commit/6c9e5225a58d7cf43931d84e7ae63275d6f9c066))
* should keep reporting UTDE telemetry if there are still pending Edits suggestions ([#2051](https://github.com/ctlai95/language-servers/issues/2051)) ([78c67b1](https://github.com/ctlai95/language-servers/commit/78c67b1a29821f54006d160695e997870d17f3b5))
* should send classifier score after taking sigmoid ([#2188](https://github.com/ctlai95/language-servers/issues/2188)) ([f4e2e6e](https://github.com/ctlai95/language-servers/commit/f4e2e6e885e665834a5d7b7cbb5f4ba4ff9bbb65))
* should trigger edits if one of the following lines is non-empty ([#1915](https://github.com/ctlai95/language-servers/issues/1915)) ([b298602](https://github.com/ctlai95/language-servers/commit/b2986026293e26bff0cacbaf1554999c12fb429c))
* skip image sanitization ([#2031](https://github.com/ctlai95/language-servers/issues/2031)) ([f02fc23](https://github.com/ctlai95/language-servers/commit/f02fc231136940bd644c426d2b222ae2cba779c4))
* sometimes Enter does not auto trigger ([#2005](https://github.com/ctlai95/language-servers/issues/2005)) ([c9af035](https://github.com/ctlai95/language-servers/commit/c9af0353a6c6f3b2ca4eead02f19e8ab5ddb8ef1))
* strenghen NEP trigger conditions ([#2438](https://github.com/ctlai95/language-servers/issues/2438)) ([82e2340](https://github.com/ctlai95/language-servers/commit/82e2340cf86a5eba20f8d18f1293c136c0022dd9))
* thinking doesn't get removed if response is empty ([#1699](https://github.com/ctlai95/language-servers/issues/1699)) ([9a63c99](https://github.com/ctlai95/language-servers/commit/9a63c99b3195c9da0f537980324998138f25a3fa))
* treat `echo`/`find`/`grep` as mutating ([#1921](https://github.com/ctlai95/language-servers/issues/1921)) ([ef801a3](https://github.com/ctlai95/language-servers/commit/ef801a3b9c435c25899eaa3712cabf6d5c4b9922))
* trim new line when emitting error message ([#2359](https://github.com/ctlai95/language-servers/issues/2359)) ([d8733a7](https://github.com/ctlai95/language-servers/commit/d8733a75487f74815302b838802eccbf3ffec55e))
* undefined path causing the loop to break ([#1718](https://github.com/ctlai95/language-servers/issues/1718)) ([8e48b86](https://github.com/ctlai95/language-servers/commit/8e48b866221c70c79156b714f036413816748b6c))
* update ChatHandlers before adding new types dependency ([#1925](https://github.com/ctlai95/language-servers/issues/1925)) ([e94e581](https://github.com/ctlai95/language-servers/commit/e94e581a00fb99d862527ee7b91bf37ef47f4013))
* update client name to support Sagemaker AI origin for agentic chat ([#2093](https://github.com/ctlai95/language-servers/issues/2093)) ([a746fe8](https://github.com/ctlai95/language-servers/commit/a746fe845d5e09563b475f01ce44059dca9fd10f))
* update fsReplace toolSpec to emphasize JSON array syntax ([#1751](https://github.com/ctlai95/language-servers/issues/1751)) ([31f6994](https://github.com/ctlai95/language-servers/commit/31f6994c25d2a24709fd7119463d1be269cd68b1))
* update inputLimit calculation to use fixed 100K reserved characters ([#2557](https://github.com/ctlai95/language-servers/issues/2557)) ([ef04639](https://github.com/ctlai95/language-servers/commit/ef0463937898570e33b45d48800a9d33bc6adc3b))
* use absolute file path for shell ([#1871](https://github.com/ctlai95/language-servers/issues/1871)) ([f863735](https://github.com/ctlai95/language-servers/commit/f863735c8dc734a1af4b26fbe8b9c436a32c21ca))
* use document change events for auto trigger classifier input ([#1912](https://github.com/ctlai95/language-servers/issues/1912)) ([2204da6](https://github.com/ctlai95/language-servers/commit/2204da6193f2030ee546f61c969b1a664d8025e3))
* use fast glob streaming when collecting files ([#2003](https://github.com/ctlai95/language-servers/issues/2003)) ([f7c0a0b](https://github.com/ctlai95/language-servers/commit/f7c0a0b0ef9ce3ecd620acfef00e55745db3d71f))
* Use file context override in the inline completion params for Jupyter Notebook ([#2114](https://github.com/ctlai95/language-servers/issues/2114)) ([91c8398](https://github.com/ctlai95/language-servers/commit/91c839857f8aa4d79098189f9fb620b361c51289))
* use new language server runtime ([#2023](https://github.com/ctlai95/language-servers/issues/2023)) ([83ea1e4](https://github.com/ctlai95/language-servers/commit/83ea1e42fe52990696eb9b878fa11e2c5331bec5))
* userTriggerDecision STE suggestionType validation error ([#2313](https://github.com/ctlai95/language-servers/issues/2313)) ([8f30ac0](https://github.com/ctlai95/language-servers/commit/8f30ac0ec5f4f7b7c343f5e889aec64a282897ea))


### Performance Improvements

* only process edit requests 1 at a time ([#2187](https://github.com/ctlai95/language-servers/issues/2187)) ([b497540](https://github.com/ctlai95/language-servers/commit/b4975409a3ed518550290b72ac310895a293be4b))
* remove edit completion retry mechanism on document change ([#2124](https://github.com/ctlai95/language-servers/issues/2124)) ([963b6e9](https://github.com/ctlai95/language-servers/commit/963b6e9b7887da23a85a826c55a6ed95ff36d956))


### Reverts

* adding files on VSC windows properly triggers reindexing ([#1820](https://github.com/ctlai95/language-servers/issues/1820))" ([#1860](https://github.com/ctlai95/language-servers/issues/1860)) ([423cdbc](https://github.com/ctlai95/language-servers/commit/423cdbc48d9439e29ba69c37dc289a739f83475f))
* adding streakLength back for UserTriggerDecisionEvent ([#1877](https://github.com/ctlai95/language-servers/issues/1877)) ([b199100](https://github.com/ctlai95/language-servers/commit/b199100153aa0629890c49e12a56efbb9c627154))
* **amazonq:** bring back [#1684](https://github.com/ctlai95/language-servers/issues/1684) ([#1697](https://github.com/ctlai95/language-servers/issues/1697)) ([5e7aa76](https://github.com/ctlai95/language-servers/commit/5e7aa76b6ebcf8e0a7489d3574cc14ed3d0ceebe))
* **amazonq:** bring back [#1689](https://github.com/ctlai95/language-servers/issues/1689) ([5b84b0e](https://github.com/ctlai95/language-servers/commit/5b84b0e4c42c344d91ef9c99a04d3a2671221aa1))
* fix adding files on windows properly triggers reindexing ([#1743](https://github.com/ctlai95/language-servers/issues/1743)) ([08d15e6](https://github.com/ctlai95/language-servers/commit/08d15e67e1ff690dab8bf2dca5c0cf977afc0ba9))
* fix to add opt-out header to streaming client ([#2365](https://github.com/ctlai95/language-servers/issues/2365)) ([#2370](https://github.com/ctlai95/language-servers/issues/2370)) ([b29478f](https://github.com/ctlai95/language-servers/commit/b29478fa1ecc58e331ff330ff79f46b0d8c38d9e))
* inline UTD telemetry empty cases dont differentiate Edit and Completion ([#2288](https://github.com/ctlai95/language-servers/issues/2288)) ([#2297](https://github.com/ctlai95/language-servers/issues/2297)) ([eb081e6](https://github.com/ctlai95/language-servers/commit/eb081e6bc6bef4182ab89e295bff97c4e828096b))
* PR 2172 dedupe openTabs supplemental contexts ([#2194](https://github.com/ctlai95/language-servers/issues/2194)) ([94723d4](https://github.com/ctlai95/language-servers/commit/94723d46073a1ea8211e7ae8f9dfce3fcb809604))
* reduce auto trigger frequency for VSC ([#2168](https://github.com/ctlai95/language-servers/issues/2168))" ([#2177](https://github.com/ctlai95/language-servers/issues/2177)) ([08720c6](https://github.com/ctlai95/language-servers/commit/08720c6c3fa83f9b3b6775d4ae4d848ce145b94b))
* Revert "fix: adding files on windows properly triggers reindexing ([#1755](https://github.com/ctlai95/language-servers/issues/1755))" ([#1794](https://github.com/ctlai95/language-servers/issues/1794)) ([bb4fb25](https://github.com/ctlai95/language-servers/commit/bb4fb25e3e8c9b0a99b75cde08e9617053d69993))
* revert for all commits for emergency deployment ([#1966](https://github.com/ctlai95/language-servers/issues/1966)) ([519f75d](https://github.com/ctlai95/language-servers/commit/519f75d22466b72702793b4f1d1ed846c02bbd14))
* revert for mid-loop compaction ([3f48b12](https://github.com/ctlai95/language-servers/commit/3f48b12bce4faba474404f7c74a9520c379552fe))
* revert: adding files on VSC windows properly triggers reindexing ([#18](https://github.com/ctlai95/language-servers/issues/18)&" ([#1862](https://github.com/ctlai95/language-servers/issues/1862)) ([8e0c88b](https://github.com/ctlai95/language-servers/commit/8e0c88b91d4f04e3209bbe35ee5678793c94b0f1))
* use cw streaming client from npm ([#1552](https://github.com/ctlai95/language-servers/issues/1552)) ([788d8ed](https://github.com/ctlai95/language-servers/commit/788d8ed58f828b16ddce9029b8d640ed1fe885bc))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aws/lsp-core bumped from ^0.0.18 to ^0.0.19
</details>

<details><summary>lsp-core: 0.0.19</summary>

## [0.0.19](https://github.com/ctlai95/language-servers/compare/lsp-core/v0.0.18...lsp-core/v0.0.19) (2025-12-17)


### Features

* add support for getSupplementalContext LSP API ([#2212](https://github.com/ctlai95/language-servers/issues/2212)) ([2ddcae7](https://github.com/ctlai95/language-servers/commit/2ddcae7a4fac6b89cbc9784911959743ea0a6d11))
* Adding ATX-FES apis support for transformation ([#2521](https://github.com/ctlai95/language-servers/issues/2521)) ([56ee489](https://github.com/ctlai95/language-servers/commit/56ee4891a2e19b259c129fd531f8b06f763c1b57))
* **amazonq:** added mcp admin level configuration with GetProfile ([#2000](https://github.com/ctlai95/language-servers/issues/2000)) ([fd6e9a8](https://github.com/ctlai95/language-servers/commit/fd6e9a829c6229c276de5340dffce52b426a864d))
* **amazonq:** adding MCP registry for governance for Amazon Q ([#2512](https://github.com/ctlai95/language-servers/issues/2512)) ([e8d4bf5](https://github.com/ctlai95/language-servers/commit/e8d4bf588e9b7bc13102b33ee03bd357f9698811))


### Bug Fixes

* add proper encoding support for shell output ([#1903](https://github.com/ctlai95/language-servers/issues/1903)) ([44a6d62](https://github.com/ctlai95/language-servers/commit/44a6d629af7702662a02f384a6a542c0d72ccc39))
* **amazonq:** add handling for relative paths for isInWorkspace ([#1801](https://github.com/ctlai95/language-servers/issues/1801)) ([3c273a7](https://github.com/ctlai95/language-servers/commit/3c273a7aeac88a7afe40abaf490bc0950e517c01))
* **amazonq:** Fix mock fs clean; Node version upgrade ([#2324](https://github.com/ctlai95/language-servers/issues/2324)) ([1d9afd4](https://github.com/ctlai95/language-servers/commit/1d9afd410e19624223e300ca06ea7d08a112cc82))
* **amazonq:** handle IAM credentials expiration field to be aws sdk versions compatible and add refresh logic to codewhisperer IAM client ([#2349](https://github.com/ctlai95/language-servers/issues/2349)) ([5eb3768](https://github.com/ctlai95/language-servers/commit/5eb3768bf020d61d0ade767d62e13839048146e4))
* **amazonq:** workspace files being tagged as out of workspace issue ([#1726](https://github.com/ctlai95/language-servers/issues/1726)) ([4bd9aea](https://github.com/ctlai95/language-servers/commit/4bd9aeab439d15dc425634b14470fd3c67986c4a))
* cve and bump language server runtime version to 0.3.10 ([#2544](https://github.com/ctlai95/language-servers/issues/2544)) ([d06e09f](https://github.com/ctlai95/language-servers/commit/d06e09f1c7c2ce017d0a5b4394cc8d17454e2862))
* use document change events for auto trigger classifier input ([#1912](https://github.com/ctlai95/language-servers/issues/1912)) ([2204da6](https://github.com/ctlai95/language-servers/commit/2204da6193f2030ee546f61c969b1a664d8025e3))
* Use file context override in the inline completion params for Jupyter Notebook ([#2114](https://github.com/ctlai95/language-servers/issues/2114)) ([91c8398](https://github.com/ctlai95/language-servers/commit/91c839857f8aa4d79098189f9fb620b361c51289))
* use new language server runtime ([#2023](https://github.com/ctlai95/language-servers/issues/2023)) ([83ea1e4](https://github.com/ctlai95/language-servers/commit/83ea1e42fe52990696eb9b878fa11e2c5331bec5))
</details>

<details><summary>lsp-json: 0.1.24</summary>

## [0.1.24](https://github.com/ctlai95/language-servers/compare/lsp-json/v0.1.23...lsp-json/v0.1.24) (2025-12-17)


### Features

* add client side ide diagnostics to telemetry event ([#1768](https://github.com/ctlai95/language-servers/issues/1768)) ([d08fc6c](https://github.com/ctlai95/language-servers/commit/d08fc6cccb9238cef9c2ba485e116c0516839537))
* add support for getSupplementalContext LSP API ([#2212](https://github.com/ctlai95/language-servers/issues/2212)) ([2ddcae7](https://github.com/ctlai95/language-servers/commit/2ddcae7a4fac6b89cbc9784911959743ea0a6d11))
* Adding ATX-FES apis support for transformation ([#2521](https://github.com/ctlai95/language-servers/issues/2521)) ([56ee489](https://github.com/ctlai95/language-servers/commit/56ee4891a2e19b259c129fd531f8b06f763c1b57))
* **amazonq:** adding MCP registry for governance for Amazon Q ([#2512](https://github.com/ctlai95/language-servers/issues/2512)) ([e8d4bf5](https://github.com/ctlai95/language-servers/commit/e8d4bf588e9b7bc13102b33ee03bd357f9698811))


### Bug Fixes

* cve and bump language server runtime version to 0.3.10 ([#2544](https://github.com/ctlai95/language-servers/issues/2544)) ([d06e09f](https://github.com/ctlai95/language-servers/commit/d06e09f1c7c2ce017d0a5b4394cc8d17454e2862))
* set resolveProvider to false in init handler json and yaml language servers ([#2391](https://github.com/ctlai95/language-servers/issues/2391)) ([e11c544](https://github.com/ctlai95/language-servers/commit/e11c544804e4fbe7dbad3e5373223ba919a34758))
* use document change events for auto trigger classifier input ([#1912](https://github.com/ctlai95/language-servers/issues/1912)) ([2204da6](https://github.com/ctlai95/language-servers/commit/2204da6193f2030ee546f61c969b1a664d8025e3))
* Use file context override in the inline completion params for Jupyter Notebook ([#2114](https://github.com/ctlai95/language-servers/issues/2114)) ([91c8398](https://github.com/ctlai95/language-servers/commit/91c839857f8aa4d79098189f9fb620b361c51289))
* use new language server runtime ([#2023](https://github.com/ctlai95/language-servers/issues/2023)) ([83ea1e4](https://github.com/ctlai95/language-servers/commit/83ea1e42fe52990696eb9b878fa11e2c5331bec5))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aws/lsp-core bumped from ^0.0.18 to ^0.0.19
</details>

<details><summary>lsp-partiql: 0.0.21</summary>

## [0.0.21](https://github.com/ctlai95/language-servers/compare/lsp-partiql/v0.0.20...lsp-partiql/v0.0.21) (2025-12-17)


### Features

* add client side ide diagnostics to telemetry event ([#1768](https://github.com/ctlai95/language-servers/issues/1768)) ([d08fc6c](https://github.com/ctlai95/language-servers/commit/d08fc6cccb9238cef9c2ba485e116c0516839537))
* add support for getSupplementalContext LSP API ([#2212](https://github.com/ctlai95/language-servers/issues/2212)) ([2ddcae7](https://github.com/ctlai95/language-servers/commit/2ddcae7a4fac6b89cbc9784911959743ea0a6d11))
* Adding ATX-FES apis support for transformation ([#2521](https://github.com/ctlai95/language-servers/issues/2521)) ([56ee489](https://github.com/ctlai95/language-servers/commit/56ee4891a2e19b259c129fd531f8b06f763c1b57))
* **amazonq:** adding MCP registry for governance for Amazon Q ([#2512](https://github.com/ctlai95/language-servers/issues/2512)) ([e8d4bf5](https://github.com/ctlai95/language-servers/commit/e8d4bf588e9b7bc13102b33ee03bd357f9698811))


### Bug Fixes

* cve and bump language server runtime version to 0.3.10 ([#2544](https://github.com/ctlai95/language-servers/issues/2544)) ([d06e09f](https://github.com/ctlai95/language-servers/commit/d06e09f1c7c2ce017d0a5b4394cc8d17454e2862))
* use document change events for auto trigger classifier input ([#1912](https://github.com/ctlai95/language-servers/issues/1912)) ([2204da6](https://github.com/ctlai95/language-servers/commit/2204da6193f2030ee546f61c969b1a664d8025e3))
* Use file context override in the inline completion params for Jupyter Notebook ([#2114](https://github.com/ctlai95/language-servers/issues/2114)) ([91c8398](https://github.com/ctlai95/language-servers/commit/91c839857f8aa4d79098189f9fb620b361c51289))
* use new language server runtime ([#2023](https://github.com/ctlai95/language-servers/issues/2023)) ([83ea1e4](https://github.com/ctlai95/language-servers/commit/83ea1e42fe52990696eb9b878fa11e2c5331bec5))
</details>

<details><summary>lsp-yaml: 0.1.24</summary>

## [0.1.24](https://github.com/ctlai95/language-servers/compare/lsp-yaml/v0.1.23...lsp-yaml/v0.1.24) (2025-12-17)


### Features

* add client side ide diagnostics to telemetry event ([#1768](https://github.com/ctlai95/language-servers/issues/1768)) ([d08fc6c](https://github.com/ctlai95/language-servers/commit/d08fc6cccb9238cef9c2ba485e116c0516839537))
* add support for getSupplementalContext LSP API ([#2212](https://github.com/ctlai95/language-servers/issues/2212)) ([2ddcae7](https://github.com/ctlai95/language-servers/commit/2ddcae7a4fac6b89cbc9784911959743ea0a6d11))
* Adding ATX-FES apis support for transformation ([#2521](https://github.com/ctlai95/language-servers/issues/2521)) ([56ee489](https://github.com/ctlai95/language-servers/commit/56ee4891a2e19b259c129fd531f8b06f763c1b57))
* **amazonq:** adding MCP registry for governance for Amazon Q ([#2512](https://github.com/ctlai95/language-servers/issues/2512)) ([e8d4bf5](https://github.com/ctlai95/language-servers/commit/e8d4bf588e9b7bc13102b33ee03bd357f9698811))


### Bug Fixes

* cve and bump language server runtime version to 0.3.10 ([#2544](https://github.com/ctlai95/language-servers/issues/2544)) ([d06e09f](https://github.com/ctlai95/language-servers/commit/d06e09f1c7c2ce017d0a5b4394cc8d17454e2862))
* set resolveProvider to false in init handler json and yaml language servers ([#2391](https://github.com/ctlai95/language-servers/issues/2391)) ([e11c544](https://github.com/ctlai95/language-servers/commit/e11c544804e4fbe7dbad3e5373223ba919a34758))
* use document change events for auto trigger classifier input ([#1912](https://github.com/ctlai95/language-servers/issues/1912)) ([2204da6](https://github.com/ctlai95/language-servers/commit/2204da6193f2030ee546f61c969b1a664d8025e3))
* Use file context override in the inline completion params for Jupyter Notebook ([#2114](https://github.com/ctlai95/language-servers/issues/2114)) ([91c8398](https://github.com/ctlai95/language-servers/commit/91c839857f8aa4d79098189f9fb620b361c51289))
* use new language server runtime ([#2023](https://github.com/ctlai95/language-servers/issues/2023)) ([83ea1e4](https://github.com/ctlai95/language-servers/commit/83ea1e42fe52990696eb9b878fa11e2c5331bec5))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aws/lsp-core bumped from ^0.0.18 to ^0.0.19
</details>

---
This PR was generated with [Release Please](https://github.com/googleapis/release-please) bot. When you are ready to release these changes, merge this PR.

**Blocking GitHub Checks Issue:** if GitHub checks do not run, close and immediately re-open this PR manually.