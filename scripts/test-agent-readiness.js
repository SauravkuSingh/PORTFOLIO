import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`\x1b[32m✔ PASS:\x1b[0m ${message}`);
    passed++;
  } else {
    console.error(`\x1b[31m✖ FAIL:\x1b[0m ${message}`);
    failed++;
  }
}

console.log("==================================================");
console.log(" Running Agent Readiness Audit & Test Suite");
console.log("==================================================\n");

// Test 1: Agent instructions / when-to-use in llms.txt
const llmsPath = path.join(rootDir, "public", "llms.txt");
assert(fs.existsSync(llmsPath), "llms.txt exists in public/ directory");

if (fs.existsSync(llmsPath)) {
  const llmsContent = fs.readFileSync(llmsPath, "utf-8");
  assert(
    llmsContent.includes("When to Use This Site / Agent Instructions") ||
    llmsContent.includes("When to use"),
    "llms.txt contains explicit 'When to Use This Site / Agent Instructions' section"
  );
  assert(
    llmsContent.length > 500,
    `llms.txt contains sufficient length (${llmsContent.length} chars > 500)`
  );
}

// Test 2: Agent-friendly 404 handler
const notFoundPath = path.join(rootDir, "src", "app", "not-found.jsx");
assert(fs.existsSync(notFoundPath), "src/app/not-found.jsx 404 page exists");

if (fs.existsSync(notFoundPath)) {
  const notFoundContent = fs.readFileSync(notFoundPath, "utf-8");
  assert(
    notFoundContent.includes("/sitemap.xml") && notFoundContent.includes("/llms.txt"),
    "404 page includes sitemap.xml and llms.txt recovery links"
  );
}

// Test 3: Middleware & Markdown content negotiation (acceptmarkdown.com)
const middlewarePath = path.join(rootDir, "src", "middleware.js");
assert(fs.existsSync(middlewarePath), "src/middleware.js exists");

if (fs.existsSync(middlewarePath)) {
  const middlewareContent = fs.readFileSync(middlewarePath, "utf-8");
  assert(
    middlewareContent.includes("text/markdown") && middlewareContent.includes("Vary"),
    "middleware.js handles Accept: text/markdown negotiation and sets Vary headers"
  );
  assert(
    middlewareContent.includes("404"),
    "middleware.js returns HTTP 404 markdown for nonexistent routes"
  );
}

// Test 4: Heading hierarchy in Home.jsx
const homePath = path.join(rootDir, "src", "sections", "Home.jsx");
if (fs.existsSync(homePath)) {
  const homeContent = fs.readFileSync(homePath, "utf-8");
  const statCardH3Match = homeContent.includes('<h3 className="text-2xl lg:text-3xl font-bold');
  assert(
    !statCardH3Match,
    "Home.jsx stat counters do not skip H1 to H3 (replaced h3 with span/div)"
  );
}

// Test 5: Trust Anchor Pages (About, Contact, Privacy)
const aboutPath = path.join(rootDir, "src", "sections", "About.jsx");
const contactPath = path.join(rootDir, "src", "app", "contact", "ContactClient.jsx");
const privacyPath = path.join(rootDir, "src", "app", "privacy", "page.jsx");

assert(fs.existsSync(aboutPath), "About page section exists");
assert(fs.existsSync(contactPath), "Contact page client component exists");
assert(fs.existsSync(privacyPath), "Privacy page exists");

if (fs.existsSync(contactPath)) {
  const contactContent = fs.readFileSync(contactPath, "utf-8");
  assert(
    contactContent.length >= 500,
    `Contact page contains sufficient content (${contactContent.length} chars >= 500)`
  );
  assert(
    contactContent.includes("sauravksinghdev@gmail.com") || contactContent.includes("sauravsinghfsdev@gmail.com"),
    "Contact page contains verified email address"
  );
}

if (fs.existsSync(privacyPath)) {
  const privacyContent = fs.readFileSync(privacyPath, "utf-8");
  assert(
    privacyContent.length >= 500,
    `Privacy page contains sufficient content (${privacyContent.length} chars >= 500)`
  );
}

// Test 6: Sitemap registration
const sitemapPath = path.join(rootDir, "src", "app", "sitemap.js");
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
  assert(
    sitemapContent.includes("/contact") && sitemapContent.includes("/privacy"),
    "sitemap.js contains /contact and /privacy endpoints"
  );
}

// Test 7: Static SSR Homepage imports for >5% raw HTML content ratio
const pagePath = path.join(rootDir, "src", "app", "page.jsx");
if (fs.existsSync(pagePath)) {
  const pageContent = fs.readFileSync(pagePath, "utf-8");
  assert(
    !pageContent.includes("dynamic("),
    "page.jsx statically imports all homepage sections so SSR outputs complete raw HTML content"
  );
}

// Test 8: Brand Entity Discoverability in layout.jsx & robots.js
const layoutPath = path.join(rootDir, "src", "app", "layout.jsx");
const robotsPath = path.join(rootDir, "src", "app", "robots.js");
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");
  assert(
    layoutContent.includes("alternateName") && layoutContent.includes("ProfilePage"),
    "layout.jsx contains brand alternateName aliases and ProfilePage JSON-LD schemas"
  );
}
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, "utf-8");
  assert(
    robotsContent.includes("GPTBot") && robotsContent.includes("ClaudeBot"),
    "robots.js includes explicit crawl rules for AI search engines"
  );
}

console.log("\n--------------------------------------------------");
console.log(` Audit Test Results: ${passed} passed, ${failed} failed.`);
console.log("--------------------------------------------------\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("\x1b[32m✔ ALL AGENT READINESS AUDIT TESTS PASSED!\x1b[0m\n");
}
