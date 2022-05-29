import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ContainerComponent } from './components/container/container.component';
import { AlphabetAndSpecialCharactersDirective } from './directive/alphabetAndSpecialCharacters.directive';
import { OnlyAlphabetsDirective } from './directive/only-alphabets.directive';
import { OnlyNumbersDirective } from './directive/only-numbers.directive';


@NgModule({
  declarations: [
    ContainerComponent,
    AlphabetAndSpecialCharactersDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
  ],
  exports: [
    ContainerComponent,
    AlphabetAndSpecialCharactersDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
  ],
})
export class SharedModule { }
