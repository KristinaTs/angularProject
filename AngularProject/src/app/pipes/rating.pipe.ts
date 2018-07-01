import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ratingPipe'})
export class RatingPipe implements PipeTransform {
    transform(value: number): any {
        if(!isNaN(+value)){
            return `${value /10} /5`;
        }
        return value;
    }
}