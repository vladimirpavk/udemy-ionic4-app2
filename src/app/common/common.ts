export class CommonModule{  
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
}