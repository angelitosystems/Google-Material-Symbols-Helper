import * as https from "https";
import * as fs from "fs";
import * as path from "path";

const METADATA_URL =
  "https://fonts.google.com/metadata/icons?incomplete=1&key=material_symbols";
const OUTPUT_FILE = path.join(
  __dirname,
  "..",
  "generated",
  "material-symbols.json",
);

async function generateIcons() {
  console.log("Fetching Material Symbols metadata...");

  https
    .get(METADATA_URL, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          // The response starts with )]}'
          const jsonString = data.replace(/^\)\]\}'/, "");
          const metadata = JSON.parse(jsonString);

          const icons = metadata.icons.map((icon: any) => ({
            name: icon.name,
            category: icon.categories ? icon.categories[0] : "unknown",
            tags: icon.tags || [],
          }));

          // Sort alphabetically
          icons.sort((a: any, b: any) => a.name.localeCompare(b.name));

          // Ensure directory exists
          const dir = path.dirname(OUTPUT_FILE);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          fs.writeFileSync(OUTPUT_FILE, JSON.stringify(icons, null, 2));
          console.log(`Successfully generated ${icons.length} icons at ${OUTPUT_FILE}`);
        } catch (error: any) {
          console.error("Error parsing metadata:", error.message);
        }
      });
    })
    .on("error", (err) => {
      console.error("Error fetching metadata:", err.message);
    });
}

generateIcons();
