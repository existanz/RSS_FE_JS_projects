import AlertModal from '../../../core/components/alert/alert';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import SVGicons from '../../../shared/components/svg-icons';
import { Car, Winner } from '../../../shared/models/basse-types';
import stateService from '../../../shared/services/state.service';
import garageApi from '../../services/api/garage-api';
import winnersApi from '../../services/api/winners-api';
import CarRaser from './car-racer';

export default class CarTrack extends DOMElement {
  private car: Car;

  public carRacer: CarRaser;

  private carFlag: DOMElement;

  private racerAnimation: Animation;

  private hasWinner = false;

  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__track']);

    this.car = car;
    this.carRacer = new CarRaser(this.node, car.color);
    this.racerAnimation = this.carRacer.node.animate(
      [
        {
          transform: 'translateX(0)',
        },

        {
          transform: `translateX(${(this.node.clientWidth * 92) / 100}px)`,
        },
      ],
      {
        duration: 1500,
        fill: 'forwards',
      }
    );
    this.racerAnimation.pause();
    this.carFlag = new DOMElement(this.node, 'div', ['race__flag']);
    this.carFlag.node.innerHTML = SVGicons.flag;
  }

  public update(car: Car) {
    this.carRacer.update(car.color);
  }

  public async startRacer() {
    const start = await garageApi.startEngine({ id: this.car.id, status: 'started' });
    const duration: number = parseInt(start.distance) / parseInt(start.velocity);

    this.racerAnimation = this.carRacer.node.animate(
      [
        {
          transform: 'translateX(0)',
        },

        {
          transform: `translateX(${this.node.clientWidth - 80}px)`,
        },
      ],
      {
        duration,
        fill: 'forwards',
      }
    );
    this.racerAnimation.play();

    try {
      await garageApi.switchEngine({ id: this.car.id, status: 'drive' });
      this.isWinner(this.car, duration);
    } catch (err) {
      if ((err as Error).message === '500') {
        this.racerAnimation.pause();
        console.log(`The engine of ${this.car.name} is blow up!`);
      }
    }
  }

  public async stopRacer() {
    this.racerAnimation?.pause();
    await garageApi.switchEngine({ id: this.car.id, status: 'stopped' });

    if (this.racerAnimation) {
      this.racerAnimation.currentTime = 0;
    }
  }

  public async isWinner(car: Car, duration: number): Promise<void> {
    if (!stateService.hasWinner) {
      stateService.hasWinner = true;
      const alertMessage = new AlertModal(`The winer is ${car.name} with ${(duration / 1000).toFixed(2)}s time!`);
      document.body.append(alertMessage.node);
      setTimeout(() => {
        alertMessage.node.remove();
      }, 3500);
      try {
        const elemWinner: Winner = (await winnersApi.getWinner(car.id)).items[0];

        await winnersApi.updateWinner(
          {
            wins: (parseInt(elemWinner.wins) + 1).toString(),
            time: Math.min(duration, parseFloat(elemWinner.time)).toString(),
          },
          parseInt(elemWinner.id)
        );
      } catch {
        await winnersApi.createWinner({
          id: car.id,
          time: (duration / 1000).toFixed(2).toString(),
          wins: '1',
        });
      }
    }
  }
}
