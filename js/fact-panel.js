/**
 * <fact-panel>: shows a random useless fact from a web API,
 * with a button to request another one.
 */

/** API endpoint for one random English fact. */
const FACT_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
class FactPanel extends HTMLElement {
  /** Attributes the browser should watch. */
  static get observedAttributes() {
    return ["compact"];
  }

  constructor() {
    super();
  }

  /**
   * Request a fact from the API and show it, or show an error.
   * @returns {Promise<void>}
   */
  async loadFact() {
    this.statusEl.textContent = "Loading a fact...";
    this.button.disabled = true;
    try {
      const response = await fetch(FACT_URL);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      if (typeof data?.text !== "string") {
        throw new Error("Unexpected response");
      }

      const source =
        typeof data.source === "string" ? data.source : "Unknown source";

      this.render(data.text, `Source: ${source}`);

      this.statusEl.textContent = "New fact loaded.";
    } catch (error) {
      console.error(error);
      this.statusEl.textContent =
        "Could not load a fact. Check your connection and press Get a fact to try again.";
    } finally {
      this.button.disabled = false;
    }
  }

  /** Runs when the element is added to the page. Build the UI here. */
  connectedCallback() {
    const h3 = document.createElement("h3");
    h3.textContent = "Random Useless Facts";
    this.appendChild(h3);

    const text = document.createElement("p");
    this.textEl = text;
    this.appendChild(text);

    const details = document.createElement("p");
    this.detailsEl = details;
    this.appendChild(details);

    const button = document.createElement("button");
    this.button = button;
    button.type = "button";
    button.textContent = "Get a fact";
    this.appendChild(button);
    button.addEventListener("click", () => {
      this.loadFact();
    });

    const status = document.createElement("p");
    status.setAttribute("role", "status");
    this.statusEl = status;
    this.appendChild(status);

    this.loadFact();
    this.detailsEl.hidden = this.hasAttribute("compact");
  }

  /**
   * Put a fact into the DOM.
   * @param {string} text - The fact itself.
   * @param {string} source - Where the fact came from.
   * @returns {void}
   */
  render(text, source) {
    this.textEl.textContent = text;
    this.detailsEl.textContent = source;
  }

  /** Runs whenever "compact" is added or removed. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.detailsEl) return;

    this.detailsEl.hidden = this.hasAttribute("compact");
  }
}

customElements.define("fact-panel", FactPanel);
const panel = document.querySelector("fact-panel");
const compactToggle = document.querySelector("#compact-toggle");
if (panel && compactToggle) {
  compactToggle.hidden = false;
  compactToggle.addEventListener("click", () => {
    panel.toggleAttribute("compact");
    compactToggle.textContent = panel.hasAttribute("compact")
      ? "Show Details"
      : "Hide Details";
  });
}
