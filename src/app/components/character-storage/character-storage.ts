import { Component } from '@angular/core';
import predefinedCharacters from '../../../assets/predefined-characters.json';

export interface Character {
  id: number;
  givenName: string;
  familyName: string;
  isFemale: boolean;
}

@Component({
  selector: 'app-character-storage',
  templateUrl: './character-storage.html',
  styleUrl: './character-storage.scss'
})
export class CharacterStorage {
  characters: Character[] = predefinedCharacters;

  printCharacterGender(char: Character) {
    return char.isFemale ? 'Female' : 'Male';
  }

  printCharacterName (char: Character) {
    return char.givenName + ' ' + char.familyName;
  }
}
