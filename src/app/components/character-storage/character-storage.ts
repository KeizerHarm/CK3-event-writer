import { Component, inject, OnInit } from '@angular/core';
import predefinedCharacters from '../../../assets/predefined-characters.json';
import { FemaleIcon, MaleIcon, EditIcon, MinusIcon, PlusIcon, PersonIcon, ShieldIcon } from "../../../assets/icons/icons";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Character, PortraitOption, StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-character-storage',
  templateUrl: './character-storage.html',
  styleUrl: './character-storage.scss',
  imports: [FemaleIcon, MaleIcon, EditIcon, MinusIcon, ReactiveFormsModule, PersonIcon, ShieldIcon]
})
export class CharacterStorage implements OnInit {
  private stateService = inject(StateService);
  lowestUnassignedId = 2;
  characters: Character[] = [];

  form: FormGroup;
  portraitOptions = Object.values(PortraitOption);

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      givenName: ['', Validators.required],
      familyName: [''],
      isFemale: [false],
      appelation: [''],
      title: [''],
      nickname: [''],
      portrait: [null as PortraitOption | null ]
    });
  }
  ngOnInit(): void {
    this.characters = this.stateService.getCurrentCharacters();
  }

  editingIndex: number | null = null;


  onSubmit(): void {
    if (this.form.invalid) return;

    const value = this.form.value as Character;

    if (this.editingIndex === null) {
      value.id = this.lowestUnassignedId;
      this.lowestUnassignedId++;
      this.characters.push(value);
    } else {
      const posOfOriginal = this.characters.findIndex(char => char.id === this.editingIndex);
      this.characters[posOfOriginal] = value;
      this.editingIndex = null;
    }
    this.stateService.setCharacters(this.characters);

    this.form.reset();
  }

  editCharacter(index: number): void {
    this.editingIndex = index;
    this.form.patchValue(this.characters.filter(char => char.id === index)[0]);
  }

  deleteCharacter(index: number): void {
    this.characters = this.characters.filter(char => char.id !== index);

    if (this.editingIndex === index) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingIndex = null;
    this.form.reset();
  }

  printCharacterName(char: Character): string {
    let printed = char.givenName;
    if (char.nickname) {
      printed += ' "' + char.nickname + '"';
    }
    if (char.familyName) {
      printed += ' ' + char.familyName;
    }
    return printed;
  }

  printCharacterDetails(char: Character): string {
    let printed = '';
    if (char.appelation) {
      printed = char.appelation;
      if (char.title) {
        printed += ' of ' + char.title;
      }
    }
    return printed;
  }
}
