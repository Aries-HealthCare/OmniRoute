/**
 * activate-free-providers.mjs — OmniRoute Systematic Free Provider Activation Script
 *
 * Seeding & activating all free, no-auth, and free-tier gateway providers in OmniRoute's SQLite database.
 */

import path from "path";
import fs from "fs";
import os from "os";
import BetterSqlite3 from "better-sqlite3";

// Resolve OmniRoute Data Directory
const dataDir = process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "omniroute.db");
console.log(`[OmniRoute Activation] Target SQLite Database: ${dbPath}`);

const db = new BetterSqlite3(dbPath);
db.pragma("journal_mode = WAL");

// Complete List of Free & No-Auth Providers to Systematically Activate
const FREE_PROVIDERS_CONFIG = [
  // 1. NO-AUTH PROVIDERS (Zero credentials, anonymous endpoints)
  {
    id: "opencode",
    name: "OpenCode Free",
    authType: "noauth",
    apiKey: "free-noauth-opencode",
    priority: 10,
    displayName: "OpenCode Free Gateway (Kimi, GLM, Qwen, MiMo, MiniMax)",
  },
  {
    id: "duckduckgo-web",
    name: "DuckDuckGo AI Chat",
    authType: "noauth",
    apiKey: "free-noauth-ddg",
    priority: 9,
    displayName: "DuckDuckGo AI Chat (Anonymous GPT-4o-mini, Claude, Llama)",
  },
  {
    id: "felo-web",
    name: "Felo AI Search",
    authType: "noauth",
    apiKey: "free-noauth-felo",
    priority: 8,
    displayName: "Felo AI Search Aggregator",
  },
  {
    id: "theoldllm",
    name: "The Old LLM (Free)",
    authType: "noauth",
    apiKey: "free-noauth-tllm",
    priority: 8,
    displayName: "The Old LLM (GPT-5.4, Claude 4.6 Opus/Sonnet/Haiku)",
  },
  {
    id: "chipotle",
    name: "Chipotle Pepper AI",
    authType: "noauth",
    apiKey: "free-noauth-chipotle",
    priority: 7,
    displayName: "Chipotle Pepper AI (Amelia Chatbot)",
  },
  {
    id: "veoaifree-web",
    name: "Veo AI Free Video",
    authType: "noauth",
    apiKey: "free-noauth-veo",
    priority: 7,
    displayName: "Veo AI Free (VEO 3.1 & Seedance Video Generation)",
  },
  {
    id: "mimocode",
    name: "Xiaomi MiMoCode",
    authType: "noauth",
    apiKey: "free-noauth-mimocode",
    priority: 9,
    displayName: "MiMoCode (Xiaomi Free AI Models)",
  },
  {
    id: "auggie",
    name: "Augment Auggie CLI",
    authType: "noauth",
    apiKey: "free-noauth-auggie",
    priority: 6,
    displayName: "Augment CLI (Local Passthrough)",
  },
  {
    id: "aihorde",
    name: "AI Horde GPU Network",
    authType: "noauth",
    apiKey: "0000000000", // Anonymous key for AI Horde
    priority: 7,
    displayName: "AI Horde (Crowdsourced Volunteer GPU Inference)",
  },

  // 2. FREE GATEWAY & OPTIONAL API-KEY PROVIDERS
  {
    id: "pollinations",
    name: "Pollinations AI",
    authType: "apikey",
    apiKey: "free-pollinations-key",
    priority: 10,
    displayName: "Pollinations AI (Text, Image & Video Models)",
  },
  {
    id: "searxng-search",
    name: "SearXNG Web Search",
    authType: "noauth",
    apiKey: "free-searxng-key",
    priority: 8,
    displayName: "SearXNG Meta Search Engine",
  },
  {
    id: "copilot-web",
    name: "Copilot Web Free",
    authType: "noauth",
    apiKey: "free-copilot-web",
    priority: 8,
    displayName: "Microsoft Copilot Web (Free Tier)",
  },
  {
    id: "hackclub",
    name: "Hack Club AI Gateway",
    authType: "apikey",
    apiKey: "free-hackclub-key",
    priority: 8,
    displayName: "Hack Club Free AI Gateway",
  },
  {
    id: "g4f-groq",
    name: "G4F Groq Free",
    authType: "apikey",
    apiKey: "free-g4f-groq",
    priority: 9,
    displayName: "GPT4Free Groq High-Speed Gateway",
  },
  {
    id: "g4f-gemini",
    name: "G4F Gemini Free",
    authType: "apikey",
    apiKey: "free-g4f-gemini",
    priority: 9,
    displayName: "GPT4Free Gemini Flash/Pro Gateway",
  },
  {
    id: "g4f-pollinations",
    name: "G4F Pollinations",
    authType: "apikey",
    apiKey: "free-g4f-pollinations",
    priority: 8,
    displayName: "GPT4Free Pollinations Gateway",
  },
  {
    id: "g4f-ollama",
    name: "G4F Ollama",
    authType: "apikey",
    apiKey: "free-g4f-ollama",
    priority: 8,
    displayName: "GPT4Free Ollama Gateway",
  },
  {
    id: "g4f-nvidia",
    name: "G4F Nvidia NIM",
    authType: "apikey",
    apiKey: "free-g4f-nvidia",
    priority: 9,
    displayName: "GPT4Free Nvidia NIM Gateway",
  },
  {
    id: "huggingchat",
    name: "HuggingChat Free",
    authType: "noauth",
    apiKey: "free-huggingchat",
    priority: 8,
    displayName: "HuggingChat (Open Source Models)",
  },
  {
    id: "gitlawb",
    name: "GitLawb Free AI",
    authType: "noauth",
    apiKey: "free-gitlawb",
    priority: 7,
    displayName: "GitLawb Free AI Gateway",
  },
  {
    id: "gitlawb-gmi",
    name: "GitLawb Gemini Free",
    authType: "noauth",
    apiKey: "free-gitlawb-gmi",
    priority: 7,
    displayName: "GitLawb Gemini Gateway",
  },
  {
    id: "qoder",
    name: "Qoder Free",
    authType: "apikey",
    apiKey: "free-qoder-key",
    priority: 8,
    displayName: "Qoder Free Coding Assistant",
  },
  {
    id: "dahl",
    name: "Dahl AI Free",
    authType: "apikey",
    apiKey: "free-dahl-key",
    priority: 7,
    displayName: "Dahl AI Free Model Gateway",
  },
  {
    id: "codebuddy-cn",
    name: "CodeBuddy CN",
    authType: "apikey",
    apiKey: "free-codebuddy-cn",
    priority: 7,
    displayName: "Tencent CodeBuddy CN Gateway",
  },
  {
    id: "zenmux-free",
    name: "ZenMux Free",
    authType: "noauth",
    apiKey: "free-zenmux-key",
    priority: 8,
    displayName: "ZenMux Free Model Router",
  },
  {
    id: "puter",
    name: "Puter AI Free",
    authType: "noauth",
    apiKey: "free-puter-key",
    priority: 8,
    displayName: "Puter.com Free AI (GPT-4o-mini, Claude, Mistral)",
  },

  // 3. LOCAL / SELF-HOSTED LLM PROVIDERS
  {
    id: "ollama-local",
    name: "Ollama Local",
    authType: "noauth",
    apiKey: "local-ollama",
    priority: 10,
    displayName: "Ollama Local Instance (http://localhost:11434)",
    providerSpecificData: JSON.stringify({ baseUrl: "http://localhost:11434" }),
  },
  {
    id: "lm-studio",
    name: "LM Studio Local",
    authType: "noauth",
    apiKey: "local-lm-studio",
    priority: 9,
    displayName: "LM Studio Local Server (http://localhost:1234)",
    providerSpecificData: JSON.stringify({ baseUrl: "http://localhost:1234/v1" }),
  },
];

