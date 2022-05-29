import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CatalogService } from './services/catalog.service';
import { MessageService } from './services/message.service';

import { AlphabetAndSpecialCharactersDirective } from './directives/alphabetAndSpecialCharacters.directive';
import { OnlyAlphabetsDirective } from './directives/only-alphabets.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';

import { ContainerComponent } from './components/container/container.component';


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
    MatSnackBarModule
  ],
  exports: [
    ContainerComponent,
    AlphabetAndSpecialCharactersDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
  ],
  providers: [
    CatalogService,
    MessageService
  ]
})
export class SharedModule { }
