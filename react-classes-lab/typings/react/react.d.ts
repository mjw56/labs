declare module 'react' {
  export class Component {
    props: any;
    state: any;
    context: any;
    static name: string;
    constructor(props?, context?);
    setState(partial : any, callback ?: any) : void;
    forceUpdate(callback ?: any) : void;
  }

  export var PropTypes : any;
  export function createElement(tag : any, props ?: any, ...children : any[]) : any
  export function render(element : any, container : any) : any
  export function unmountComponentAtNode(container : any) : void
  export function findDOMNode(instance : any) : any
}
