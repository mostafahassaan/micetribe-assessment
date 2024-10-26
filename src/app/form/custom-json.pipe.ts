import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customJsonPipe',
  standalone: true,
})
export class CustomJsonPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(value, null, 4); 
  }
}