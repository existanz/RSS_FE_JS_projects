import './alert.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';

export default class AlertModal extends DOMElement {
  constructor(messageText: string) {
    super(null, 'div', ['alert', 'glow'], messageText);
  }
}
