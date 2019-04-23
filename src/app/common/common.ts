import { FormGroup, FormControl } from '@angular/forms';

export class Common{  

    public static randomize<T>(input:T[]):{index: number, output: T[]}{   
        const min = 0;
        const max = input.length-1;
        let randomElementIndex = Math.floor(Math.random() * (max - min + 1)) + min;        
        
        let newArray = input.slice();
        newArray.splice(randomElementIndex, 1);        

        return {
          index: randomElementIndex,
          output: newArray
        }  
    }

    public static validateForm(result:{ [key:string]:boolean }, prefix:string, form:FormGroup){   
        Object.keys(form.controls).forEach(
          (key:string)=>{
            if(form.controls[key] instanceof FormControl){
              result[prefix+key]=form.controls[key].valid;
            }
            else{
              this.validateForm(result, key+'.', <FormGroup>form.controls[key]);
            }
          }
        );
      }
}