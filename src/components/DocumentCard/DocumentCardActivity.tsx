import * as React from 'react';
import { IDocumentCardActivityProps, IDocumentCardActivityPerson } from './DocumentCard.Props';
import { Image } from '../../Image';
import {
  PERSONA_INITIALS_COLOR,
  PersonaInitialsColor
} from '../../Persona';
import { css } from '../../utilities/css';
import './DocumentCardActivity.scss';

export class DocumentCardActivity extends React.Component<IDocumentCardActivityProps, any> {
  public render() {
    let { activity, people } = this.props;

    return (
      people && people.length > 0 &&
      <div className={css('ms-DocumentCardActivity', {
        'ms-DocumentCardActivity--multiplePeople': people.length > 1
      })}>
        { this._renderAvatars(people) }
        <div className='ms-DocumentCardActivity-details'>
          <span className='ms-DocumentCardActivity-name'>{ this._getNameString(people) }</span>
          <span className='ms-DocumentCardActivity-activity'>{ activity }</span>
        </div>
      </div>
    );
  }

  private _renderAvatars(people: IDocumentCardActivityPerson[]): React.ReactElement<{}> {
    let renderAvatar = (person: IDocumentCardActivityPerson) => {
      if (!person.initialsColor) {
        person.initialsColor = PersonaInitialsColor.blue;
      }

      return (
        <div className='ms-DocumentCardActivity-avatar'>
          { person.initials && (
            <div className={ css('ms-Persona-initials', PERSONA_INITIALS_COLOR[person.initialsColor]) }>
              { person.initials }
              </div>
          ) }
          { person.profileImageSrc && (
            <Image src={ person.profileImageSrc }/>
          ) }
        </div>
      );
    };

    return (
      <div className='ms-DocumentCardActivity-avatars'>
        { people.length > 1 ? renderAvatar(people[1]) : null }
        { renderAvatar(people[0]) }
      </div>
    );
  }

  private _getNameString(people: IDocumentCardActivityPerson[]): string {
    let nameString = people[0].name;

    if (people.length >= 2) {
      nameString += ' +' + (people.length - 1);
    }

    return nameString;
  }
}
