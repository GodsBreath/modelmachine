import Motherboard from './Motherboard';
import State from './MachineState';
import { ConfigurationError } from './Error';
import Peripheral from './Peripheral';
import Port from './Port';

export default class Machine {
  protected mb : Motherboard;
  protected name : string;
  private powerStatus : PowerStatus;
  private state: State;
  private peripherals : Peripheral[];
  constructor(name : string, mb : Motherboard) {
    this.name = name;
    this.mb = mb;
    this.powerStatus = PowerStatus.Off;
    this.peripherals = [];
  }
  protected prepareState() : State {
      return this.state;
  }
  protected restoreState(state : State) {
    this.state = state;
  }
  protected resume() {

  }
  findFreePort(portType : Function) {
    return this.mb.getFreePort(portType);
  }
  attachPeripheral(per : Peripheral, port: Port) : void {

  }
  powerOn() : void {
    if (this.powerStatus != PowerStatus.On) {
      this.powerStatus = PowerStatus.On;
    }
  }
  powerOff() : void {
    if (this.powerStatus != PowerStatus.Off) {
      this.powerStatus = PowerStatus.Off;
    }
  }
  sleep() : State {
    if (this.powerStatus != PowerStatus.Asleep) {
      this.powerStatus = PowerStatus.Asleep;
    }

    return this.prepareState();
  }
  awake(state : State) {
    this.restoreState(state);
    this.resume();
  }
}

enum PowerStatus {
  On,
  Off,
  Asleep
}
