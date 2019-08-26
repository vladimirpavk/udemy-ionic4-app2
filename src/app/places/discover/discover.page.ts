import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Common } from '../../common/common';
import { Observable, from, asyncScheduler, queueScheduler } from 'rxjs';
import { UIService } from '../../common/ui.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit{
  
  private _places$:Observable<{favoritePlace:Place, otherPlaces:Place[]}>;  

  constructor(
    private _placesService:PlacesService,
    private _uiService:UIService
  ) { }

  ionViewWillEnter(){
    //this._places$ = this._placesService.discoveredPlaces;
  }

  ngOnInit(){
    /* let observable1 = from<Number>([1,2,3], asyncScheduler);

    observable1.subscribe(
      (value:Number)=>{
        console.log(value);
      }
    );

    console.log('before subscribe'); */

    /* let observable2 = new Observable(
      (observer)=>{
        observer.next(1);
        setTimeout(
          ()=>{
            observer.next(2);
            setTimeout(
              ()=>{
                observer.next(3);
                observer.complete();
              }, 1000);
          }, 2000);
      }
    );

    observable2.subscribe({
      next: (value:number)=>{
        console.log(value);
      },
      complete: ()=>console.log('Stream completed...')
    }); */

    /* let timeNow = Date.now();

    queueScheduler.schedule(
      (value:number)=>{
        console.log(`${queueScheduler.now()-timeNow}ms`, 'queueScheduler - '+value);
      }, 500, 1
    );

    queueScheduler.schedule(
      (value:number)=>{
        console.log(`${queueScheduler.now()-timeNow}ms`, 'queueScheduler - '+value);
      }, 1000, 2
    );

    queueScheduler.schedule(
      (value:number)=>{
        console.log(`${queueScheduler.now()-timeNow}ms`, 'queueScheduler - '+value);
      }, 500, 3
    );     */
    
    /* timeNow = Date.now();

    asyncScheduler.schedule(
      (value:number)=>{
        console.log(`${asyncScheduler.now()-timeNow}ms`, 'asyncScheduler - '+value);
      }, 500, 1
    );

    asyncScheduler.schedule(
      (value:number)=>{
        console.log(`${asyncScheduler.now()-timeNow}ms`, 'asyncScheduler - '+value);
      }, 1000, 2
    );

    asyncScheduler.schedule(
      (value:number)=>{
        console.log(`${asyncScheduler.now()-timeNow}ms`, 'asyncScheduler - '+value);
      }, 500, 3
    );

    asyncScheduler.schedule(
      (value:number)=>{
        console.log(`${asyncScheduler.now()-timeNow}ms`, 'asyncScheduler - '+value);
      }, 750, 3
    );

    from() */

    /* let observableX = new Observable(
      (observer)=>{
        let timeNow=Date.now();
        queueScheduler.schedule(
          (value)=>{
            observer.next(`${queueScheduler.now()-timeNow}ms `+ value);
          }, 500, 1);
        queueScheduler.schedule(
          (value)=>{
            observer.next(`${queueScheduler.now()-timeNow}ms ` + value);
          }, 1000, 2);
        queueScheduler.schedule(
          (value)=>{
            observer.next(`${queueScheduler.now()-timeNow}ms ` + value);
          }, 1500, 3);
      }).subscribe(
        (value)=>console.log(value)
      ); */

      let timeNow = Date.now();

      console.log('A');

      queueScheduler.schedule(
        (value:number)=>{
          console.log(`${queueScheduler.now()-timeNow}ms`, 'queueScheduler - '+value);
        }, 500, 1
      );
  
      queueScheduler.schedule(
        (value:number)=>{
          console.log(`${queueScheduler.now()-timeNow}ms`, 'queueScheduler - '+value);
        }, 1000, 2
      );
  
      queueScheduler.schedule(
        (value:number)=>{
          console.log(`${queueScheduler.now()-timeNow}ms`, 'queueScheduler - '+value);
        }, 500, 3
      );

      setTimeout(
        ()=>{
          console.log('B');
        },0
      );

      asyncScheduler.schedule(
        (value:number)=>{
          console.log(`${asyncScheduler.now()-timeNow}ms`, 'asyncScheduler - '+value);
        }, 500, 1
      );
  
      asyncScheduler.schedule(
        (value:number)=>{
          console.log(`${asyncScheduler.now()-timeNow}ms`, 'asyncScheduler - '+value);
        }, 1000, 2
      );
  
      asyncScheduler.schedule(
        (value:number)=>{
          console.log(`${asyncScheduler.now()-timeNow}ms`, 'asyncScheduler - '+value);
        }, 500, 3
      );
  
      asyncScheduler.schedule(
        (value:number)=>{
          console.log(`${asyncScheduler.now()-timeNow}ms`, 'asyncScheduler - '+value);
        }, 750, 3
      );

      let posmatrac:Observable<string> = new Observable<string>(
        (observer)=>{
          //any async task        
              observer.next('from Observable - any value');                    
        }
      );
     
      this.macroTask('MacroTask value');

      let obecanje = new Promise(
        (resolve,reject)=>{
          //any async task
          resolve('from Promise - Vlada1');
        }
      );

      obecanje.then(
        (value:string)=>{
          console.log(value);
        }
      )

      posmatrac.subscribe(
        (value:string)=>{
          console.log(value);
        }
      )  

      console.log('C');          
  }

  private macroTask(value:string){
    console.log(value);
  }

  private segmentChanged(event: CustomEvent){
    if(event.detail.value == "all"){      
      this._places$ = this._placesService.discoveredPlaces;
    }
    else{
      this._places$ = this._placesService.discoveredAllButMyPlaces;
    }
  }
 
}