console.log("[OmniRoute Activation] Initializing tables if needed...");

// Ensure table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS provider_connections (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    auth_type TEXT,
    name TEXT,
    email TEXT,
    priority INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TEXT,
    token_expires_at TEXT,
    scope TEXT,
    project_id TEXT,
    test_status TEXT,
    error_code TEXT,
    last_error TEXT,
    last_error_at TEXT,
    last_error_type TEXT,
    last_error_source TEXT,
    backoff_level INTEGER DEFAULT 0,
    rate_limited_until TEXT,
    health_check_interval INTEGER,
    last_health_check_at TEXT,
    last_tested TEXT,
    api_key TEXT,
    id_token TEXT,
    provider_specific_data TEXT,
    expires_in INTEGER,
    display_name TEXT,
    global_priority INTEGER,
    default_model TEXT,
    token_type TEXT,
    consecutive_use_count INTEGER DEFAULT 0,
    rate_limit_protection INTEGER DEFAULT 0,
    last_used_at TEXT,
    "group" TEXT,
    max_concurrent INTEGER,
    proxy_enabled INTEGER NOT NULL DEFAULT 1,
    per_key_proxy_enabled INTEGER NOT NULL DEFAULT 0,
    quota_visible INTEGER NOT NULL DEFAULT 1,
    quota_window_thresholds_json TEXT,
    rate_limit_overrides_json TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

