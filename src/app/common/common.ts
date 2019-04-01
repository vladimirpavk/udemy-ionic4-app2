export class CommonModule{  
    public static randomize<T>(input:T[]):{index: number, output: T[]}{   
        const min = 0;
        const max = input.length;
        let randomElementIndex = Math.floor(Math.random() * (max - min + 1)) + min;
          
        return {
          index: randomElementIndex,
          output: input.slice(randomElementIndex, 1)
        }  
    }
}