import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ILayerProps } from './Layer.Props';
import { LayerHost } from './LayerHost';
import './Layer.scss';

const LAYER_HOST_ELEMENT_ID = 'ms-layer-host';

export class Layer extends React.Component<ILayerProps, {}> {
  private static _layerHost: LayerHost;
  private static _lastId: number = 0;

  private _id: string;

  constructor(props?: ILayerProps) {
    super(props);

    this._id = `${++Layer._lastId}`;
  }

  public render() {
    return (
      <div className='ms-Layer' />
    );
  }

  public componentWillMount() {
    if (!Layer._layerHost) {
      let hostElement = document.createElement('div');
      hostElement.setAttribute('id', LAYER_HOST_ELEMENT_ID);
      document.body.appendChild(hostElement);

      let layerHost: LayerHost = ReactDOM.render((
        <LayerHost />
      ), hostElement) as LayerHost;

      Layer._layerHost = layerHost;
    }
  }

  public componentDidMount() {
    Layer._layerHost.addLayer({
      id: this._id,
      children: this.props.children
    }, this.props.onLayerMounted);
  }

  public componentWillReceiveProps(props: ILayerProps) {
    Layer._layerHost.updateLayer({
      id: this._id,
      children: props.children
    });
  }

  public componentWillUnmount() {
    Layer._layerHost.removeLayer({
      id: this._id,
      children: []
    });
  }
}
