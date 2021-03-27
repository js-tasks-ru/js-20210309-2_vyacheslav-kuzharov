export default class ColumnChart {
  chartHeight = 50;

  constructor({ data = [], label = '', value = 0, link = ''} = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;

    this.render();
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink(this.link)}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnsBody(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = this.template;

    this.element = rootElement.firstElementChild;

    if (this.data.length) {this.element.classList.remove('column-chart_loading');}
  }

  getColumnsBody(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      const percent = (item / maxValue * 100).toFixed(0);
      return `<div style="--value: ${String(Math.floor(item * scale))}" data-tooltip="${percent}%"></div>`;
    }).join('');
  }

  getLink(link) {
    return link ? `<a class="column-chart__link" href="${link}">View all</a>` : '';
  }

  update(data) {
    this.data = data;
    this.render();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
