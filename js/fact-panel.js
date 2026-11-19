/**
 * <fact-panel>: shows one item at a time with a Next button.
 */
class FactPanel extends HTMLElement {
  /** Attributes the browser should watch. */
  static get observedAttributes() {
    // return an array with "compact"
    return ["compact"];
  }

  constructor() {
    super();
    this.facts = [
      {
        text: "I learned much of the frontend myself",
        detail: "Started with a friend's college lecture recordings",
      },
      { text: "I love cooking", detail: "especially Asian food and steaks" },
      {
        text: "I am passionate about CS",
        detail: 'Focusing on building a "Krillion" replica lately',
      },
    ];
    this.idx = 0;
  }

  /** Runs when the element is added to the page. Build the UI here. */
  connectedCallback() {
    // 1. createElement an h3, set textContent, appendChild to this
    const h3 = document.createElement("h3");
    h3.textContent = "Fun Facts About Me";
    this.appendChild(h3);

    const text = document.createElement("p");
    this.textEl = text;
    this.appendChild(text);

    const details = document.createElement("p");
    this.detailsEl = details;
    this.appendChild(details);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Next";
    this.appendChild(button);
    button.addEventListener("click", () => {
      this.idx = (this.idx + 1) % this.facts.length;
      this.render();
    });

    const status = document.createElement("p");
    status.setAttribute("role", "status");
    this.statusEl = status;
    this.appendChild(status);

    this.render();
    this.detailsEl.hidden = this.hasAttribute("compact");
  }

  /** Put the current item into the DOM. */
  render() {
    // textEl.textContent = current item's text
    this.textEl.textContent = this.facts[this.idx].text;
    // detailsEl.textContent = current item's extra detail
    this.detailsEl.textContent = this.facts[this.idx].detail;
    // statusEl.textContent = `Fact ${index + 1} of ${items.length}`
    this.statusEl.textContent = `Fact ${this.idx + 1} of ${this.facts.length}`;
  }

  /** Runs whenever "compact" is added or removed. */
  attributeChangedCallback(name, oldValue, newValue) {
    // if detailsEl doesn't exist yet, return  (this can fire BEFORE connectedCallback)
    if (!this.detailsEl) return;

    this.detailsEl.hidden = this.hasAttribute("compact");
  }
}

customElements.define("fact-panel", FactPanel);
const panel = document.querySelector("fact-panel");
const Compacttoggle = document.querySelector("#compact-toggle");
if (panel && Compacttoggle) {
  Compacttoggle.hidden = false;
  Compacttoggle.addEventListener("click", () => {
    panel.toggleAttribute("compact");
    Compacttoggle.textContent = panel.hasAttribute("compact")
      ? "Show Details"
      : "Hide Details";
  });
}
