// Not yours, and correct: the furniture catalogue service.
import { log } from "./log";

export type Product = {
  sku: string;
  name: string;
  width: number; // cm, along x
  depth: number; // cm, along y
};

const PRODUCTS: Product[] = [
  { sku: "p1", name: "BJÖRK dresser", width: 80, depth: 48 },
  { sku: "p2", name: "MARKA sofa", width: 220, depth: 95 },
  { sku: "p3", name: "MALVA armchair", width: 78, depth: 82 },
  { sku: "p4", name: "TALLA bookcase", width: 80, depth: 28 },
  { sku: "p5", name: "HEMMA bed", width: 160, depth: 200 },
  { sku: "p6", name: "LUMA lamp", width: 30, depth: 30 },
  { sku: "p7", name: "SOLMA desk", width: 120, depth: 60 },
  { sku: "p8", name: "KORP chair", width: 45, depth: 50 },
];

// Case-insensitive match anywhere in the name. Short queries hit a slower index.
export async function searchCatalog(query: string): Promise<Product[]> {
  const ms = query.length <= 1 ? 1500 : 300;
  log.add(`→ search "${query}"`);
  await new Promise((r) => setTimeout(r, ms));
  const q = query.toLowerCase();
  const results = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  log.add(`← search "${query}": ${results.length} result(s) after ${ms} ms`);
  return results;
}
