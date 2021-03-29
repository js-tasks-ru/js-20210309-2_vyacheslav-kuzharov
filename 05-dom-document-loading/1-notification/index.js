export default class NotificationMessage {
  constructor(message = '', {duration = 0, type = 'success'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:20s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = this.template;

    this.element = rootElement.firstElementChild;
  }

  show(target = document.body) {
    if (NotificationMessage.currentMessage) {NotificationMessage.currentMessage.remove();}

    NotificationMessage.currentMessage = this.element;
    target.append(this.element);
    setTimeout(() => this.remove(), this.duration);
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
