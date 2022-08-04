export as namespace govukFrontend;

export abstract class Component {
    constructor(element: Element);
    init(): void;
}

export function Accordion($module: Element): void;
export function Checkboxes($module: Element): void;
export function Details($module: Element): void;
export function Radios($module: Element): void;
export function SkipLink($module: Element): void;

export class Accordion extends Component {}
export class Checkboxes extends Component {}
export class Details extends Component {}
export class Radios extends Component {}
export class SkipLink extends Component {}
