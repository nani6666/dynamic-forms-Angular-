import { element } from 'protractor';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

declare const jQuery: any;

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit , AfterViewInit {
  public invoiceForm: FormGroup;
  public n: number = 1;
  functionCalling: any;
  inputlabelName: any;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.invoiceForm = this._fb.group({
      inputfields: this._fb.array([this.inputvalueRows()]),
      itemRows: this._fb.array([this.initItemRows()]),
      personalData: this._fb.array([this.personalRows()])
    });
  }

  initItemRows() {
    return this._fb.group({
        itemname: [''],
        itemnameDoctor:  [''],
        itemAdmin: [''],
    });
}

personalRows( ) {
  return this._fb.group({
    firstname: [''],
    middleName:  [''],
    lastName: [''],
});
}

 inputvalueRows() {
  return this._fb.group({
    inputname: ['']
   });
  }

addNewinputs() {
     // console.log(this._fb.array);
      const control = <FormArray>this.invoiceForm.controls['inputfields'];
      control.push(this.inputvalueRows());
  }

  ngAfterViewInit() {
    // console.log('sdf');
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    console.log(ev);
    ev.dataTransfer.setData('text', ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    const array1 = ['one', 'two', 'three', 'four', 'five', 'six'];
    const data = ev.dataTransfer.getData('text');
    const  arraydiv = document.createElement('div'),
           matfield = document.createElement('div'),
           groupdiv = document.createElement('div'),
           labelname = document.createElement('label'),
           groupSpan = document.createElement('span'),
           insideinput = document.createElement('input'),
           insidetextarea =  document.createElement('textarea'),
           insideDrop = document.createElement('select'),
           btnelement = document.createElement('a'),
           addnew = document.createElement('a'),
           addiconelement = document.createElement('i'),
           iconelement = document.createElement('i');
           matfield.setAttribute('class' , 'form-group');
           groupdiv.setAttribute('class' , 'input-group');
           groupSpan.setAttribute('class' , 'input-group-btn');
           btnelement.addEventListener('click', (e: Event) => this.removeFields(arraydiv));
           addnew.addEventListener('click', (e: Event) => {
            this.addNewinputs();
            const formElements = (<any>this.invoiceForm.controls.inputfields).controls ;
            console.log(formElements);
            formElements. forEach( ele => {
            //   console.log(ele);
              arraydiv.appendChild(matfield) ;
              });
           });
  if (data == 'input') {
    arraydiv.setAttribute('formArrayName' , 'inputfields');
    arraydiv.setAttribute('id' , 'inputfieldsadd');
    insideinput.setAttribute('type', 'text');
    labelname.setAttribute('class' , 'control-label');
    labelname.setAttribute('id' , 'labelInput');
    labelname.innerHTML = this.inputlabelName;
    labelname.textContent = this.inputlabelName;
    insideinput.setAttribute('class' , 'form-control col-md-6');
    insideinput.setAttribute('formControlName' , 'inputname');
           this.dynamicModules(arraydiv , 'div2', labelname, insideinput , matfield,
                  groupdiv, groupSpan, btnelement, iconelement , addnew  , addiconelement);
    this.popupStyle();
  } else if (data == 'textarea') {
    insidetextarea.setAttribute('class' , 'form-control col-md-6');
    this.dynamicModules(arraydiv , 'div2', labelname , insidetextarea , matfield,
     groupdiv, groupSpan, btnelement, iconelement, addnew  , addiconelement);
    this.popupStyle();
  } else if (data == 'checkbox') {
    insideinput.setAttribute('type', 'checkbox');
    this.dynamicModules(arraydiv , 'div2', labelname , insideinput , matfield,
          groupdiv, groupSpan, btnelement, iconelement, addnew  , addiconelement);
    this.popupStyle();
  }  else if (data == 'dropdown') {
    array1.forEach(ele => {
      const optionval = document.createElement('option');
      optionval.textContent  = ele;
      optionval.value = ele;
      insideDrop.appendChild(optionval);
    });
    insideDrop.setAttribute('class' , 'form-control col-md-6');
    this.dynamicModules(arraydiv , 'div2', labelname , insideDrop , matfield, groupdiv,
                       groupSpan, btnelement, iconelement, addnew  , addiconelement);
    this.popupStyle();
  } else if (data == 'radio') {
    insideinput.setAttribute('type', 'radio');
    this.dynamicModules(arraydiv , 'div2', labelname , insideinput , matfield, groupdiv,
                       groupSpan, btnelement, iconelement, addnew  , addiconelement);
    this.popupStyle();
  } else if (data == 'btn') {
    insideinput.setAttribute('type', 'button');
    insideinput.setAttribute('value', 'Button');
    insideinput.setAttribute('class', 'btn btn-primary btn-sm');
    this.dynamicModules(arraydiv , 'div2', labelname , insideinput , matfield, groupdiv,
          groupSpan, btnelement, iconelement, addnew  , addiconelement);
    this.popupStyle();
  }

  }

  removeFields(ele) {
   // console.log(ele);
    ele.closest('div').remove();
  }

  /*
  This creates a new formgroup. You can think of it as adding an empty object
  into an array. So we are pushing an object to the formarray 'itemrows' that
  has the property 'itemname'.
  */
  save(val) {
console.log(val);
  }

  addNewRow() {
     // console.log(this._fb.array);
      const control = <FormArray>this.invoiceForm.controls['itemRows'];
      control.push(this.initItemRows());
  }

 personalRowsAddbtn() {
  const control = <FormArray>this.invoiceForm.controls['personalData'];
  control.push(this.personalRows());
 }

  deleteRow(index: number) {
      const control = <FormArray>this.invoiceForm.controls['itemRows'];
      control.removeAt(index);
  }

  deletePersonalData(index: number) {
    const control = <FormArray>this.invoiceForm.controls['personalData'];
    control.removeAt(index);
}

/* creating dynamic moduiles method starts */
dynamicModules(arraydiv, divId, labelname , fieldvalue , formgroup, inputgroup, spangroup , btnele , iconele, addnewele , addiconelement) {
  document.getElementById(divId).appendChild(arraydiv);
    arraydiv.appendChild(addnewele);
    addnewele.appendChild(addiconelement);
    arraydiv.appendChild(formgroup);
    formgroup.appendChild(labelname);
    formgroup.appendChild(inputgroup);
    inputgroup.appendChild(fieldvalue);
    inputgroup.appendChild(spangroup);
    addnewele.setAttribute('class' , 'btn bg-primary text-light');
    addiconelement.setAttribute('class' , 'fa fa-plus');
    btnele.setAttribute('class' , 'btn bg-danger text-light');
    iconele.setAttribute('class' , 'fa fa-trash-o');
    spangroup.appendChild(btnele);
    btnele.appendChild(iconele);
}
/* creating dynamic moduiles method Ends */
popupStyle() {
 jQuery.confirm({
    title: '',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Enter label of Input</label>' +
    '<input type="text" placeholder="Enter Value" class="label form-control" />' +
    '</div>' +
    '</form>',
    type: 'purple',
    theme: 'material',
    typeAnimated: true,
    buttons: {
        formSubmit: {
            text: 'Save',
            btnClass: 'btn-blue',
            action: function () {
              const label = this.$content.find('.label').val();
                if (!label) {
                  jQuery.alert('provide a valid number');
                    return false;
                }
                this.inputlabelName = label;
                jQuery.alert('Your name is ' + label);
            }
        },
        cancel: function () {
            // close
        },
    },
    onContentReady: function () {
        // bind to events
        let jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
    }
});
}

checkingFunction() {
  jQuery.alert('testing 1');
}

}
