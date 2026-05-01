function tryParseJson<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function stripMarkdownCodeFence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^```(?:json|JSON)?\s*([\s\S]*?)\s*```$/);
  if (!match) return trimmed;
  return match[1].trim();
}

function extractFirstBalancedJsonValue(text: string): string | null {
  const startIndex = text.search(/[\{\[]/);
  if (startIndex < 0) return null;

  const openingChar = text[startIndex];
  const expectedClose = openingChar === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = startIndex; i < text.length; i += 1) {
    const ch = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === openingChar) {
      depth += 1;
      continue;
    }

    if (ch === expectedClose) {
      depth -= 1;
      if (depth === 0) {
        return text.slice(startIndex, i + 1).trim();
      }
    }
  }

  return null;
}

export function parseJsonFromAiText<T>(rawText: string): T | null {
  const normalized = rawText.trim().replace(/^\uFEFF/, "");
  if (!normalized) return null;

  const candidates: string[] = [];
  candidates.push(normalized);
  candidates.push(stripMarkdownCodeFence(normalized));

  const fencedBlocks = normalized.matchAll(/```(?:json|JSON)?\s*([\s\S]*?)\s*```/g);
  for (const block of fencedBlocks) {
    if (block[1]) {
      candidates.push(block[1].trim());
    }
  }

  const extracted = extractFirstBalancedJsonValue(normalized);
  if (extracted) {
    candidates.push(extracted);
  }

  for (const candidate of candidates) {
    if (!candidate) continue;
    const parsed = tryParseJson<T>(candidate);
    if (parsed !== null) {
      return parsed;
    }
  }

  return null;
}
