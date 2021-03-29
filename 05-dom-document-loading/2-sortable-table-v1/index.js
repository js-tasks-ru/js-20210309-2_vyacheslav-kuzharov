export default class SortableTable {
  subElements = {};

  constructor(header = [], { data = []} = {}) {
    this.header = header;
    this.data = data;

    this.render();
  }

  get template() {
    return `
       <div class="sortable-table">
         <div data-elem="header" class="sortable-table__header sortable-table__row">
            ${this.headerColumns()}
         </div>
         <div data-element="body" class="sortable-table__body">
            ${this.bodyRows()}
         </div>
       </div>
    `;
  }

  render() {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = this.template;

    this.element = rootElement.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  headerColumns() {
    const columns = [];

    this.header.forEach(item => {
      columns.push(
        `<div class="sortable-table__cell" data-name="${item.id}" data-sortable="${!item.template}">
           <span>${item.title}</span>
         </div>`);
    });

    return columns.join('');
  }

  bodyRows() {
    return this.data.map(item =>
      `<a href="${item.id}" class="sortable-table__row">${this.rowContent(item)}</a>`
    ).join('');
  }

  rowContent(item) {
    return this.header.map(column =>
      column.template ? column.template(item[column.id]) : `<div class="sortable-table__cell">${item[column.id]}</div>`
    ).join('');
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    }, {});
  }

  sort(field, direction) {
    this.data.sort(this.compareFunc(direction, field));

    const sortableColumn = this.element.querySelector(`[data-name=${field}]`);
    sortableColumn.dataset.order = direction;

    this.removeSortArrow();
    this.addSortArrow(sortableColumn);

    this.subElements.body.innerHTML = this.bodyRows();
    this.subElements = this.getSubElements(this.element);

    return this.subElements;
  }

  compareFunc(direction, field) {
    return (a, b) => {
      function compareValues(a, b) {
        if (typeof a == 'number') {
          return (a - b);
        } else {
          return a.toString().localeCompare(b, 'ru', {caseFirst: 'upper'});
        }
      }

      switch (direction) {
      case 'asc':
        return compareValues(a[field], b[field]);
      case 'desc':
        return compareValues(a[field], b[field]) * (-1);
      default:
        break;
      }
    };
  }

  removeSortArrow() {
    document.querySelectorAll('.sortable-table__sort-arrow').forEach(elem => elem.remove());
  }

  addSortArrow(column) {
    column.innerHTML = `
                    <span class="sortable-table__sort-arrow">
                        <span class="sort-arrow"></span>
                    </span>
                  `;
  }

  destroy() {
    if (this.element) {
      this.remove();
      this.element = null;
    }
  }

  remove() {
    this.element.remove();
  }

}

