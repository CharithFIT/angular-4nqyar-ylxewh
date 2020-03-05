import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup({});
  model = {
    investments: [{}],
  };
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'investments',
      type: 'repeat',
      templateOptions: {
        addText: 'Add another investment',
      },
      fieldArray: {
        expressionProperties: {
         'templateOptions.disabled': ()=> true
        },
        fieldGroup: [
          {
            className: 'col-sm-4',
            type: 'input',
            key: 'investmentName',
            templateOptions: {
              required: true,
            },
            expressionProperties: {
             'templateOptions.label': ()=> "Name of Investment"
           },
          },
          {
            type: 'input',
            key: 'investmentDate',
            className: 'col-sm-4',
            templateOptions: {
              type: 'date',
            },
            expressionProperties: {
             'templateOptions.label': ()=> 'Date of Investment:'
           },
          },
          {
            type: 'input',
            key: 'stockIdentifier',
            className: 'col-sm-4',
            templateOptions: {
              addonRight: {
                class: 'fa fa-code',
                onClick: (to, fieldType, $event) => console.log(to, fieldType, $event),
              },
            },
            expressionProperties: {
             'templateOptions.label': ()=> "Stock Identifier:"
           },
          },
        ],
      },
    },
  ];

  submit() {
    alert(JSON.stringify(this.model));
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */