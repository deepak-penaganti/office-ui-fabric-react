import * as React from 'react';
import { ICheckboxProps } from './Checkbox.Props';
import { css } from '../../utilities/css';
import './Checkbox.scss';

export interface ICheckboxState {
  id?: string;
  isChecked?: boolean;
}

let _instance: number = 0;

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
  public static defaultProps = {
    isSelected: false,
    isEnabled: true
  };

  public refs: {
    [key: string]: React.ReactInstance;
    input: HTMLInputElement;
  };

  constructor(props: ICheckboxProps) {
    super(props);

    this._onInputChanged = this._onInputChanged.bind(this);

    this.state = {
      id: `checkbox-${ _instance++ }`,
      isChecked: props.isChecked
    };
  }

  public componentWillReceiveProps(newProps: ICheckboxProps) {
    if (newProps.isChecked !== this.state.isChecked) {
      this.setState({
        isChecked: newProps.isChecked
      });
    }
  }

  public render() {
    let { text, isEnabled, className } = this.props;
    let { isChecked } = this.state;
    let { id } = this.state;

    return (
      <div className={ css('ms-ChoiceField', className) }>
        <input ref='input'
               id={ id }
               className='ms-ChoiceField-input'
               type='checkbox'
               role='checkbox'
               checked={ isChecked }
               disabled={ !isEnabled }
               onChange={ this._onInputChanged }
               aria-checked={ isChecked } />
        <label htmlFor={ id } className='ms-ChoiceField-field'>
          <span className='ms-Label'>{ text }</span>
        </label>
      </div>
    );
  }

  private _onInputChanged(ev: React.FormEvent) {
    let { onChanged } = this.props;
    let isChecked = this.refs.input.checked;

    this.setState({
      isChecked: isChecked
    });

    if (onChanged) {
      onChanged(isChecked);
    }
  }

}
