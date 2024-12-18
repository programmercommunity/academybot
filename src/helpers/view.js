import fs from "fs/promises";
import path from "path";

export class View {
  /**
   * Renders a view template with the provided variables.
   * @param {string} viewName - The name of the view file (without extension).
   * @param {Object} variables - An object containing the variables to replace in the template.
   * @returns {Promise<string>} - The rendered message.
   */
  static async render(viewName, variables = {}) {
    try {
      // Resolve the path to the view file
      const viewPath = path.resolve("./src/views", `${viewName}.md`);

      // Read the view file
      let template = await fs.readFile(viewPath, "utf-8");

      // Replace placeholders with actual values
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g"); // Match {{key}}
        template = template.replace(regex, value || "");
      }

      return template; // Return the rendered message
    } catch (error) {
      console.error(`Error rendering view: ${viewName}`, error);
      throw new Error("Failed to render view.");
    }
  }
}
