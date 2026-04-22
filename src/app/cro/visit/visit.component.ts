import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CrosService } from '../cros.service';
@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {
  labMatTestsList: Array<any> = [];
  labMatList: any;
  materials: any;
  selectedValuev: any;
  selectedOption: any;
  selectedLabTests: any[] = [];
  constructor(private fb: FormBuilder, private croService:CrosService) { 
    this.croService.meterials().subscribe((data:any)=>{
      console.log(data)
      this.materials = data
            this.labMatData(data)

    })

      
    }
    labMatData(labMatList:any) {
      labMatList.forEach((labTests:any) => {
        this.labMatTestsList.push(labTests);
      });
      console.log(this.labMatTestsList);
    }
  ngOnInit(): void {
 
  
  }


  cards: { form: FormGroup }[] = [];


  addCard() {
    const initialRowsCount = this.cards.length + 1; // Calculate the desired number of initial rows based on index
    const rowsArray = new FormArray([]);
    const cardForm = this.fb.group({
      rows: rowsArray
    });
    this.cards.push({ form: cardForm });
    this.selectedLabTests.push([]);
  }
    onMeterialIdChange(event: any, cardIndex: number, rowIndex: number) {
      const selectedValue = event.target.value;
      const cardForm = this.cards[cardIndex].form;
    
      // Find the selected option in the labMatTestsList
      this.selectedOption = this.labMatTestsList.find((option) => option.meterial_id === selectedValue);
      console.log(this.selectedOption);
    
      if (this.selectedOption) {
        const rowFormArray = this.getRows(cardIndex);
        console.log(rowFormArray);
       
        const rowFormGroup = rowFormArray?.at(rowIndex) as FormGroup;
        console.log(rowFormGroup);  
        if (rowFormGroup) {
          const quantityControl = rowFormGroup.get('quantity');
          const imageControl = rowFormGroup.get('image');
          
          console.log(quantityControl);
    
          if (quantityControl) {
            quantityControl.setValue(this.selectedOption.name);
          }
          if (imageControl) {
            imageControl.setValue(this.selectedOption.image);
          }
          console.log(this.selectedOption.image);
          
        }
       
        rowFormGroup.get('image')?.setValue('data:image/jpeg;base64,'+this.selectedOption.image);
        rowFormGroup.get('size')?.setValue('');


      
      }
    }
    getSizes(cardIndex: number, rowIndex: number): any {
      const rowFormArray = this.getRows(cardIndex);
      const rowFormGroup = rowFormArray.at(rowIndex) as FormGroup;
      const selectedMaterialId = rowFormGroup.get('meterial_id')?.value;
    
      if (selectedMaterialId) {
        const selectedOption = this.labMatTestsList.find((option) => option.meterial_id === selectedMaterialId);
    
        if (selectedOption) {
          return selectedOption.size;
        }
      }
    
      return [];
    }
    
getMaterialId(cardIndex: number, rowIndex: number): string {
  const cardFormArray = this.getRowsFormArray(cardIndex);
  const rowFormGroup = cardFormArray.at(rowIndex) as FormGroup;
  return rowFormGroup.get('material_id')?.value;
}
  addRow1(cardIndex: number) {
    const cardFormArray = this.getRowsFormArray(cardIndex);
    cardFormArray.push(this.createRow());
  }
  deleteRow(cardIndex: number, rowIndex: number) {
    const cardFormArray = this.getRowsFormArray(cardIndex);
    cardFormArray.removeAt(rowIndex);
  }
  // selectedLabTests: any[] = [];
  createRow(): FormGroup {
    return this.fb.group({
      meterial_id: ['', Validators.required],
      size: ['', Validators.required],
      image: ['', Validators.required],
      quantity: ['', Validators.required],
      frozen_status: ['']
    });
  }
 
  getRowsFormArray(cardIndex: number): FormArray {
    const cardForm = this.cards[cardIndex].form;
    return cardForm.get('rows') as FormArray;
  }
  getRows(cardIndex: number): FormArray {
    const card = this.cards[cardIndex];
    return card.form.get('rows') as FormArray;
  }
 
  
 

  onSubmit() {
    const formData: { selectedLabTests: any[], rows: any[] }[] = [];
  
    // Iterate over the cards and access their form values
    for (const card of this.cards) {
      const cardForm = card.form;
      const rowsArray = cardForm.get('rows') as FormArray;
      const cardData = {
        selectedLabTests: this.selectedLabTests[this.cards.indexOf(card)] as any[],
        rows: [] as any[] 
      };
  

      for (const row of rowsArray.controls) {
        const rowForm = row as FormGroup;
        cardData.rows.push(rowForm.value);
      }
  
      formData.push(cardData);
    }

    console.log(formData);
  

  }
  

  
  
  
  
  
}




