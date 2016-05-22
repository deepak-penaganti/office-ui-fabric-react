import * as React from 'react';
import { CommandBar } from '../../../../index';
import { items, farItems } from './data';

export class CommandBarBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
          <CommandBar
            isSearchBoxVisible={ true }
            searchPlaceholderText='Search...'
            items={ items }
            farItems={ farItems }
          />
      </div>
    );
  }

}