console.log(`[OmniRoute Activation] Seeding ${FREE_PROVIDERS_CONFIG.length} free providers...`);

const now = new Date().toISOString();

const insertOrUpdateConn = db.prepare(`
  INSERT INTO provider_connections (
    id, provider, auth_type, name, display_name, api_key, priority, global_priority,
    is_active, test_status, proxy_enabled, provider_specific_data, created_at, updated_at
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, 1, 'ok', 1, ?, ?, ?
  ) ON CONFLICT(id) DO UPDATE SET
    auth_type = excluded.auth_type,
    name = excluded.name,
    display_name = excluded.display_name,
    api_key = excluded.api_key,
    priority = excluded.priority,
    global_priority = excluded.global_priority,
    is_active = 1,
    test_status = 'ok',
    proxy_enabled = 1,
    provider_specific_data = COALESCE(excluded.provider_specific_data, provider_connections.provider_specific_data),
    updated_at = excluded.updated_at
`);

let activatedCount = 0;

db.transaction(() => {
  for (const config of FREE_PROVIDERS_CONFIG) {
    const connectionId = `conn_free_${config.id}`;
    insertOrUpdateConn.run(
      connectionId,
      config.id,
      config.authType,
      config.name,
      config.displayName,
      config.apiKey,
      config.priority,
      config.priority,
      config.providerSpecificData || null,
      now,
      now
    );
    activatedCount++;
    console.log(`  ✓ Activated [${config.id.padEnd(16)}] ${config.displayName}`);
  }

  // Ensure blockedProviders in settings does not block any of these
  const existingSettingsRow = db
    .prepare("SELECT value FROM settings WHERE key = 'app_settings'")
    .get();
  if (existingSettingsRow && existingSettingsRow.value) {
    try {
      const parsed = JSON.parse(existingSettingsRow.value);
      if (parsed.blockedProviders && Array.isArray(parsed.blockedProviders)) {
        parsed.blockedProviders = [];
        db.prepare("UPDATE settings SET value = ?, updated_at = ? WHERE key = 'app_settings'").run(
          JSON.stringify(parsed),
          now
        );
        console.log("  ✓ Reset blockedProviders array in settings.");
      }
    } catch {
      // Ignore JSON parse error
    }
  }
})();

console.log("\n=================================================================");
console.log(`🎉 OmniRoute Free Providers Successfully Activated: ${activatedCount} providers.`);
console.log("=================================================================\n");
